"use client";

import { useScrollAnimation } from "@/lib/hooks/useScrollAnimation";
import { BookOpenIcon, UsersIcon, StarIcon, GlobeIcon } from "@phosphor-icons/react";

const stats = [
  { icon: UsersIcon, value: "50,000+", label: "Readers" },
  { icon: BookOpenIcon, value: "2.1M", label: "Books Tracked" },
  { icon: StarIcon, value: "890K", label: "Reviews Written" },
  { icon: GlobeIcon, value: "120+", label: "Countries" },
];

export const TrustStripSection = () => {
  const { elementRef, isVisible } = useScrollAnimation();

  return (
    <section className="bg-cream py-12 md:py-16">
      <div
        ref={elementRef as React.RefObject<HTMLDivElement>}
        className={`max-w-[1200px] mx-auto px-6 scroll-fade-in-up ${isVisible ? "animate" : ""}`}
      >
        <p className="text-center text-sm font-medium text-[#526D5E] tracking-wider uppercase mb-8">
          Join a community of readers who love what they do
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="text-center"
              style={{ transitionDelay: isVisible ? `${index * 100}ms` : "0ms" }}
            >
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[#244633]/8 mb-3">
                <stat.icon className="w-5 h-5 text-[#244633]" weight="duotone" />
              </div>
              <p
                className="text-2xl md:text-3xl font-semibold text-[#244633] mb-1"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                {stat.value}
              </p>
              <p className="text-sm text-[#526D5E]">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
