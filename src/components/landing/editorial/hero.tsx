"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function EditorialHero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 md:px-8 overflow-hidden">
      {/* Subtle background texture — editorial cross motif */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23244633' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Radial amber glow behind headline */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] md:w-[900px] md:h-[500px] bg-golden-amber/[0.06] dark:bg-golden-amber/[0.04] rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto text-center">
        {/* Eyebrow */}
        <motion.div
          className="flex items-center justify-center gap-3 mb-10 md:mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="h-px w-8 bg-golden-amber/60" />
          <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-brand-primary dark:text-brand-accent">
            A social reading tracker
          </span>
          <div className="h-px w-8 bg-golden-amber/60" />
        </motion.div>

        {/* Massive serif headline — the hero moment */}
        <motion.h1
          className="font-heading font-bold text-[4.5rem] sm:text-[6rem] md:text-[8rem] lg:text-[9.5rem] xl:text-[10.5rem] leading-[0.85] tracking-tighter text-foreground"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            delay: 0.4,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          Track your
        </motion.h1>

        {/* Decorative amber rule between lines */}
        <motion.div
          className="flex items-center justify-center gap-4 my-3 md:my-4"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="h-px flex-1 max-w-[120px] md:max-w-[200px] bg-gradient-to-r from-transparent to-golden-amber/50" />
          <div className="w-1.5 h-1.5 rounded-full bg-golden-amber" />
          <div className="h-px flex-1 max-w-[120px] md:max-w-[200px] bg-gradient-to-l from-transparent to-golden-amber/50" />
        </motion.div>

        <motion.h1
          className="font-heading font-bold text-[4.5rem] sm:text-[6rem] md:text-[8rem] lg:text-[9.5rem] xl:text-[10.5rem] leading-[0.85] tracking-tighter text-brand-primary dark:text-brand-accent italic"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            delay: 0.6,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          story.
        </motion.h1>

        {/* Subheadline — restrained against the massive headline */}
        <motion.p
          className="text-base md:text-lg text-muted-foreground max-w-md mx-auto mt-10 md:mt-14 mb-12 md:mb-16 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.0 }}
        >
          Where reading becomes a shared journey — track books, celebrate
          streaks, and discover what your friends are reading.
        </motion.p>

        {/* Single CTA — confident, not loud */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.3 }}
        >
          <Link
            href="#ch-feed"
            className="group inline-flex items-center gap-3 bg-brand-primary dark:bg-brand-accent text-white dark:text-[#0A0F0D] px-9 py-4.5 rounded-full text-base font-medium transition-all duration-300 hover:shadow-xl hover:shadow-brand-primary/15 dark:hover:shadow-brand-accent/15 hover:scale-[1.03] active:scale-[0.97]"
          >
            Start reading
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </motion.div>

        {/* Scroll indicator — editorial vertical line */}
        <motion.div
          className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.8 }}
        >
          <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-muted-foreground/50">
            Scroll
          </span>
          <motion.div
            className="w-px h-10 bg-golden-amber/30 origin-top"
            animate={{ scaleY: [0, 1, 0] }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}
