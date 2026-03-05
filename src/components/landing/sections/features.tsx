import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  useScrollAnimation,
  useStaggeredScrollAnimation,
} from "@/lib/hooks/useScrollAnimation";
import {
  BookBookmarkIcon,
  ChartLineUpIcon,
  ClockCounterClockwiseIcon,
  MagnifyingGlassIcon,
  SparkleIcon,
  StarIcon,
} from "@phosphor-icons/react";

interface FeatureItem {
  icon: React.ReactElement;
  title: string;
  description: string;
}

const featureList: FeatureItem[] = [
  {
    icon: <ClockCounterClockwiseIcon className="h-5 w-5" weight="duotone" />,
    title: "State-aware progress",
    description:
      "Move naturally from not-started to in-progress to finished with clear transitions and reliable history.",
  },
  {
    icon: <BookBookmarkIcon className="h-5 w-5" weight="duotone" />,
    title: "Structured personal shelves",
    description:
      "Sort and filter by status, ownership, and metadata to quickly navigate a serious personal catalog.",
  },
  {
    icon: <MagnifyingGlassIcon className="h-5 w-5" weight="duotone" />,
    title: "Google Books discovery",
    description:
      "Search millions of records and import rich metadata with covers, page counts, and descriptions.",
  },
  {
    icon: <StarIcon className="h-5 w-5" weight="duotone" />,
    title: "Memory through ratings",
    description:
      "Use simple post-read ratings to remember impact, compare genres, and surface favorites over time.",
  },
  {
    icon: <ChartLineUpIcon className="h-5 w-5" weight="duotone" />,
    title: "Live reading analytics",
    description:
      "Track pages read, active books, and reading velocity with dashboards tuned for weekly reflection.",
  },
  {
    icon: <SparkleIcon className="h-5 w-5" weight="duotone" />,
    title: "Daily AI motivation",
    description:
      "Receive personalized encouragement generated from your own reading trajectory and current habits.",
  },
];

export const FeaturesSection = () => {
  const { elementRef: headerRef, isVisible: headerVisible } =
    useScrollAnimation();
  const { elementRef: cardsRef, visibleItems } = useStaggeredScrollAnimation(
    featureList.length
  );

  return (
    <section id="features" className="container py-16 md:py-24">
      <div
        ref={headerRef as React.RefObject<HTMLDivElement>}
        className={`scroll-fade-in-up mb-10 text-center ${headerVisible ? "animate" : ""}`}
      >
        <p className="landing-ui mb-3 text-xs uppercase tracking-[0.2em] text-primary/70">
          Essential Surface
        </p>
        <h2 className="landing-display text-4xl md:text-5xl">Tools that feel crafted, not crowded.</h2>
        <p className="landing-ui mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
          The landing experience mirrors the app itself: editorial calm, high
          signal, and precise functionality for active readers.
        </p>
      </div>

      <div
        ref={cardsRef as React.RefObject<HTMLDivElement>}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {featureList.map(({ icon, title, description }, index) => (
          <Card
            key={title}
            className={`scroll-fade-in-up rounded-3xl border-primary/10 bg-background/75 shadow-[0_14px_34px_rgba(28,60,42,0.08)] ${
              visibleItems[index] ? "animate" : ""
            }`}
            style={{
              transitionDelay: visibleItems[index] ? `${index * 120}ms` : "0ms",
            }}
          >
            <CardHeader className="pb-2">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                {icon}
              </div>
              <CardTitle className="landing-display text-[1.45rem] leading-tight">
                {title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="landing-ui text-sm leading-relaxed text-muted-foreground">
                {description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
