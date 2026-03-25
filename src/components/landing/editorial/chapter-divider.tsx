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
    <div ref={ref} id={id} className="w-full max-w-5xl mx-auto px-6 md:px-8 pt-8 md:pt-12">
      {/* Hairline divider with amber center dot */}
      <div className="relative">
        <motion.div
          className="w-full h-px bg-[rgba(36,70,51,0.1)] dark:bg-[rgba(120,157,114,0.1)]"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: "left" }}
        />
        {/* Center amber diamond */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rotate-45 bg-golden-amber/60"
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        />
      </div>

      {/* Chapter marker */}
      <motion.div
        className="flex items-center gap-3 pt-10 pb-4"
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-muted-foreground/60">
          [ {padded} / {paddedTotal} ]
        </span>
        <span className="text-golden-amber/50">·</span>
        <span className="font-mono text-[11px] tracking-[0.15em] uppercase text-brand-primary dark:text-brand-accent font-medium">
          {title}
        </span>
      </motion.div>
    </div>
  );
}
