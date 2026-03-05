"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  useScrollAnimation,
  useStaggeredScrollAnimation,
} from "@/lib/hooks/useScrollAnimation";
import { QuotesIcon } from "@phosphor-icons/react";

const notes = [
  {
    quote:
      "I stopped juggling notes apps and spreadsheets. Librarium gave me one coherent place to read with intent.",
    person: "Early Reader",
    role: "Non-fiction heavy, 42 books/year",
  },
  {
    quote:
      "The page-by-page history makes my reading habits visible without turning the process into a chore.",
    person: "Beta User",
    role: "Literary fiction + essays",
  },
  {
    quote:
      "The tone feels premium but calm. It stays out of the way and still motivates me every day.",
    person: "Preview Member",
    role: "Night reader, long-form focus",
  },
];

export const TestimonialSection = () => {
  const { elementRef: headerRef, isVisible: headerVisible } =
    useScrollAnimation();
  const { elementRef: cardsRef, visibleItems } = useStaggeredScrollAnimation(
    notes.length
  );

  return (
    <section id="testimonials" className="container py-16 md:py-24">
      <div
        ref={headerRef as React.RefObject<HTMLDivElement>}
        className={`scroll-fade-in-up mb-10 text-center ${headerVisible ? "animate" : ""}`}
      >
        <p className="landing-ui mb-3 text-xs uppercase tracking-[0.2em] text-primary/70">
          Reader Notes
        </p>
        <h2 className="landing-display text-4xl md:text-5xl">Warm, practical, and built for daily use.</h2>
      </div>

      <div
        ref={cardsRef as React.RefObject<HTMLDivElement>}
        className="grid gap-4 md:grid-cols-3"
      >
        {notes.map((item, index) => (
          <Card
            key={item.person}
            className={`scroll-fade-in-up rounded-3xl border-primary/10 bg-background/75 shadow-[0_12px_28px_rgba(34,68,51,0.08)] ${
              visibleItems[index] ? "animate" : ""
            }`}
            style={{
              transitionDelay: visibleItems[index] ? `${index * 150}ms` : "0ms",
            }}
          >
            <CardContent className="p-6">
              <QuotesIcon className="size-7 text-primary/40" weight="fill" />
              <p className="landing-ui mt-4 text-sm leading-relaxed text-foreground/90">
                {item.quote}
              </p>
              <p className="landing-display mt-6 text-2xl">{item.person}</p>
              <p className="landing-ui text-xs uppercase tracking-[0.14em] text-muted-foreground">
                {item.role}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
