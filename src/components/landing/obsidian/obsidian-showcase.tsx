"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export function ObsidianShowcase() {
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
      { threshold: 0.15 }
    );

    const elements = sectionRef.current?.querySelectorAll(".obsidian-reveal");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="relative py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <div className="obsidian-reveal text-center mb-16">
          <span className="text-[11px] tracking-[0.3em] uppercase text-[#C4A265]/70 block mb-6">
            Chapter III
          </span>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl text-[#E8E2D4] tracking-tight"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            The reading experience,
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C4A265] to-[#E8C872]">
              {" "}reimagined
            </span>
          </h2>
        </div>

        {/* Screenshot showcase */}
        <div className="obsidian-reveal relative">
          {/* Outer glow frame */}
          <div className="absolute -inset-px rounded-xl bg-gradient-to-b from-[#C4A265]/20 via-[#C4A265]/5 to-transparent" />

          {/* Inner frame */}
          <div className="relative rounded-xl overflow-hidden border border-[#1A1A18] bg-[#0E0E0C]">
            {/* Window chrome */}
            <div className="flex items-center gap-2 px-5 py-3.5 border-b border-[#1A1A18]">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#3A3A38]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#3A3A38]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#3A3A38]" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="px-4 py-1 rounded bg-[#1A1A18] text-[11px] text-[#8A8478]/50 tracking-wider">
                  librarium.app
                </div>
              </div>
              <div className="w-12" />
            </div>

            {/* Screenshot */}
            <div className="relative">
              <Image
                src="/images/hero-image-dark-2.jpg"
                alt="Librarium dashboard - your personal reading command center"
                width={1200}
                height={750}
                className="w-full"
                priority={false}
              />

              {/* Bottom fade */}
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0A0A08] to-transparent" />
            </div>
          </div>

          {/* Reflection glow */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-16 bg-[radial-gradient(ellipse_at_center,_#C4A265_0%,_transparent_70%)] opacity-[0.04] blur-xl" />
        </div>

        {/* Feature highlights below screenshot */}
        <div className="obsidian-reveal mt-16 grid md:grid-cols-3 gap-8 md:gap-12">
          {[
            {
              title: "Dashboard",
              desc: "Your reading life at a glance. Current books, streaks, and goals in one elegant view.",
            },
            {
              title: "Library",
              desc: "Every book you own or have read, organized with rich metadata and personal annotations.",
            },
            {
              title: "Statistics",
              desc: "Beautiful charts that reveal your reading patterns, habits, and growth over time.",
            },
          ].map((item) => (
            <div key={item.title} className="text-center">
              <h3
                className="text-base text-[#C4A265] mb-2 tracking-tight"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                {item.title}
              </h3>
              <p className="text-sm text-[#8A8478] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
