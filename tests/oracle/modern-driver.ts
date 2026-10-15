/* The rewritten data layer, driven the way the new UI drives it. */
import type { User } from "firebase/auth";
import type { Unsubscribe } from "firebase/firestore";
import { manualToBook, volumeToBook, type GoogleVolume } from "../../src/lib/books-api";
import { commentsFor, queryLibrary, reviewFor, searchLibrary } from "../../src/lib/domain";
import { computeStats, toActivity } from "../../src/lib/insights";
import * as lib from "../../src/lib/library";
import type { Book, BookEvent, NewBook, UserProfile } from "../../src/lib/types";
import type { Derived, Driver, ManualForm, PlainBook } from "./driver";

/** Resolves with the first snapshot a live query delivers. */
const once = <T>(watch: (next: (v: T) => void) => Unsubscribe) =>
  new Promise<T>((resolve) => {
    const stop = watch((v) => {
      queueMicrotask(() => stop());
      resolve(v);
    });
  });

export async function modernDriver(user: User): Promise<Driver> {
  const uid = user.uid;
  let profile: UserProfile | undefined;
  const load = async () => ({
    books: await once<Book[]>((next) => lib.watchBooks(uid, next)),
    events: await once<BookEvent[]>((next) => lib.watchEvents(uid, next)),
  });
  const book = async (id: string) => (await load()).books.find((b) => b.id === id);
  const ms = (t: { toMillis(): number }) => t.toMillis();

  return {
    name: "modern",
    async signIn() {
      profile = await lib.ensureProfile(user);
    },
    addBook: (b: PlainBook) => lib.addBook(uid, b as unknown as NewBook),
    addGoogleBook: (v) => lib.addBook(uid, volumeToBook(v as GoogleVolume)),
    addManualBook: (f: ManualForm) => lib.addBook(uid, manualToBook(f)),
    addScannedBook: (v, meta) => lib.addScannedBook(uid, volumeToBook(v as GoogleVolume), { method: meta.scanMethod, isbn: meta.isbn, seconds: meta.durationSec }),
    startReading: (id) => lib.startReading(uid, id),
    finish: (id) => lib.changeState(uid, id, "finished"),
    updateProgress: (id, page) => lib.updateProgress(uid, id, page),
    changeState: (id, state) => lib.changeState(uid, id, state),
    rate: (id, r) => lib.rateBook(uid, id, r),
    edit: (id, updates) => lib.editBook(uid, id, updates as lib.BookEdit),
    deleteBook: (id) => lib.deleteBook(uid, id),
    async comment(id, text) {
      const b = await book(id);
      if (!b) throw new Error("Book not found");
      await lib.addComment(uid, id, text, { state: b.state, page: b.progress.currentPage });
    },
    addReview: (id, text) => lib.addReview(uid, id, text),
    updateReview: (id, text) => lib.updateReview(uid, id, text),
    async dailyMessage(force = false) {
      const { books, events } = await load();
      profile ??= await lib.ensureProfile(user);
      const s = computeStats(books, events);
      const byId = new Map(books.map((b) => [b.id, b]));
      const activity = events.slice(0, 6).flatMap((e) => toActivity(e, byId.get(e.bookId)) ?? []);
      const stats = { totalBooks: s.booksInLibrary, finishedBooks: s.booksReadThisYear, totalPagesRead: s.totalPagesRead, currentlyReading: s.currentlyReading, readingStreak: s.readingStreak };
      return lib.dailyMessage(uid, { profile, books, stats, activity }, force);
    },
    async derive(queries, searches): Promise<Derived> {
      const { books, events } = await load();
      const byId = new Map(books.map((b) => [b.id, b]));
      const comments: Derived["comments"] = {};
      const reviews: Derived["reviews"] = {};
      for (const b of books) {
        comments[b.id] = commentsFor(events, b.id).map((c) => ({ text: c.text, readingState: c.readingState, currentPage: c.currentPage, timestamp: ms(c.timestamp) }));
        const r = reviewFor(events, b.id);
        reviews[b.id] = r ? { text: r.text, createdAt: ms(r.createdAt), updatedAt: ms(r.updatedAt) } : null;
      }
      return {
        stats: { ...computeStats(books, events) },
        activity: events.flatMap((e) => {
          const a = toActivity(e, byId.get(e.bookId));
          return a ? [{ type: a.type, bookTitle: a.bookTitle, bookId: a.bookId, details: a.details, timestamp: a.timestamp.getTime() }] : [];
        }),
        comments,
        reviews,
        views: Object.fromEntries(Object.entries(queries).map(([name, q]) => [name, queryLibrary(books, q).map((b) => b.id)])),
        search: Object.fromEntries(searches.map((q) => [q, searchLibrary(books, q, 8).map((b) => b.id)])),
      };
    },
  };
}
