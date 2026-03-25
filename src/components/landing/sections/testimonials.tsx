"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

const testimonials = [
  {
    quote:
      "I've tried Goodreads, StoryGraph, even spreadsheets. Librarium is the first app that makes tracking feel like part of the reading experience, not a chore.",
    name: "Maya Chen",
    role: "Product Designer",
    accent: "border-[#789D72]",
  },
  {
    quote:
      "The social features are what keep me coming back. Seeing my friends' reading updates is more inspiring than any algorithmic recommendation.",
    name: "James Okafor",
    role: "Software Engineer",
    accent: "border-landing-amber",
  },
  {
    quote:
      "My reading has gone up 40% since I started tracking with Librarium. The challenges are addictive in the best way.",
    name: "Sophie Lindström",
    role: "Graduate Student",
    accent: "border-[#244633] dark:border-[#FFF8F0]",
  },
];

export function TestimonialsSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section ref={ref} className="px-6 py-28 md:py-44">
      <div className="mx-auto max-w-5xl">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: EASE_OUT }}
          className="mb-20 text-center font-display font-bold tracking-[-0.03em] text-landing-text md:mb-28"
          style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
        >
          Readers love it
        </motion.h2>

        {/* Editorial testimonial layout — no cards, vertical accent bars */}
        <div className="space-y-16 md:space-y-20">
          {testimonials.map((t, i) => (
            <motion.blockquote
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.9,
                delay: 0.2 + i * 0.15,
                ease: EASE_OUT,
              }}
              className={`border-l-[3px] ${t.accent} pl-8 md:pl-12 ${
                i % 2 === 1 ? "md:ml-24" : ""
              }`}
            >
              <p
                className="font-display font-medium leading-[1.3] tracking-[-0.02em] text-landing-text/85"
                style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)" }}
              >
                {t.quote}
              </p>
              <footer className="mt-5 flex items-center gap-3">
                <span className="text-sm font-semibold text-landing-text">
                  {t.name}
                </span>
                <span className="text-sm text-landing-muted">/</span>
                <span className="text-sm text-landing-muted">{t.role}</span>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
