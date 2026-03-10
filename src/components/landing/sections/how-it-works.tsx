"use client";

import {
  useScrollAnimation,
  useStaggeredScrollAnimation,
} from "@/lib/hooks/useScrollAnimation";
import {
  MagnifyingGlassIcon,
  BookOpenIcon,
  ShareNetworkIcon,
} from "@phosphor-icons/react";

const steps = [
  {
    number: "01",
    icon: MagnifyingGlassIcon,
    title: "Add Books",
    description:
      "Search millions of titles, scan barcodes, or add manually. Your library starts building in seconds.",
  },
  {
    number: "02",
    icon: BookOpenIcon,
    title: "Track & Review",
    description:
      "Log your reading sessions, update page progress, write reviews, and earn achievement badges along the way.",
  },
  {
    number: "03",
    icon: ShareNetworkIcon,
    title: "Share & Celebrate",
    description:
      "Connect with friends, join book clubs, share your reading stats, and celebrate every milestone together.",
  },
];

export const HowItWorksSection = () => {
  const { elementRef: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { elementRef: stepsRef, visibleItems } = useStaggeredScrollAnimation(steps.length);

  return (
    <section id="how-it-works" className="bg-cream py-24 sm:py-32">
      <div className="max-w-[1200px] mx-auto px-6">
        <div
          ref={headerRef as React.RefObject<HTMLDivElement>}
          className={`text-center mb-16 scroll-fade-in-up ${headerVisible ? "animate" : ""}`}
        >
          <p className="text-sm font-medium text-[#789D72] tracking-wider uppercase mb-3">How It Works</p>
          <h2
            className="text-3xl md:text-4xl text-[#244633]"
            style={{ fontFamily: "var(--font-serif)", fontWeight: 600 }}
          >
            Three Steps to Your Reading Journey
          </h2>
        </div>

        <div ref={stepsRef as React.RefObject<HTMLDivElement>} className="relative">
          {/* Connecting line (desktop only) */}
          <div className="hidden md:block absolute top-[72px] left-[16.67%] right-[16.67%] h-px bg-[#789D72]/25" />

          <div className="grid md:grid-cols-3 gap-12 md:gap-8">
            {steps.map(({ number, icon: Icon, title, description }, index) => (
              <div
                key={title}
                className={`text-center scroll-fade-in-up ${visibleItems[index] ? "animate" : ""}`}
                style={{
                  transitionDelay: visibleItems[index] ? `${index * 200}ms` : "0ms",
                }}
              >
                {/* Step circle */}
                <div className="relative inline-flex flex-col items-center">
                  <div className="w-[88px] h-[88px] rounded-full bg-white border-2 border-[#789D72]/25 flex items-center justify-center mb-6 shadow-sm relative z-10">
                    <Icon className="w-8 h-8 text-[#244633]" weight="duotone" />
                  </div>
                  <span
                    className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-[#F5C54E] flex items-center justify-center text-xs font-bold text-[#244633] z-20"
                  >
                    {number}
                  </span>
                </div>

                <h3
                  className="text-xl font-semibold text-[#244633] mb-3"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {title}
                </h3>
                <p className="text-sm text-[#526D5E] leading-relaxed max-w-xs mx-auto">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
