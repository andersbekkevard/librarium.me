import { Card, CardContent } from "@/components/ui/card";
import {
  useScrollAnimation,
  useStaggeredScrollAnimation,
} from "@/lib/hooks/useScrollAnimation";
import { BookOpenIcon, LeafIcon, NotebookIcon, TrendUpIcon } from "@phosphor-icons/react";

interface RhythmItem {
  icon: React.ReactElement;
  title: string;
  description: string;
}

const rhythmItems: RhythmItem[] = [
  {
    icon: <BookOpenIcon className="h-5 w-5" weight="duotone" />,
    title: "Collect with clarity",
    description:
      "Bring print, digital, and wishlist books into one shelf architecture that stays clean as your library grows.",
  },
  {
    icon: <TrendUpIcon className="h-5 w-5" weight="duotone" />,
    title: "Measure real momentum",
    description:
      "Page-level progress and state transitions turn scattered reading sessions into a meaningful personal pace.",
  },
  {
    icon: <NotebookIcon className="h-5 w-5" weight="duotone" />,
    title: "Remember what mattered",
    description:
      "Anchor comments and reviews to the exact moment in a book so insights are never detached from context.",
  },
  {
    icon: <LeafIcon className="h-5 w-5" weight="duotone" />,
    title: "Stay calm and private",
    description:
      "Your reading data is yours. Librarium keeps the interface quiet and the underlying architecture robust.",
  },
];

export const BenefitsSection = () => {
  const { elementRef: titleRef, isVisible: titleVisible } = useScrollAnimation({
    threshold: 0.25,
    rootMargin: "0px 0px -140px 0px",
  });

  const { elementRef: cardsRef, visibleItems } = useStaggeredScrollAnimation(
    rhythmItems.length,
    {
      threshold: 0.2,
      rootMargin: "0px 0px -120px 0px",
    }
  );

  return (
    <section id="benefits" className="container py-16 md:py-24">
      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
        <div
          ref={titleRef as React.RefObject<HTMLDivElement>}
          className={`scroll-slide-in-left ${titleVisible ? "animate" : ""}`}
        >
          <p className="landing-ui mb-3 text-xs uppercase tracking-[0.2em] text-primary/70">
            Reading Rhythm
          </p>
          <h2 className="landing-display text-4xl leading-tight md:text-5xl">
            Every session leaves
            <br />
            a clear trace.
          </h2>
          <p className="landing-ui mt-5 max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
            Librarium balances tactile warmth with analytical precision so your
            library feels lived in, not just stored.
          </p>
        </div>

        <div
          ref={cardsRef as React.RefObject<HTMLDivElement>}
          className="grid gap-4 sm:grid-cols-2"
        >
          {rhythmItems.map(({ icon, title, description }, index) => (
            <Card
              key={title}
              className={`scroll-fade-in-up rounded-3xl border-primary/10 bg-background/70 shadow-[0_12px_30px_rgba(34,68,51,0.06)] backdrop-blur-sm ${
                visibleItems[index] ? "animate" : ""
              }`}
              style={{
                transitionDelay: visibleItems[index] ? `${120 * index}ms` : "0ms",
              }}
            >
              <CardContent className="p-6">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  {icon}
                </div>
                <h3 className="landing-display text-2xl">{title}</h3>
                <p className="landing-ui mt-3 text-sm leading-relaxed text-muted-foreground">
                  {description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
