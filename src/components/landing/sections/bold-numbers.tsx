"use client";

import { useScrollAnimation } from "@/lib/hooks/useScrollAnimation";

export const BoldNumbers = () => {
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.3 });

  return (
    <section className="px-6 md:px-12 lg:px-20 py-20 md:py-28">
      <div
        ref={elementRef as React.RefObject<HTMLDivElement>}
        className={`max-w-[1400px] mx-auto transition-all duration-[800ms] ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <p
          className="text-center text-[#f5f0e8]/50 text-lg md:text-xl lg:text-2xl tracking-[0.05em]"
          style={{ fontFamily: "var(--font-geist-mono)" }}
        >
          <span className="text-[#f5f0e8]">2M+</span> books tracked
          <span className="mx-4 md:mx-6 text-[#526D5E]">&bull;</span>
          <span className="text-[#f5f0e8]">50K</span> readers
          <span className="mx-4 md:mx-6 text-[#526D5E]">&bull;</span>
          <span className="text-[#f5f0e8]">12K</span> reading clubs
        </p>
      </div>
    </section>
  );
};
