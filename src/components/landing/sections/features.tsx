import { ChartBarIcon, ClockCounterClockwiseIcon, MagnifyingGlassIcon, StarIcon } from "@phosphor-icons/react";

const features = [
  {
    title: "Readable Dashboard",
    description: "A concise overview of books in progress, completed titles, and pages covered.",
    icon: ChartBarIcon,
  },
  {
    title: "Fast Intake Flow",
    description: "Search, inspect, and add books from Google Books with metadata filled in automatically.",
    icon: MagnifyingGlassIcon,
  },
  {
    title: "Stateful Reading",
    description: "Progress books through not started, in progress, and finished with strict state handling.",
    icon: ClockCounterClockwiseIcon,
  },
  {
    title: "Personal Taste Memory",
    description: "Store ratings and notes so every book leaves a useful trace.",
    icon: StarIcon,
  },
];

export const FeaturesSection = () => {
  return (
    <section id="features" className="landing-shell section-spacing">
      <div className="mb-10 flex flex-col gap-4 reveal-up">
        <p className="landing-section-label">Feature Index</p>
        <h2 className="landing-section-title">Everything you need for a modern reading habit.</h2>
      </div>

      <div className="grid gap-4 lg:grid-cols-4">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <article key={feature.title} className={`landing-panel reveal-up delay-${(index % 3) + 1}`}>
              <p className="text-[0.66rem] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                {String(index + 1).padStart(2, "0")}
              </p>
              <Icon className="mt-4 h-5 w-5 text-brand-primary" weight="duotone" />
              <h3 className="mt-4 font-heading text-xl">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
};
