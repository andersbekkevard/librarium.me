"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { SOCIAL_ACTIVITY } from "./book-data";

function SocialFeedCard() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="md:col-span-2 bg-card rounded-2xl border border-border p-6 md:p-8 card-hover overflow-hidden relative"
    >
      {/* Card label */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-sage/15 dark:bg-sage/20 flex items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-sage">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        </div>
        <span className="font-heading text-sm font-semibold text-muted-foreground uppercase tracking-wider">
          Social Feed
        </span>
      </div>

      <h3 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-2">
        See what your friends are reading
      </h3>
      <p className="text-muted-foreground text-base mb-6 max-w-md">
        A living feed of your reading circle. No algorithms, no ads &mdash; just books and the people who love them.
      </p>

      {/* Animated feed preview */}
      <div className="relative">
        <div className="space-y-3">
          {SOCIAL_ACTIVITY.map((item, i) => (
            <motion.div
              key={item.user}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
              className="flex items-center gap-3 p-3 rounded-xl bg-background/60 dark:bg-background/40 border border-border/50"
            >
              <div className="w-9 h-9 rounded-full bg-sage/20 dark:bg-sage/30 flex items-center justify-center text-xs font-bold text-sage flex-shrink-0">
                {item.avatar}
              </div>
              <div className="min-w-0">
                <p className="text-sm text-foreground truncate">
                  <span className="font-semibold">{item.user}</span>{" "}
                  <span className="text-muted-foreground">{item.action}</span>{" "}
                  <span className="font-medium text-foreground">{item.book}</span>
                </p>
              </div>
              <span className="ml-auto text-xs text-muted-foreground flex-shrink-0">
                {i < 2 ? "just now" : `${i * 3}m ago`}
              </span>
            </motion.div>
          ))}
        </div>
        {/* Fade overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-card to-transparent pointer-events-none" />
      </div>
    </motion.div>
  );
}

function ReadingStatsCard() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const bars = [
    { month: "Jan", value: 3 },
    { month: "Feb", value: 5 },
    { month: "Mar", value: 4 },
    { month: "Apr", value: 7 },
    { month: "May", value: 6 },
    { month: "Jun", value: 8 },
  ];
  const maxVal = Math.max(...bars.map((b) => b.value));

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
      className="bg-card rounded-2xl border border-border p-6 card-hover"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-amber/15 dark:bg-amber/20 flex items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-amber">
            <path d="M18 20V10M12 20V4M6 20v-6" />
          </svg>
        </div>
        <span className="font-heading text-sm font-semibold text-muted-foreground uppercase tracking-wider">
          Stats
        </span>
      </div>

      <h4 className="font-heading text-xl font-bold text-foreground mb-1">
        Reading streaks &amp; stats
      </h4>
      <p className="text-sm text-muted-foreground mb-5">
        Beautiful charts that make you want to read more.
      </p>

      {/* Mini bar chart */}
      <div className="flex items-end gap-2 h-28">
        {bars.map((bar, i) => (
          <div key={bar.month} className="flex-1 flex flex-col items-center gap-1">
            <motion.div
              initial={{ scaleY: 0 }}
              animate={inView ? { scaleY: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.08, ease: "easeOut" }}
              style={{
                height: `${(bar.value / maxVal) * 100}%`,
                transformOrigin: "bottom",
              }}
              className="w-full rounded-md bg-amber/70 dark:bg-amber/60"
            />
            <span className="text-[10px] text-muted-foreground">{bar.month}</span>
          </div>
        ))}
      </div>

      {/* Streak counter */}
      <div className="mt-4 flex items-center gap-2 px-3 py-2 rounded-lg bg-amber/10 dark:bg-amber/15">
        <span className="text-lg">🔥</span>
        <div>
          <motion.span
            className="font-heading text-lg font-bold text-foreground"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8 }}
          >
            23 day streak
          </motion.span>
          <p className="text-xs text-muted-foreground">Your longest yet!</p>
        </div>
      </div>
    </motion.div>
  );
}

function BarcodeScanCard() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
      className="bg-forest dark:bg-card rounded-2xl border border-border p-6 card-hover relative overflow-hidden"
    >
      {/* Decorative scan lines */}
      <div className="absolute inset-0 opacity-5">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute bg-white dark:bg-sage"
            style={{
              left: `${10 + i * 7}%`,
              top: "20%",
              bottom: "20%",
              width: i % 3 === 0 ? "3px" : "1.5px",
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-white/15 dark:bg-sage/20 flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white dark:text-sage">
              <path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2" />
              <line x1="7" y1="8" x2="7" y2="16" />
              <line x1="11" y1="8" x2="11" y2="16" />
              <line x1="15" y1="8" x2="15" y2="16" />
            </svg>
          </div>
          <span className="font-heading text-sm font-semibold text-white/70 dark:text-muted-foreground uppercase tracking-wider">
            Scan
          </span>
        </div>

        <h4 className="font-heading text-xl font-bold text-white dark:text-foreground mb-1">
          Scan to add
        </h4>
        <p className="text-sm text-white/60 dark:text-muted-foreground mb-4">
          Point your camera at any barcode. Book added in under a second.
        </p>

        {/* Animated scan line */}
        <div className="relative h-24 rounded-xl bg-black/20 dark:bg-background/30 border border-white/10 dark:border-border/50 overflow-hidden flex items-center justify-center">
          <motion.div
            initial={{ y: "-100%" }}
            animate={inView ? { y: "100%" } : {}}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: 0.5,
            }}
            className="absolute left-2 right-2 h-0.5 bg-amber/80 shadow-[0_0_8px_rgba(245,197,77,0.5)]"
          />
          <div className="text-white/30 dark:text-muted-foreground/30 text-xs font-mono">
            ISBN 978-0-14-028329-7
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function BentoSectionOne() {
  return (
    <section id="features" className="py-16 md:py-24">
      <div className="container mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-heading text-sm font-semibold text-sage uppercase tracking-wider"
          >
            Core Features
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-3"
          >
            Everything a reader needs
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          <SocialFeedCard />
          <ReadingStatsCard />
          <BarcodeScanCard />
        </div>
      </div>
    </section>
  );
}
