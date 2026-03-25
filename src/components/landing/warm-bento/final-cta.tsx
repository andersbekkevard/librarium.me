"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { BOOK_COVERS } from "./book-data";
import { StylizedBookCover } from "./book-cover";

function MiniCarousel() {
  const books = BOOK_COVERS.slice(0, 10);
  const doubled = [...books, ...books];

  return (
    <div className="relative overflow-hidden mt-12">
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-forest dark:from-[#1A2E24] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-forest dark:from-[#1A2E24] to-transparent z-10 pointer-events-none" />
      <div
        className="animate-scroll-left flex gap-4"
        style={{
          width: "max-content",
          ["--scroll-duration" as string]: "28s",
        }}
      >
        {doubled.map((book, i) => (
          <div key={`cta-${book.id}-${i}`} className="opacity-60 hover:opacity-100 transition-opacity duration-300">
            <StylizedBookCover book={book} size="sm" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function FinalCTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} id="cta" className="py-20 md:py-32">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          className="relative bg-forest dark:bg-[#1A2E24] rounded-[2rem] overflow-hidden border border-forest dark:border-sage/10"
        >
          {/* Ambient decorative elements */}
          <div className="absolute top-[-60px] right-[-40px] w-[300px] h-[300px] rounded-full bg-sage/10 blur-[100px] pointer-events-none" />
          <div className="absolute bottom-[-40px] left-[-20px] w-[250px] h-[250px] rounded-full bg-amber/8 blur-[80px] pointer-events-none" />

          {/* Decorative dots pattern */}
          <div className="absolute inset-0 opacity-[0.03]">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <pattern id="cta-dots" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1" fill="white" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#cta-dots)" />
            </svg>
          </div>

          <div className="relative z-10 px-6 md:px-16 pt-14 md:pt-20 text-center">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
              className="font-accent text-3xl md:text-4xl text-amber/70 mb-5"
            >
              Your next great read is waiting
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
              className="font-heading text-[2rem] md:text-5xl lg:text-6xl font-extrabold text-white dark:text-cream leading-[1.1] tracking-tight"
            >
              Join thousands of readers
              <br />
              <span className="text-amber">building their reading life</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4 }}
              className="mt-6 text-white/60 text-lg md:text-xl max-w-xl mx-auto leading-relaxed"
            >
              Free to use, forever. No credit card required. Start tracking your first book in under 30 seconds.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
              className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-5"
            >
              <a
                href="#"
                className="group inline-flex items-center gap-3 px-10 py-4 rounded-full bg-amber text-amber-foreground font-heading font-bold text-[1.05rem] hover:shadow-xl hover:shadow-amber/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-lg shadow-amber/20"
              >
                Create your free account
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
              <span className="text-sm text-white/40">
                Takes less than a minute
              </span>
            </motion.div>

            <MiniCarousel />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
