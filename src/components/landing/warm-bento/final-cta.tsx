"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { BOOK_COVERS } from "./book-data";
import { StylizedBookCover } from "./book-cover";

function MiniCarousel() {
  const books = BOOK_COVERS.slice(0, 10);
  const doubled = [...books, ...books];

  return (
    <div className="relative overflow-hidden mt-10">
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-forest dark:from-card to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-forest dark:from-card to-transparent z-10 pointer-events-none" />
      <div
        className="animate-scroll-left flex gap-3"
        style={{
          width: "max-content",
          ["--scroll-duration" as string]: "30s",
        }}
      >
        {doubled.map((book, i) => (
          <StylizedBookCover key={`cta-${book.id}-${i}`} book={book} size="sm" />
        ))}
      </div>
    </div>
  );
}

export function FinalCTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} id="cta" className="py-16 md:py-24">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="relative bg-forest dark:bg-card rounded-3xl overflow-hidden border border-forest dark:border-border"
        >
          {/* Decorative ambient circles */}
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-sage/10 blur-[80px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-amber/10 blur-[60px] pointer-events-none" />

          <div className="relative z-10 px-6 md:px-12 pt-12 md:pt-16 text-center">
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2 }}
              className="font-accent text-2xl md:text-3xl text-amber/80 dark:text-amber/70 mb-4"
            >
              Your next great read is waiting
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="font-heading text-3xl md:text-5xl font-extrabold text-white dark:text-foreground leading-tight"
            >
              Join thousands of readers
              <br />
              <span className="text-amber">building their reading life</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4 }}
              className="mt-5 text-white/70 dark:text-muted-foreground text-lg max-w-lg mx-auto"
            >
              Free to use, forever. No credit card required. Start tracking your first book in under 30 seconds.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
              className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <a
                href="#"
                className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-amber text-amber-foreground font-heading font-bold text-base hover:brightness-110 active:scale-[0.98] transition-all shadow-lg shadow-amber/25"
              >
                Create your free account
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
              <span className="text-sm text-white/50 dark:text-muted-foreground">
                Takes less than a minute
              </span>
            </motion.div>

            {/* Mini book carousel */}
            <MiniCarousel />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
