"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { TESTIMONIALS } from "./book-data";

export function TestimonialsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} id="testimonials" className="py-20 md:py-32 bg-muted/50 dark:bg-muted/20 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-1 rounded-full bg-sage/40" />

      <div className="container mx-auto">
        <div className="text-center mb-14 md:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="font-heading text-xs font-bold text-sage uppercase tracking-[0.2em]"
          >
            Reader Stories
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.08, ease: [0.23, 1, 0.32, 1] }}
            className="font-heading text-3xl md:text-[2.75rem] lg:text-5xl font-extrabold text-foreground mt-4 tracking-tight"
          >
            Loved by readers who mean it
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 32, scale: 0.95 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.1, ease: [0.23, 1, 0.32, 1] }}
              className={`rounded-3xl border p-7 md:p-8 card-hover relative overflow-hidden ${
                i === 1
                  ? "bg-forest dark:bg-[#1A2E24] border-forest/80 dark:border-sage/15 md:-translate-y-4"
                  : "bg-card border-border"
              }`}
            >
              {/* Large decorative quote */}
              <div
                className={`absolute top-3 right-5 font-accent text-7xl leading-none select-none pointer-events-none ${
                  i === 1 ? "text-white/8" : "text-sage/10 dark:text-sage/8"
                }`}
              >
                &ldquo;
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold ring-2 ${
                      i === 1
                        ? "bg-amber/20 text-amber ring-amber/20"
                        : "bg-sage/15 dark:bg-sage/20 text-sage ring-sage/10"
                    }`}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <p
                      className={`font-heading font-bold text-sm ${
                        i === 1 ? "text-white" : "text-foreground"
                      }`}
                    >
                      {t.name}
                    </p>
                    <p
                      className={`text-xs ${
                        i === 1 ? "text-white/50" : "text-muted-foreground"
                      }`}
                    >
                      {t.handle}
                    </p>
                  </div>
                </div>

                <p
                  className={`text-[0.95rem] leading-[1.7] mb-5 ${
                    i === 1 ? "text-white/85" : "text-foreground/85"
                  }`}
                >
                  {t.text}
                </p>

                <div
                  className={`flex items-center gap-2 pt-4 border-t ${
                    i === 1 ? "border-white/10" : "border-border/60"
                  }`}
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className={i === 1 ? "text-amber" : "text-amber"}
                  >
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                  </svg>
                  <span
                    className={`text-xs font-bold ${
                      i === 1 ? "text-white/50" : "text-muted-foreground"
                    }`}
                  >
                    {t.booksRead} books tracked
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
