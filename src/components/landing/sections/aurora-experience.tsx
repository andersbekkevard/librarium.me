"use client";

import { useEffect, useRef, useState } from "react";

const useInView = (threshold = 0.15) => {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, inView };
};

const features = [
  {
    number: "01",
    title: "Your Library, Boundless",
    description:
      "Search millions of books through Google Books. Save them to your personal shelves with a single gesture. Every cover, every detail, beautifully preserved.",
    detail: "Powered by Google Books API",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Reading, Unrushed",
    description:
      "Mark books as not started, in progress, or finished. Update your page count when it feels right. Your reading rhythm is yours alone.",
    detail: "Progress tracking at your pace",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Shelves with Meaning",
    description:
      "Organize by genre, mood, season, or any taxonomy that speaks to you. Create collections that tell the story of your reading life.",
    detail: "Flexible categorization",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Insights, Not Metrics",
    description:
      "A dashboard that celebrates your reading journey — books completed, pages traversed, time invested — presented with the warmth it deserves.",
    detail: "Beautiful analytics",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 20V10" />
        <path d="M12 20V4" />
        <path d="M6 20v-6" />
      </svg>
    ),
  },
];

export const AuroraExperienceSection = () => {
  const { ref, inView } = useInView(0.1);

  return (
    <section
      id="experience"
      ref={ref}
      className="relative py-32 md:py-44 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #080f0b 0%, #0a1610 30%, #0d1a14 60%, #080f0b 100%)" }}
    >
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-0 w-[600px] h-[600px] -translate-y-1/2 -translate-x-1/2 rounded-full bg-[#1a3d28]/10 blur-[150px]" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] translate-x-1/3 rounded-full bg-[#c4841d]/5 blur-[120px]" />

      <div className="max-w-6xl mx-auto px-6 md:px-10 relative z-10">
        {/* Section label */}
        <div
          className={`mb-8 transition-all duration-1000 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-xs tracking-[0.3em] uppercase text-[#c4841d]/50">
            02 / Experience
          </span>
        </div>

        {/* Section heading */}
        <div
          className={`mb-20 md:mb-28 max-w-3xl transition-all duration-1000 delay-200 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <h2
            className="text-[#f5efe0] leading-[1.1] tracking-[-0.02em]"
            style={{
              fontFamily: "var(--font-serif)",
              fontWeight: 500,
              fontSize: "clamp(2rem, 4.5vw, 3.25rem)",
            }}
          >
            Crafted for the way
            <br />
            <span className="text-[#c4841d]/70 italic" style={{ fontWeight: 400 }}>
              you actually read
            </span>
          </h2>
        </div>

        {/* Feature cards — staggered asymmetric layout */}
        <div className="space-y-6 md:space-y-0 md:grid md:grid-cols-2 md:gap-6">
          {features.map((feature, i) => (
            <div
              key={feature.number}
              className={`group relative p-8 md:p-10 rounded-2xl border border-[#1a3d28]/30 bg-[#0d1a12]/40 backdrop-blur-sm hover:border-[#c4841d]/20 hover:bg-[#0d1a12]/60 transition-all duration-700 ${
                i % 2 === 1 ? "md:translate-y-12" : ""
              } ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
              }`}
              style={{
                transitionDelay: `${400 + i * 150}ms`,
                transitionProperty: "all",
                transitionDuration: "1000ms",
              }}
            >
              {/* Number + Icon row */}
              <div className="flex items-start justify-between mb-8">
                <span
                  className="text-[#c4841d]/20 text-4xl md:text-5xl tracking-[-0.05em]"
                  style={{ fontFamily: "var(--font-serif)", fontWeight: 400 }}
                >
                  {feature.number}
                </span>
                <div className="text-[#c4841d]/30 group-hover:text-[#c4841d]/50 transition-colors duration-500">
                  {feature.icon}
                </div>
              </div>

              {/* Title */}
              <h3
                className="text-[#f5efe0]/85 text-xl md:text-2xl mb-4 tracking-[-0.01em]"
                style={{ fontFamily: "var(--font-serif)", fontWeight: 500 }}
              >
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-[#f5efe0]/30 text-sm md:text-base leading-relaxed mb-6">
                {feature.description}
              </p>

              {/* Detail tag */}
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#c4841d]/30 border border-[#c4841d]/10 rounded-full px-3 py-1">
                {feature.detail}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
