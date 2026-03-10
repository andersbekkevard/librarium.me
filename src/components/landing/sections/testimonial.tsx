"use client";

import { useScrollAnimation } from "@/lib/hooks/useScrollAnimation";

const testimonials = [
  {
    quote:
      "I finally stopped losing track of what page I was on across five different books. Librarium just gets it.",
    name: "Emilie K.",
    detail: "28 books this year",
    bookColor: "#789D72",
  },
  {
    quote:
      "It\u2019s like having a cozy reading journal that lives in your pocket. The stats are addictive in the best way.",
    name: "Jakob R.",
    detail: "42-day reading streak",
    bookColor: "#244633",
  },
  {
    quote:
      "No noise, no social pressure \u2014 just a beautiful way to track my reading. Exactly what I wanted.",
    name: "Thea M.",
    detail: "Shelf organizer extraordinaire",
    bookColor: "#5C82B5",
  },
];

export function TestimonialSection() {
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.15 });

  return (
    <section id="testimonials" className="py-20 md:py-28">
      <div className="mx-auto max-w-[720px] px-6">
        <div
          ref={elementRef as React.RefObject<HTMLDivElement>}
          className={`text-center mb-14 scroll-fade-in-up ${isVisible ? "animate" : ""}`}
        >
          <h2 className="text-display mb-4 text-nook-forest">
            Readers are <span className="italic">loving</span> it
          </h2>
          <p className="text-lg text-muted-foreground">
            Don&apos;t just take our word for it.
          </p>
        </div>

        <div className="flex flex-col gap-5">
          {testimonials.map((testimonial, i) => (
            <TestimonialCard
              key={testimonial.name}
              testimonial={testimonial}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: (typeof testimonials)[number];
  index: number;
}) {
  const { elementRef, isVisible } = useScrollAnimation({
    threshold: 0.2,
    rootMargin: `0px 0px -${30 + index * 20}px 0px`,
  });

  return (
    <div
      ref={elementRef as React.RefObject<HTMLDivElement>}
      className={`scroll-fade-in-up ${isVisible ? "animate" : ""} bg-card rounded-3xl p-6 md:p-8 border border-border/30 shadow-sm relative`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      {/* Decorative book accent */}
      <div
        className="absolute top-6 right-6 w-8 h-12 rounded-md opacity-20"
        style={{ backgroundColor: testimonial.bookColor }}
      />

      {/* Quote */}
      <blockquote className="font-heading text-lg md:text-xl italic text-foreground/85 leading-relaxed mb-5">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>

      {/* Attribution */}
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold"
          style={{ backgroundColor: testimonial.bookColor }}
        >
          {testimonial.name[0]}
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">
            {testimonial.name}
          </p>
          <p className="text-xs text-muted-foreground">{testimonial.detail}</p>
        </div>
      </div>
    </div>
  );
}
