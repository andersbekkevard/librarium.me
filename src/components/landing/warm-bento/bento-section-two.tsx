"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { BOOK_COVERS } from "./book-data";
import { StylizedBookCover } from "./book-cover";

function ChallengesCard() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const challenges = [
    { name: "2026 Reading Goal", progress: 67, current: 16, total: 24, emoji: "📚" },
    { name: "Classics Club", progress: 40, current: 2, total: 5, emoji: "🏛️" },
    { name: "Around the World", progress: 85, current: 17, total: 20, emoji: "🌍" },
  ];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-card rounded-2xl border border-border p-6 card-hover"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-amber/15 dark:bg-amber/20 flex items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-amber">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        </div>
        <span className="font-heading text-sm font-semibold text-muted-foreground uppercase tracking-wider">
          Challenges
        </span>
      </div>

      <h4 className="font-heading text-xl font-bold text-foreground mb-1">
        Reading challenges
      </h4>
      <p className="text-sm text-muted-foreground mb-5">
        Set goals, compete with friends, celebrate milestones.
      </p>

      <div className="space-y-3">
        {challenges.map((c, i) => (
          <motion.div
            key={c.name}
            initial={{ opacity: 0, x: -15 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 + i * 0.1 }}
            className="flex items-center gap-3"
          >
            <span className="text-lg flex-shrink-0">{c.emoji}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-foreground truncate">{c.name}</span>
                <span className="text-xs text-muted-foreground flex-shrink-0">{c.current}/{c.total}</span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${c.progress}%` } : {}}
                  transition={{ duration: 0.8, delay: 0.5 + i * 0.1, ease: "easeOut" }}
                  className="h-full rounded-full bg-amber"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function PersonalLibraryCard() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const libraryBooks = BOOK_COVERS.slice(0, 8);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
      className="md:col-span-2 bg-card rounded-2xl border border-border p-6 md:p-8 card-hover overflow-hidden relative"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-forest/10 dark:bg-sage/20 flex items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-forest dark:text-sage">
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
          </svg>
        </div>
        <span className="font-heading text-sm font-semibold text-muted-foreground uppercase tracking-wider">
          Your Library
        </span>
      </div>

      <h3 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-2">
        Your personal library, beautifully organized
      </h3>
      <p className="text-muted-foreground text-base mb-6 max-w-lg">
        Every book you&apos;ve read, are reading, or want to read &mdash; sorted into shelves that feel like home.
      </p>

      {/* Shelf tabs */}
      <div className="flex gap-2 mb-5">
        {["All books", "Reading", "Finished", "Want to read"].map((tab, i) => (
          <span
            key={tab}
            className={`px-3 py-1.5 rounded-full text-xs font-heading font-semibold transition-colors ${
              i === 0
                ? "bg-forest dark:bg-sage text-white dark:text-background"
                : "bg-muted text-muted-foreground hover:bg-secondary"
            }`}
          >
            {tab}
          </span>
        ))}
      </div>

      {/* Book grid */}
      <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-8 gap-3">
        {libraryBooks.map((book, i) => (
          <motion.div
            key={book.id}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 + i * 0.06 }}
          >
            <StylizedBookCover book={book} size="sm" />
          </motion.div>
        ))}
      </div>

      {/* Shelf line */}
      <div className="mt-3 h-1.5 rounded-full bg-border/60 dark:bg-border/40" />
    </motion.div>
  );
}

function RecommendationsCard() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const recs = [
    { title: "Piranesi", author: "Susanna Clarke", match: 94 },
    { title: "Sea of Tranquility", author: "Emily St. John Mandel", match: 89 },
    { title: "The Overstory", author: "Richard Powers", match: 86 },
  ];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
      className="bg-sage/10 dark:bg-sage/10 rounded-2xl border border-sage/20 dark:border-sage/15 p-6 card-hover"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-sage/20 dark:bg-sage/25 flex items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-sage">
            <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 1 1 7.072 0l-.548.547A3.374 3.374 0 0 0 14 18.469V19a2 2 0 1 1-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <span className="font-heading text-sm font-semibold text-muted-foreground uppercase tracking-wider">
          For You
        </span>
      </div>

      <h4 className="font-heading text-xl font-bold text-foreground mb-1">
        Smart recommendations
      </h4>
      <p className="text-sm text-muted-foreground mb-5">
        Books picked by readers with taste like yours.
      </p>

      <div className="space-y-3">
        {recs.map((rec, i) => (
          <motion.div
            key={rec.title}
            initial={{ opacity: 0, x: 15 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4 + i * 0.1 }}
            className="flex items-center gap-3 p-2.5 rounded-xl bg-card/80 dark:bg-card/60 border border-border/50"
          >
            <div className="w-8 h-11 rounded-sm bg-forest/20 dark:bg-sage/20 flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-foreground truncate">{rec.title}</p>
              <p className="text-xs text-muted-foreground">{rec.author}</p>
            </div>
            <span className="text-xs font-bold text-sage flex-shrink-0">{rec.match}%</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export function BentoSectionTwo() {
  return (
    <section className="py-16 md:py-24 bg-muted/40 dark:bg-muted/20">
      <div className="container mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-heading text-sm font-semibold text-sage uppercase tracking-wider"
          >
            Your Reading Life
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-3"
          >
            Built around the way you read
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          <ChallengesCard />
          <PersonalLibraryCard />
          <RecommendationsCard />
        </div>
      </div>
    </section>
  );
}
