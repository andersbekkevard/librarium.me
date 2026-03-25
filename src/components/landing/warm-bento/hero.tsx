"use client";

import { motion } from "framer-motion";
import { BOOK_COVERS } from "./book-data";
import { StylizedBookCover } from "./book-cover";

function BookCarouselRow({
  books,
  direction = "left",
  speed = 35,
  tilt = 0,
}: {
  books: typeof BOOK_COVERS;
  direction?: "left" | "right";
  speed?: number;
  tilt?: number;
}) {
  const doubled = [...books, ...books];

  return (
    <div
      className="relative overflow-hidden"
      style={{ transform: tilt ? `rotate(${tilt}deg)` : undefined }}
    >
      {/* Wide fade edges for polish */}
      <div className="absolute left-0 top-0 bottom-0 w-32 md:w-48 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 md:w-48 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <div
        className={direction === "left" ? "animate-scroll-left" : "animate-scroll-right"}
        style={{
          display: "flex",
          gap: "1.25rem",
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
    <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 overflow-hidden">
      {/* Ambient background glows — bolder, wider */}
      <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[1000px] h-[700px] rounded-full bg-amber/12 dark:bg-amber/6 blur-[150px] pointer-events-none" />
      <div className="absolute top-20 right-[-100px] w-[500px] h-[500px] rounded-full bg-sage/15 dark:bg-sage/6 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-[-80px] w-[400px] h-[400px] rounded-full bg-amber/8 dark:bg-amber/4 blur-[100px] pointer-events-none" />

      {/* Decorative floating book icon — warm personality touch */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.07, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.6 }}
        className="absolute top-24 right-[15%] hidden lg:block pointer-events-none"
      >
        <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor" className="text-forest dark:text-sage">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </svg>
      </motion.div>

      <div className="container mx-auto text-center relative z-10">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        >
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-sage/12 dark:bg-sage/18 text-sage dark:text-sage text-sm font-medium font-heading border border-sage/15 dark:border-sage/20">
            <span className="w-2 h-2 rounded-full bg-sage animate-pulse" />
            Now in open beta
          </span>
        </motion.div>

        {/* Headline — pushed to 8xl with dramatic weight contrast */}
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
          className="mt-10 md:mt-12 font-heading text-[3.25rem] md:text-7xl lg:text-8xl font-extrabold tracking-[-0.035em] text-foreground leading-[1.05]"
        >
          Reading is better
          <br />
          <span className="relative inline-block text-amber dark:text-amber">
            together
            {/* Underline accent drawn with SVG */}
            <motion.svg
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              className="absolute -bottom-2 left-0 w-full h-4 pointer-events-none"
              viewBox="0 0 300 16"
              fill="none"
              preserveAspectRatio="none"
            >
              <motion.path
                d="M2 10 Q75 2, 150 10 T298 8"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
                opacity="0.4"
              />
            </motion.svg>
          </span>
        </motion.h1>

        {/* Subheadline — more breathing room */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
          className="mt-8 text-lg md:text-xl lg:text-[1.35rem] text-muted-foreground max-w-2xl mx-auto leading-relaxed"
        >
          Track your books, see what friends are reading, join challenges, and
          build the reading life you&apos;ve always wanted.
        </motion.p>

        {/* CTA — bigger, bolder */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-5"
        >
          <a
            href="#cta"
            className="group inline-flex items-center gap-3 px-9 py-4 rounded-full bg-amber text-amber-foreground font-heading font-bold text-[1.05rem] hover:shadow-xl hover:shadow-amber/25 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-lg shadow-amber/20"
          >
            Start tracking for free
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          <span className="text-sm text-muted-foreground">
            Free forever &middot; No credit card
          </span>
        </motion.div>

        {/* Handwritten accent — bigger, bolder rotation */}
        <motion.p
          initial={{ opacity: 0, rotate: -3, scale: 0.95 }}
          animate={{ opacity: 1, rotate: -2.5, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.55, ease: [0.23, 1, 0.32, 1] }}
          className="mt-10 font-accent text-3xl md:text-4xl text-sage/80 dark:text-sage/70 select-none"
        >
          &ldquo;like Strava, but for your bookshelf&rdquo;
        </motion.p>
      </div>

      {/* Book Carousel — more vertical space, slight tilt for drama */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.45, ease: [0.23, 1, 0.32, 1] }}
        className="mt-16 md:mt-20 space-y-5"
      >
        <BookCarouselRow books={topRow} direction="left" speed={42} tilt={-1} />
        <BookCarouselRow books={bottomRow} direction="right" speed={48} tilt={1} />
      </motion.div>
    </section>
  );
}
