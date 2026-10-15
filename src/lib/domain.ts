import type { Book, BookComment, BookEvent, BookReview, ReadingState } from "./types";

export const STATE_LABEL: Record<ReadingState, string> = {
  not_started: "Not Started",
  in_progress: "Reading",
  finished: "Finished",
};

/** The reading state machine only moves forward: not_started → in_progress → finished. */
const NEXT: Record<ReadingState, ReadingState | undefined> = { not_started: "in_progress", in_progress: "finished", finished: undefined };
export const canTransition = (from: ReadingState, to: ReadingState) => NEXT[from] === to;

const between = (n: number, min: number, max: number) => n >= min && n <= max;
const isNumber = (n: unknown): n is number => typeof n === "number" && !Number.isNaN(n);

export const isValidProgress = ({ currentPage, totalPages }: Book["progress"]) =>
  !(totalPages < 0) && !(currentPage < 0 || currentPage > totalPages);
export const isValidRating = (r: unknown) => isNumber(r) && between(r, 1, 5);
export const isValidComment = (text: unknown) => typeof text === "string" && between(text.trim().length, 1, 2000);
export const isValidCommentPage = (page: unknown, totalPages: unknown) => isNumber(page) && isNumber(totalPages) && between(page, 0, totalPages);
export const isValidReview = (text: unknown) => typeof text === "string" && between(text.trim().length, 10, 5000);
export const isValidMessage = (text: unknown) => typeof text === "string" && between(text.trim().length, 10, 500);

/** First problem with a (partial) book payload, or null. `rating: null` means "clear the rating". */
export function bookProblem(b: Partial<Omit<Book, "rating">> & { rating?: number | null }): string | null {
  if (b.title !== undefined && !b.title.trim()) return "Book title cannot be empty";
  if (b.author !== undefined && !b.author.trim()) return "Book author cannot be empty";
  if (b.progress && !isValidProgress(b.progress)) return "Invalid progress data";
  if (b.rating != null && !isValidRating(b.rating)) return "Rating must be between 1 and 5";
  return null;
}

/** Field-level checks run by the edit form before a manual update. */
export function editProblems(b: Partial<Book>, now = new Date()): string[] {
  const errors: string[] = [];
  if (!b.title?.trim()) errors.push("Title is required and cannot be empty");
  if (!b.author?.trim()) errors.push("Author is required and cannot be empty");
  if (b.progress) {
    const { currentPage, totalPages } = b.progress;
    if (!isNumber(totalPages)) errors.push("Total pages must be a valid number");
    else if (totalPages < 0) errors.push("Total pages cannot be negative");
    if (!isNumber(currentPage)) errors.push("Current page must be a valid number");
    else if (currentPage < 0) errors.push("Current page cannot be negative");
    else if (totalPages && currentPage > totalPages) errors.push("Current page cannot exceed total pages");
  }
  if (b.rating !== undefined && b.rating !== null) {
    if (!isNumber(b.rating)) errors.push("Rating must be a valid number");
    else if (!between(b.rating, 1, 5)) errors.push("Rating must be between 1 and 5 stars");
    else if (!Number.isInteger(b.rating)) errors.push("Rating must be a whole number");
  }
  const isbn = b.isbn?.replace(/[-\s]/g, "");
  if (isbn) {
    const format = { 10: /^\d{9}[\dX]$/, 13: /^\d{13}$/ }[isbn.length];
    if (!format) errors.push("ISBN must be 10 or 13 digits long");
    else if (!format.test(isbn)) errors.push(`Invalid ISBN-${isbn.length} format`);
  }
  if (b.coverImage?.trim()) {
    if (!URL.canParse(b.coverImage)) errors.push("Invalid URL format");
    else if (!/\.(jpg|jpeg|png|gif|webp)$/i.test(b.coverImage) && !b.coverImage.includes("books.google.com"))
      errors.push("URL should point to an image file or be from a trusted source");
  }
  const date = b.publishedDate?.trim();
  if (date) {
    const [, y, m, d] = /^(\d{4})(?:-(\d{2})(?:-(\d{2}))?)?$/.exec(date) ?? [];
    const maxYear = now.getFullYear() + 1;
    if (!y || (m && !between(+m, 1, 12)) || (d && !between(+d, 1, 31))) errors.push("Date must be in format YYYY, YYYY-MM, or YYYY-MM-DD");
    else if (!between(+y, 1000, maxYear)) errors.push(`Year must be between 1000 and ${maxYear}`);
  }
  return errors;
}

export function progressPercent(book: Pick<Book, "state" | "progress">): number {
  if (book.state === "finished") return 100;
  const { currentPage, totalPages } = book.progress;
  if (book.state === "not_started" || !totalPages || !currentPage) return 0;
  return Math.round((currentPage / totalPages) * 100);
}

export interface LibraryQuery {
  search: string;
  status: string;
  ownership: string;
  genre: string;
  sort: string;
  direction: "asc" | "desc";
}

const matches = (book: Book, q: string) =>
  [book.title, book.author, book.genre, book.description].some((field) => field?.toLowerCase().includes(q));

const SORT_KEYS: Record<string, (b: Book) => string | number> = {
  title: (b) => b.title.toLowerCase(),
  author: (b) => b.author.toLowerCase(),
  pages: (b) => b.progress?.totalPages || 0,
  rating: (b) => b.rating || 0,
  progress: progressPercent,
  dateAdded: (b) => b.addedAt.seconds,
};

/** The library page: free-text search, status/ownership/genre filters and a sort. */
export function queryLibrary(books: Book[], { search, status, ownership, genre, sort, direction }: LibraryQuery): Book[] {
  const q = search.trim().toLowerCase();
  const key = SORT_KEYS[sort] ?? SORT_KEYS.dateAdded;
  const sign = direction === "asc" ? 1 : -1;
  return books
    .filter((b) => !q || matches(b, q))
    .filter((b) => !status || status === "all" || b.state === status)
    .filter((b) => !ownership || ownership === "all" || (ownership === "owned") === b.isOwned)
    .filter((b) => !genre || genre === "all" || b.genre?.toLowerCase() === genre.toLowerCase())
    .sort((a, b) => {
      const x = key(a), y = key(b);
      return x < y ? -sign : x > y ? sign : 0;
    });
}

/** Quick search (header): matches ranked exact title, exact author, title prefix, author prefix, then A–Z. */
export function searchLibrary(books: Book[], query: string, max = 10): Book[] {
  const q = query.toLowerCase();
  if (!query.trim()) return [];
  const rank = (b: Book) => {
    const t = b.title.toLowerCase(), a = b.author.toLowerCase();
    return [t === q, a === q, t.startsWith(q), a.startsWith(q)].map((hit) => (hit ? 0 : 1));
  };
  return books
    .filter((b) => matches(b, q))
    .sort((a, b) => {
      const ra = rank(a), rb = rank(b);
      const i = ra.findIndex((v, k) => v !== rb[k]);
      return i >= 0 ? ra[i] - rb[i] : a.title.toLowerCase().localeCompare(b.title.toLowerCase());
    })
    .slice(0, max);
}

export const genresOf = (books: Book[]) =>
  [...new Set(books.map((b) => b.genre?.trim()).filter((g): g is string => !!g))].sort((a, b) =>
    a.localeCompare(b, undefined, { sensitivity: "base" }),
  );

const newestFirst = <T extends { timestamp: { toMillis(): number } }>(a: T, b: T) => b.timestamp.toMillis() - a.timestamp.toMillis();

export const commentsFor = (events: BookEvent[], bookId: string): BookComment[] =>
  events
    .filter((e) => e.type === "comment" && e.bookId === bookId && e.data.comment)
    .map((e) => ({
      id: e.id,
      text: e.data.comment!,
      readingState: e.data.commentState || "not_started",
      currentPage: e.data.commentPage || 0,
      timestamp: e.timestamp,
    }))
    .sort(newestFirst);

/** The latest review event wins; updates append a new event that keeps the original creation time. */
export function reviewFor(events: BookEvent[], bookId: string): BookReview | null {
  const latest = events.filter((e) => e.type === "review" && e.bookId === bookId).sort(newestFirst)[0];
  if (!latest?.data.review) return null;
  return {
    id: latest.id,
    text: latest.data.review,
    createdAt: latest.data.reviewCreatedAt || latest.timestamp,
    updatedAt: latest.data.reviewUpdatedAt || latest.timestamp,
  };
}
