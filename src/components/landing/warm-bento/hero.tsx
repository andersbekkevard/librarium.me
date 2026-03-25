"use client";

import { motion } from "framer-motion";
import { BOOK_COVERS } from "./book-data";
import { StylizedBookCover } from "./book-cover";

function BookCarouselRow({
  books,
  direction = "left",
  speed = 35,
}: {
  books: typeof BOOK_COVERS;
  direction?: "left" | "right";
  speed?: number;
}) {
  // Duplicate for seamless loop
  const doubled = [...books, ...books];

  return (
    <div className="relative overflow-hidden">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <div
        className={direction === "left" ? "animate-scroll-left" : "animate-scroll-right"}
        style={{
          display: "flex",
          gap: "1rem",
          width: "max-content",
          ["--scroll-duration" as string]: `${speed}s`,
        }}
      >
        {doubled.map((book, i) => (
          <StylizedBookCover key={`${book.id}-${i}`} book={book} size="lg" />
        ))}
      </div>
    </div>
  );
}

export function HeroSection() {
  const topRow = BOOK_COVERS.slice(0, 8);
  const bottomRow = BOOK_COVERS.slice(8, 16);

  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full bg-amber/8 dark:bg-amber/5 blur-[120px] pointer-events-none" />
      <div className="absolute top-40 right-0 w-[400px] h-[400px] rounded-full bg-sage/10 dark:bg-sage/5 blur-[100px] pointer-events-none" />

      <div className="container mx-auto text-center relative z-10">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sage/15 dark:bg-sage/20 text-sage dark:text-sage text-sm font-medium font-heading">
            <span className="w-1.5 h-1.5 rounded-full bg-sage animate-pulse" />
            Now in open beta
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-8 font-heading text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground leading-[1.08]"
        >
          Reading is better
          <br />
          <span className="text-amber dark:text-amber">together</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-lg md:text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed"
        >
          Track your books, see what friends are reading, join challenges, and
          build the reading life you&apos;ve always wanted.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#cta"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-amber text-amber-foreground font-heading font-bold text-base hover:brightness-105 active:scale-[0.98] transition-all shadow-lg shadow-amber/20"
          >
            Start tracking for free
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          <span className="text-sm text-muted-foreground">
            Free forever &middot; No credit card
          </span>
        </motion.div>

        {/* Handwritten accent */}
        <motion.p
          initial={{ opacity: 0, rotate: -2 }}
          animate={{ opacity: 1, rotate: -2 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-8 font-accent text-2xl md:text-3xl text-sage dark:text-sage"
        >
          &ldquo;like Strava, but for your bookshelf&rdquo;
        </motion.p>
      </div>

      {/* Book Carousel */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mt-14 space-y-4"
      >
        <BookCarouselRow books={topRow} direction="left" speed={45} />
        <BookCarouselRow books={bottomRow} direction="right" speed={50} />
      </motion.div>
    </section>
  );
}
