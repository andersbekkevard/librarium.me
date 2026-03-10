"use client";

import {
  useScrollAnimation,
  useStaggeredScrollAnimation,
} from "@/lib/hooks/useScrollAnimation";
import React from "react";

interface Feature {
  label: string;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    label: "Track",
    title: "Every page, remembered",
    description:
      "Log reading sessions, track progress page by page, and build a timeline of your literary life. Three simple states\u2014not started, in progress, finished\u2014keep things focused.",
  },
  {
    label: "Discover",
    title: "Find your next obsession",
    description:
      "Browse what the community is reading, explore curated lists, and search millions of titles. Book details auto-populate so you spend less time typing and more time reading.",
  },
  {
    label: "Connect",
    title: "Reading is better together",
    description:
      "Share your library, compare notes with friends, and see how your taste evolves over time. Coming soon: book clubs, group challenges, and collaborative reading lists.",
  },
];

export const FeaturesSection = () => {
  const { elementRef: headerRef, isVisible: headerVisible } =
    useScrollAnimation();
  const { elementRef: gridRef, visibleItems } = useStaggeredScrollAnimation(
    features.length
  );

  return (
    <section className="bg-[#f5f0e8] py-24 md:py-32">
      <div className="max-w-[1200px] mx-auto px-6">
        <div
          ref={headerRef as React.RefObject<HTMLDivElement>}
          className={`mb-16 scroll-fade-in-up ${headerVisible ? "animate" : ""}`}
        >
          <p className="text-[#789D72] text-xs font-semibold tracking-[0.2em] uppercase mb-2">
            How It Works
          </p>
          <h2
            className="text-[#1a2e1f] text-2xl md:text-3xl tracking-tight"
            style={{ fontFamily: "var(--font-fraunces)", fontWeight: 600 }}
          >
            Built for Readers
          </h2>
        </div>

        {/* 3-column text grid */}
        <div
          ref={gridRef as React.RefObject<HTMLDivElement>}
          className="grid md:grid-cols-3 gap-12 md:gap-8"
        >
          {features.map((feature, index) => (
            <div
              key={feature.label}
              className={`scroll-fade-in-up ${visibleItems[index] ? "animate" : ""}`}
              style={{
                transitionDelay: visibleItems[index]
                  ? `${index * 150}ms`
                  : "0ms",
              }}
            >
              <p className="text-[#789D72] text-xs font-semibold tracking-[0.15em] uppercase mb-4">
                {feature.label}
              </p>
              <h3
                className="text-[#1a2e1f] text-xl mb-3"
                style={{ fontFamily: "var(--font-fraunces)", fontWeight: 600 }}
              >
                {feature.title}
              </h3>
              <p className="text-[#1a2e1f]/55 text-[15px] leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
