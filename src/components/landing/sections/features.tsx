"use client";

import {
  useScrollAnimation,
  useStaggeredScrollAnimation,
} from "@/lib/hooks/useScrollAnimation";
import {
  BookOpenIcon,
  UsersIcon,
  BookmarkSimpleIcon,
  ChartBarIcon,
  PencilSimpleIcon,
  TrophyIcon,
} from "@phosphor-icons/react";

interface Feature {
  icon: React.ElementType;
  title: string;
  description: string;
  preview: React.ReactNode;
}

function SmartTrackingPreview() {
  return (
    <div className="mt-4 bg-[#FFF8F0] rounded-xl p-3 space-y-2">
      {[
        { title: "Dune", pages: "412/687", pct: 60 },
        { title: "1984", pages: "298/328", pct: 91 },
      ].map((b) => (
        <div key={b.title} className="flex items-center gap-2">
          <div className="w-5 h-7 rounded bg-[#244633] shrink-0" />
          <div className="flex-1">
            <p className="text-[10px] font-medium text-[#244633]">{b.title}</p>
            <div className="h-1 bg-[#e8e8e4] rounded-full mt-0.5">
              <div className="h-full bg-[#789D72] rounded-full" style={{ width: `${b.pct}%` }} />
            </div>
          </div>
          <span className="text-[9px] text-[#526D5E]">{b.pages}</span>
        </div>
      ))}
    </div>
  );
}

function SocialDiscoveryPreview() {
  return (
    <div className="mt-4 bg-[#FFF8F0] rounded-xl p-3 space-y-2">
      {["Alex", "Mia", "James"].map((name) => (
        <div key={name} className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-[#789D72]/20 flex items-center justify-center text-[8px] font-medium text-[#244633] shrink-0">
            {name[0]}
          </div>
          <p className="text-[10px] text-[#526D5E]">
            <span className="font-medium text-[#244633]">{name}</span> is reading...
          </p>
        </div>
      ))}
    </div>
  );
}

function ReadingClubsPreview() {
  return (
    <div className="mt-4 bg-[#FFF8F0] rounded-xl p-3">
      <div className="flex items-center gap-2 mb-2">
        <div className="flex -space-x-1.5">
          {["S", "M", "L", "J"].map((letter) => (
            <div
              key={letter}
              className="w-4 h-4 rounded-full bg-[#244633] border border-white flex items-center justify-center text-[6px] text-[#FEF3C7] font-medium"
            >
              {letter}
            </div>
          ))}
        </div>
        <span className="text-[9px] text-[#526D5E]">+12 members</span>
      </div>
      <p className="text-[10px] font-medium text-[#244633]">Sci-Fi Book Club</p>
      <p className="text-[9px] text-[#526D5E]">Currently reading: Project Hail Mary</p>
    </div>
  );
}

function PersonalStatsPreview() {
  return (
    <div className="mt-4 bg-[#FFF8F0] rounded-xl p-3">
      <div className="flex items-end gap-1 h-8">
        {[3, 5, 4, 7, 6, 8, 5].map((h, i) => (
          <div
            key={i}
            className="flex-1 bg-[#789D72] rounded-t"
            style={{ height: `${(h / 8) * 100}%`, opacity: 0.5 + (h / 16) }}
          />
        ))}
      </div>
      <p className="text-[9px] text-[#526D5E] mt-1.5 text-center">Books per month</p>
    </div>
  );
}

function BookReviewsPreview() {
  return (
    <div className="mt-4 bg-[#FFF8F0] rounded-xl p-3">
      <div className="flex gap-0.5 mb-1">
        {[1, 2, 3, 4, 5].map((s) => (
          <div key={s} className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: s <= 4 ? "#F5C54E" : "#e8e8e4" }} />
        ))}
      </div>
      <p className="text-[10px] font-medium text-[#244633]">&ldquo;Absolutely captivating...&rdquo;</p>
      <p className="text-[9px] text-[#526D5E] mt-0.5">Your review of Klara and the Sun</p>
    </div>
  );
}

function AchievementBadgesPreview() {
  return (
    <div className="mt-4 bg-[#FFF8F0] rounded-xl p-3">
      <div className="flex gap-2 justify-center">
        {[
          { emoji: "📚", label: "50 Books" },
          { emoji: "🔥", label: "30-day streak" },
          { emoji: "⭐", label: "Top Reviewer" },
        ].map((badge) => (
          <div key={badge.label} className="text-center">
            <div className="w-8 h-8 rounded-full bg-[#F5C54E]/20 flex items-center justify-center text-sm mb-0.5">
              {badge.emoji}
            </div>
            <p className="text-[7px] text-[#526D5E]">{badge.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const featureList: Feature[] = [
  {
    icon: BookOpenIcon,
    title: "Smart Tracking",
    description:
      "Track your reading progress page by page. Set goals, log sessions, and watch your library grow with every chapter.",
    preview: <SmartTrackingPreview />,
  },
  {
    icon: UsersIcon,
    title: "Social Discovery",
    description:
      "See what friends are reading, share recommendations, and discover your next favorite book through your community.",
    preview: <SocialDiscoveryPreview />,
  },
  {
    icon: BookmarkSimpleIcon,
    title: "Reading Clubs",
    description:
      "Create or join book clubs, participate in group reads, and discuss chapters together with synchronized progress.",
    preview: <ReadingClubsPreview />,
  },
  {
    icon: ChartBarIcon,
    title: "Personal Stats",
    description:
      "Beautiful analytics that reveal your reading patterns. Monthly trends, genre breakdowns, and yearly reading reports.",
    preview: <PersonalStatsPreview />,
  },
  {
    icon: PencilSimpleIcon,
    title: "Book Reviews",
    description:
      "Write thoughtful reviews, rate your reads, and build a personal archive of literary reflections and notes.",
    preview: <BookReviewsPreview />,
  },
  {
    icon: TrophyIcon,
    title: "Achievement Badges",
    description:
      "Earn badges for reading milestones — streaks, genres explored, books finished, and community contributions.",
    preview: <AchievementBadgesPreview />,
  },
];

export const FeaturesSection = () => {
  const { elementRef: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { elementRef: cardsRef, visibleItems } = useStaggeredScrollAnimation(featureList.length);

  return (
    <section id="features" className="bg-warm-white py-24 sm:py-32">
      <div className="max-w-[1200px] mx-auto px-6">
        <div
          ref={headerRef as React.RefObject<HTMLDivElement>}
          className={`text-center mb-14 scroll-fade-in-up ${headerVisible ? "animate" : ""}`}
        >
          <p className="text-sm font-medium text-[#789D72] tracking-wider uppercase mb-3">Features</p>
          <h2
            className="text-3xl md:text-4xl text-[#244633] mb-4"
            style={{ fontFamily: "var(--font-serif)", fontWeight: 600 }}
          >
            Everything a Reader Needs
          </h2>
          <p className="text-lg text-[#526D5E] max-w-2xl mx-auto">
            From personal tracking to social discovery, Librarium brings together the tools
            that make reading more enjoyable and rewarding.
          </p>
        </div>

        <div ref={cardsRef as React.RefObject<HTMLDivElement>} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featureList.map(({ icon: Icon, title, description, preview }, index) => (
            <div
              key={title}
              className={`scroll-fade-in-up ${visibleItems[index] ? "animate" : ""}`}
              style={{
                transitionDelay: visibleItems[index] ? `${index * 150}ms` : "0ms",
              }}
            >
              <div className="bg-white border border-[#789D72]/15 rounded-2xl p-6 h-full hover-lift group">
                <div className="w-11 h-11 rounded-xl bg-[#244633]/8 flex items-center justify-center mb-4 group-hover:bg-[#244633]/12 transition-colors">
                  <Icon className="w-5 h-5 text-[#244633]" weight="duotone" />
                </div>
                <h3
                  className="text-lg font-semibold text-[#244633] mb-2"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {title}
                </h3>
                <p className="text-sm text-[#526D5E] leading-relaxed">{description}</p>
                {preview}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
