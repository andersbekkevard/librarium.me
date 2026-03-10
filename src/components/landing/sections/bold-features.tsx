"use client";

import {
  useScrollAnimation,
  useStaggeredScrollAnimation,
} from "@/lib/hooks/useScrollAnimation";

interface Feature {
  headline: string;
  description: string;
}

const features: Feature[] = [
  {
    headline: "Track Every Page",
    description:
      "Log your reading session by session. Watch your progress grow across every book in your collection — page by page, chapter by chapter.",
  },
  {
    headline: "Discover Through Friends",
    description:
      "See what the people you trust are reading. The best recommendations come from real readers, not algorithms.",
  },
  {
    headline: "Build Your Shelf",
    description:
      "Curate a library that reflects who you are. Organize by mood, genre, or your own system. Your shelf, your rules.",
  },
  {
    headline: "Celebrate Progress",
    description:
      "Streaks, milestones, yearly goals. Reading is a practice — we help you see how far you've come.",
  },
];

export const BoldFeatures = () => {
  const { elementRef: headerRef, isVisible: headerVisible } =
    useScrollAnimation({ threshold: 0.15 });
  const { elementRef: listRef, visibleItems } = useStaggeredScrollAnimation(
    features.length,
    { threshold: 0.1 }
  );

  return (
    <section className="px-6 md:px-12 lg:px-20 py-24 md:py-32 lg:py-40">
      <div className="max-w-[1400px] mx-auto">
        {/* Section label */}
        <p
          ref={headerRef as React.RefObject<HTMLParagraphElement>}
          className={`text-[#526D5E] text-sm uppercase tracking-[0.2em] mb-16 md:mb-24 transition-all duration-[800ms] ease-out ${
            headerVisible ? "opacity-100" : "opacity-0"
          }`}
          style={{ fontFamily: "var(--font-geist-sans)" }}
        >
          What You Get
        </p>

        {/* Features list */}
        <div ref={listRef as React.RefObject<HTMLDivElement>} className="space-y-20 md:space-y-28">
          {features.map((feature, index) => (
            <div
              key={feature.headline}
              className={`transition-all duration-[800ms] ease-out ${
                visibleItems[index]
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
              style={{
                transitionDelay: visibleItems[index] ? `${index * 100}ms` : "0ms",
              }}
            >
              {/* Thin sage rule */}
              <div className="h-px bg-[#526D5E]/30 mb-8 md:mb-10" />

              {/* Feature number */}
              <span
                className="text-[#526D5E]/50 text-xs uppercase tracking-[0.3em] mb-4 block"
                style={{ fontFamily: "var(--font-geist-mono)" }}
              >
                0{index + 1}
              </span>

              {/* Feature headline — large Fraunces */}
              <h3 className="font-heading font-bold text-[#f5f0e8] text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] tracking-[-0.02em]">
                {feature.headline}
              </h3>

              {/* Description — narrow column */}
              <p
                className="mt-6 max-w-[600px] text-[#f5f0e8]/60 text-base leading-relaxed"
                style={{ fontFamily: "var(--font-geist-sans)" }}
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom rule */}
      <div className="max-w-[1400px] mx-auto mt-24 md:mt-32 h-px bg-[#526D5E]/40" />
    </section>
  );
};
