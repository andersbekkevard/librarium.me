"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ScrollReveal, StaggerContainer, StaggerChild } from "./scroll-reveal";

function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.span
      ref={ref}
      className="tabular-nums"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
    >
      {isInView ? (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {value}{suffix}
        </motion.span>
      ) : (
        "0"
      )}
    </motion.span>
  );
}

function StreakCard() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      className="bg-white dark:bg-[rgba(255,255,255,0.04)] rounded-xl p-6 border border-[rgba(36,70,51,0.08)] dark:border-[rgba(120,157,114,0.08)]"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="flex items-center justify-between mb-4">
        <span className="font-mono text-xs tracking-wider uppercase text-muted-foreground">
          Reading streak
        </span>
        <motion.span
          className="text-2xl"
          animate={isInView ? { scale: [1, 1.3, 1] } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          🔥
        </motion.span>
      </div>

      <p className="font-heading text-5xl font-bold text-foreground mb-1">
        <AnimatedCounter value={23} />
      </p>
      <p className="text-sm text-muted-foreground">consecutive days</p>

      {/* Week grid */}
      <div className="flex gap-1.5 mt-5">
        {["M", "T", "W", "T", "F", "S", "S"].map((day, i) => (
          <div key={`${day}-${i}`} className="flex-1 text-center">
            <span className="text-[10px] font-mono text-muted-foreground block mb-1.5">
              {day}
            </span>
            <motion.div
              className={`w-full aspect-square rounded-md ${
                i < 6
                  ? "bg-brand-primary dark:bg-brand-accent"
                  : "bg-brand-primary/15 dark:bg-brand-accent/15 border border-dashed border-brand-primary/30 dark:border-brand-accent/30"
              }`}
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : { scale: 0 }}
              transition={{ duration: 0.3, delay: 0.3 + i * 0.06 }}
            />
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function GoalCard() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const progress = 72; // 36/50

  return (
    <motion.div
      ref={ref}
      className="bg-white dark:bg-[rgba(255,255,255,0.04)] rounded-xl p-6 border border-[rgba(36,70,51,0.08)] dark:border-[rgba(120,157,114,0.08)]"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="flex items-center justify-between mb-4">
        <span className="font-mono text-xs tracking-wider uppercase text-muted-foreground">
          2025 Reading Goal
        </span>
        <span className="text-xs font-mono text-golden-amber font-medium">
          On track
        </span>
      </div>

      <div className="flex items-baseline gap-1 mb-6">
        <span className="font-heading text-5xl font-bold text-foreground">
          <AnimatedCounter value={36} />
        </span>
        <span className="text-lg text-muted-foreground">/ 50 books</span>
      </div>

      {/* Progress bar */}
      <div className="h-2.5 rounded-full bg-brand-primary/10 dark:bg-brand-accent/10 overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-brand-primary to-brand-accent dark:from-brand-accent dark:to-golden-amber"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${progress}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        />
      </div>

      <p className="text-xs text-muted-foreground mt-3">
        14 books to go · On pace to finish by November
      </p>
    </motion.div>
  );
}

const challenges = [
  {
    title: "Summer Reading Sprint",
    participants: 1248,
    duration: "Jun 1 – Aug 31",
    icon: "☀️",
    status: "Active",
  },
  {
    title: "Classics Challenge",
    participants: 892,
    duration: "All year",
    icon: "📜",
    status: "Joined",
  },
  {
    title: "Around the World in 12 Books",
    participants: 2103,
    duration: "All year",
    icon: "🌍",
    status: "Open",
  },
];

export function ChapterChallenges() {
  return (
    <section className="py-20 md:py-32 px-6 md:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="max-w-2xl mb-16">
          <ScrollReveal>
            <h2 className="font-heading font-bold text-4xl md:text-5xl leading-tight tracking-tight text-foreground mb-6">
              Fuel the habit.
              <br />
              <span className="text-golden-amber">Earn the streak.</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Set goals, build streaks, and join community challenges that turn
              reading from a habit into an identity. Like Strava, but for the
              pages you turn.
            </p>
          </ScrollReveal>
        </div>

        {/* Streak + Goal cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <StreakCard />
          <GoalCard />
        </div>

        {/* Community challenges */}
        <ScrollReveal delay={0.3}>
          <p className="font-mono text-xs tracking-[0.15em] uppercase text-muted-foreground mb-6">
            Community challenges
          </p>
        </ScrollReveal>

        <StaggerContainer className="space-y-3" staggerDelay={0.1}>
          {challenges.map((challenge) => (
            <StaggerChild key={challenge.title}>
              <div className="flex items-center justify-between bg-white dark:bg-[rgba(255,255,255,0.04)] rounded-xl px-5 py-4 border border-[rgba(36,70,51,0.08)] dark:border-[rgba(120,157,114,0.08)] hover:border-[rgba(36,70,51,0.15)] dark:hover:border-[rgba(120,157,114,0.15)] transition-colors duration-300 group cursor-pointer">
                <div className="flex items-center gap-4">
                  <span className="text-xl">{challenge.icon}</span>
                  <div>
                    <p className="text-sm font-medium text-foreground group-hover:text-brand-primary dark:group-hover:text-brand-accent transition-colors">
                      {challenge.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {challenge.duration} · {challenge.participants.toLocaleString()} readers
                    </p>
                  </div>
                </div>
                <span
                  className={`text-xs font-mono px-3 py-1 rounded-full ${
                    challenge.status === "Active"
                      ? "bg-brand-primary/10 text-brand-primary dark:bg-brand-accent/10 dark:text-brand-accent"
                      : challenge.status === "Joined"
                        ? "bg-golden-amber/15 text-golden-amber"
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  {challenge.status}
                </span>
              </div>
            </StaggerChild>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
