/* The pre-modernization stack (services → repositories), driven exactly as its React providers drove it. */
import type { User } from "firebase/auth";
import type { Derived, Driver, LibraryQuery, ManualForm, PlainBook, ReadingState, ScanMeta } from "./driver";
import { legacy } from "../legacy";

export async function legacyDriver(user: User): Promise<Driver> {
  const { bookService } = await legacy("services/BookService");
  const { eventService } = await legacy("services/EventService");
  const { userService } = await legacy("services/UserService");
  const { messageService } = await legacy("services/MessageService");
  const { convertGoogleBookToBook, convertManualEntryToBook } = await legacy("books/book-utils");
  const uid = user.uid;

  // Legacy services report failures as values; the oracle surfaces them as thrown messages.
  const must = async <T>(p: Promise<{ success: boolean; data?: T; error?: { message: string } }>) => {
    const r = await p;
    if (!r.success) throw new Error(r.error?.message ?? "unknown");
    return r.data as T;
  };
  const book = async (id: string) => (await bookService.getBook(uid, id)).data;
  const add = async (b: Record<string, unknown>) => {
    const data = { ...b };
    delete data.id;
    return must<string>(bookService.addBook(uid, data));
  };

  const loadAll = async () => ({
    books: (await bookService.getUserBooks(uid)).data ?? [],
    events: (await eventService.getRecentEvents(uid, 1000)).data ?? [],
  });

  return {
    name: "legacy",
    async signIn() {
      // UserProvider: fetch the profile, create it (and the welcome book) when missing.
      const existing = await userService.getProfile(uid);
      if (!(existing.success && existing.data)) await must(userService.createProfileFromFirebaseUser(user));
    },
    addBook: (b: PlainBook) => add(b),
    addGoogleBook: (v: unknown) => add(convertGoogleBookToBook(v)),
    addManualBook: (f: ManualForm) => add(convertManualEntryToBook(f)),
    async addScannedBook(v: unknown, meta: ScanMeta) {
      const converted = convertGoogleBookToBook(v);
      const id = await add(converted);
      const scanDuration = meta.durationSec * 1000;
      await eventService.logEvent(uid, {
        type: "manual_update",
        bookId: id,
        data: {
          comment: `Book added via barcode scanning (${meta.scanMethod === "camera" ? "camera" : "image upload"}, ISBN: ${meta.isbn}, scan duration: ${Math.round(scanDuration / 1000)}s)`,
          commentState: converted.state,
          commentPage: converted.progress.currentPage,
        },
      });
      return id;
    },
    async startReading(id: string) {
      const b = await book(id);
      // BookDetailPage.handleStartReading ignores the outcome of each call.
      await bookService.updateBookState(uid, id, "in_progress", b?.state);
      await bookService.updateBookProgress(uid, id, 1);
    },
    async finish(id: string) {
      const b = await book(id);
      await must(bookService.updateBookState(uid, id, "finished", b?.state));
    },
    updateProgress: (id: string, page: number) => must(bookService.updateBookProgress(uid, id, page)),
    changeState: (id: string, state: ReadingState) => must(bookService.updateBookState(uid, id, state)),
    rate: (id: string, r: number) => must(bookService.updateBookRating(uid, id, r)),
    // EditBookSheet drops undefined fields before saving.
    edit: (id: string, updates: Record<string, unknown>) =>
      must(bookService.updateBookManual(uid, id, Object.fromEntries(Object.entries(updates).filter(([, v]) => v !== undefined)))),
    deleteBook: (id: string) => must(bookService.deleteBook(uid, id)),
    async comment(id: string, text: string) {
      const b = await book(id);
      if (!b) throw new Error("Book not found");
      await must(eventService.addComment(uid, id, text, b.state, b.progress.currentPage));
    },
    async addReview(id: string, text: string) {
      await must(eventService.addReview(uid, id, text));
    },
    updateReview: (id: string, text: string) => must(eventService.updateReview(uid, id, text)),
    async dailyMessage(force = false) {
      const { books, events } = await loadAll();
      const userProfile = (await userService.getProfile(uid)).data;
      const s = await userService["calculateStatsFromBooksAndEvents"](books, events);
      const activity = (await eventService.getRecentActivityItems(uid, 6)).data ?? [];
      const stats = {
        totalBooks: s.booksInLibrary,
        finishedBooks: s.booksReadThisYear,
        totalPagesRead: s.totalPagesRead,
        currentlyReading: s.currentlyReading,
        readingStreak: s.readingStreak,
      };
      return must<string>(messageService.getPersonalizedMessage({ userProfile, books, stats, recentActivity: activity }, force));
    },
    async derive(queries: Record<string, LibraryQuery>, searches: string[]): Promise<Derived> {
      const { books, events } = await loadAll();
      const byId = new Map(books.map((b: { id: string }) => [b.id, b]));
      const ms = (t: { toMillis(): number }) => t.toMillis();
      const activity = events
        .map((e: { bookId: string }) => eventService["transformEventToActivityItem"](e, byId.get(e.bookId)))
        .filter(Boolean)
        .map((a: { type: string; bookTitle: string; bookId: string; details?: string; timestamp: Date }) => ({
          type: a.type, bookTitle: a.bookTitle, bookId: a.bookId, details: a.details, timestamp: a.timestamp.getTime(),
        }));
      const comments: Derived["comments"] = {};
      const reviews: Derived["reviews"] = {};
      for (const b of books as { id: string }[]) {
        const c = (await eventService.getBookComments(uid, b.id)).data ?? [];
        comments[b.id] = c.map((x: { text: string; readingState: string; currentPage: number; timestamp: { toMillis(): number } }) => ({
          text: x.text, readingState: x.readingState, currentPage: x.currentPage, timestamp: ms(x.timestamp),
        }));
        const r = (await eventService.getBookReview(uid, b.id)).data;
        reviews[b.id] = r ? { text: r.text, createdAt: ms(r.createdAt), updatedAt: ms(r.updatedAt) } : null;
      }
      const views: Derived["views"] = {};
      for (const [name, q] of Object.entries(queries)) {
        views[name] = bookService
          .filterAndSortBooks(books, q.search, q.status, q.ownership, q.genre, q.sort, q.direction)
          .map((b: { id: string }) => b.id);
      }
      const search: Derived["search"] = {};
      for (const q of searches) search[q] = ((await bookService.searchBooks(uid, q, 8)).data ?? []).map((b: { id: string }) => b.id);
      return {
        stats: await userService["calculateStatsFromBooksAndEvents"](books, events),
        activity, comments, reviews, views, search,
      };
    },
  };
}
