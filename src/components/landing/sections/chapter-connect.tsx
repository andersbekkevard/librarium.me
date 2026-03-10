"use client";

import { useScrollAnimation } from "@/lib/hooks/useScrollAnimation";
import {
  BookmarkSimpleIcon,
  UsersFourIcon,
  ArrowsClockwiseIcon,
} from "@phosphor-icons/react";

const features = [
  {
    icon: UsersFourIcon,
    title: "Reading Clubs",
    description:
      "Create or join reading clubs with friends. Set shared reading goals, discuss chapters together, and keep each other motivated through every page.",
  },
  {
    icon: ArrowsClockwiseIcon,
    title: "Friend Activity",
    description:
      "See what your friends are reading in real-time. Celebrate when they finish a book, and discover titles through their reading journey.",
  },
  {
    icon: BookmarkSimpleIcon,
    title: "Shared Shelves",
    description:
      "Curate and share themed bookshelves with the community. From 'Best of 2025' to 'Cozy Weekend Reads' — inspire and be inspired.",
  },
];

export function ChapterConnect() {
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.15 });

  return (
    <section
      id="chapter-connect"
      className="py-24 md:py-32 bg-white"
      ref={elementRef as React.RefObject<HTMLElement>}
    >
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Chapter label */}
        <div
          className={`mb-12 scroll-fade-in-up ${isVisible ? "animate" : ""}`}
        >
          <span className="text-xs font-mono tracking-[0.3em] text-[#789D72] uppercase">
            Chapter Four
          </span>
        </div>

        <div className="max-w-[600px] mb-14">
          <h2
            className={`text-3xl md:text-[2.5rem] leading-[1.15] tracking-tight text-[#244633] mb-4 scroll-fade-in-up ${isVisible ? "animate" : ""}`}
            style={{
              fontFamily: "var(--font-serif)",
              transitionDelay: "150ms",
            }}
          >
            Connect With
            <br />
            <span className="italic font-light">Fellow Readers</span>
          </h2>
          <p
            className={`text-base md:text-lg text-[#244633]/55 leading-relaxed scroll-fade-in-up ${isVisible ? "animate" : ""}`}
            style={{ transitionDelay: "250ms" }}
          >
            Reading is better together. Share your journey, discover through
            friends, and build a community around the books you love.
          </p>
        </div>

        {/* 3-up equal cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {features.map(({ icon: Icon, title, description }, index) => (
            <div
              key={title}
              className={`scroll-fade-in-up ${isVisible ? "animate" : ""}`}
              style={{ transitionDelay: `${350 + index * 150}ms` }}
            >
              <div className="h-full rounded-2xl border border-[#789D72]/15 bg-[#FFF8F0] p-7 md:p-8 group hover:border-[#789D72]/30 transition-colors duration-300">
                <div className="inline-flex items-center justify-center h-11 w-11 rounded-xl bg-[#244633]/5 mb-6 group-hover:bg-[#244633]/10 transition-colors duration-300">
                  <Icon
                    className="h-5 w-5 text-[#244633]"
                    weight="duotone"
                  />
                </div>

                <h3
                  className="text-lg text-[#244633] mb-3"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {title}
                </h3>

                <p className="text-sm text-[#244633]/55 leading-relaxed">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
