"use client";

import { useEffect, useRef } from "react";
import { StarIcon } from "@phosphor-icons/react";

const testimonials = [
  {
    quote:
      "Librarium transformed how I think about my reading. The statistics alone made me realize I gravitate toward the same three genres \u2014 now I deliberately diversify.",
    author: "Maria K.",
    role: "Literature student",
    stars: 5,
  },
  {
    quote:
      "I used to lose track of books I'd lent out or half-read. Librarium gave me back control over my library. The barcode scanner is pure magic.",
    author: "Thomas B.",
    role: "Book collector",
    stars: 5,
  },
  {
    quote:
      "The design is gorgeous. It actually makes me want to log my reading. Most tracking apps feel like homework \u2014 this feels like a ritual.",
    author: "Ingrid S.",
    role: "Designer & avid reader",
    stars: 5,
  },
];

export function ObsidianTestimonials() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("obsidian-visible");
          }
        });
      },
      { threshold: 0.15 }
    );

    const elements = sectionRef.current?.querySelectorAll(".obsidian-reveal");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="voices" ref={sectionRef} className="relative py-32 md:py-40">
      {/* Decorative top border */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-[#C4A265]/30 to-transparent" />

      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <div className="obsidian-reveal text-center mb-20">
          <span className="text-[11px] tracking-[0.3em] uppercase text-[#C4A265]/70 block mb-6">
            Chapter IV
          </span>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl text-[#E8E2D4] tracking-tight"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Voices from the
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C4A265] to-[#E8C872]">
              {" "}reading room
            </span>
          </h2>
        </div>

        {/* Testimonial grid - editorial magazine layout */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={t.author}
              className={`obsidian-reveal group relative p-8 lg:p-10 rounded-lg border border-[#1A1A18] bg-[#0E0E0C]/30 hover:border-[#C4A265]/15 transition-all duration-500 ${
                i === 1 ? "md:-translate-y-4" : ""
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-6">
                {Array.from({ length: t.stars }).map((_, j) => (
                  <StarIcon
                    key={j}
                    className="h-3.5 w-3.5 text-[#C4A265]"
                    weight="fill"
                  />
                ))}
              </div>

              {/* Quote */}
              <blockquote
                className="text-[15px] text-[#A09A8E] leading-relaxed mb-8"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="mt-auto">
                <div className="h-px w-8 bg-[#C4A265]/20 mb-4" />
                <div className="text-sm text-[#E8E2D4] tracking-tight">{t.author}</div>
                <div className="text-[11px] tracking-[0.1em] uppercase text-[#8A8478]/50 mt-0.5">
                  {t.role}
                </div>
              </div>

              {/* Large decorative quote mark */}
              <div
                className="absolute top-6 right-8 text-6xl text-[#C4A265]/[0.04] leading-none pointer-events-none select-none"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                &rdquo;
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
