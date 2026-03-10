"use client";

import {
  MegaphoneIcon,
  CodeIcon,
  PenNibIcon,
} from "@phosphor-icons/react";

const cards = [
  {
    icon: MegaphoneIcon,
    title: "Features",
    subtitle: "Tell us about your ideas",
    description:
      "Vote on features, suggest improvements, and help us prioritise what to build next. Your voice shapes the product.",
    link: "#",
    linkText: "Visit feature board",
  },
  {
    icon: CodeIcon,
    title: "Developers",
    subtitle: "Build on top of Librarium",
    description:
      "Embed reading lists on your website, access our open API, and build extensions. Librarium is open to tinkerers.",
    link: "#",
    linkText: "View API docs",
  },
  {
    icon: PenNibIcon,
    title: "Creators",
    subtitle: "Made with creators in mind",
    description:
      "Whether you're an author, publisher, or bookseller — Librarium is built to work with the people who make and share books.",
    link: "#",
    linkText: "Learn more",
  },
];

export const HelpBuildSection = () => {
  return (
    <section id="about" className="py-20 bg-[#F7F7F7] dark:bg-card/50">
      <div className="max-w-[1100px] mx-auto px-6">
        <h2
          className="text-2xl sm:text-3xl font-bold text-center mb-12 tracking-tight"
          style={{ fontFamily: "var(--font-geist-sans)" }}
        >
          Help build Librarium
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className="bg-white dark:bg-background rounded-2xl p-6 hover:shadow-md transition-shadow duration-300"
              >
                <div className="w-10 h-10 bg-[#244633]/10 rounded-xl flex items-center justify-center mb-4">
                  <Icon
                    className="w-5 h-5 text-[#244633] dark:text-brand-accent"
                    weight="duotone"
                  />
                </div>
                <div className="text-xs font-medium text-[#244633] dark:text-brand-accent uppercase tracking-wider mb-1">
                  {card.title}
                </div>
                <h3
                  className="text-base font-semibold mb-2"
                  style={{ fontFamily: "var(--font-geist-sans)" }}
                >
                  {card.subtitle}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {card.description}
                </p>
                <a
                  href={card.link}
                  className="text-sm font-medium text-[#244633] dark:text-brand-accent hover:underline"
                >
                  {card.linkText} →
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
