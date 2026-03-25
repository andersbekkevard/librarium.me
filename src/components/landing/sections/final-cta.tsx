"use client";

import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function FinalCTASection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <section ref={ref} className="relative overflow-hidden px-6 py-40 md:py-56">
      {/* Ambient amber glow behind the CTA */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1.5, ease: EASE_OUT }}
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] h-[60vh] w-[80vw] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(245,197,77,0.1)_0%,transparent_65%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(245,197,77,0.06)_0%,transparent_65%)]"
      />

      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 1.1, ease: EASE_OUT }}
          className="font-display font-bold leading-[0.85] tracking-[-0.05em] text-landing-text"
          style={{ fontSize: "clamp(3rem, 11vw, 9rem)" }}
        >
          Your next chapter starts here.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.9,
            delay: 0.35,
            ease: EASE_OUT,
          }}
          className="mt-12"
        >
          <Link
            href="/dashboard"
            className="group inline-flex items-center gap-2 rounded-full bg-landing-amber px-10 py-5 font-display text-lg font-bold text-[#244633] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_60px_rgba(245,197,77,0.45)]"
          >
            Start tracking for free
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

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-6 text-sm text-landing-muted"
        >
          No credit card required. Free forever for personal use.
        </motion.p>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.9 }}
        className="relative z-10 mx-auto mt-32 flex max-w-5xl items-center justify-between border-t border-landing-sage/10 pt-6 text-xs text-landing-muted"
      >
        <span className="font-display font-semibold text-landing-text/50">
          Librarium
        </span>
        <span>
          &copy; {new Date().getFullYear()} Librarium. All rights reserved.
        </span>
      </motion.div>
    </section>
  );
}
