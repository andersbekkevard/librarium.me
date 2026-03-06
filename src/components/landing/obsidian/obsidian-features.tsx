"use client";

import { useEffect, useRef } from "react";
import {
  BookOpenIcon,
  ChartBarIcon,
  MagnifyingGlassIcon,
  BarcodeIcon,
  UsersIcon,
  StarIcon,
} from "@phosphor-icons/react";

const features = [
  {
    icon: BookOpenIcon,
    title: "Reading Tracker",
    description:
      "Log every session with page counts, dates, and personal notes. Watch your reading velocity unfold in real time.",
    accent: "from-[#C4A265] to-[#8B7035]",
  },
  {
    icon: ChartBarIcon,
    title: "Deep Analytics",
    description:
      "Pages per day, genre distribution, completion rates, reading streaks. Your habits, visualized with precision.",
    accent: "from-[#C4A265] to-[#D4B275]",
  },
  {
    icon: MagnifyingGlassIcon,
    title: "Smart Discovery",
    description:
      "Search millions of titles via Google Books. Add any book to your library in seconds with rich metadata.",
    accent: "from-[#D4B275] to-[#C4A265]",
  },
  {
    icon: BarcodeIcon,
    title: "Barcode Scanner",
    description:
      "Point your camera at any book. ISBN scanning instantly identifies and adds it to your collection.",
    accent: "from-[#8B7035] to-[#C4A265]",
  },
  {
    icon: UsersIcon,
    title: "Shared Libraries",
    description:
      "Share your curated shelves with friends and family. Build reading circles around shared literary taste.",
    accent: "from-[#C4A265] to-[#E8C872]",
  },
  {
    icon: StarIcon,
    title: "Ratings & Reviews",
    description:
      "Rate every book you finish. Write private reviews that become your personal literary journal.",
    accent: "from-[#E8C872] to-[#C4A265]",
  },
];

export function ObsidianFeatures() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("obsidian-visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll(".obsidian-reveal");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="features" ref={sectionRef} className="relative py-32 md:py-40">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_center,_#C4A265_0%,_transparent_70%)] opacity-[0.03]" />

      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <div className="obsidian-reveal text-center mb-20">
          <span className="text-[11px] tracking-[0.3em] uppercase text-[#C4A265]/70 block mb-6">
            Chapter II
          </span>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl text-[#E8E2D4] tracking-tight"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Instruments of the
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C4A265] to-[#E8C872]">
              {" "}devoted reader
            </span>
          </h2>
          <p className="mt-6 max-w-xl mx-auto text-[#8A8478] text-base">
            Every tool is crafted to deepen your relationship with books,
            not distract from it.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="obsidian-reveal group relative p-8 rounded-lg border border-[#1A1A18] bg-[#0E0E0C]/50 hover:border-[#C4A265]/20 transition-all duration-500 hover:bg-[#0E0E0C]"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                {/* Icon */}
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${feature.accent} flex items-center justify-center mb-6 shadow-lg group-hover:shadow-[#C4A265]/10 transition-shadow duration-500`}>
                  <Icon className="h-5 w-5 text-[#0A0A08]" weight="fill" />
                </div>

                {/* Content */}
                <h3
                  className="text-lg text-[#E8E2D4] mb-3 tracking-tight"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {feature.title}
                </h3>
                <p className="text-sm text-[#8A8478] leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover glow */}
                <div className="absolute inset-0 rounded-lg bg-gradient-to-b from-[#C4A265]/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
