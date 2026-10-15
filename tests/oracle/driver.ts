/**
 * The contract both implementations are driven through. Each method is one user-visible action,
 * performed exactly the way that implementation's UI performs it.
 */
export type ReadingState = "not_started" | "in_progress" | "finished";

export interface ManualForm {
  title: string;
  author: string;
  genre: string;
  pages: string;
  publishedYear: string;
  ownership: string;
  description: string;
}

export interface PlainBook {
  title: string;
  author: string;
  state: ReadingState;
  progress: { currentPage: number; totalPages: number };
  isOwned: boolean;
  [field: string]: unknown;
}

export interface ScanMeta {
  scanMethod: "camera" | "upload";
  isbn: string;
  durationSec: number;
}

export interface LibraryQuery {
  search: string;
  status: string;
  ownership: string;
  genre: string;
  sort: string;
  direction: "asc" | "desc";
}

export interface Derived {
  stats: Record<string, unknown>;
  activity: { type: string; bookTitle: string; bookId: string; details?: string; timestamp: number }[];
  comments: Record<string, { text: string; readingState: string; currentPage: number; timestamp: number }[]>;
  reviews: Record<string, { text: string; createdAt: number; updatedAt: number } | null>;
  views: Record<string, string[]>;
  search: Record<string, string[]>;
}

export interface Driver {
  readonly name: "legacy" | "modern";
  signIn(): Promise<void>;
  addBook(book: PlainBook): Promise<string>;
  addGoogleBook(volume: unknown): Promise<string>;
  addManualBook(form: ManualForm): Promise<string>;
  addScannedBook(volume: unknown, meta: ScanMeta): Promise<string>;
  startReading(id: string): Promise<void>;
  finish(id: string): Promise<void>;
  updateProgress(id: string, page: number): Promise<void>;
  changeState(id: string, state: ReadingState): Promise<void>;
  rate(id: string, rating: number): Promise<void>;
  edit(id: string, updates: Record<string, unknown>): Promise<void>;
  deleteBook(id: string): Promise<void>;
  comment(id: string, text: string): Promise<void>;
  addReview(id: string, text: string): Promise<void>;
  updateReview(id: string, text: string): Promise<void>;
  dailyMessage(force?: boolean): Promise<string>;
  derive(queries: Record<string, LibraryQuery>, searches: string[]): Promise<Derived>;
}

export const LIBRARY_QUERIES: Record<string, LibraryQuery> = {
  default: { search: "", status: "all", ownership: "all", genre: "all", sort: "title", direction: "asc" },
  authorDesc: { search: "", status: "all", ownership: "all", genre: "all", sort: "author", direction: "desc" },
  pages: { search: "", status: "all", ownership: "all", genre: "all", sort: "pages", direction: "asc" },
  ratingDesc: { search: "", status: "all", ownership: "all", genre: "all", sort: "rating", direction: "desc" },
  progress: { search: "", status: "all", ownership: "all", genre: "all", sort: "progress", direction: "asc" },
  newest: { search: "", status: "all", ownership: "all", genre: "all", sort: "dateAdded", direction: "desc" },
  reading: { search: "", status: "in_progress", ownership: "all", genre: "all", sort: "title", direction: "asc" },
  finished: { search: "", status: "finished", ownership: "all", genre: "all", sort: "title", direction: "asc" },
  owned: { search: "", status: "all", ownership: "owned", genre: "all", sort: "title", direction: "asc" },
  wishlist: { search: "", status: "all", ownership: "wishlist", genre: "all", sort: "title", direction: "asc" },
  fiction: { search: "", status: "all", ownership: "all", genre: "fiction", sort: "title", direction: "asc" },
  searchThe: { search: "the", status: "all", ownership: "all", genre: "all", sort: "title", direction: "asc" },
};

export const SEARCHES = ["dune", "pratchett", "fermat", "o", "mathematics", "zzz"];
