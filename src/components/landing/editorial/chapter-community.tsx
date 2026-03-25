"use client";

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useRef, useEffect } from "react";
import { ScrollReveal } from "./scroll-reveal";

function AnimatedStat({
  value,
  label,
  suffix = "",
}: {
  value: number;
  label: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => {
    if (value >= 1000000) {
      return `${(v / 1000000).toFixed(v >= 10000000 ? 0 : 1)}M`;
    }
    if (value >= 1000) {
      return `${(v / 1000).toFixed(v >= 100000 ? 0 : 1)}K`;
    }
    return Math.round(v).toLocaleString();
  });

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, value, {
        duration: 2.5,
        ease: [0.16, 1, 0.3, 1],
      });
      return controls.stop;
    }
  }, [isInView, count, value]);

  return (
    <div ref={ref} className="text-center">
      <motion.p
        className="font-heading text-6xl sm:text-7xl md:text-8xl lg:text-[7rem] font-bold text-foreground tabular-nums leading-none"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.span>{rounded}</motion.span>
        {suffix && (
          <span className="text-golden-amber">{suffix}</span>
        )}
      </motion.p>
      <motion.div
        className="flex items-center justify-center gap-3 mt-4"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="h-px w-6 bg-golden-amber/40" />
        <p className="text-xs text-muted-foreground font-mono tracking-[0.2em] uppercase">
          {label}
        </p>
        <div className="h-px w-6 bg-golden-amber/40" />
      </motion.div>
    </div>
  );
}

const testimonials = [
  {
    quote:
      "Librarium turned reading from something I do alone into something I share with friends. My reading has tripled since I started.",
    name: "Emma Rodriguez",
    title: "Product Designer",
    initials: "ER",
  },
  {
    quote:
      "The streak feature is addictive in the best way. I haven't missed a day in four months. It's the Duolingo effect, but for books.",
    name: "James Okafor",
    title: "Software Engineer",
    initials: "JO",
  },
  {
    quote:
      "Finally, a book tracker that doesn't feel like a spreadsheet. The social feed makes discovering new books effortless.",
    name: "Sophie Müller",
    title: "Graduate Student",
    initials: "SM",
  },
];

export function ChapterCommunity() {
  return (
    <section className="py-24 md:py-40 px-6 md:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <div className="max-w-2xl mb-24 md:mb-32">
          <ScrollReveal>
            <h2 className="font-heading font-bold text-5xl md:text-6xl lg:text-7xl leading-[0.9] tracking-tight text-foreground mb-8">
              Built by readers,
              <br />
              <span className="text-brand-primary dark:text-brand-accent italic">
                for readers.
              </span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
              Join a growing community of people who believe reading is more
              meaningful when shared.
            </p>
          </ScrollReveal>
        </div>

        {/* Monument stats — the visual climax */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 py-16 md:py-20 border-y border-[rgba(36,70,51,0.1)] dark:border-[rgba(120,157,114,0.1)] mb-24 md:mb-32">
          <AnimatedStat value={247000} label="Books tracked" />
          <AnimatedStat value={89000} label="Active readers" />
          <AnimatedStat value={12000000} label="Pages read" />
        </div>

        {/* Testimonials — editorial quote style */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <ScrollReveal key={t.name} delay={i * 0.15}>
              <div className="h-full flex flex-col">
                {/* Large decorative quote mark */}
                <div className="mb-6">
                  <span className="font-heading text-6xl leading-none text-golden-amber/25">
                    &ldquo;
                  </span>
                </div>

                {/* Quote text */}
                <p className="text-base text-foreground leading-relaxed flex-1">
                  {t.quote}
                </p>

                {/* Author — separated by amber dot */}
                <div className="flex items-center gap-3 mt-8 pt-6 border-t border-[rgba(36,70,51,0.08)] dark:border-[rgba(120,157,114,0.08)]">
                  <div className="w-10 h-10 rounded-full bg-brand-primary dark:bg-brand-accent flex items-center justify-center text-xs font-semibold text-white dark:text-[#0A0F0D]">
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {t.name}
                    </p>
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
