"use client";

import { Button } from "@/components/ui/button";
import {
  useScrollAnimation,
  useStaggeredScrollAnimation,
} from "@/lib/hooks/useScrollAnimation";
import { CheckIcon } from "@phosphor-icons/react";

interface PricingPlan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  highlighted: boolean;
  badge?: string;
}

const plans: PricingPlan[] = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Everything you need to start tracking your reading journey.",
    features: [
      "Unlimited book tracking",
      "Reading progress & stats",
      "Star ratings & short reviews",
      "Google Books search",
      "Basic reading statistics",
    ],
    cta: "Get Started Free",
    highlighted: false,
  },
  {
    name: "Plus",
    price: "$5",
    period: "/month",
    description: "For avid readers who want the full social experience.",
    features: [
      "Everything in Free",
      "Reading clubs & group reads",
      "Social feed & friend activity",
      "Advanced analytics & reports",
      "Achievement badges & streaks",
      "Export your reading data",
      "Priority support",
    ],
    cta: "Start Free Trial",
    highlighted: true,
    badge: "Most Popular",
  },
  {
    name: "Premium",
    price: "$12",
    period: "/month",
    description: "For power readers and book club organizers.",
    features: [
      "Everything in Plus",
      "Unlimited book clubs",
      "AI reading recommendations",
      "Annual reading reports",
      "Custom bookshelves & tags",
      "Early access to new features",
      "Dedicated support",
    ],
    cta: "Start Free Trial",
    highlighted: false,
  },
];

export const PricingSection = () => {
  const { elementRef: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { elementRef: cardsRef, visibleItems } = useStaggeredScrollAnimation(plans.length);

  return (
    <section id="pricing" className="bg-cream py-24 sm:py-32">
      <div className="max-w-[1200px] mx-auto px-6">
        <div
          ref={headerRef as React.RefObject<HTMLDivElement>}
          className={`text-center mb-14 scroll-fade-in-up ${headerVisible ? "animate" : ""}`}
        >
          <p className="text-sm font-medium text-[#789D72] tracking-wider uppercase mb-3">Pricing</p>
          <h2
            className="text-3xl md:text-4xl text-[#244633] mb-4"
            style={{ fontFamily: "var(--font-serif)", fontWeight: 600 }}
          >
            Start Free, Grow With Us
          </h2>
          <p className="text-lg text-[#526D5E] max-w-xl mx-auto">
            No credit card required. Upgrade when you&apos;re ready for more.
          </p>
        </div>

        <div
          ref={cardsRef as React.RefObject<HTMLDivElement>}
          className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto items-start"
        >
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`scroll-fade-in-up ${visibleItems[index] ? "animate" : ""}`}
              style={{
                transitionDelay: visibleItems[index] ? `${index * 150}ms` : "0ms",
              }}
            >
              <div
                className={`rounded-2xl p-6 h-full relative ${
                  plan.highlighted
                    ? "bg-[#244633] text-[#FEF3C7] border-2 border-[#789D72] shadow-xl md:-mt-4 md:mb-[-16px] md:py-8"
                    : "bg-white border border-[#789D72]/15"
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-[#F5C54E] text-[#244633] text-xs font-bold px-3 py-1 rounded-full">
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3
                    className={`text-xl font-semibold mb-2 ${plan.highlighted ? "text-[#FEF3C7]" : "text-[#244633]"}`}
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline gap-1 mb-2">
                    <span
                      className={`text-4xl font-bold ${plan.highlighted ? "text-[#FEF3C7]" : "text-[#244633]"}`}
                      style={{ fontFamily: "var(--font-serif)" }}
                    >
                      {plan.price}
                    </span>
                    <span className={`text-sm ${plan.highlighted ? "text-[#FEF3C7]/60" : "text-[#526D5E]"}`}>
                      {plan.period}
                    </span>
                  </div>
                  <p className={`text-sm ${plan.highlighted ? "text-[#FEF3C7]/70" : "text-[#526D5E]"}`}>
                    {plan.description}
                  </p>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <CheckIcon
                        className={`w-4 h-4 mt-0.5 shrink-0 ${plan.highlighted ? "text-[#F5C54E]" : "text-[#789D72]"}`}
                        weight="bold"
                      />
                      <span className={`text-sm ${plan.highlighted ? "text-[#FEF3C7]/85" : "text-[#526D5E]"}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full h-11 rounded-xl font-semibold transition-all ${
                    plan.highlighted
                      ? "bg-[#FEF3C7] text-[#244633] hover:bg-[#fde68a] shadow-md"
                      : "bg-[#244633] text-white hover:bg-[#1a3326]"
                  }`}
                >
                  {plan.cta}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
