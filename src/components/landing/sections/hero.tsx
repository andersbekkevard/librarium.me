"use client";

import { useAuthContext } from "@/lib/providers/AuthProvider";
import { CircleNotchIcon } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const bookCovers = [
  { isbn: "9780451524935", title: "1984" },
  { isbn: "9780743273565", title: "The Great Gatsby" },
  { isbn: "9780061120084", title: "To Kill a Mockingbird" },
  { isbn: "9780141439518", title: "Pride and Prejudice" },
  { isbn: "9780547928227", title: "The Hobbit" },
  { isbn: "9780590353427", title: "Harry Potter" },
  { isbn: "9780062316097", title: "Sapiens" },
  { isbn: "9780399590504", title: "Educated" },
  { isbn: "9781984822178", title: "Normal People" },
  { isbn: "9780062315007", title: "The Alchemist" },
  { isbn: "9780735211292", title: "Atomic Habits" },
  { isbn: "9780593135204", title: "Project Hail Mary" },
  { isbn: "9780316556347", title: "Circe" },
  { isbn: "9780525559474", title: "The Midnight Library" },
];

const bookCoversRow2 = [
  { isbn: "9780593318171", title: "Klara and the Sun" },
  { isbn: "9780441172719", title: "Dune" },
  { isbn: "9780756404741", title: "The Name of the Wind" },
  { isbn: "9781635575569", title: "A Court of Thorns and Roses" },
  { isbn: "9780374529260", title: "Thinking, Fast and Slow" },
  { isbn: "9780385333481", title: "The Handmaid's Tale" },
  { isbn: "9780062457714", title: "The Subtle Art" },
  { isbn: "9780307474278", title: "The Kite Runner" },
  { isbn: "9780143127550", title: "The Goldfinch" },
  { isbn: "9780062316110", title: "Sapiens Illustrated" },
  { isbn: "9780679783268", title: "Crime and Punishment" },
  { isbn: "9780316769488", title: "The Catcher in the Rye" },
  { isbn: "9780142437230", title: "Don Quixote" },
  { isbn: "9780141187761", title: "Brave New World" },
];

function BookCoverRow({
  books,
  direction,
}: {
  books: typeof bookCovers;
  direction: "left" | "right";
}) {
  const doubled = [...books, ...books];
  return (
    <div className="overflow-hidden">
      <div
        className={`flex gap-4 ${direction === "left" ? "carousel-track-left" : "carousel-track-right"}`}
        style={{ width: "max-content" }}
      >
        {doubled.map((book, i) => (
          <div
            key={`${book.isbn}-${i}`}
            className="w-[120px] h-[180px] rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 shrink-0 bg-muted"
          >
            <img
              src={`https://covers.openlibrary.org/b/isbn/${book.isbn}-M.jpg`}
              alt={book.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export const HeroSection = () => {
  const [isSigningIn, setIsSigningIn] = useState(false);
  const router = useRouter();
  const { loading, isAuthenticated, signInWithGoogle } = useAuthContext();

  const handleGetStarted = async () => {
    if (isAuthenticated) {
      router.push("/dashboard");
      return;
    }
    setIsSigningIn(true);
    try {
      await signInWithGoogle();
      router.push("/dashboard");
    } catch (err) {
      console.error("Sign in failed:", err);
      setIsSigningIn(false);
    }
  };

  if (loading) {
    return (
      <section className="py-24 flex items-center justify-center">
        <CircleNotchIcon
          className="h-8 w-8 animate-spin text-[#244633]"
          weight="bold"
        />
      </section>
    );
  }

  return (
    <section className="pt-16 pb-8">
      <div className="max-w-[1100px] mx-auto px-6 text-center">
        <h1
          className="text-3xl sm:text-4xl md:text-[42px] font-bold leading-tight tracking-tight text-foreground mb-5"
          style={{ fontFamily: "var(--font-geist-sans)" }}
        >
          Discover, organise & discuss books
        </h1>

        <p className="text-lg text-muted-foreground max-w-[560px] mx-auto mb-8 leading-relaxed">
          Track what you&apos;re reading, follow friends and join clubs to
          collectively explore the ideas of the world&apos;s greatest authors.
        </p>

        <div className="flex items-center justify-center gap-3 mb-4">
          <button
            onClick={handleGetStarted}
            disabled={isSigningIn}
            className="text-sm font-medium text-white bg-[#244633] hover:bg-[#1a3426] px-6 py-2.5 rounded-lg transition-colors disabled:opacity-50"
          >
            {isSigningIn ? "Signing in..." : "Join for free"}
          </button>

          <div className="flex gap-2">
            <button className="flex items-center gap-1.5 text-xs text-muted-foreground border border-border rounded-lg px-3 py-2.5 hover:bg-muted/50 transition-colors">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              iPhone
            </button>
            <button className="flex items-center gap-1.5 text-xs text-muted-foreground border border-border rounded-lg px-3 py-2.5 hover:bg-muted/50 transition-colors">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3.18 23.76c.47.24 1.04.15 1.41-.15l9.15-5.27-2.85-2.85L3.18 23.76zm-.55-1.59V1.82L11.41 12 2.63 22.17zM20.16 10.65l-2.89-1.66-3.25 3.01 3.25 3.01 2.89-1.66c.84-.48.84-1.67 0-2.7zM4.97.39L13.88 8.5l2.85-2.85L5.59.38c-.37-.3-.94-.39-1.41-.15L4.97.39z" />
              </svg>
              Android
            </button>
          </div>
        </div>

        <p className="text-xs text-muted-foreground/60 mb-12">
          Also available on the web — no download required
        </p>
      </div>

      <div className="max-w-[1200px] mx-auto space-y-4 overflow-hidden">
        <BookCoverRow books={bookCovers} direction="left" />
        <BookCoverRow books={bookCoversRow2} direction="right" />
      </div>

      <div className="text-center mt-6">
        <p className="text-xs text-muted-foreground/50 italic">
          Psst... explore a book by clicking on it →
        </p>
      </div>
    </section>
  );
};
