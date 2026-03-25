"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { SOCIAL_ACTIVITY } from "./book-data";

function SocialFeedCard() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
      className="md:col-span-2 md:row-span-2 bg-card rounded-3xl border border-border p-7 md:p-10 card-hover overflow-hidden relative min-h-[420px]"
    >
      {/* Decorative corner flourish */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-sage/6 dark:bg-sage/4 rounded-bl-[80px] pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-center gap-2.5 mb-5">
          <div className="w-10 h-10 rounded-xl bg-sage/15 dark:bg-sage/20 flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-sage">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <span className="font-heading text-xs font-bold text-sage uppercase tracking-[0.15em]">
            Social Feed
          </span>
        </div>

        <h3 className="font-heading text-2xl md:text-[2rem] font-extrabold text-foreground mb-2 tracking-tight">
          See what your friends are reading
        </h3>
        <p className="text-muted-foreground text-[0.95rem] mb-8 max-w-md leading-relaxed">
          A living feed of your reading circle. No algorithms, no ads &mdash; just books and the people who love them.
        </p>

        {/* Animated feed preview */}
        <div className="relative">
          <div className="space-y-2.5">
            {SOCIAL_ACTIVITY.map((item, i) => (
              <motion.div
                key={item.user}
                initial={{ opacity: 0, x: -24 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.45, delay: 0.35 + i * 0.08, ease: [0.23, 1, 0.32, 1] }}
                className="flex items-center gap-3 p-3 rounded-2xl bg-background/70 dark:bg-background/40 border border-border/40 hover:border-sage/30 transition-colors duration-200"
              >
                <div className="w-10 h-10 rounded-full bg-sage/20 dark:bg-sage/30 flex items-center justify-center text-xs font-bold text-sage flex-shrink-0 ring-2 ring-sage/10">
                  {item.avatar}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-foreground truncate">
                    <span className="font-bold">{item.user}</span>{" "}
                    <span className="text-muted-foreground">{item.action}</span>{" "}
                    <span className="font-semibold text-foreground">{item.book}</span>
                  </p>
                </div>
                <span className="ml-auto text-[11px] text-muted-foreground/70 flex-shrink-0 tabular-nums">
                  {i < 2 ? "just now" : `${i * 3}m ago`}
                </span>
              </motion.div>
            ))}
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-card to-transparent pointer-events-none" />
        </div>
      </div>
    </motion.div>
  );
}

function ReadingStatsCard() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

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
      initial={{ opacity: 0, y: 35, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.65, delay: 0.12, ease: [0.23, 1, 0.32, 1] }}
      className="bg-amber/8 dark:bg-amber/6 rounded-3xl border border-amber/15 dark:border-amber/10 p-6 md:p-7 card-hover"
    >
      <div className="flex items-center gap-2.5 mb-5">
        <div className="w-10 h-10 rounded-xl bg-amber/20 dark:bg-amber/15 flex items-center justify-center">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-amber dark:text-amber">
            <path d="M18 20V10M12 20V4M6 20v-6" />
          </svg>
        </div>
        <span className="font-heading text-xs font-bold text-amber dark:text-amber uppercase tracking-[0.15em]">
          Stats
        </span>
      </div>

      <h4 className="font-heading text-xl font-extrabold text-foreground mb-1 tracking-tight">
        Reading streaks &amp; stats
      </h4>
      <p className="text-sm text-muted-foreground mb-6">
        Beautiful charts that make you want to read more.
      </p>

      {/* Mini bar chart — taller for drama */}
      <div className="flex items-end gap-2.5 h-32">
        {bars.map((bar, i) => (
          <div key={bar.month} className="flex-1 flex flex-col items-center gap-1.5">
            <motion.div
              initial={{ scaleY: 0 }}
              animate={inView ? { scaleY: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + i * 0.08, ease: [0.23, 1, 0.32, 1] }}
              style={{
                height: `${(bar.value / maxVal) * 100}%`,
                transformOrigin: "bottom",
              }}
              className="w-full rounded-lg bg-amber/80 dark:bg-amber/60"
            />
            <span className="text-[10px] font-medium text-muted-foreground">{bar.month}</span>
          </div>
        ))}
      </div>

      {/* Streak counter — bold callout */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 0.9, duration: 0.4 }}
        className="mt-5 flex items-center gap-3 px-4 py-3 rounded-2xl bg-amber/15 dark:bg-amber/10 border border-amber/20"
      >
        <span className="text-2xl">🔥</span>
        <div>
          <span className="font-heading text-xl font-extrabold text-foreground block leading-tight">
            23 day streak
          </span>
          <p className="text-xs text-muted-foreground">Your longest yet!</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

function BarcodeScanCard() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 35, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.65, delay: 0.22, ease: [0.23, 1, 0.32, 1] }}
      className="bg-forest dark:bg-[#1A2E24] rounded-3xl border border-forest/80 dark:border-sage/15 p-6 md:p-7 card-hover relative overflow-hidden"
    >
      {/* Decorative barcode pattern — bolder */}
      <div className="absolute inset-0 opacity-[0.06]">
        {Array.from({ length: 16 }).map((_, i) => (
          <div
            key={i}
            className="absolute bg-white"
            style={{
              left: `${8 + i * 5.5}%`,
              top: "15%",
              bottom: "15%",
              width: i % 3 === 0 ? "4px" : i % 2 === 0 ? "2px" : "1px",
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-2.5 mb-5">
          <div className="w-10 h-10 rounded-xl bg-white/12 flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/90">
              <path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2" />
              <line x1="7" y1="8" x2="7" y2="16" />
              <line x1="11" y1="8" x2="11" y2="16" />
              <line x1="15" y1="8" x2="15" y2="16" />
            </svg>
          </div>
          <span className="font-heading text-xs font-bold text-white/60 uppercase tracking-[0.15em]">
            Scan
          </span>
        </div>

        <h4 className="font-heading text-xl font-extrabold text-white mb-1 tracking-tight">
          Scan to add
        </h4>
        <p className="text-sm text-white/55 mb-5 leading-relaxed">
          Point your camera at any barcode. Book added in under a second.
        </p>

        {/* Animated scan viewport */}
        <div className="relative h-28 rounded-2xl bg-black/25 border border-white/8 overflow-hidden flex items-center justify-center">
          {/* Corner brackets */}
          <div className="absolute top-2 left-2 w-5 h-5 border-t-2 border-l-2 border-amber/60 rounded-tl-sm" />
          <div className="absolute top-2 right-2 w-5 h-5 border-t-2 border-r-2 border-amber/60 rounded-tr-sm" />
          <div className="absolute bottom-2 left-2 w-5 h-5 border-b-2 border-l-2 border-amber/60 rounded-bl-sm" />
          <div className="absolute bottom-2 right-2 w-5 h-5 border-b-2 border-r-2 border-amber/60 rounded-br-sm" />

          <motion.div
            initial={{ y: "-100%" }}
            animate={inView ? { y: "100%" } : {}}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: 0.5,
            }}
            className="absolute left-3 right-3 h-0.5 bg-amber shadow-[0_0_12px_rgba(245,197,77,0.6)]"
          />
          <div className="text-white/20 text-[11px] font-mono tracking-wider">
            ISBN 978-0-14-028329-7
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function BentoSectionOne() {
  return (
    <section id="features" className="py-20 md:py-32">
      <div className="container mx-auto">
        <div className="text-center mb-14 md:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-xs font-bold text-sage uppercase tracking-[0.2em]"
          >
            Core Features
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08, ease: [0.23, 1, 0.32, 1] }}
            className="font-heading text-3xl md:text-[2.75rem] lg:text-5xl font-extrabold text-foreground mt-4 tracking-tight"
          >
            Everything a reader needs
          </motion.h2>
        </div>

        {/* Asymmetric bento grid — large card takes 2 cols + 2 rows */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          <SocialFeedCard />
          <div className="flex flex-col gap-4 md:gap-5">
            <ReadingStatsCard />
            <BarcodeScanCard />
          </div>
        </div>
      </div>
    </section>
  );
}
