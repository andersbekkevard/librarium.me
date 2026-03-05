import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  useScrollAnimation,
  useStaggeredScrollAnimation,
} from "@/lib/hooks/useScrollAnimation";

interface ServiceTrack {
  title: string;
  state: "Live" | "Roadmap";
  description: string;
}

const serviceTracks: ServiceTrack[] = [
  {
    title: "Google Books Ingestion",
    state: "Live",
    description:
      "Metadata enrichment pipeline that reduces manual entry and keeps book records complete.",
  },
  {
    title: "Firebase Auth + Sync",
    state: "Live",
    description:
      "Secure Google sign-in and cloud-backed persistence for reliable multi-device continuity.",
  },
  {
    title: "Advanced Reading Analytics",
    state: "Roadmap",
    description:
      "Expanded trend lenses for genre behavior, pacing patterns, and deeper long-term reading intelligence.",
  },
  {
    title: "Shared Shelves",
    state: "Roadmap",
    description:
      "Optional social layer for exchanging recommendations while preserving core personal-library focus.",
  },
];

export const ServicesSection = () => {
  const { elementRef: headerRef, isVisible: headerVisible } =
    useScrollAnimation();
  const { elementRef: cardsRef, visibleItems } = useStaggeredScrollAnimation(
    serviceTracks.length
  );

  return (
    <section id="services" className="container py-16 md:py-24">
      <div
        ref={headerRef as React.RefObject<HTMLDivElement>}
        className={`scroll-fade-in-up mb-10 text-center ${headerVisible ? "animate" : ""}`}
      >
        <p className="landing-ui mb-3 text-xs uppercase tracking-[0.2em] text-primary/70">
          Platform Flow
        </p>
        <h2 className="landing-display text-4xl md:text-5xl">Live foundations, clear next chapter.</h2>
      </div>

      <div
        ref={cardsRef as React.RefObject<HTMLDivElement>}
        className="grid gap-4 lg:grid-cols-2"
      >
        {serviceTracks.map(({ title, description, state }, index) => (
          <Card
            key={title}
            className={`scroll-fade-in-up rounded-3xl border-primary/10 bg-[linear-gradient(165deg,rgba(255,255,255,0.82),rgba(234,246,239,0.58))] shadow-[0_14px_30px_rgba(34,68,51,0.08)] dark:bg-card ${
              visibleItems[index] ? "animate" : ""
            }`}
            style={{
              transitionDelay: visibleItems[index] ? `${index * 140}ms` : "0ms",
            }}
          >
            <CardHeader>
              <div className="flex items-center justify-between gap-4">
                <CardTitle className="landing-display text-3xl leading-tight">{title}</CardTitle>
                <Badge
                  className={
                    state === "Live"
                      ? "landing-ui border border-primary/25 bg-primary/15 text-primary"
                      : "landing-ui border border-border bg-background/70 text-muted-foreground"
                  }
                >
                  {state}
                </Badge>
              </div>
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
