"use client";

import { ScrollReveal, StaggerContainer, StaggerChild } from "./scroll-reveal";

const feedItems = [
  {
    name: "Sarah Chen",
    initials: "SC",
    action: "finished reading",
    book: "The Midnight Library",
    author: "Matt Haig",
    time: "2h ago",
    color: "bg-brand-primary dark:bg-brand-accent",
    pages: 304,
  },
  {
    name: "Alex Rivera",
    initials: "AR",
    action: "started a challenge",
    book: "30-Day Reading Sprint",
    author: "",
    time: "4h ago",
    color: "bg-golden-amber",
    pages: null,
  },
  {
    name: "Marcus Webb",
    initials: "MW",
    action: "is 67% through",
    book: "Project Hail Mary",
    author: "Andy Weir",
    time: "6h ago",
    color: "bg-brand-secondary",
    pages: 476,
  },
  {
    name: "Lina Park",
    initials: "LP",
    action: "added to library",
    book: "Tomorrow, and Tomorrow, and Tomorrow",
    author: "Gabrielle Zevin",
    time: "8h ago",
    color: "bg-brand-accent dark:bg-brand-primary",
    pages: 416,
  },
];

export function ChapterFeed() {
  return (
    <section className="py-20 md:py-32 px-6 md:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 md:gap-20 items-start">
          {/* Left: Editorial copy */}
          <div className="md:sticky md:top-32">
            <ScrollReveal>
              <h2 className="font-heading font-bold text-4xl md:text-5xl leading-tight tracking-tight text-foreground mb-6">
                Reading is better
                <br />
                <span className="text-brand-primary dark:text-brand-accent">together.</span>
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                See what friends are reading in real-time. Celebrate their
                milestones, share recommendations, and find your next great read
                through the people you trust most.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex -space-x-2">
                  {["SC", "AR", "MW"].map((initials, i) => (
                    <div
                      key={initials}
                      className="w-8 h-8 rounded-full border-2 border-background flex items-center justify-center text-[10px] font-medium text-white bg-brand-primary dark:bg-brand-accent"
                      style={{ zIndex: 3 - i }}
                    >
                      {initials}
                    </div>
                  ))}
                </div>
                <span>2,847 readers active this week</span>
              </div>
            </ScrollReveal>
          </div>

          {/* Right: Mock feed */}
          <StaggerContainer className="space-y-4" staggerDelay={0.12}>
            {feedItems.map((item) => (
              <StaggerChild key={item.name}>
                <div className="bg-white dark:bg-[rgba(255,255,255,0.04)] rounded-xl p-5 border border-[rgba(36,70,51,0.08)] dark:border-[rgba(120,157,114,0.08)] hover:border-[rgba(36,70,51,0.15)] dark:hover:border-[rgba(120,157,114,0.15)] transition-colors duration-300 group">
                  <div className="flex items-start gap-4">
                    {/* Avatar */}
                    <div
                      className={`w-10 h-10 rounded-full ${item.color} flex items-center justify-center text-xs font-semibold text-white dark:text-[#0A0F0D] shrink-0`}
                    >
                      {item.initials}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline justify-between gap-2 mb-1">
                        <p className="text-sm font-medium text-foreground truncate">
                          {item.name}
                        </p>
                        <span className="text-xs text-muted-foreground shrink-0">
                          {item.time}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        <span className="lowercase">{item.action}</span>{" "}
                        <span className="font-medium text-foreground">{item.book}</span>
                        {item.author && (
                          <span className="text-muted-foreground"> by {item.author}</span>
                        )}
                      </p>

                      {/* Progress bar for in-progress books */}
                      {item.action.includes("67%") && (
                        <div className="mt-3 flex items-center gap-3">
                          <div className="flex-1 h-1.5 rounded-full bg-brand-primary/10 dark:bg-brand-accent/10 overflow-hidden">
                            <div
                              className="h-full rounded-full bg-brand-primary dark:bg-brand-accent transition-all duration-1000"
                              style={{ width: "67%" }}
                            />
                          </div>
                          <span className="text-xs font-mono text-muted-foreground">
                            67%
                          </span>
                        </div>
                      )}

                      {/* Page count for completed books */}
                      {item.action === "finished reading" && item.pages && (
                        <div className="mt-2 inline-flex items-center gap-1.5 text-xs text-golden-amber font-mono">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          {item.pages} pages completed
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </StaggerChild>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
