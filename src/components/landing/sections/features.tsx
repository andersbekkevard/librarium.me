"use client";

import {
  BookStackDoodle,
  ReadingGlassesDoodle,
  SparklesDoodle,
  StarDoodle,
  BookmarkDoodle,
} from "@/components/landing/doodles";
import { useScrollAnimation } from "@/lib/hooks/useScrollAnimation";

const features = [
  {
    title: "Page-by-page progress",
    description:
      "Log exactly where you are. See a beautiful progress bar fill up as you read through every chapter.",
    Doodle: BookmarkDoodle,
    color: "#789D72",
  },
  {
    title: "Your personal library",
    description:
      "Organize books into shelves, filter by status, sort by date. Everything in one tidy place.",
    Doodle: BookStackDoodle,
    color: "#244633",
  },
  {
    title: "Book discovery",
    description:
      "Search millions of titles via Google Books. Scan a barcode or type a title \u2014 we\u2019ll find it.",
    Doodle: ReadingGlassesDoodle,
    color: "#5C82B5",
  },
  {
    title: "Reading statistics",
    description:
      "Pages per day, books per month, reading streaks. Watch your habits form into something beautiful.",
    Doodle: SparklesDoodle,
    color: "#D4A843",
  },
  {
    title: "Rate & review",
    description:
      "Give every book a star rating. Write notes for future-you about what you loved (or didn\u2019t).",
    Doodle: StarDoodle,
    color: "#C44536",
  },
];

export function FeaturesSection() {
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section id="features" className="py-20 md:py-28 bg-nook-cream-dark/50">
      <div className="mx-auto max-w-[720px] px-6">
        <div
          ref={elementRef as React.RefObject<HTMLDivElement>}
          className={`text-center mb-14 scroll-fade-in-up ${isVisible ? "animate" : ""}`}
        >
          <h2 className="text-display mb-4 text-nook-forest">
            Everything you need,{" "}
            <span className="italic">nothing you don&apos;t</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-[480px] mx-auto">
            Built for readers who want to enjoy their books, not manage a
            spreadsheet.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {features.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  feature,
  index,
}: {
  feature: (typeof features)[number];
  index: number;
}) {
  const { elementRef, isVisible } = useScrollAnimation({
    threshold: 0.2,
    rootMargin: `0px 0px -${20 + index * 15}px 0px`,
  });

  const DoodleIcon = feature.Doodle;

  return (
    <div
      ref={elementRef as React.RefObject<HTMLDivElement>}
      className={`scroll-fade-in-up ${isVisible ? "animate" : ""} bg-card rounded-2xl p-5 md:p-6 border border-border/40 shadow-sm flex items-start gap-4 hover-lift`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div
        className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
        style={{ backgroundColor: `${feature.color}15` }}
      >
        <DoodleIcon className="w-7 h-7" color={feature.color} />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-nook-forest mb-1 font-heading">
          {feature.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {feature.description}
        </p>
      </div>
    </div>
  );
}
