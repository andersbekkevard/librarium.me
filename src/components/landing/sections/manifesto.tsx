"use client";

import { useEffect, useRef, useState } from "react";

export const VelvetManifesto = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="manifesto"
      ref={ref}
      className="relative py-32 md:py-48 overflow-hidden"
    >
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background" />

      <div className="relative z-10 px-6 md:px-10 lg:px-16">
        <div className="max-w-5xl mx-auto">
          {/* Section label */}
          <div
            className={`mb-12 md:mb-16 transition-all duration-1000 ease-out ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <span
              className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground"
              style={{ fontFamily: "var(--font-geist-sans)" }}
            >
              <span className="inline-block w-8 h-px bg-brand-primary mr-3 align-middle" />
              Philosophy
            </span>
          </div>

          {/* Pull quote */}
          <blockquote
            className={`transition-all duration-1200 delay-200 ease-out ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <p
              className="text-[clamp(1.75rem,4.5vw,4.5rem)] leading-[1.1] tracking-[-0.03em] font-medium"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Reading is not consumption.{" "}
              <span className="text-muted-foreground">
                It is a practice of attention, a slow accumulation of understanding.
              </span>{" "}
              Your library should honor that.
            </p>
          </blockquote>

          {/* Supporting text */}
          <div
            className={`mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 transition-all duration-1000 delay-500 ease-out ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <p
              className="text-base md:text-lg text-muted-foreground leading-relaxed"
              style={{ fontFamily: "var(--font-geist-sans)" }}
            >
              Librarium is built for readers who treat their collection as a living document.
              Not a vanity shelf, but a record of intellectual growth — every highlight,
              every margin note, every abandoned attempt.
            </p>
            <p
              className="text-base md:text-lg text-muted-foreground leading-relaxed"
              style={{ fontFamily: "var(--font-geist-sans)" }}
            >
              We believe the tools you use to track your reading should be as
              thoughtful as the books themselves. No clutter. No gamification.
              Just clarity and intention.
            </p>
          </div>
        </div>
      </div>

      {/* Decorative rule */}
      <div className="absolute bottom-0 left-6 right-6 md:left-10 md:right-10 lg:left-16 lg:right-16 h-px bg-border/30" />
    </section>
  );
};
