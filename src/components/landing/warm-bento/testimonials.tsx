"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { TESTIMONIALS } from "./book-data";

export function TestimonialsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} id="testimonials" className="py-16 md:py-24 bg-muted/40 dark:bg-muted/20">
      <div className="container mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="font-heading text-sm font-semibold text-sage uppercase tracking-wider"
          >
            Reader Stories
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-3"
          >
            Loved by readers who mean it
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
              className="bg-card rounded-2xl border border-border p-6 card-hover relative"
            >
              {/* Quote mark */}
              <div className="absolute top-4 right-5 font-accent text-5xl text-sage/20 dark:text-sage/15 leading-none select-none">
                &ldquo;
              </div>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-full bg-sage/15 dark:bg-sage/20 flex items-center justify-center text-sm font-bold text-sage">
                  {t.avatar}
                </div>
                <div>
                  <p className="font-heading font-semibold text-foreground text-sm">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.handle}</p>
                </div>
              </div>

              <p className="text-foreground/90 text-[15px] leading-relaxed mb-4">
                {t.text}
              </p>

              <div className="flex items-center gap-1.5 pt-3 border-t border-border/60">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-amber">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                </svg>
                <span className="text-xs text-muted-foreground font-medium">
                  {t.booksRead} books tracked
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
