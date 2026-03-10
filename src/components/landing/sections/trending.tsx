"use client";

import {
  useScrollAnimation,
  useStaggeredScrollAnimation,
} from "@/lib/hooks/useScrollAnimation";
import { ArrowRightIcon } from "@phosphor-icons/react";
import React from "react";

interface TrendingBook {
  title: string;
  author: string;
  readerCount: number;
  coverColor: string;
  initials: string;
  readers: { name: string; color: string }[];
}

const trendingBooks: TrendingBook[] = [
  {
    title: "The Remains of the Day",
    author: "Kazuo Ishiguro",
    readerCount: 342,
    coverColor: "#2d4a3e",
    initials: "RD",
    readers: [
      { name: "Sarah", color: "#789D72" },
      { name: "James", color: "#5a7d6e" },
      { name: "Elena", color: "#3d5c4a" },
    ],
  },
  {
    title: "Demon Copperhead",
    author: "Barbara Kingsolver",
    readerCount: 287,
    coverColor: "#4a3d2d",
    initials: "DC",
    readers: [
      { name: "Marcus", color: "#8b7355" },
      { name: "Lily", color: "#6b8f71" },
      { name: "Amir", color: "#5c6e4a" },
    ],
  },
  {
    title: "Meditations",
    author: "Marcus Aurelius",
    readerCount: 256,
    coverColor: "#3d3d4a",
    initials: "ME",
    readers: [
      { name: "Clara", color: "#7d7d8a" },
      { name: "Owen", color: "#5a6e5c" },
    ],
  },
  {
    title: "Project Hail Mary",
    author: "Andy Weir",
    readerCount: 231,
    coverColor: "#1a3a4a",
    initials: "PH",
    readers: [
      { name: "Nina", color: "#4a7a8a" },
      { name: "Ben", color: "#3a6a5a" },
      { name: "Sophie", color: "#5a8a6a" },
    ],
  },
  {
    title: "The Left Hand of Darkness",
    author: "Ursula K. Le Guin",
    readerCount: 198,
    coverColor: "#2a2a3d",
    initials: "LH",
    readers: [
      { name: "Rosa", color: "#6a5a8a" },
      { name: "Kai", color: "#5a7a6a" },
    ],
  },
];

export const TrendingSection = () => {
  const { elementRef: headerRef, isVisible: headerVisible } =
    useScrollAnimation();
  const { elementRef: listRef, visibleItems } = useStaggeredScrollAnimation(
    trendingBooks.length
  );

  return (
    <section className="bg-[#FFF8F0] py-24 md:py-32">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Section header */}
        <div
          ref={headerRef as React.RefObject<HTMLDivElement>}
          className={`flex items-baseline justify-between mb-12 scroll-fade-in-up ${headerVisible ? "animate" : ""}`}
        >
          <div>
            <p className="text-[#789D72] text-xs font-semibold tracking-[0.2em] uppercase mb-2">
              What&apos;s Hot
            </p>
            <h2
              className="text-[#1a2e1f] text-2xl md:text-3xl tracking-tight"
              style={{ fontFamily: "var(--font-fraunces)", fontWeight: 600 }}
            >
              Trending This Week
            </h2>
          </div>
          <button className="hidden md:flex items-center gap-1 text-[#1a2e1f]/60 text-sm hover:text-[#1a2e1f] transition-colors group">
            See all
            <ArrowRightIcon className="size-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Book list rows */}
        <div ref={listRef as React.RefObject<HTMLDivElement>} className="space-y-0">
          {trendingBooks.map((book, index) => (
            <div
              key={book.title}
              className={`group flex items-center gap-5 py-5 border-b border-[#1a2e1f]/10 cursor-pointer transition-colors hover:bg-[#1a2e1f]/[0.02] scroll-fade-in-up ${visibleItems[index] ? "animate" : ""}`}
              style={{
                transitionDelay: visibleItems[index]
                  ? `${index * 100}ms`
                  : "0ms",
              }}
            >
              {/* Rank number */}
              <span className="text-[#1a2e1f]/20 text-lg font-semibold w-6 shrink-0 tabular-nums">
                {String(index + 1).padStart(2, "0")}
              </span>

              {/* Book cover thumbnail */}
              <div
                className="w-12 h-16 shrink-0 flex items-center justify-center text-white/80 text-xs font-semibold"
                style={{ backgroundColor: book.coverColor }}
              >
                {book.initials}
              </div>

              {/* Book info */}
              <div className="flex-1 min-w-0">
                <h3 className="text-[#1a2e1f] text-[15px] font-semibold truncate group-hover:text-[#789D72] transition-colors">
                  {book.title}
                </h3>
                <p className="text-[#1a2e1f]/50 text-sm">{book.author}</p>
              </div>

              {/* Reader avatars */}
              <div className="hidden sm:flex items-center -space-x-2 mr-2">
                {book.readers.map((reader, i) => (
                  <div
                    key={reader.name}
                    className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-medium border-2 border-[#FFF8F0]"
                    style={{
                      backgroundColor: reader.color,
                      zIndex: book.readers.length - i,
                    }}
                  >
                    {reader.name[0]}
                  </div>
                ))}
              </div>

              {/* Reader count */}
              <span className="text-[#1a2e1f]/40 text-sm tabular-nums shrink-0">
                {book.readerCount} readers
              </span>
            </div>
          ))}
        </div>

        {/* Mobile see all */}
        <div className="mt-8 md:hidden">
          <button className="flex items-center gap-1 text-[#1a2e1f]/60 text-sm hover:text-[#1a2e1f] transition-colors group">
            See all trending books
            <ArrowRightIcon className="size-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};
