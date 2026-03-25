"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { type ReactNode, useRef } from "react";

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface StatementSectionProps {
  headline: string;
  children: ReactNode;
  direction?: "left" | "right";
}

export function StatementSection({
  headline,
  children,
  direction = "right",
}: StatementSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const headlineScale = useTransform(
    scrollYProgress,
    [0, 0.35, 0.65],
    [0.92, 1, 0.96]
  );

  const mockupSlide = direction === "right" ? 80 : -80;
  const isReversed = direction === "left";

  return (
    <section ref={sectionRef} className="px-6 py-28 md:py-48">
      <div
        className={`mx-auto flex max-w-7xl flex-col items-center gap-12 md:gap-16 lg:flex-row lg:gap-20 ${
          isReversed ? "lg:flex-row-reverse" : ""
        }`}
      >
        {/* Typographic statement — takes more space */}
        <div className="flex-1 lg:max-w-[55%]">
          <motion.h2
            style={{ scale: headlineScale }}
            className={`font-display font-bold leading-[0.88] tracking-[-0.04em] text-landing-text ${
              isReversed ? "lg:text-right" : "lg:text-left"
            } text-center`}
          >
            <motion.span
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, ease: EASE_OUT }}
              className="inline-block"
              style={{ fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)" }}
            >
              {headline}
            </motion.span>
          </motion.h2>
        </div>

        {/* Product mockup — slides in from the side */}
        <motion.div
          initial={{ opacity: 0, x: mockupSlide }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{
            duration: 1.1,
            delay: 0.15,
            ease: EASE_OUT,
          }}
          className="w-full max-w-md lg:flex-1"
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}
