"use client";

import { useScrollAnimation } from "@/lib/hooks/useScrollAnimation";

export const BoldManifesto = () => {
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section className="bg-[#FEF3C7] px-6 md:px-12 lg:px-20 py-24 md:py-32 lg:py-40">
      <div
        ref={elementRef as React.RefObject<HTMLDivElement>}
        className="max-w-[1400px] mx-auto"
      >
        <blockquote
          className={`font-heading font-bold text-[#0f1f15] text-[clamp(1.75rem,5vw,3.5rem)] leading-[1.1] tracking-[-0.02em] max-w-[900px] transition-all duration-[800ms] ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          A book is a mirror. A shelf is a portrait. We believe the stories you choose to read
          say more about you than the ones you choose to tell.
        </blockquote>

        <div
          className={`mt-12 md:mt-16 h-px w-24 bg-[#0f1f15]/20 transition-all duration-[800ms] ease-out delay-200 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        />

        <p
          className={`mt-6 text-[#0f1f15]/60 text-sm uppercase tracking-[0.2em] transition-all duration-[800ms] ease-out delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ fontFamily: "var(--font-geist-sans)" }}
        >
          Librarium Manifesto
        </p>
      </div>
    </section>
  );
};
