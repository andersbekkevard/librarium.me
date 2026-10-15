import type { NewBook } from "./types";

export interface GoogleVolume {
  id: string;
  volumeInfo: {
    title: string;
    subtitle?: string;
    authors?: string[];
    publisher?: string;
    publishedDate?: string;
    description?: string;
    pageCount?: number;
    categories?: string[];
    averageRating?: number;
    ratingsCount?: number;
    industryIdentifiers?: { type: string; identifier: string }[];
    imageLinks?: Partial<Record<"smallThumbnail" | "thumbnail" | "small" | "medium" | "large" | "extraLarge", string>>;
    previewLink?: string;
    infoLink?: string;
  };
}

export type SearchType = "general" | "title" | "author" | "isbn";

/** Pulls a lookup-able ISBN out of a raw barcode (EAN-13, ISBN-10, UPC-A with a leading zero). */
export function extractISBN(barcode: string): string | null {
  if (typeof barcode !== "string") return null;
  const code = barcode.replace(/[^0-9X]/gi, "").toUpperCase();
  if (code.length === 10 || (code.length === 13 && /^(97[89]|\d{13}$)/.test(code))) return code;
  if (code.length === 12 && /^0\d{11}$/.test(code)) return code.substring(1);
  return null;
}

/** 978-prefixed ISBN-13s are looked up by their ISBN-10; 979 numbers have no ISBN-10 and are kept whole. */
export function lookupISBN(isbn: string): string {
  const code = isbn.replace(/[^0-9X]/gi, "").toUpperCase();
  if (code.length !== 13 || !code.startsWith("978")) return code;
  const core = code.substring(3, 12);
  const sum = [...core].reduce((acc, digit, i) => acc + Number(digit) * (10 - i), 0);
  const check = (11 - (sum % 11)) % 11;
  return core + (check === 10 ? "X" : String(check));
}

const QUERY: Record<SearchType, (q: string) => string> = {
  general: (q) => q,
  title: (q) => `intitle:"${q}"`,
  author: (q) => `inauthor:"${q}"`,
  isbn: (q) => `isbn:${lookupISBN(q)}`,
};

const HTTP_ERRORS: Record<number, string> = {
  400: "Invalid search query",
  403: "API key invalid or quota exceeded.",
  429: "Rate limit exceeded. Please try again later.",
};

/** Google Books volume search. Throws an Error whose message is fit to show the reader. */
export async function searchVolumes(query: string, type: SearchType = "general", maxResults = 20): Promise<GoogleVolume[]> {
  const key = process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY;
  if (!key) throw new Error("Book search is not configured (NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY is missing).");
  if (!query.trim()) return [];
  const params = new URLSearchParams({ q: QUERY[type](query).trim(), maxResults: String(Math.min(maxResults || 10, 40)), key });
  let response: Response;
  try {
    response = await fetch(`https://www.googleapis.com/books/v1/volumes?${params}`);
  } catch {
    throw new Error("Please check your connection and try again");
  }
  if (!response.ok) throw new Error(HTTP_ERRORS[response.status] ?? "Google Books API is temporarily unavailable. Please try again later.");
  return ((await response.json()).items as GoogleVolume[] | undefined) ?? [];
}

export function formatAuthors(authors?: string[]): string {
  if (!authors?.length) return "Unknown Author";
  return authors.length === 1 ? authors[0] : `${authors.slice(0, -1).join(", ")} and ${authors.at(-1)}`;
}

export const coverOf = ({ volumeInfo: { imageLinks: i } }: GoogleVolume) => i?.medium || i?.small || i?.thumbnail || i?.smallThumbnail;

export function isbnOf({ volumeInfo: { industryIdentifiers: ids } }: GoogleVolume) {
  return (ids?.find((x) => x.type === "ISBN_13") ?? ids?.find((x) => x.type === "ISBN_10"))?.identifier;
}

/** Google descriptions contain markup; the app only ever shows them as text. */
export const plainText = (html = "") => html.replace(/<br\s*\/?>|<\/p>/gi, "\n").replace(/<[^>]*>/g, "").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'").trim();

/** New books from Google start unread on the wishlist. */
export function volumeToBook(v: GoogleVolume): NewBook {
  const info = v.volumeInfo;
  const book: NewBook = {
    title: info.title,
    author: formatAuthors(info.authors),
    state: "not_started",
    progress: { currentPage: 0, totalPages: info.pageCount || 0 },
    genre: info.categories?.[0] || "",
    isOwned: false,
  };
  const isbn = isbnOf(v), cover = coverOf(v);
  if (isbn) book.isbn = isbn;
  if (cover) book.coverImage = cover;
  if (info.publishedDate) book.publishedDate = info.publishedDate;
  if (info.description) book.description = info.description;
  return book;
}

export interface ManualEntry {
  title: string;
  author: string;
  genre: string;
  pages: string;
  publishedYear: string;
  ownership: string;
  description: string;
}

export function manualToBook(f: ManualEntry): NewBook {
  const pages = parseInt(f.pages);
  const book: NewBook = {
    title: f.title.trim(),
    author: f.author.trim(),
    state: "not_started",
    progress: { currentPage: 0, totalPages: isNaN(pages) ? 0 : pages },
    isOwned: f.ownership === "owned",
  };
  if (f.genre?.trim()) book.genre = f.genre.trim();
  if (f.publishedYear?.trim()) book.publishedDate = `${f.publishedYear.trim()}-01-01`;
  if (f.description?.trim()) book.description = f.description.trim();
  return book;
}
