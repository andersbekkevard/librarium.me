"use client";

import { useStaggeredScrollAnimation } from "@/lib/hooks/useScrollAnimation";
import React from "react";

interface ReaderQuote {
  quote: string;
  name: string;
  booksRead: number;
}

const quotes: ReaderQuote[] = [
  {
    quote:
      "Librarium changed how I think about my reading life. It\u2019s not just tracking\u2014it\u2019s reflection.",
    name: "Clara Voss",
    booksRead: 147,
  },
  {
    quote:
      "Finally, an app that treats books with the respect they deserve. No gamification nonsense, just beautiful simplicity.",
    name: "Owen Blackwood",
    booksRead: 89,
  },
  {
    quote:
      "I\u2019ve tried every reading tracker out there. This is the first one that feels like it was made by someone who actually reads.",
    name: "Mei-Lin Chen",
    booksRead: 203,
  },
];

export const SocialProofSection = () => {
  const { elementRef, visibleItems } = useStaggeredScrollAnimation(
    quotes.length
  );

  return (
    <section className="bg-[#FFF8F0] py-24 md:py-32">
      <div
        ref={elementRef as React.RefObject<HTMLDivElement>}
        className="max-w-[1200px] mx-auto px-6"
      >
        <p className="text-[#789D72] text-xs font-semibold tracking-[0.2em] uppercase mb-16 text-center">
          From Our Readers
        </p>

        <div className="space-y-20">
          {quotes.map((item, index) => (
            <blockquote
              key={item.name}
              className={`max-w-3xl mx-auto text-center scroll-fade-in-up ${visibleItems[index] ? "animate" : ""}`}
              style={{
                transitionDelay: visibleItems[index]
                  ? `${index * 200}ms`
                  : "0ms",
              }}
            >
              <p
                className="text-[#1a2e1f] text-2xl md:text-3xl lg:text-[34px] leading-[1.35] italic mb-8"
                style={{ fontFamily: "var(--font-fraunces)", fontWeight: 300 }}
              >
                &ldquo;{item.quote}&rdquo;
              </p>
              <footer className="flex items-center justify-center gap-3">
                <span className="text-[#1a2e1f] text-sm font-semibold">
                  {item.name}
                </span>
                <span className="text-[#1a2e1f]/20">&mdash;</span>
                <span className="text-[#1a2e1f]/40 text-sm">
                  {item.booksRead} books read
                </span>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
};
