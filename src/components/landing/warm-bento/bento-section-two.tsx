"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { BOOK_COVERS } from "./book-data";
import { StylizedBookCover } from "./book-cover";

function ChallengesCard() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const challenges = [
    { name: "2026 Reading Goal", progress: 67, current: 16, total: 24, emoji: "📚" },
    { name: "Classics Club", progress: 40, current: 2, total: 5, emoji: "🏛️" },
    { name: "Around the World", progress: 85, current: 17, total: 20, emoji: "🌍" },
  ];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
      className="bg-card rounded-3xl border border-border p-6 md:p-7 card-hover"
    >
      <div className="flex items-center gap-2.5 mb-5">
        <div className="w-10 h-10 rounded-xl bg-amber/15 dark:bg-amber/12 flex items-center justify-center">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-amber">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        </div>
        <span className="font-heading text-xs font-bold text-amber uppercase tracking-[0.15em]">
          Challenges
        </span>
      </div>

      <h4 className="font-heading text-xl font-extrabold text-foreground mb-1 tracking-tight">
        Reading challenges
      </h4>
      <p className="text-sm text-muted-foreground mb-6">
        Set goals, compete with friends, celebrate milestones.
      </p>

      <div className="space-y-4">
        {challenges.map((c, i) => (
          <motion.div
            key={c.name}
            initial={{ opacity: 0, x: -18 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 + i * 0.1, ease: [0.23, 1, 0.32, 1] }}
            className="flex items-center gap-3"
          >
            <span className="text-xl flex-shrink-0">{c.emoji}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm font-semibold text-foreground truncate">{c.name}</span>
                <span className="text-xs font-bold text-muted-foreground flex-shrink-0 tabular-nums">{c.current}/{c.total}</span>
              </div>
              <div className="h-2.5 rounded-full bg-muted overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${c.progress}%` } : {}}
                  transition={{ duration: 0.9, delay: 0.5 + i * 0.12, ease: [0.23, 1, 0.32, 1] }}
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
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const libraryBooks = BOOK_COVERS.slice(0, 8);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.7, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
      className="md:col-span-2 md:row-span-2 bg-card rounded-3xl border border-border p-7 md:p-10 card-hover overflow-hidden relative min-h-[420px]"
    >
      {/* Decorative shelf lines — warm library feel */}
      <div className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none opacity-[0.03]">
        <div className="absolute bottom-16 left-0 right-0 h-[3px] bg-foreground" />
        <div className="absolute bottom-32 left-0 right-0 h-[3px] bg-foreground" />
        <div className="absolute bottom-48 left-0 right-0 h-[3px] bg-foreground" />
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-2.5 mb-5">
          <div className="w-10 h-10 rounded-xl bg-forest/10 dark:bg-sage/15 flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-forest dark:text-sage">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
            </svg>
          </div>
          <span className="font-heading text-xs font-bold text-forest dark:text-sage uppercase tracking-[0.15em]">
            Your Library
          </span>
        </div>

        <h3 className="font-heading text-2xl md:text-[2rem] font-extrabold text-foreground mb-2 tracking-tight">
          Your personal library, beautifully organized
        </h3>
        <p className="text-muted-foreground text-[0.95rem] mb-8 max-w-lg leading-relaxed">
          Every book you&apos;ve read, are reading, or want to read &mdash; sorted into shelves that feel like home.
        </p>

        {/* Shelf tabs — bolder active state */}
        <div className="flex flex-wrap gap-2 mb-6">
          {["All books", "Reading", "Finished", "Want to read"].map((tab, i) => (
            <span
              key={tab}
              className={`px-4 py-2 rounded-full text-xs font-heading font-bold transition-colors ${
                i === 0
                  ? "bg-forest dark:bg-sage text-white dark:text-background shadow-sm"
                  : "bg-muted text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              {tab}
            </span>
          ))}
        </div>

        {/* Book grid */}
        <div className="grid grid-cols-4 md:grid-cols-8 gap-3 md:gap-4">
          {libraryBooks.map((book, i) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.35 + i * 0.06, ease: [0.23, 1, 0.32, 1] }}
            >
              <StylizedBookCover book={book} size="sm" />
            </motion.div>
          ))}
        </div>

        {/* Shelf line — wooden shelf accent */}
        <div className="mt-4 h-2 rounded-full bg-border/50 dark:bg-border/30 shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)]" />
        <div className="mt-0.5 h-0.5 rounded-full bg-border/30 dark:bg-border/20" />
      </div>
    </motion.div>
  );
}

function RecommendationsCard() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const recs = [
    { title: "Piranesi", author: "Susanna Clarke", match: 94 },
    { title: "Sea of Tranquility", author: "Emily St. John Mandel", match: 89 },
    { title: "The Overstory", author: "Richard Powers", match: 86 },
  ];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 35, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.65, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
      className="bg-sage/8 dark:bg-sage/8 rounded-3xl border border-sage/15 dark:border-sage/12 p-6 md:p-7 card-hover relative overflow-hidden"
    >
      {/* Decorative lightbulb glow */}
      <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-sage/10 dark:bg-sage/6 blur-2xl pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-center gap-2.5 mb-5">
          <div className="w-10 h-10 rounded-xl bg-sage/20 dark:bg-sage/15 flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-sage">
              <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 1 1 7.072 0l-.548.547A3.374 3.374 0 0 0 14 18.469V19a2 2 0 1 1-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <span className="font-heading text-xs font-bold text-sage uppercase tracking-[0.15em]">
            For You
          </span>
        </div>

        <h4 className="font-heading text-xl font-extrabold text-foreground mb-1 tracking-tight">
          Smart recommendations
        </h4>
        <p className="text-sm text-muted-foreground mb-6">
          Books picked by readers with taste like yours.
        </p>

        <div className="space-y-2.5">
          {recs.map((rec, i) => (
            <motion.div
              key={rec.title}
              initial={{ opacity: 0, x: 18 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4 + i * 0.1, ease: [0.23, 1, 0.32, 1] }}
              className="flex items-center gap-3 p-3 rounded-2xl bg-card/80 dark:bg-card/50 border border-border/40 hover:border-sage/30 transition-colors duration-200"
            >
              <div className="w-9 h-12 rounded-sm bg-forest/15 dark:bg-sage/15 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-foreground truncate">{rec.title}</p>
                <p className="text-xs text-muted-foreground">{rec.author}</p>
              </div>
              <span className="text-xs font-extrabold text-sage flex-shrink-0 bg-sage/10 px-2 py-0.5 rounded-full">{rec.match}%</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function BentoSectionTwo() {
  return (
    <section className="py-20 md:py-32 bg-muted/50 dark:bg-muted/20 relative">
      {/* Decorative divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-1 rounded-full bg-amber/40" />

      <div className="container mx-auto">
        <div className="text-center mb-14 md:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-xs font-bold text-sage uppercase tracking-[0.2em]"
          >
            Your Reading Life
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08, ease: [0.23, 1, 0.32, 1] }}
            className="font-heading text-3xl md:text-[2.75rem] lg:text-5xl font-extrabold text-foreground mt-4 tracking-tight"
          >
            Built around the way you read
          </motion.h2>
        </div>

        {/* Asymmetric layout — reversed from section one */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          <div className="flex flex-col gap-4 md:gap-5">
            <ChallengesCard />
            <RecommendationsCard />
          </div>
          <PersonalLibraryCard />
        </div>
      </div>
    </section>
  );
}
