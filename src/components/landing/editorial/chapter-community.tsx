"use client";

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useRef, useEffect } from "react";
import { ScrollReveal } from "./scroll-reveal";

function AnimatedStat({ value, label, suffix = "" }: { value: number; label: string; suffix?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => {
    if (value >= 1000) {
      return `${(v / 1000).toFixed(v >= 10000 ? 0 : 1)}K`;
    }
    return Math.round(v).toLocaleString();
  });

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, value, {
        duration: 2,
        ease: [0.25, 0.1, 0.25, 1],
      });
      return controls.stop;
    }
  }, [isInView, count, value]);

  return (
    <div ref={ref} className="text-center">
      <motion.p
        className="font-heading text-5xl md:text-6xl font-bold text-foreground tabular-nums"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
      >
        <motion.span>{rounded}</motion.span>
        {suffix && <span className="text-golden-amber">{suffix}</span>}
      </motion.p>
      <p className="text-sm text-muted-foreground mt-2 font-mono tracking-wider uppercase">
        {label}
      </p>
    </div>
  );
}

const testimonials = [
  {
    quote: "Librarium turned reading from something I do alone into something I share with friends. My reading has tripled since I started.",
    name: "Emma Rodriguez",
    title: "Product Designer",
    initials: "ER",
  },
  {
    quote: "The streak feature is addictive in the best way. I haven't missed a day in four months. It's the Duolingo effect, but for books.",
    name: "James Okafor",
    title: "Software Engineer",
    initials: "JO",
  },
  {
    quote: "Finally, a book tracker that doesn't feel like a spreadsheet. The social feed makes discovering new books effortless.",
    name: "Sophie Müller",
    title: "Graduate Student",
    initials: "SM",
  },
];

export function ChapterCommunity() {
  return (
    <section className="py-20 md:py-32 px-6 md:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <div className="max-w-2xl mb-20">
          <ScrollReveal>
            <h2 className="font-heading font-bold text-4xl md:text-5xl leading-tight tracking-tight text-foreground mb-6">
              Built by readers,
              <br />
              <span className="text-brand-primary dark:text-brand-accent">for readers.</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Join a growing community of people who believe reading is more
              meaningful when shared. Here&apos;s what they have to say.
            </p>
          </ScrollReveal>
        </div>

        {/* Stats row */}
        <ScrollReveal className="mb-24">
          <div className="grid grid-cols-3 gap-8 md:gap-16 py-12 border-y border-[rgba(36,70,51,0.08)] dark:border-[rgba(120,157,114,0.08)]">
            <AnimatedStat value={247000} label="Books tracked" />
            <AnimatedStat value={89000} label="Active readers" />
            <AnimatedStat value={12000000} label="Pages read" />
          </div>
        </ScrollReveal>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <ScrollReveal key={t.name} delay={i * 0.15}>
              <div className="bg-white dark:bg-[rgba(255,255,255,0.04)] rounded-xl p-6 border border-[rgba(36,70,51,0.08)] dark:border-[rgba(120,157,114,0.08)] h-full flex flex-col">
                {/* Quote */}
                <div className="flex-1">
                  <svg
                    className="w-6 h-6 text-golden-amber/40 mb-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
                  </svg>
                  <p className="text-sm text-foreground leading-relaxed">
                    {t.quote}
                  </p>
                </div>

                {/* Author */}
                <div className="flex items-center gap-3 mt-6 pt-4 border-t border-[rgba(36,70,51,0.06)] dark:border-[rgba(120,157,114,0.06)]">
                  <div className="w-9 h-9 rounded-full bg-brand-primary dark:bg-brand-accent flex items-center justify-center text-xs font-semibold text-white dark:text-[#0A0F0D]">
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.title}</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
