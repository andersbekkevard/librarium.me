/** Behaviour with no legacy twin: the approved deviations and the functions that were inline in legacy pages. */
import { Timestamp } from "firebase/firestore";
import { describe, expect, test } from "vitest";
import { buildPrompt, fallbackMessage } from "@/lib/ai";
import { lookupISBN, plainText } from "@/lib/books-api";
import { commentsFor, editProblems, queryLibrary, reviewFor } from "@/lib/domain";
import { dailyPace, genreDistribution, pagesByMonth, readingStreak, recentActivity, timeAgo } from "@/lib/insights";
import type { Book, BookEvent, UserProfile } from "@/lib/types";

const NOW = new Date(2026, 9, 15, 12);
const at = (y: number, m: number, d: number, h = 12) => Timestamp.fromDate(new Date(y, m - 1, d, h));
const book = (id: string, over: Partial<Book> = {}): Book => ({
  id, title: id, author: "A", state: "not_started", progress: { currentPage: 0, totalPages: 100 }, isOwned: true, addedAt: at(2026, 1, 1), updatedAt: at(2026, 1, 1), ...over,
});
const event = (id: string, type: BookEvent["type"], timestamp: Timestamp, data: BookEvent["data"] = {}, bookId = "b1"): BookEvent => ({ id, bookId, userId: "u", type, timestamp, data });

describe("ISBN lookup (D7)", () => {
  test("978 ISBNs are looked up by their ISBN-10", () => expect(lookupISBN("978-0-441-01359-3")).toBe("0441013597"));
  test("979 ISBNs have no ISBN-10 and are kept whole", () => expect(lookupISBN("9791032305690")).toBe("9791032305690"));
});

describe("reading streak counts days, not books (D4)", () => {
  const finished = (...days: Timestamp[]) => days.map((d, i) => book(`f${i}`, { state: "finished", finishedAt: d }));
  test("two books finished on the same day are one day", () => expect(readingStreak(finished(at(2026, 10, 15), at(2026, 10, 15, 18)), NOW)).toBe(1));
  test("consecutive days ending yesterday count", () => expect(readingStreak(finished(at(2026, 10, 14), at(2026, 10, 13), at(2026, 10, 11)), NOW)).toBe(2));
  test("a gap before yesterday ends the streak", () => expect(readingStreak(finished(at(2026, 10, 12)), NOW)).toBe(0));
  test("manual finishes without a date are ignored", () => expect(readingStreak([book("x", { state: "finished" })], NOW)).toBe(0));
});

test("the edit form names the full publication-year range", () => {
  expect(editProblems({ title: "T", author: "A", publishedDate: "2999" }, NOW)).toEqual(["Year must be between 1000 and 2027"]);
});

test("library search trims what the reader typed (D12)", () => {
  const books = [book("The Name of the Rose")];
  expect(queryLibrary(books, { search: "  rose ", status: "all", ownership: "all", genre: "all", sort: "title", direction: "asc" })).toHaveLength(1);
});

describe("dashboard activity (D9)", () => {
  const books = [book("b1", { title: "Dune" })];
  const events = [
    event("e1", "manual_update", at(2026, 10, 15, 11), { comment: "Manual update: title" }),
    event("e2", "delete_book", at(2026, 10, 15, 10), { deletedBookTitle: "Gone" }, "gone"),
    event("e3", "progress_update", at(2026, 10, 15, 9), { previousPage: 10, newPage: 30 }),
    event("e4", "rating_added", at(2026, 10, 14), { rating: 1 }),
    event("e5", "review", at(2026, 10, 13), { review: "Great" }),
    event("e6", "state_change", at(2026, 10, 12), { previousState: "not_started", newState: "in_progress" }),
  ];
  test("skips audit noise, deleted books and reviews, then applies the limit", () =>
    expect(recentActivity(events, books, 2).map((a) => [a.type, a.details])).toEqual([["progress", "20 pages"], ["rated", "1 stars"]]));
  test("looks past filtered events instead of returning fewer items", () => expect(recentActivity(events, books, 7)).toHaveLength(3));
});

describe("statistics page", () => {
  const books = [book("b1", { genre: "Fiction" }), book("b2", { genre: "" })];
  const events = [
    event("p1", "progress_update", at(2026, 9, 30, 22), { previousPage: 0, newPage: 40 }),
    event("p2", "progress_update", at(2026, 10, 2), { previousPage: 0, newPage: 10 }, "b2"),
    event("p3", "progress_update", at(2026, 10, 3), { previousPage: 10, newPage: 5 }, "b2"),
    event("p4", "progress_update", at(2025, 5, 1), { previousPage: 0, newPage: 999 }, "deleted"),
  ];
  test("pages per month by genre, counting the whole last day of the month (D10)", () => {
    const { data, genres } = pagesByMonth(events, books, NOW);
    expect(data).toHaveLength(12);
    expect(genres).toEqual(["Fiction", "Unknown"]);
    expect(data.at(-2)).toMatchObject({ month: "Sep", fullMonth: "Sep 2026", total: 40, Fiction: 40, Unknown: 0 });
    expect(data.at(-1)).toMatchObject({ month: "Oct", total: 10, Unknown: 10 });
  });
  test("nothing to chart without history", () => expect(pagesByMonth([], books, NOW)).toEqual({ data: [], genres: [] }));
  test("daily pace spans first to last update", () => {
    const newestFirst = [...events].sort((a, b) => b.timestamp.toMillis() - a.timestamp.toMillis());
    const days = (newestFirst[0].timestamp.toMillis() - newestFirst.at(-1)!.timestamp.toMillis()) / 86_400_000;
    expect(dailyPace(newestFirst)).toBe(Math.round(1049 / days));
    expect(dailyPace(newestFirst.slice(0, 1))).toBe(0);
  });
  test("genre distribution groups blanks as Unknown", () =>
    expect(genreDistribution(books)).toEqual([{ name: "Fiction", value: 1, percentage: 50 }, { name: "Unknown", value: 1, percentage: 50 }]));
});

test("relative times", () => {
  const ago = (ms: number) => timeAgo(new Date(NOW.getTime() - ms), NOW);
  expect([ago(30_000), ago(5 * 60_000), ago(3 * 3_600_000), ago(2 * 86_400_000), ago(15 * 86_400_000)]).toEqual(["just now", "5m ago", "3h ago", "2d ago", "2w ago"]);
});

test("Google descriptions are shown as plain text", () => {
  expect(plainText("<p>Set on <b>Arrakis</b>.<br>Tom &amp; Jerry</p><script>alert(1)</script>")).toBe("Set on Arrakis.\nTom & Jerry\nalert(1)");
});

describe("comments and reviews come from the event log", () => {
  const events = [
    event("c1", "comment", at(2026, 10, 1), { comment: "first", commentState: "in_progress", commentPage: 10 }),
    event("c2", "comment", at(2026, 10, 2), { comment: "second" }),
    event("c3", "comment", at(2026, 10, 3), { comment: "other book" }, "b2"),
    event("r1", "review", at(2026, 10, 4), { review: "Good", reviewCreatedAt: at(2026, 10, 4), reviewUpdatedAt: at(2026, 10, 4) }),
    event("r2", "review", at(2026, 10, 5), { review: "Better", reviewCreatedAt: at(2026, 10, 4), reviewUpdatedAt: at(2026, 10, 5) }),
  ];
  test("comments are newest first with defaults for missing context", () =>
    expect(commentsFor(events, "b1").map((c) => [c.text, c.readingState, c.currentPage])).toEqual([["second", "not_started", 0], ["first", "in_progress", 10]]));
  test("the latest review wins and keeps its creation time", () => {
    const review = reviewFor(events, "b1")!;
    expect([review.text, review.createdAt.isEqual(at(2026, 10, 4)), review.updatedAt.isEqual(at(2026, 10, 5))]).toEqual(["Better", true, true]);
    expect(reviewFor(events, "b2")).toBeNull();
  });
});

describe("companion message", () => {
  const stats = { totalBooks: 3, finishedBooks: 0, currentlyReading: 0, readingStreak: 0, totalPagesRead: 0 };
  test("fallbacks prefer streaks, then current reading, then finished books", () => {
    expect(fallbackMessage({ ...stats, readingStreak: 9 })).toMatch(/^Amazing 9-day reading streak/);
    expect(fallbackMessage({ ...stats, currentlyReading: 1 })).toMatch(/^You're currently reading 1 book!/);
    expect(fallbackMessage({ ...stats, finishedBooks: 2 })).toMatch(/^Congratulations on finishing 2 books!/);
  });
  const profile = (created: Timestamp) => ({ displayName: "Ada", createdAt: created }) as UserProfile;
  test("new readers get a welcome prompt", () => expect(buildPrompt({ profile: profile(at(2026, 10, 15)), books: [], activity: [], stats }, NOW)).toMatch(/first-time welcome message for Ada/));
  test("the personal prompt never prints NaN for books without a page count", () => {
    const prompt = buildPrompt({ profile: profile(at(2026, 1, 1)), books: [book("b", { title: "Zine", state: "in_progress", progress: { currentPage: 3, totalPages: 0 } })], activity: [], stats }, NOW);
    expect(prompt).toContain('"Zine" by A (0% complete)');
    expect(prompt).not.toMatch(/NaN|Infinity/);
  });
});
