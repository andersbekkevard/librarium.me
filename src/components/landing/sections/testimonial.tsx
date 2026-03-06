"use client";

import { useEffect, useRef, useState } from "react";

const testimonials = [
  {
    quote:
      "Librarium changed how I think about my reading life. It is not just tracking — it is reflection.",
    author: "Maria Engstrom",
    role: "Literature PhD, Uppsala",
  },
  {
    quote:
      "Finally, a book app that does not treat reading like a productivity hack. It feels like it was made by someone who actually reads.",
    author: "Thomas Nakamura",
    role: "Independent Bookseller",
  },
  {
    quote:
      "The barcode scanner alone saved me hours. But what keeps me coming back is how beautiful and calm the whole experience is.",
    author: "Priya Sharma",
    role: "Software Engineer & Bibliophile",
  },
];

export const VelvetTestimonial = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(0);

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

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="testimonials"
      ref={ref}
      className="relative py-28 md:py-40 bg-gradient-to-b from-muted/20 via-muted/40 to-muted/20"
    >
      {/* Grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
        }}
      />

      <div className="relative z-10 px-6 md:px-10 lg:px-16">
        <div className="max-w-5xl mx-auto">
          {/* Label */}
          <div
            className={`mb-16 md:mb-20 transition-all duration-1000 ease-out ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <span
              className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground"
              style={{ fontFamily: "var(--font-geist-sans)" }}
            >
              <span className="inline-block w-8 h-px bg-brand-primary mr-3 align-middle" />
              Praise
            </span>
          </div>

          {/* Testimonial display */}
          <div className="relative min-h-[280px] md:min-h-[240px]">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className={`absolute inset-0 transition-all duration-700 ease-out ${
                  i === active
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4 pointer-events-none"
                }`}
              >
                <blockquote>
                  <p
                    className="text-[clamp(1.5rem,3.5vw,3rem)] leading-[1.15] tracking-[-0.02em] font-medium"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <footer className="mt-8 md:mt-12">
                    <cite
                      className="not-italic text-sm md:text-base"
                      style={{ fontFamily: "var(--font-geist-sans)" }}
                    >
                      <span className="text-foreground font-medium">{t.author}</span>
                      <span className="text-muted-foreground ml-2">{t.role}</span>
                    </cite>
                  </footer>
                </blockquote>
              </div>
            ))}
          </div>

          {/* Dot indicators */}
          <div className="flex items-center gap-2 mt-12">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === active
                    ? "w-8 bg-foreground"
                    : "w-1.5 bg-border hover:bg-muted-foreground"
                }`}
                aria-label={`View testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
