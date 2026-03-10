"use client";

import {
  useScrollAnimation,
  useStaggeredScrollAnimation,
} from "@/lib/hooks/useScrollAnimation";
import { ArrowRightIcon } from "@phosphor-icons/react";
import React from "react";

interface ReadingList {
  name: string;
  curator: string;
  bookCount: number;
  description: string;
  coverColors: string[];
}

const readingLists: ReadingList[] = [
  {
    name: "Modern Classics You Missed",
    curator: "Elena Marchetti",
    bookCount: 24,
    description:
      "Essential 21st-century novels that slipped under the radar. From debut gems to quiet masterpieces.",
    coverColors: ["#2d4a3e", "#4a3d2d", "#3d3d4a"],
  },
  {
    name: "The Philosophical Canon",
    curator: "James Whitmore",
    bookCount: 18,
    description:
      "From Plato to Parfit. A structured reading path through Western philosophy's greatest hits.",
    coverColors: ["#3d3d4a", "#1a3a4a", "#4a3d2d"],
  },
  {
    name: "Speculative Fiction for Skeptics",
    curator: "Aisha Rahman",
    bookCount: 15,
    description:
      "Sci-fi and fantasy that transcends genre conventions. Literary fiction in disguise.",
    coverColors: ["#1a3a4a", "#2a2a3d", "#2d4a3e"],
  },
  {
    name: "The Essay Renaissance",
    curator: "Marcus Cole",
    bookCount: 12,
    description:
      "Contemporary essay collections that prove the form has never been more alive or more necessary.",
    coverColors: ["#4a3d2d", "#2d4a3e", "#3d3d4a"],
  },
];

export const ReadingListsSection = () => {
  const { elementRef: headerRef, isVisible: headerVisible } =
    useScrollAnimation();
  const { elementRef: gridRef, visibleItems } = useStaggeredScrollAnimation(
    readingLists.length
  );

  return (
    <section className="bg-[#f5f0e8] py-24 md:py-32">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Section header */}
        <div
          ref={headerRef as React.RefObject<HTMLDivElement>}
          className={`flex items-baseline justify-between mb-12 scroll-fade-in-up ${headerVisible ? "animate" : ""}`}
        >
          <div>
            <p className="text-[#789D72] text-xs font-semibold tracking-[0.2em] uppercase mb-2">
              Curated Collections
            </p>
            <h2
              className="text-[#1a2e1f] text-2xl md:text-3xl tracking-tight"
              style={{ fontFamily: "var(--font-fraunces)", fontWeight: 600 }}
            >
              Reading Lists
            </h2>
          </div>
          <button className="hidden md:flex items-center gap-1 text-[#1a2e1f]/60 text-sm hover:text-[#1a2e1f] transition-colors group">
            See all
            <ArrowRightIcon className="size-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* 2-column grid */}
        <div
          ref={gridRef as React.RefObject<HTMLDivElement>}
          className="grid md:grid-cols-2 gap-6"
        >
          {readingLists.map((list, index) => (
            <div
              key={list.name}
              className={`group cursor-pointer border border-[#1a2e1f]/10 bg-[#FFF8F0] p-6 transition-all hover:border-[#1a2e1f]/25 scroll-fade-in-up ${visibleItems[index] ? "animate" : ""}`}
              style={{
                transitionDelay: visibleItems[index]
                  ? `${index * 150}ms`
                  : "0ms",
              }}
            >
              {/* Mini book stack */}
              <div className="flex gap-1 mb-5">
                {list.coverColors.map((color, i) => (
                  <div
                    key={i}
                    className="w-8 h-12"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>

              <h3
                className="text-[#1a2e1f] text-lg mb-2 group-hover:text-[#789D72] transition-colors"
                style={{ fontFamily: "var(--font-fraunces)", fontWeight: 600 }}
              >
                {list.name}
              </h3>

              <p className="text-[#1a2e1f]/50 text-sm leading-relaxed mb-4">
                {list.description}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-[#1a2e1f]/40 text-xs">
                  by {list.curator}
                </span>
                <span className="text-[#1a2e1f]/30 text-xs">
                  {list.bookCount} books
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
