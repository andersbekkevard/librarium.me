"use client";

import {
  useScrollAnimation,
  useStaggeredScrollAnimation,
} from "@/lib/hooks/useScrollAnimation";
import { StarIcon, BookOpenIcon } from "@phosphor-icons/react";

interface Testimonial {
  name: string;
  handle: string;
  quote: string;
  booksRead: number;
  rating: number;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Sarah Chen",
    handle: "@sarahreads",
    quote:
      "Librarium completely changed how I approach reading. The stats are addictive — I've read more this year than in the last three combined.",
    booksRead: 127,
    rating: 5,
    avatar: "SC",
  },
  {
    name: "Marcus Thompson",
    handle: "@marcuswrites",
    quote:
      "The book club feature is what sold me. Our group went from 'we should read more' to actually finishing books together every month.",
    booksRead: 84,
    rating: 5,
    avatar: "MT",
  },
  {
    name: "Lily Nakamura",
    handle: "@lilyandbooks",
    quote:
      "Beautiful, simple, and it just works. I tried five other reading apps before Librarium. This is the one I stuck with.",
    booksRead: 203,
    rating: 5,
    avatar: "LN",
  },
  {
    name: "Anders Eriksen",
    handle: "@anders_reads",
    quote:
      "The achievement badges keep me motivated in a way I didn't expect. Seeing my 30-day streak badge genuinely made my day.",
    booksRead: 56,
    rating: 4,
    avatar: "AE",
  },
];

export const SocialProofSection = () => {
  const { elementRef: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { elementRef: cardsRef, visibleItems } = useStaggeredScrollAnimation(testimonials.length);

  return (
    <section id="testimonials" className="bg-warm-white py-24 sm:py-32">
      <div className="max-w-[1200px] mx-auto px-6">
        <div
          ref={headerRef as React.RefObject<HTMLDivElement>}
          className={`text-center mb-14 scroll-fade-in-up ${headerVisible ? "animate" : ""}`}
        >
          <p className="text-sm font-medium text-[#789D72] tracking-wider uppercase mb-3">Community</p>
          <h2
            className="text-3xl md:text-4xl text-[#244633] mb-4"
            style={{ fontFamily: "var(--font-serif)", fontWeight: 600 }}
          >
            Loved by Readers Everywhere
          </h2>
          <p className="text-lg text-[#526D5E] max-w-xl mx-auto">
            Join thousands of readers who have made Librarium part of their daily routine.
          </p>
        </div>

        <div
          ref={cardsRef as React.RefObject<HTMLDivElement>}
          className="grid sm:grid-cols-2 gap-6"
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className={`scroll-fade-in-up ${visibleItems[index] ? "animate" : ""}`}
              style={{
                transitionDelay: visibleItems[index] ? `${index * 150}ms` : "0ms",
              }}
            >
              <div className="bg-white border border-[#789D72]/15 rounded-2xl p-6 h-full hover-lift">
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon
                      key={i}
                      className="w-4 h-4"
                      weight={i < testimonial.rating ? "fill" : "regular"}
                      style={{ color: i < testimonial.rating ? "#F5C54E" : "#d4d4d4" }}
                    />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-[#244633] leading-relaxed mb-6">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#244633] flex items-center justify-center text-sm font-medium text-[#FEF3C7]">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#244633]">{testimonial.name}</p>
                      <p className="text-xs text-[#526D5E]">{testimonial.handle}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-[#526D5E]">
                    <BookOpenIcon className="w-3.5 h-3.5" weight="duotone" />
                    <span>{testimonial.booksRead} books</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
