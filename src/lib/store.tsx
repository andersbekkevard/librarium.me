"use client";

import { GoogleAuthProvider, onAuthStateChanged, signInWithCredential, signInWithPopup, signOut as firebaseSignOut, type User } from "firebase/auth";
import { createContext, use, useEffect, useMemo, useState, type ReactNode } from "react";
import { auth } from "./firebase";
import { computeStats } from "./insights";
import * as library from "./library";
import type { Book, BookEvent, UserProfile } from "./types";

type Commands = typeof library;
type UidCommand = { [K in keyof Commands]: Commands[K] extends (uid: string, ...args: never[]) => unknown ? K : never }[keyof Commands];
/** Library commands with the signed-in reader's uid already applied. */
export type Actions = { [K in UidCommand]: Commands[K] extends (uid: string, ...args: infer A) => infer R ? (...args: A) => R : never };

const COMMANDS = [
  "addBook", "addScannedBook", "updateProgress", "changeState", "startReading", "rateBook", "editBook", "deleteBook",
  "addComment", "addReview", "updateReview", "dailyMessage",
] as const satisfies readonly UidCommand[];

interface LibraryState {
  user: User | null;
  /** Firebase has reported the initial auth state. */
  authReady: boolean;
  profile: UserProfile | null;
  books: Book[];
  events: BookEvent[];
  /** Books and history have arrived for the signed-in reader. */
  ready: boolean;
  error: string | null;
  actions: Actions;
}

const LibraryContext = createContext<LibraryState | null>(null);

export function LibraryProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [books, setBooks] = useState<Book[] | null>(null);
  const [events, setEvents] = useState<BookEvent[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => onAuthStateChanged(auth, (u) => (setUser(u), setAuthReady(true))), []);

  useEffect(() => {
    if (!user) return;
    const fail = (e: Error) => setError(e.message);
    library.ensureProfile(user).then(setProfile, fail);
    const stopBooks = library.watchBooks(user.uid, setBooks, fail);
    const stopEvents = library.watchEvents(user.uid, setEvents, fail);
    return () => {
      stopBooks();
      stopEvents();
      setProfile(null);
      setBooks(null);
      setEvents(null);
      setError(null);
    };
  }, [user]);

  const actions = useMemo(() => {
    const uid = user?.uid ?? "";
    return Object.fromEntries(COMMANDS.map((name) => [name, (...args: unknown[]) => (library[name] as (...a: unknown[]) => unknown)(uid, ...args)])) as Actions;
  }, [user]);

  const value = useMemo<LibraryState>(
    () => ({ user, authReady, profile, books: books ?? [], events: events ?? [], ready: !!books && !!events, error, actions }),
    [user, authReady, profile, books, events, error, actions],
  );
  return <LibraryContext value={value}>{children}</LibraryContext>;
}

export function useLibrary(): LibraryState {
  const ctx = use(LibraryContext);
  if (!ctx) throw new Error("useLibrary must be used inside <LibraryProvider>");
  return ctx;
}

export const useStats = () => {
  const { books, events } = useLibrary();
  return useMemo(() => computeStats(books, events), [books, events]);
};

export async function signIn() {
  const provider = new GoogleAuthProvider();
  provider.addScope("email");
  provider.addScope("profile");
  await signInWithPopup(auth, provider);
}

export const signOut = () => firebaseSignOut(auth);

// Emulator-only (compiled out of production builds): sign in as a Google user without the OAuth popup.
if (process.env.NEXT_PUBLIC_FIREBASE_EMULATORS === "true" && typeof window !== "undefined") {
  Object.assign(window, {
    __signInAsGoogleUser: (u: { uid: string; name: string; email: string; photo?: string }) =>
      signInWithCredential(auth, GoogleAuthProvider.credential(JSON.stringify({ sub: u.uid, name: u.name, email: u.email, picture: u.photo, email_verified: true }))),
  });
}

const AUTH_MESSAGES: Record<string, string> = {
  "auth/popup-blocked": "Popup was blocked by your browser. Please allow popups and try again.",
  "auth/popup-closed-by-user": "Sign-in was cancelled. Please try again.",
  "auth/cancelled-popup-request": "Sign-in was cancelled. Please try again.",
  "auth/network-request-failed": "Network error. Please check your connection and try again.",
  "auth/too-many-requests": "Too many failed attempts. Please try again later.",
};

export const authMessage = (e: unknown) => AUTH_MESSAGES[(e as { code?: string })?.code ?? ""] ?? "Authentication failed. Please try again.";
