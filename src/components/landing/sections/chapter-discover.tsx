"use client";

import { useScrollAnimation } from "@/lib/hooks/useScrollAnimation";
import {
  SparkleIcon,
  CompassIcon,
  UsersThreeIcon,
} from "@phosphor-icons/react";

export function ChapterDiscover() {
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.15 });

  return (
    <section
      id="chapter-discover"
      className="py-24 md:py-32 bg-[#f5f8f5]"
      ref={elementRef as React.RefObject<HTMLElement>}
    >
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Chapter label */}
        <div
          className={`mb-12 scroll-fade-in-up ${isVisible ? "animate" : ""}`}
        >
          <span className="text-xs font-mono tracking-[0.3em] text-[#789D72] uppercase">
            Chapter Three
          </span>
        </div>

        <h2
          className={`text-3xl md:text-[2.5rem] leading-[1.15] tracking-tight text-[#244633] mb-10 scroll-fade-in-up ${isVisible ? "animate" : ""}`}
          style={{
            fontFamily: "var(--font-serif)",
            transitionDelay: "150ms",
          }}
        >
          Discover Your Next
          <br />
          <span className="italic font-light">Favourite Read</span>
        </h2>

        {/* Bento asymmetric grid: 1 large + 2 small stacked */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          {/* Large card - spans 3 columns */}
          <div
            className={`lg:col-span-3 scroll-fade-in-up ${isVisible ? "animate" : ""}`}
            style={{ transitionDelay: "300ms" }}
          >
            <div className="h-full rounded-2xl border border-[#789D72]/15 bg-white p-8 md:p-10 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center justify-center h-11 w-11 rounded-xl bg-[#244633]/5 mb-6">
                  <SparkleIcon
                    className="h-5 w-5 text-[#244633]"
                    weight="duotone"
                  />
                </div>
                <h3
                  className="text-xl md:text-2xl text-[#244633] mb-3"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  Personalized Recommendations
                </h3>
                <p className="text-[#244633]/55 leading-relaxed max-w-[420px]">
                  Search millions of books through Google Books API. Find your
                  next read based on what you love — covers, descriptions, and
                  details are automatically populated.
                </p>
              </div>

              {/* Mock recommendation cards */}
              <div className="mt-8 flex gap-3 overflow-hidden">
                {[
                  {
                    title: "The Midnight Library",
                    author: "Matt Haig",
                    color: "#244633",
                  },
                  {
                    title: "Klara and the Sun",
                    author: "Kazuo Ishiguro",
                    color: "#526D5E",
                  },
                  {
                    title: "Piranesi",
                    author: "Susanna Clarke",
                    color: "#789D72",
                  },
                ].map((book) => (
                  <div
                    key={book.title}
                    className="flex-shrink-0 w-[140px] rounded-xl border border-[#789D72]/10 overflow-hidden"
                  >
                    <div
                      className="h-[180px] flex items-end p-3"
                      style={{ backgroundColor: `${book.color}10` }}
                    >
                      <div
                        className="w-full h-[140px] rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: book.color }}
                      >
                        <span className="text-white/80 text-[10px] font-mono tracking-wider text-center px-2 leading-tight">
                          {book.title.toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <div className="p-2.5">
                      <p className="text-xs font-medium text-[#244633] truncate">
                        {book.title}
                      </p>
                      <p className="text-[10px] text-[#244633]/40">
                        {book.author}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Two small stacked cards - span 2 columns */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {/* Small card 1: Genre exploration */}
            <div
              className={`flex-1 scroll-fade-in-up ${isVisible ? "animate" : ""}`}
              style={{ transitionDelay: "450ms" }}
            >
              <div className="h-full rounded-2xl border border-[#789D72]/15 bg-white p-6 md:p-8">
                <div className="inline-flex items-center justify-center h-10 w-10 rounded-xl bg-[#244633]/5 mb-5">
                  <CompassIcon
                    className="h-5 w-5 text-[#244633]"
                    weight="duotone"
                  />
                </div>
                <h3
                  className="text-lg text-[#244633] mb-2"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  Genre Exploration
                </h3>
                <p className="text-sm text-[#244633]/55 leading-relaxed">
                  Browse by genre, search by title or author, and build a
                  wishlist of books you want to read next.
                </p>

                {/* Genre tags */}
                <div className="flex flex-wrap gap-2 mt-5">
                  {["Fiction", "Sci-Fi", "Fantasy", "Memoir", "History"].map(
                    (genre) => (
                      <span
                        key={genre}
                        className="text-[11px] px-2.5 py-1 rounded-full border border-[#789D72]/20 text-[#244633]/60"
                      >
                        {genre}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* Small card 2: Friend suggestions */}
            <div
              className={`flex-1 scroll-fade-in-up ${isVisible ? "animate" : ""}`}
              style={{ transitionDelay: "600ms" }}
            >
              <div className="h-full rounded-2xl border border-[#789D72]/15 bg-white p-6 md:p-8">
                <div className="inline-flex items-center justify-center h-10 w-10 rounded-xl bg-[#244633]/5 mb-5">
                  <UsersThreeIcon
                    className="h-5 w-5 text-[#244633]"
                    weight="duotone"
                  />
                </div>
                <h3
                  className="text-lg text-[#244633] mb-2"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  Friend Suggestions
                </h3>
                <p className="text-sm text-[#244633]/55 leading-relaxed">
                  See what friends are reading and get recommendations based on
                  shared tastes and reading history.
                </p>

                {/* Friend avatars mockup */}
                <div className="flex items-center mt-5">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full border-2 border-white -ml-2 first:ml-0 flex items-center justify-center text-[10px] font-medium text-white"
                      style={{
                        backgroundColor:
                          i === 1
                            ? "#244633"
                            : i === 2
                              ? "#526D5E"
                              : i === 3
                                ? "#789D72"
                                : "#9DB89A",
                      }}
                    >
                      {["A", "M", "J", "S"][i - 1]}
                    </div>
                  ))}
                  <span className="ml-3 text-xs text-[#244633]/40">
                    +12 readers
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
