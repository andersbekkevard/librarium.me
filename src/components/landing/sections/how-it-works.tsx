"use client";

import { BookDoodle, StarDoodle, HeartDoodle } from "@/components/landing/doodles";
import { useScrollAnimation } from "@/lib/hooks/useScrollAnimation";

const steps = [
  {
    number: "1",
    title: "Track",
    description: "Add books to your shelf and log your progress page by page. Watch your reading stats grow as you go.",
    Doodle: BookDoodle,
    color: "#789D72",
    bgColor: "bg-nook-sage/10",
  },
  {
    number: "2",
    title: "Discover",
    description: "Search millions of books via Google Books. Find your next favorite read based on what you already love.",
    Doodle: StarDoodle,
    color: "#244633",
    bgColor: "bg-nook-forest/5",
  },
  {
    number: "3",
    title: "Share",
    description: "See what friends are reading, share your shelves, and celebrate finishing a great book together.",
    Doodle: HeartDoodle,
    color: "#A7D7C5",
    bgColor: "bg-nook-mint/15",
  },
];

export function HowItWorksSection() {
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.15 });

  return (
    <section id="how-it-works" className="py-20 md:py-28">
      <div className="mx-auto max-w-[720px] px-6">
        <div
          ref={elementRef as React.RefObject<HTMLDivElement>}
          className={`text-center mb-14 scroll-fade-in-up ${isVisible ? "animate" : ""}`}
        >
          <h2 className="text-display mb-4 text-nook-forest">
            Simple as <span className="italic">curling up</span> with a book
          </h2>
          <p className="text-lg text-muted-foreground max-w-[480px] mx-auto">
            Three steps to a richer reading life. No complicated setup, no noise.
          </p>
        </div>

        <div className="flex flex-col gap-5">
          {steps.map((step, i) => (
            <StepCard key={step.number} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StepCard({
  step,
  index,
}: {
  step: (typeof steps)[number];
  index: number;
}) {
  const { elementRef, isVisible } = useScrollAnimation({
    threshold: 0.2,
    rootMargin: `0px 0px -${30 + index * 20}px 0px`,
  });

  const DoodleIcon = step.Doodle;

  return (
    <div
      ref={elementRef as React.RefObject<HTMLDivElement>}
      className={`scroll-fade-in-up ${isVisible ? "animate" : ""} ${step.bgColor} rounded-3xl p-6 md:p-8 flex items-start gap-5 hover-lift`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Doodle icon */}
      <div className="shrink-0 w-14 h-14 md:w-16 md:h-16 flex items-center justify-center">
        <DoodleIcon className="w-10 h-10 md:w-12 md:h-12" color={step.color} />
      </div>

      <div>
        {/* Step number + title */}
        <div className="flex items-baseline gap-2 mb-2">
          <span
            className="text-sm font-bold font-heading opacity-50"
            style={{ color: step.color }}
          >
            {step.number}.
          </span>
          <h3 className="text-xl md:text-2xl text-nook-forest">{step.title}</h3>
        </div>
        <p className="text-base text-foreground/75 leading-relaxed">
          {step.description}
        </p>
      </div>
    </div>
  );
}
