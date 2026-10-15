/**
 * Every write the app makes. Commands validate, then commit the book change and its audit events in
 * one batch, so the history can never disagree with the book. Error messages are shown to the reader.
 */
import { isSameDay } from "date-fns";
import type { User } from "firebase/auth";
import {
  addDoc, collection, deleteField, doc, getDoc, getDocs, limit, onSnapshot, orderBy, query, Timestamp, where, writeBatch,
  type DocumentSnapshot, type WriteBatch,
} from "firebase/firestore";
import { buildPrompt, fallbackMessage, generateMessage, type MessageInput } from "./ai";
import { bookProblem, canTransition, isValidComment, isValidCommentPage, isValidMessage, isValidReview, reviewFor } from "./domain";
import { db } from "./firebase";
import type { Book, BookEvent, EventType, NewBook, PersonalizedMessage, ReadingState, UserProfile } from "./types";

const books = (uid: string) => collection(db, "users", uid, "books");
const bookRef = (uid: string, id: string) => doc(db, "users", uid, "books", id);
const events = (uid: string) => collection(db, "users", uid, "events");
const messages = (uid: string) => collection(db, "users", uid, "messages");
const profileRef = (uid: string) => doc(db, "users", uid, "profile", "main");

const withId = <T>(snap: DocumentSnapshot) => ({ id: snap.id, ...snap.data() }) as T;
const defined = <T extends object>(o: T) => Object.fromEntries(Object.entries(o).filter(([, v]) => v !== undefined)) as T;
const fail = (problem: string | null | false) => {
  if (problem) throw new Error(problem);
};

/** Client timestamps that strictly increase, so events written in one batch keep their order. */
let lastMicros = 0;
export function stamp(): Timestamp {
  lastMicros = Math.max(Date.now() * 1000, lastMicros + 1);
  return new Timestamp(Math.floor(lastMicros / 1e6), (lastMicros % 1e6) * 1000);
}

async function readBook(uid: string, id: string): Promise<Book> {
  const snap = await getDoc(bookRef(uid, id));
  if (!snap.exists()) throw new Error("Book not found");
  return withId<Book>(snap);
}

function log(batch: WriteBatch, uid: string, bookId: string, type: EventType, data: BookEvent["data"]) {
  batch.set(doc(events(uid)), { type, bookId, data, userId: uid, timestamp: stamp() });
}

function transition(batch: WriteBatch, uid: string, book: Pick<Book, "id" | "state">, next: ReadingState) {
  const now = stamp();
  batch.update(bookRef(uid, book.id), defined({
    state: next,
    updatedAt: now,
    startedAt: book.state === "not_started" && next === "in_progress" ? now : undefined,
    finishedAt: next === "finished" ? now : undefined,
  }));
  log(batch, uid, book.id, "state_change", { previousState: book.state, newState: next });
}

export async function addBook(uid: string, book: NewBook): Promise<string> {
  fail(bookProblem(book));
  const now = stamp();
  return (await addDoc(books(uid), defined({ ...book, addedAt: now, updatedAt: now }))).id;
}

/** Records the page reached; the first page starts the book and the last page finishes it. */
export async function updateProgress(uid: string, bookId: string, page: number) {
  fail(page < 0 && "Current page cannot be negative");
  const book = await readBook(uid, bookId);
  const { currentPage, totalPages } = book.progress;
  fail(!!totalPages && page > totalPages && "Current page cannot exceed total pages");
  const batch = writeBatch(db);
  let state = book.state;
  if (state === "not_started") transition(batch, uid, book, (state = "in_progress"));
  const now = stamp();
  batch.update(bookRef(uid, bookId), { progress: { currentPage: page, totalPages: totalPages || 0, lastUpdated: now }, updatedAt: now });
  log(batch, uid, bookId, "progress_update", { previousPage: currentPage || 0, newPage: page });
  if (totalPages && page >= totalPages && state === "in_progress") transition(batch, uid, { id: bookId, state }, "finished");
  await batch.commit();
}

export async function changeState(uid: string, bookId: string, next: ReadingState) {
  const book = await readBook(uid, bookId);
  fail(!canTransition(book.state, next) && `Cannot transition from ${book.state} to ${next}`);
  const batch = writeBatch(db);
  transition(batch, uid, book, next);
  await batch.commit();
}

/** "Start reading" from the book page: begin, and mark page one. */
export async function startReading(uid: string, bookId: string) {
  await changeState(uid, bookId, "in_progress");
  await updateProgress(uid, bookId, 1);
}

export async function rateBook(uid: string, bookId: string, rating: number) {
  fail(bookProblem({ rating }));
  const batch = writeBatch(db);
  batch.update(bookRef(uid, bookId), { rating, updatedAt: stamp() });
  log(batch, uid, bookId, "rating_added", { rating });
  await batch.commit();
}

export type BookEdit = Partial<Omit<NewBook, "rating">> & { rating?: number | null };

/** Manual correction from the edit form: any field, any state, audited. `rating: null` clears it. */
export async function editBook(uid: string, bookId: string, edit: BookEdit) {
  fail(bookProblem(edit));
  const book = await readBook(uid, bookId);
  const changes = defined(edit);
  const now = stamp();
  const after = { ...book, ...changes };
  const batch = writeBatch(db);
  batch.update(bookRef(uid, bookId), defined({
    ...changes,
    rating: changes.rating === null ? deleteField() : changes.rating,
    updatedAt: now,
    startedAt: book.state === "not_started" && after.state === "in_progress" && !book.startedAt ? now : undefined,
    finishedAt: book.state !== "finished" && after.state === "finished" && !book.finishedAt ? now : undefined,
  }));
  log(batch, uid, bookId, "manual_update", {
    comment: `Manual update: ${Object.keys(changes).join(", ")}`,
    commentState: after.state,
    commentPage: after.progress.currentPage,
  });
  if (changes.state && changes.state !== book.state) log(batch, uid, bookId, "state_change", { previousState: book.state, newState: changes.state });
  await batch.commit();
}

/** Removes the book; its history stays, closed by a delete_book event. */
export async function deleteBook(uid: string, bookId: string) {
  const book = await readBook(uid, bookId).catch(() => null);
  const batch = writeBatch(db);
  batch.delete(bookRef(uid, bookId));
  log(batch, uid, bookId, "delete_book", { deletedBookTitle: book?.title ?? "Unknown Book", deletedBookAuthor: book?.author ?? "Unknown Author" });
  await batch.commit();
}

/** Audit trail for books added by scanning a barcode. */
export async function addScannedBook(uid: string, book: NewBook, scan: { method: "camera" | "upload"; isbn: string; seconds: number }) {
  const id = await addBook(uid, book);
  const batch = writeBatch(db);
  log(batch, uid, id, "manual_update", {
    comment: `Book added via barcode scanning (${scan.method === "camera" ? "camera" : "image upload"}, ISBN: ${scan.isbn}, scan duration: ${Math.round(scan.seconds)}s)`,
    commentState: book.state,
    commentPage: book.progress.currentPage,
  });
  await batch.commit().catch(() => undefined);
  return id;
}

/** A comment remembers where the reader was: the book's state and page as shown when writing. */
export async function addComment(uid: string, bookId: string, text: string, at: { state: ReadingState; page: number }) {
  fail(!isValidComment(text) && "Comment must be between 1 and 2000 characters");
  const book = await readBook(uid, bookId);
  fail(!isValidCommentPage(at.page, book.progress.totalPages) && "Invalid page number");
  const batch = writeBatch(db);
  log(batch, uid, bookId, "comment", { comment: text.trim(), commentState: at.state, commentPage: at.page });
  await batch.commit();
}

async function currentReview(uid: string, bookId: string) {
  const snap = await getDocs(query(events(uid), where("bookId", "==", bookId)));
  return reviewFor(snap.docs.map((d) => withId<BookEvent>(d)), bookId);
}

export async function addReview(uid: string, bookId: string, text: string) {
  fail(!isValidReview(text) && "Review must be between 10 and 5000 characters");
  const book = await readBook(uid, bookId);
  fail(book.state !== "finished" && "Reviews can only be added to finished books");
  fail(!!(await currentReview(uid, bookId)) && "A review already exists for this book");
  const now = stamp();
  const batch = writeBatch(db);
  log(batch, uid, bookId, "review", { review: text.trim(), reviewCreatedAt: now, reviewUpdatedAt: now });
  await batch.commit();
}

/** Reviews are never edited in place: a new review event keeps the original creation time. */
export async function updateReview(uid: string, bookId: string, text: string) {
  fail(!isValidReview(text) && "Review must be between 10 and 5000 characters");
  const existing = await currentReview(uid, bookId);
  fail(!existing && "No existing review found to update");
  const batch = writeBatch(db);
  log(batch, uid, bookId, "review", { review: text.trim(), reviewCreatedAt: existing!.createdAt, reviewUpdatedAt: stamp() });
  await batch.commit();
}

/** Every new reader starts with one sample book on their wishlist. */
const WELCOME_BOOK: NewBook & { notes: string } = {
  title: "Fermat's Last Theorem",
  author: "Simon Singh",
  genre: "Mathematics",
  state: "not_started",
  progress: { currentPage: 0, totalPages: 396 },
  isOwned: false,
  description:
    "In 1963 a schoolboy browsing in his local library stumbled across a great mathematical problem: Fermat's Last Theorem, a puzzle that every child can now understand, but which has baffled mathematicians for over 300 years. Aged just ten, Andrew Wiles dreamed he would crack it.",
  publishedDate: "1997",
  coverImage: "http://books.google.com/books/content?id=wvAZAQAAIAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
  notes: "Welcome to your personal library! This is a sample book to get you started. Feel free to update your reading progress or add your own books.",
};

const signingUp = new Map<string, Promise<UserProfile>>();

/** Loads the reader's profile, creating it with the welcome book on first sign-in. */
export function ensureProfile(user: User): Promise<UserProfile> {
  const pending = signingUp.get(user.uid) ?? createIfMissing(user).finally(() => signingUp.delete(user.uid));
  signingUp.set(user.uid, pending);
  return pending;
}

async function createIfMissing(user: User): Promise<UserProfile> {
  const snap = await getDoc(profileRef(user.uid));
  if (snap.exists()) return { ...snap.data(), id: user.uid } as UserProfile;
  const now = stamp();
  const profile = defined({
    id: user.uid,
    displayName: user.displayName || "Anonymous User",
    email: user.email || "",
    photoURL: user.photoURL || undefined,
    emailVerified: user.emailVerified,
    lastSignInTime: user.metadata.lastSignInTime || "",
    totalBooksRead: 0,
    currentlyReading: 0,
    booksInLibrary: 0,
    createdAt: now,
    updatedAt: now,
  });
  const batch = writeBatch(db);
  batch.set(profileRef(user.uid), profile);
  const welcome = stamp();
  batch.set(doc(books(user.uid)), { ...WELCOME_BOOK, addedAt: welcome, updatedAt: welcome });
  await batch.commit();
  return profile as UserProfile;
}

/**
 * Today's companion message: reuse today's, otherwise ask Gemini. If the model fails or answers out of
 * bounds, keep the last message; with none at all, save a fallback built from the stats.
 */
export async function dailyMessage(uid: string, input: MessageInput, force = false): Promise<string> {
  const snap = await getDocs(query(messages(uid), orderBy("timestamp", "desc"), limit(1)));
  const latest = snap.docs[0] && withId<PersonalizedMessage>(snap.docs[0]);
  if (latest && !force && isSameDay(latest.timestamp.toDate(), new Date())) return latest.content;
  let content: string;
  try {
    content = await generateMessage(buildPrompt(input));
    fail(!isValidMessage(content) && "Generated message failed validation");
  } catch {
    if (latest?.content) return latest.content;
    content = fallbackMessage(input.stats);
  }
  await addDoc(messages(uid), { userId: uid, content, timestamp: stamp() }).catch(() => undefined);
  return content;
}

type Listener<T> = (value: T) => void;

export const watchBooks = (uid: string, next: Listener<Book[]>, error?: Listener<Error>) =>
  onSnapshot(query(books(uid), orderBy("addedAt", "desc")), (s) => next(s.docs.map((d) => withId<Book>(d))), error);

export const watchEvents = (uid: string, next: Listener<BookEvent[]>, error?: Listener<Error>) =>
  onSnapshot(query(events(uid), orderBy("timestamp", "desc"), limit(1000)), (s) => next(s.docs.map((d) => withId<BookEvent>(d))), error);

export const watchMessage = (uid: string, next: Listener<PersonalizedMessage | null>) =>
  onSnapshot(query(messages(uid), orderBy("timestamp", "desc"), limit(1)), (s) => next(s.docs[0] ? withId<PersonalizedMessage>(s.docs[0]) : null), () => next(null));
