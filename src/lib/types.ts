import type { Timestamp } from "firebase/firestore";

export const READING_STATES = ["not_started", "in_progress", "finished"] as const;
export type ReadingState = (typeof READING_STATES)[number];

/** users/{uid}/profile/main */
export interface UserProfile {
  id: string;
  displayName: string;
  email: string;
  photoURL?: string;
  emailVerified: boolean;
  lastSignInTime: string;
  /** Written as 0 at sign-up and never maintained; live counts come from `computeStats`. */
  totalBooksRead: number;
  currentlyReading: number;
  booksInLibrary: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

/** users/{uid}/books/{bookId} */
export interface Book {
  id: string;
  title: string;
  author: string;
  state: ReadingState;
  progress: { currentPage: number; totalPages: number };
  /** true = owned, false = wishlist */
  isOwned: boolean;
  rating?: number;
  isbn?: string;
  coverImage?: string;
  genre?: string;
  publishedDate?: string;
  description?: string;
  addedAt: Timestamp;
  updatedAt: Timestamp;
  startedAt?: Timestamp;
  finishedAt?: Timestamp;
}

export type NewBook = Omit<Book, "id" | "addedAt" | "updatedAt">;

export type EventType =
  | "state_change"
  | "progress_update"
  | "rating_added"
  | "comment"
  | "review"
  | "manual_update"
  | "delete_book";

/** users/{uid}/events/{eventId} — an append-only log of everything that happens to a book. */
export interface BookEvent {
  id: string;
  bookId: string;
  userId: string;
  type: EventType;
  timestamp: Timestamp;
  data: {
    previousState?: ReadingState;
    newState?: ReadingState;
    previousPage?: number;
    newPage?: number;
    rating?: number;
    comment?: string;
    commentState?: ReadingState;
    commentPage?: number;
    review?: string;
    reviewCreatedAt?: Timestamp;
    reviewUpdatedAt?: Timestamp;
    deletedBookTitle?: string;
    deletedBookAuthor?: string;
  };
}

/** users/{uid}/messages/{messageId} */
export interface PersonalizedMessage {
  id: string;
  userId: string;
  content: string;
  timestamp: Timestamp;
}

export interface BookComment {
  id: string;
  text: string;
  readingState: ReadingState;
  currentPage: number;
  timestamp: Timestamp;
}

export interface BookReview {
  id: string;
  text: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export type ActivityType = "finished" | "started" | "rated" | "added" | "progress" | "commented" | "manually_updated" | "deleted";

export interface Activity {
  id: string;
  type: ActivityType;
  bookId: string;
  bookTitle: string;
  details?: string;
  timestamp: Date;
}

export interface Stats {
  totalBooksRead: number;
  currentlyReading: number;
  booksInLibrary: number;
  totalPagesRead: number;
  averageRating: number;
  readingStreak: number;
  booksReadThisMonth: number;
  booksReadThisYear: number;
  favoriteGenres: string[];
}
