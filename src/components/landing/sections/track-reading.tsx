"use client";

import {
  BookmarkSimpleIcon,
  ChartLineUpIcon,
  HighlighterCircleIcon,
  CameraIcon,
  ArrowsClockwiseIcon,
} from "@phosphor-icons/react";

const features = [
  {
    icon: ChartLineUpIcon,
    title: "Individual reading goals",
    description: "Set yearly goals and track your progress over time.",
    span: "col-span-1",
  },
  {
    icon: BookmarkSimpleIcon,
    title: "Keep track & create shelves",
    description:
      "Organise your books into custom shelves. Track what you're reading, what you've finished, and what's next.",
    span: "col-span-1 md:col-span-2",
    features: [
      "Currently reading",
      "Want to read",
      "Finished",
      "Custom shelves",
    ],
  },
  {
    icon: ArrowsClockwiseIcon,
    title: "Import from Goodreads",
    description: "Bring your existing library over in seconds. We support CSV imports from Goodreads and StoryGraph.",
    span: "col-span-1",
  },
  {
    icon: HighlighterCircleIcon,
    title: "Create highlights & notes",
    description:
      "Save your favourite passages and add personal notes as you read.",
    span: "col-span-1",
  },
  {
    icon: CameraIcon,
    title: "Scan books with your camera",
    description:
      "Point your camera at a barcode to instantly add books to your library.",
    span: "col-span-1",
  },
];

export const TrackReadingSection = () => {
  return (
    <section className="py-20 bg-white dark:bg-background">
      <div className="max-w-[1100px] mx-auto px-6">
        <h2
          className="text-2xl sm:text-3xl font-bold text-center mb-12 tracking-tight"
          style={{ fontFamily: "var(--font-geist-sans)" }}
        >
          Track your reading progress &<br className="hidden sm:block" /> bring
          your library online
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className={`${feature.span} bg-[#F7F7F7] dark:bg-card rounded-2xl p-6 hover:shadow-md transition-shadow duration-300`}
              >
                <div className="w-10 h-10 bg-[#244633]/10 rounded-xl flex items-center justify-center mb-4">
                  <Icon
                    className="w-5 h-5 text-[#244633] dark:text-brand-accent"
                    weight="duotone"
                  />
                </div>
                <h3
                  className="text-base font-semibold mb-2"
                  style={{ fontFamily: "var(--font-geist-sans)" }}
                >
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
                {feature.features && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {feature.features.map((f) => (
                      <span
                        key={f}
                        className="text-xs bg-white dark:bg-background px-3 py-1.5 rounded-lg text-muted-foreground border border-border/40"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
