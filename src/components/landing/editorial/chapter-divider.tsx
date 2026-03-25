"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface ChapterDividerProps {
  chapter: number;
  total: number;
  title: string;
  id?: string;
}

export function ChapterDivider({ chapter, total, title, id }: ChapterDividerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  const padded = String(chapter).padStart(2, "0");
  const paddedTotal = String(total).padStart(2, "0");

  return (
    <div ref={ref} id={id} className="w-full max-w-5xl mx-auto px-6 md:px-8">
      {/* Hairline divider */}
      <motion.div
        className="w-full h-px bg-[rgba(36,70,51,0.12)] dark:bg-[rgba(120,157,114,0.15)]"
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        style={{ transformOrigin: "left" }}
      />

      {/* Chapter marker */}
      <motion.div
        className="flex items-center gap-3 pt-8 pb-4"
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <span className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground">
          [ {padded} / {paddedTotal} ]
        </span>
        <span className="text-[rgba(36,70,51,0.25)] dark:text-[rgba(120,157,114,0.25)]">·</span>
        <span className="font-mono text-xs tracking-[0.15em] uppercase text-brand-primary dark:text-brand-accent">
          {title}
        </span>
      </motion.div>
    </div>
  );
}
