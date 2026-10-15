/**
 * Property-based equivalence: the new pure functions against the legacy ones, on generated inputs.
 * Each property names the legacy function it pins; deliberate deviations are excluded and tested in domain.test.ts.
 */
import fc from "fast-check";
import { Timestamp } from "firebase/firestore";
import { beforeAll, describe, expect, test } from "vitest";
import { coverOf, extractISBN, formatAuthors, isbnOf, lookupISBN, manualToBook, volumeToBook, type GoogleVolume } from "@/lib/books-api";
import { bookProblem, canTransition, editProblems, genresOf, isValidComment, isValidCommentPage, isValidMessage, isValidProgress, isValidRating, isValidReview, progressPercent, queryLibrary, searchLibrary } from "@/lib/domain";
import { computeStats, genreColors, toActivity } from "@/lib/insights";
import type { Book, BookEvent } from "@/lib/types";
import { legacy } from "../legacy";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let L: Record<string, any>;
beforeAll(async () => {
  const [models, utils, isbn, api, validation, books, events, users, colors] = await Promise.all(
    ["models/models", "books/book-utils", "utils/isbn-utils", "api/google-books-api", "books/book-validation", "services/BookService", "services/EventService", "services/UserService", "utils/genre-colors"].map(legacy),
  );
  L = {
    canTransitionTo: models.canTransitionTo, validateProgress: models.validateProgress, validateRating: models.validateRating, validateComment: models.validateComment,
    validateReview: models.validateReview, validatePersonalizedMessage: models.validatePersonalizedMessage, validateCommentPage: models.validateCommentPage,
    calculateBookProgress: utils.calculateBookProgress, convertGoogleBookToBook: utils.convertGoogleBookToBook, convertManualEntryToBook: utils.convertManualEntryToBook,
    extractISBN: isbn.extractISBN, stripISBNPrefix: isbn.stripISBNPrefix, formatAuthors: api.formatAuthors, getBestThumbnail: api.getBestThumbnail, getBestISBN: api.getBestISBN,
    validateEditedBook: validation.validateEditedBook, createGenreColorMapping: colors.createGenreColorMapping,
    books, events: events.eventService, users: users.userService,
  };
});

const RUNS = { numRuns: 400 };
const NOW = Date.now();
const DAY = 86_400_000;
const stamp = fc.integer({ min: NOW - 400 * DAY, max: NOW }).map((ms) => Timestamp.fromMillis(ms));
const state = fc.constantFrom("not_started", "in_progress", "finished" as const);
const word = fc.constantFrom("dune", "Dune", "the", "Rose", "fermat", "sense", "Omens", "o", "eco", "");

const book: fc.Arbitrary<Book> = fc.record({
  id: fc.uuid(),
  title: fc.array(word, { minLength: 1, maxLength: 3 }).map((w) => w.join(" ") || "x"),
  author: fc.array(word, { minLength: 1, maxLength: 2 }).map((w) => w.join(" ") || "y"),
  state,
  progress: fc.record({ currentPage: fc.integer({ min: 0, max: 600 }), totalPages: fc.integer({ min: 0, max: 600 }) }),
  isOwned: fc.boolean(),
  rating: fc.option(fc.integer({ min: 1, max: 5 }), { nil: undefined }),
  genre: fc.option(fc.constantFrom("Fiction", "fiction", "Fantasy", "History", ""), { nil: undefined }),
  description: fc.option(fc.array(word).map((w) => w.join(" ")), { nil: undefined }),
  addedAt: stamp,
  updatedAt: stamp,
  finishedAt: fc.option(stamp, { nil: undefined }),
}, { requiredKeys: ["id", "title", "author", "state", "progress", "isOwned", "addedAt", "updatedAt"] }) as fc.Arbitrary<Book>;
const library = fc.uniqueArray(book, { selector: (b) => b.id, maxLength: 25 });

const event = (bookIds: string[]): fc.Arbitrary<BookEvent> =>
  fc.record({
    id: fc.uuid(),
    bookId: fc.constantFrom(...bookIds, "deleted-book"),
    userId: fc.constant("u"),
    type: fc.constantFrom("state_change", "progress_update", "rating_added", "comment", "review", "manual_update", "delete_book" as const),
    timestamp: stamp,
    data: fc.record({
      previousState: fc.option(state, { nil: undefined }),
      newState: fc.option(state, { nil: undefined }),
      previousPage: fc.option(fc.integer({ min: 0, max: 600 }), { nil: undefined }),
      newPage: fc.option(fc.integer({ min: 0, max: 600 }), { nil: undefined }),
      rating: fc.option(fc.integer({ min: 1, max: 5 }), { nil: undefined }),
      comment: fc.option(fc.string({ maxLength: 80 }), { nil: undefined }),
      deletedBookTitle: fc.option(fc.string({ maxLength: 10 }), { nil: undefined }),
      deletedBookAuthor: fc.option(fc.string({ maxLength: 10 }), { nil: undefined }),
    }, { requiredKeys: [] }),
  }) as fc.Arbitrary<BookEvent>;

describe("validators match models.ts and BookService.validateBookData", () => {
  const n = fc.oneof(fc.integer({ min: -10, max: 6000 }), fc.double({ noNaN: false, min: -10, max: 10 }));
  test("state machine", () => fc.assert(fc.property(state, state, (a, b) => canTransition(a, b) === L.canTransitionTo(a, b))));
  test("progress", () => fc.assert(fc.property(n, n, (c, t) => isValidProgress({ currentPage: c, totalPages: t }) === L.validateProgress({ currentPage: c, totalPages: t })), RUNS));
  test("rating", () => fc.assert(fc.property(n, (r) => isValidRating(r) === L.validateRating(r)), RUNS));
  test("comment, review and message lengths", () =>
    fc.assert(fc.property(fc.string({ maxLength: 5100 }), (t) => isValidComment(t) === L.validateComment(t) && isValidReview(t) === L.validateReview(t) && isValidMessage(t) === L.validatePersonalizedMessage(t)), { numRuns: 150 }));
  test("comment page", () => fc.assert(fc.property(n, n, (p, t) => isValidCommentPage(p, t) === L.validateCommentPage(p, t)), RUNS));
  test("book payload", async () => {
    const service = new L.books.BookService();
    const partial = fc.record({ title: fc.constantFrom("", " ", "T"), author: fc.constantFrom("", " ", "A"), progress: fc.record({ currentPage: n, totalPages: n }), rating: n }, { requiredKeys: [] });
    fc.assert(fc.property(partial, (b) => bookProblem(b) === (service["validateBookData"](b)?.message ?? null)), RUNS);
  });
  test("edit form (except the fixed year-range message)", () => {
    const form = fc.record({
      title: fc.constantFrom("", "T"), author: fc.constantFrom(" ", "A"), state,
      progress: fc.record({ currentPage: n, totalPages: n }), rating: fc.option(n, { nil: undefined }),
      isbn: fc.constantFrom("", "123", "0441013597", "044101359X", "04410135Y7", "9780441013593", "978-0-441-01359-3", "97804410135AB"),
      coverImage: fc.constantFrom("", "not a url", "https://x.test/a.png", "https://books.google.com/c?id=1", "https://x.test/page"),
      publishedDate: fc.constantFrom("", "1997", "1997-13", "1997-02-31", "0999", "abcd", "2005-08", "1997-1"),
      isOwned: fc.boolean(),
    });
    fc.assert(fc.property(form, (f) => void expect(editProblems(f).filter((e) => !e.startsWith("Year"))).toEqual(L.validateEditedBook(f).errors.filter((e: string) => !e.startsWith("Year")))), RUNS);
  });
});

describe("book conversions match book-utils and google-books-api", () => {
  const strip = (book: Record<string, unknown>) => {
    const rest = { ...book };
    for (const key of ["id", "addedAt", "updatedAt"]) delete rest[key];
    return rest;
  };
  const volume = fc.record({
    id: fc.string(),
    volumeInfo: fc.record({
      title: fc.string(), authors: fc.option(fc.array(fc.string({ minLength: 1 }), { maxLength: 4 }), { nil: undefined }), pageCount: fc.option(fc.nat(2000), { nil: undefined }),
      categories: fc.option(fc.array(fc.string(), { maxLength: 3 }), { nil: undefined }), publishedDate: fc.option(fc.string(), { nil: undefined }), description: fc.option(fc.string(), { nil: undefined }),
      industryIdentifiers: fc.option(fc.array(fc.record({ type: fc.constantFrom("ISBN_10", "ISBN_13", "OTHER"), identifier: fc.string() }), { maxLength: 3 }), { nil: undefined }),
      imageLinks: fc.option(fc.record({ smallThumbnail: fc.string(), thumbnail: fc.string(), small: fc.string(), medium: fc.string() }, { requiredKeys: [] }), { nil: undefined }),
    }, { requiredKeys: ["title"] }),
  }) as fc.Arbitrary<GoogleVolume>;
  test("Google volume → book", () =>
    fc.assert(fc.property(volume, (v): void => {
      expect(volumeToBook(v)).toEqual(strip(L.convertGoogleBookToBook(v)));
      expect([formatAuthors(v.volumeInfo.authors), coverOf(v), isbnOf(v)]).toEqual([L.formatAuthors(v.volumeInfo.authors), L.getBestThumbnail(v), L.getBestISBN(v)]);
    }), RUNS));
  test("manual entry → book", () => {
    const entry = fc.record({ title: fc.string(), author: fc.string(), genre: fc.string(), pages: fc.oneof(fc.string(), fc.nat().map(String)), publishedYear: fc.string(), ownership: fc.constantFrom("owned", "wishlist"), description: fc.string() });
    fc.assert(fc.property(entry, (f) => void expect(manualToBook(f)).toEqual(strip(L.convertManualEntryToBook(f)))), RUNS);
  });
  test("barcode → ISBN extraction", () =>
    fc.assert(fc.property(fc.stringMatching(/^[0-9Xx \-]{0,16}$/), (raw) => extractISBN(raw) === L.extractISBN(raw)), { numRuns: 2000 }));
  test("ISBN lookup form (978 prefixes; 979 handled in domain.test)", () =>
    fc.assert(fc.property(fc.stringMatching(/^(978\d{10}|\d{10}|\d{9}X|\d{12})$/), (isbn) => lookupISBN(isbn) === L.stripISBNPrefix(isbn)), { numRuns: 1000 }));
});

describe("library queries match BookService", () => {
  const query = fc.record({
    // Legacy matched on the untrimmed text (" rose " found nothing); the new query trims (deviation D12, domain.test).
    search: fc.constantFrom("", "dune", "the", "rose", "fiction", "zz"),
    status: fc.constantFrom("all", "not_started", "in_progress", "finished"),
    ownership: fc.constantFrom("all", "owned", "wishlist"),
    genre: fc.constantFrom("all", "fiction", "Fantasy", "History"),
    sort: fc.constantFrom("title", "author", "pages", "rating", "progress", "dateAdded", "unknown"),
    direction: fc.constantFrom("asc", "desc" as const),
  });
  test("progress percentage", () => fc.assert(fc.property(book, (b) => progressPercent(b) === L.calculateBookProgress(b)), RUNS));
  test("filter and sort", () =>
    fc.assert(fc.property(library, query, (books, q): void => {
      const legacyIds = new L.books.BookService().filterAndSortBooks(books, q.search, q.status, q.ownership, q.genre, q.sort, q.direction).map((b: Book) => b.id);
      expect(queryLibrary(books, q).map((b) => b.id)).toEqual(legacyIds);
    }), RUNS));
  test("quick-search ranking", async () => {
    let current: Book[] = [];
    const service = new L.books.BookService({ getUserBooks: async () => ({ success: true, data: current }) });
    await fc.assert(fc.asyncProperty(library, fc.constantFrom("dune", "the", "rose", "o", "eco", "x"), async (books, q) => {
      current = books;
      expect(searchLibrary(books, q, 8).map((b) => b.id)).toEqual((await service.searchBooks("u", q, 8)).data.map((b: Book) => b.id));
    }), RUNS);
  });
  test("available genres", () =>
    fc.assert(fc.property(library, (books): void => {
      const legacyGenres = [...new Set(books.map((b) => b.genre).filter((g): g is string => !!g && g.trim() !== "").map((g) => g.trim()))].sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));
      expect(genresOf(books)).toEqual(legacyGenres);
    }), RUNS));
});

describe("read models match UserService and EventService", () => {
  /** Same-day finishes are where the streak deliberately changed (D4); everything else must agree. */
  const distinctFinishDays = (books: Book[]) => {
    const days = books.filter((b) => b.state === "finished" && b.finishedAt).map((b) => new Date(b.finishedAt!.toMillis()).toDateString());
    return new Set(days).size === days.length;
  };
  test("statistics", () =>
    fc.assert(fc.asyncProperty(library.chain((books) => fc.tuple(fc.constant(books), fc.array(event(books.map((b) => b.id).concat("x")), { maxLength: 30 }))), async ([books, events]): Promise<void> => {
      const legacyStats = await L.users["calculateStatsFromBooksAndEvents"](books, events);
      const stats = computeStats(books, events);
      if (!distinctFinishDays(books)) {
        delete (legacyStats as { readingStreak?: number }).readingStreak;
        delete (stats as { readingStreak?: number }).readingStreak;
      }
      expect(stats).toEqual(legacyStats);
    }), RUNS));
  test("activity items", () =>
    fc.assert(fc.property(library.chain((books) => fc.tuple(fc.constant(books), fc.array(event(books.map((b) => b.id).concat("x")), { maxLength: 20 }))), ([books, events]): void => {
      const byId = new Map(books.map((b) => [b.id, b]));
      for (const e of events) {
        const legacyItem = L.events["transformEventToActivityItem"](e, byId.get(e.bookId));
        const item = toActivity(e, byId.get(e.bookId));
        expect(item && { ...item }).toEqual(legacyItem && { ...legacyItem, colorClass: undefined });
      }
    }), RUNS));
  test("genre colours", () =>
    fc.assert(fc.property(fc.uniqueArray(fc.constantFrom("Fiction", "Fantasy", "Unknown", "History", "Poetry", "Satire", "Art", "Math", "Law", "Myth", "War", "Zen", "Yoga", "Xenia"), { maxLength: 14 }), (genres) =>
      void expect(genreColors(genres)).toEqual(L.createGenreColorMapping(genres))), RUNS));
});
