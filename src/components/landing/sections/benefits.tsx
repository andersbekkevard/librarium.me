import { BookOpenTextIcon, CompassToolIcon, NotepadIcon, SparkleIcon } from "@phosphor-icons/react";

const pillars = [
  {
    icon: BookOpenTextIcon,
    title: "Curated Shelfkeeping",
    copy: "Build a personal catalog where every title has context: state, ownership, and pace.",
  },
  {
    icon: CompassToolIcon,
    title: "Discovery Without Noise",
    copy: "Pull rich metadata from Google Books and keep your collection clean from day one.",
  },
  {
    icon: NotepadIcon,
    title: "Progress With Memory",
    copy: "Track pages, ratings, and milestones so your history becomes a useful archive.",
  },
  {
    icon: SparkleIcon,
    title: "Daily Literary Momentum",
    copy: "Receive concise AI motivation shaped by your real reading behavior and current stack.",
  },
];

export const BenefitsSection = () => {
  return (
    <section id="benefits" className="landing-shell section-spacing">
      <div className="mb-12 grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
        <div className="reveal-up">
          <p className="landing-section-label">Approach</p>
          <h2 className="landing-section-title">A quieter, sharper way to manage a library.</h2>
        </div>
        <p className="reveal-up delay-1 text-muted-foreground">
          Variant A uses editorial pacing: large headlines, disciplined spacing, and tactile surfaces that echo printed
          culture while staying entirely digital.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {pillars.map((pillar, index) => {
          const Icon = pillar.icon;
          return (
            <article key={pillar.title} className={`landing-card reveal-up delay-${(index % 3) + 1}`}>
              <span className="landing-card-icon">
                <Icon className="h-5 w-5" weight="duotone" />
              </span>
              <h3 className="font-heading text-2xl leading-tight">{pillar.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{pillar.copy}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
};
