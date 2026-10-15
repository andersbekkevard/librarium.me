import { differenceInCalendarDays, eachMonthOfInterval, endOfMonth, format, startOfDay, subMonths } from "date-fns";
import type { Activity, Book, BookEvent, Stats } from "./types";

const pagesRead = (e: BookEvent) => Math.max(0, (e.data.newPage || 0) - (e.data.previousPage || 0));
const progressEvents = (events: BookEvent[]) => events.filter((e) => e.type === "progress_update");

/** Consecutive days (ending today or yesterday) on which at least one book was finished. */
export function readingStreak(finished: Book[], now = new Date()): number {
  const days = [...new Set(finished.filter((b) => b.finishedAt).map((b) => startOfDay(b.finishedAt!.toDate()).getTime()))].sort((a, b) => b - a);
  let streak = 0;
  let cursor = startOfDay(now);
  for (const day of days) {
    if (differenceInCalendarDays(cursor, day) > 1) break;
    streak++;
    cursor = new Date(day);
  }
  return streak;
}

export function favoriteGenres(books: Book[], top = 3): string[] {
  const counts = new Map<string, number>();
  for (const b of books) if (b.genre) counts.set(b.genre, (counts.get(b.genre) ?? 0) + 1);
  return [...counts].sort(([, a], [, b]) => b - a).slice(0, top).map(([g]) => g);
}

export function computeStats(books: Book[], events: BookEvent[], now = new Date()): Stats {
  const finished = books.filter((b) => b.state === "finished");
  const rated = finished.filter((b) => b.rating != null);
  const finishedIn = (sameMonth: boolean) =>
    finished.filter((b) => {
      const d = b.finishedAt?.toDate();
      return !!d && d.getFullYear() === now.getFullYear() && (!sameMonth || d.getMonth() === now.getMonth());
    }).length;
  return {
    totalBooksRead: finished.length,
    currentlyReading: books.filter((b) => b.state === "in_progress").length,
    booksInLibrary: books.length,
    totalPagesRead: progressEvents(events).reduce((sum, e) => sum + pagesRead(e), 0),
    averageRating: rated.length ? rated.reduce((sum, b) => sum + b.rating!, 0) / rated.length : 0,
    readingStreak: readingStreak(finished, now),
    booksReadThisMonth: finishedIn(true),
    booksReadThisYear: finishedIn(false),
    favoriteGenres: favoriteGenres(books),
  };
}

const truncate = (text: string, max = 50) => (text.length <= max ? text : `${text.substring(0, max).trim()}...`);

/** How one event reads in an activity feed; events for books no longer in the library are skipped. */
export function toActivity(e: BookEvent, book?: Pick<Book, "title">): Activity | null {
  if (!book) return null;
  const base = { id: e.id, bookId: e.bookId, bookTitle: book.title, timestamp: e.timestamp.toDate() };
  const { data } = e;
  switch (e.type) {
    case "state_change":
      return {
        ...base,
        type:
          data.newState === "finished" ? "finished" : data.newState === "not_started" && !data.previousState ? "added" : "started",
      };
    case "progress_update": {
      const delta = data.newPage ? data.newPage - (data.previousPage || 0) : 0;
      return { ...base, type: "progress", details: delta ? `${delta} pages` : undefined };
    }
    case "rating_added":
      return { ...base, type: "rated", details: data.rating ? `${data.rating} stars` : undefined };
    case "comment":
      return { ...base, type: "commented", details: data.comment ? truncate(data.comment) : undefined };
    case "manual_update":
      return { ...base, type: "manually_updated", details: data.comment ? truncate(data.comment) : undefined };
    case "delete_book":
      return { ...base, type: "deleted", bookTitle: data.deletedBookTitle || book.title, details: data.deletedBookAuthor ? `by ${data.deletedBookAuthor}` : undefined };
    default:
      return null;
  }
}

/** Dashboard feed: newest reading activity for books still in the library, minus audit noise. */
export function recentActivity(events: BookEvent[], books: Book[], limit: number): Activity[] {
  const byId = new Map(books.map((b) => [b.id, b]));
  return events
    .map((e) => toActivity(e, byId.get(e.bookId)))
    .filter((a): a is Activity => !!a && a.type !== "manually_updated" && a.type !== "deleted")
    .slice(0, limit);
}

export function timeAgo(date: Date, now = new Date()): string {
  const minutes = Math.floor((now.getTime() - date.getTime()) / 60_000);
  if (minutes < 60) return minutes <= 1 ? "just now" : `${minutes}m ago`;
  if (minutes < 60 * 24) return `${Math.floor(minutes / 60)}h ago`;
  const days = Math.floor(minutes / (60 * 24));
  return days < 7 ? `${days}d ago` : `${Math.floor(days / 7)}w ago`;
}

export type MonthPoint = { month: string; fullMonth: string; total: number } & Record<string, number | string>;

/** Pages read per genre for each of the last 12 months (stacked area chart). */
export function pagesByMonth(events: BookEvent[], books: Book[], now = new Date()): { data: MonthPoint[]; genres: string[] } {
  if (!events.length || !books.length) return { data: [], genres: [] };
  const genreOf = new Map(books.map((b) => [b.id, b.genre || "Unknown"]));
  const progress = progressEvents(events).map((e) => ({ at: e.timestamp.toDate(), genre: genreOf.get(e.bookId) ?? "Unknown", pages: pagesRead(e) }));
  const genres = [...new Set(progress.map((p) => p.genre))].sort();
  const data = eachMonthOfInterval({ start: subMonths(now, 11), end: now }).map((month) => {
    const point: MonthPoint = { month: format(month, "MMM"), fullMonth: format(month, "MMM yyyy"), total: 0 };
    for (const g of genres) point[g] = 0;
    for (const p of progress) {
      if (p.at < month || p.at > endOfMonth(month)) continue;
      point[p.genre] = (point[p.genre] as number) + p.pages;
      point.total += p.pages;
    }
    return point;
  });
  return { data, genres };
}

export function genreDistribution(books: Book[], top = 8) {
  const counts = new Map<string, number>();
  for (const b of books) counts.set(b.genre || "Unknown", (counts.get(b.genre || "Unknown") ?? 0) + 1);
  return [...counts]
    .map(([name, value]) => ({ name, value, percentage: Math.round((value / books.length) * 100) }))
    .sort((a, b) => b.value - a.value)
    .slice(0, top);
}

/** Average pages per day between the first and last progress update. */
export function dailyPace(events: BookEvent[]): number {
  const progress = progressEvents(events);
  if (progress.length < 2) return 0;
  const total = progress.reduce((sum, e) => sum + pagesRead(e), 0);
  const span = progress[0].timestamp.toMillis() - progress[progress.length - 1].timestamp.toMillis();
  return Math.round(total / Math.max(1, span / 86_400_000));
}

const PALETTE = ["#244633", "#789D72", "#5C82B5", "#526D5E", "#729D7E", "#576F63", "#8BA888", "#6B8FA3", "#3D5C4A", "#9DB49A", "#7A9BB0", "#4A6B5A"];

/** Stable colours per genre: alphabetical palette order, warm grey for "Unknown". */
export const genreColors = (genres: string[]) =>
  Object.fromEntries([...genres].sort().map((g, i) => [g, g === "Unknown" ? "#929291" : PALETTE[i % PALETTE.length]]));
