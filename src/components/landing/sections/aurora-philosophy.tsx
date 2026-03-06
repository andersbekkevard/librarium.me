"use client";

import { useEffect, useRef, useState } from "react";

const useInView = (threshold = 0.2) => {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, inView };
};

export const AuroraPhilosophySection = () => {
  const { ref: sectionRef, inView } = useInView(0.15);

  return (
    <section
      id="philosophy"
      ref={sectionRef}
      className="relative py-32 md:py-44 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #080f0b 0%, #0d1a12 50%, #080f0b 100%)" }}
    >
      {/* Subtle horizontal amber line accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c4841d]/20 to-transparent" />

      <div className="max-w-6xl mx-auto px-6 md:px-10">
        {/* Section label */}
        <div
          className={`mb-20 md:mb-28 transition-all duration-1000 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-xs tracking-[0.3em] uppercase text-[#c4841d]/50">
            01 / Philosophy
          </span>
        </div>

        {/* Two-column layout */}
        <div className="grid md:grid-cols-12 gap-12 md:gap-8 items-start">
          {/* Left — large statement */}
          <div
            className={`md:col-span-7 transition-all duration-1000 delay-200 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            <h2
              className="text-[#f5efe0] leading-[1.1] tracking-[-0.02em]"
              style={{
                fontFamily: "var(--font-serif)",
                fontWeight: 500,
                fontSize: "clamp(2rem, 5vw, 3.75rem)",
              }}
            >
              Reading is not a habit
              <br />
              to be tracked.{" "}
              <span className="text-[#c4841d]/80 italic" style={{ fontWeight: 400 }}>
                It is a life
                <br />
                to be lived.
              </span>
            </h2>
          </div>

          {/* Right — descriptive text */}
          <div
            className={`md:col-span-5 md:pt-4 transition-all duration-1000 delay-500 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            <div className="space-y-6">
              <p className="text-[#f5efe0]/40 text-base md:text-lg leading-relaxed">
                Librarium was built for readers who care about the journey as
                much as the destination. Not another productivity tool demanding
                streaks and metrics — a quiet companion that honors the way you
                read.
              </p>
              <p className="text-[#f5efe0]/40 text-base md:text-lg leading-relaxed">
                Your shelves, your notes, your pace. We simply give you a
                beautiful space to hold it all.
              </p>
              {/* Amber divider */}
              <div className="pt-4">
                <div className="w-16 h-px bg-gradient-to-r from-[#c4841d]/60 to-transparent" />
              </div>
            </div>
          </div>
        </div>

        {/* Three pillars */}
        <div className="mt-28 md:mt-36 grid md:grid-cols-3 gap-12 md:gap-16">
          {[
            {
              num: "I",
              title: "Curate",
              desc: "Build a personal library that reflects who you are. Search, save, and organize books across shelves that feel like your own.",
            },
            {
              num: "II",
              title: "Contemplate",
              desc: "Track your reading at your own pace. No gamification, no pressure — just a clear view of where you are in every book.",
            },
            {
              num: "III",
              title: "Discover",
              desc: "Surface connections between the books you love. Let your reading history reveal patterns you never expected.",
            },
          ].map((pillar, i) => (
            <div
              key={pillar.num}
              className={`transition-all duration-1000 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
              }`}
              style={{ transitionDelay: `${800 + i * 200}ms` }}
            >
              <span
                className="block text-[#c4841d]/30 text-sm tracking-[0.2em] mb-5"
                style={{ fontFamily: "var(--font-serif)", fontStyle: "italic" }}
              >
                {pillar.num}
              </span>
              <h3
                className="text-[#f5efe0]/90 text-2xl md:text-3xl mb-4 tracking-[-0.01em]"
                style={{ fontFamily: "var(--font-serif)", fontWeight: 500 }}
              >
                {pillar.title}
              </h3>
              <p className="text-[#f5efe0]/30 text-sm md:text-base leading-relaxed">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
