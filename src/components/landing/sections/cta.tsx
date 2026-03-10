"use client";

import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/lib/hooks/useScrollAnimation";
import { ArrowRightIcon } from "@phosphor-icons/react";

export const CTASection = () => {
  const { elementRef, isVisible } = useScrollAnimation();

  return (
    <section className="bg-warm-white py-24 sm:py-32">
      <div className="max-w-[1200px] mx-auto px-6">
        <div
          ref={elementRef as React.RefObject<HTMLDivElement>}
          className={`bg-sage-light rounded-3xl px-8 py-16 md:px-16 md:py-20 text-center relative overflow-hidden scroll-scale-in ${isVisible ? "animate" : ""}`}
        >
          {/* Subtle decorative dots */}
          <div className="absolute top-6 left-8 w-2 h-2 rounded-full bg-[#F5C54E]/30" />
          <div className="absolute top-12 right-16 w-1.5 h-1.5 rounded-full bg-[#789D72]/25" />
          <div className="absolute bottom-10 left-20 w-1.5 h-1.5 rounded-full bg-[#F5C54E]/25" />
          <div className="absolute bottom-8 right-12 w-2 h-2 rounded-full bg-[#789D72]/30" />

          <h2
            className="text-3xl md:text-4xl lg:text-[2.75rem] text-[#244633] mb-6 leading-tight"
            style={{ fontFamily: "var(--font-serif)", fontWeight: 700 }}
          >
            Every Great Story Starts
            <br className="hidden sm:block" />
            With Page One
          </h2>

          <p className="text-lg text-[#526D5E] max-w-lg mx-auto mb-10 leading-relaxed">
            Join thousands of readers who are already tracking their reading journey.
            Your story is waiting to be told.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              className="h-12 px-8 text-base font-semibold rounded-xl bg-[#244633] text-[#FEF3C7] hover:bg-[#1a3326] shadow-lg hover:shadow-xl transition-all"
            >
              Start Reading Free
              <ArrowRightIcon className="size-5 ml-1" />
            </Button>

            <p className="text-sm text-[#526D5E]">
              Free forever. No credit card needed.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
