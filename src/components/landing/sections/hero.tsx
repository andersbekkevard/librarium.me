"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

const wordVariants = {
  hidden: { opacity: 0, y: 60, filter: "blur(10px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 1.1,
      delay: 0.5 + i * 0.2,
      ease: EASE_OUT,
    },
  }),
};

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const headlineY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const glowScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.5]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  const words = ["Your", "reading,", "amplified."];

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6"
    >
      {/* Ambient radial glow behind headline */}
      <motion.div
        style={{ scale: glowScale, opacity: glowOpacity }}
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, delay: 0.8, ease: EASE_OUT }}
          className="h-[50vh] w-[70vw] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(245,197,77,0.12)_0%,transparent_70%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(245,197,77,0.08)_0%,transparent_70%)]"
        />
      </motion.div>

      <motion.div
        style={{ y: headlineY, opacity: headlineOpacity }}
        className="relative z-10 max-w-[90rem] text-center"
      >
        <h1
          className="font-display font-bold leading-[0.85] tracking-[-0.05em] text-landing-text"
          style={{
            fontSize: "clamp(3.5rem, 14vw, 12rem)",
          }}
        >
          {words.map((word, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={wordVariants}
              initial="hidden"
              animate="visible"
              className="mr-[0.2em] inline-block last:mr-0"
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.4, ease: EASE_OUT }}
          className="mx-auto mt-10 max-w-lg text-base text-landing-sage md:text-lg"
        >
          Track your books. See what friends are reading. Build a reading life
          worth sharing.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.7, ease: EASE_OUT }}
          className="mt-12"
        >
          <Link
            href="/dashboard"
            className="group inline-flex items-center gap-2 rounded-full bg-landing-amber px-10 py-4.5 font-display text-lg font-bold text-[#244633] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_50px_rgba(245,197,77,0.4)]"
          >
            Start tracking — it&apos;s free
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
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll prompt — typographic, not a generic pill */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1.2 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="block font-display text-xs font-semibold uppercase tracking-[0.25em] text-landing-sage/50"
        >
          Scroll
        </motion.span>
      </motion.div>
    </section>
  );
}
