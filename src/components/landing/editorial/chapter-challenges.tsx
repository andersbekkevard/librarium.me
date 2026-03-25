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
      className="bg-white/[0.07] backdrop-blur-sm rounded-xl p-6 md:p-8 border border-white/[0.08]"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="flex items-center justify-between mb-5">
        <span className="font-mono text-xs tracking-wider uppercase text-white/50">
          Reading streak
        </span>
        <motion.span
          className="text-2xl"
          animate={isInView ? { scale: [1, 1.4, 1] } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          🔥
        </motion.span>
      </div>

      <p className="font-heading text-6xl md:text-7xl font-bold text-white mb-1">
        <AnimatedCounter value={23} />
      </p>
      <p className="text-sm text-white/50">consecutive days</p>

      {/* Week grid */}
      <div className="flex gap-2 mt-6">
        {["M", "T", "W", "T", "F", "S", "S"].map((day, i) => (
          <div key={`${day}-${i}`} className="flex-1 text-center">
            <span className="text-[10px] font-mono text-white/40 block mb-2">
              {day}
            </span>
            <motion.div
              className={`w-full aspect-square rounded-lg ${
                i < 6
                  ? "bg-golden-amber"
                  : "border border-dashed border-golden-amber/40"
              }`}
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : { scale: 0 }}
              transition={{ duration: 0.3, delay: 0.3 + i * 0.07 }}
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
  const progress = 72;

  return (
    <motion.div
      ref={ref}
      className="bg-white/[0.07] backdrop-blur-sm rounded-xl p-6 md:p-8 border border-white/[0.08]"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="flex items-center justify-between mb-5">
        <span className="font-mono text-xs tracking-wider uppercase text-white/50">
          2025 Reading Goal
        </span>
        <span className="text-xs font-mono text-golden-amber font-medium">
          On track
        </span>
      </div>

      <div className="flex items-baseline gap-2 mb-8">
        <span className="font-heading text-6xl md:text-7xl font-bold text-white">
          <AnimatedCounter value={36} />
        </span>
        <span className="text-xl text-white/40">/ 50 books</span>
      </div>

      {/* Progress bar — amber on dark green */}
      <div className="h-3 rounded-full bg-white/[0.08] overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-golden-amber to-golden-amber/70"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${progress}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        />
      </div>

      <p className="text-xs text-white/40 mt-4">
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
    <section className="relative py-24 md:py-40 px-6 md:px-8 bg-[#244633] dark:bg-[#0d1f16] overflow-hidden">
      {/* Atmospheric grain overlay */}
      <div
        className="absolute inset-0 opacity-[0.15] mix-blend-soft-light pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Subtle radial glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-golden-amber/[0.06] rounded-full blur-[150px] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto">
        {/* Chapter marker — inverted for dark bg */}
        <div className="flex items-center gap-3 mb-20">
          <span className="font-mono text-xs tracking-[0.2em] uppercase text-white/30">
            [ 03 / 05 ]
          </span>
          <span className="text-golden-amber/40">·</span>
          <span className="font-mono text-xs tracking-[0.15em] uppercase text-golden-amber">
            The Challenge
          </span>
        </div>

        <div className="max-w-2xl mb-16">
          <ScrollReveal>
            <h2 className="font-heading font-bold text-5xl md:text-6xl lg:text-7xl leading-[0.9] tracking-tight text-white mb-8">
              Fuel the habit.
              <br />
              <span className="text-golden-amber italic">Earn the streak.</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p className="text-lg text-white/50 leading-relaxed max-w-lg">
              Set goals, build streaks, and join community challenges that turn
              reading from a habit into an identity. Like Strava, but for the
              pages you turn.
            </p>
          </ScrollReveal>
        </div>

        {/* Streak + Goal cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          <StreakCard />
          <GoalCard />
        </div>

        {/* Community challenges */}
        <ScrollReveal delay={0.3}>
          <p className="font-mono text-xs tracking-[0.15em] uppercase text-white/30 mb-6">
            Community challenges
          </p>
        </ScrollReveal>

        <StaggerContainer className="space-y-3" staggerDelay={0.1}>
          {challenges.map((challenge) => (
            <StaggerChild key={challenge.title}>
              <div className="flex items-center justify-between bg-white/[0.05] rounded-xl px-5 py-4 border border-white/[0.06] hover:bg-white/[0.08] hover:border-white/[0.1] transition-all duration-300 group cursor-pointer">
                <div className="flex items-center gap-4">
                  <span className="text-xl">{challenge.icon}</span>
                  <div>
                    <p className="text-sm font-medium text-white group-hover:text-golden-amber transition-colors">
                      {challenge.title}
                    </p>
                    <p className="text-xs text-white/40 mt-0.5">
                      {challenge.duration} ·{" "}
                      {challenge.participants.toLocaleString()} readers
                    </p>
                  </div>
                </div>
                <span
                  className={`text-xs font-mono px-3 py-1 rounded-full ${
                    challenge.status === "Active"
                      ? "bg-golden-amber/15 text-golden-amber"
                      : challenge.status === "Joined"
                        ? "bg-white/10 text-white/70"
                        : "bg-white/5 text-white/40"
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
