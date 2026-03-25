"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function EditorialHero() {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-6 md:px-8 overflow-hidden">
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23244633' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />

      <div className="relative max-w-4xl mx-auto text-center">
        {/* Eyebrow */}
        <motion.p
          className="font-mono text-xs tracking-[0.25em] uppercase text-brand-primary dark:text-brand-accent mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          A social reading tracker
        </motion.p>

        {/* Massive serif headline */}
        <motion.h1
          className="font-heading font-bold text-6xl sm:text-7xl md:text-8xl lg:text-[7rem] leading-[0.9] tracking-tight text-foreground mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        >
          Track your
          <br />
          <span className="text-brand-primary dark:text-brand-accent italic">story.</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          className="text-lg md:text-xl text-muted-foreground max-w-lg mx-auto mb-12 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
        >
          Where reading becomes a shared journey — track books, celebrate
          streaks, and discover what your friends are reading.
        </motion.p>

        {/* Single CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <Link
            href="#ch-feed"
            className="group inline-flex items-center gap-3 bg-brand-primary dark:bg-brand-accent text-white dark:text-[#0A0F0D] px-8 py-4 rounded-full text-base font-medium transition-all duration-300 hover:shadow-lg hover:shadow-brand-primary/20 dark:hover:shadow-brand-accent/20 hover:scale-[1.02] active:scale-[0.98]"
          >
            Start reading
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.5 }}
        >
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground/60">
            Scroll
          </span>
          <motion.div
            className="w-px h-8 bg-brand-primary/20 dark:bg-brand-accent/20 origin-top"
            animate={{ scaleY: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    </section>
  );
}
