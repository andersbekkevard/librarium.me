"use client";

import { useEffect, useRef } from "react";

export function ObsidianPhilosophy() {
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
      { threshold: 0.2 }
    );

    const elements = sectionRef.current?.querySelectorAll(".obsidian-reveal");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="philosophy"
      ref={sectionRef}
      className="relative py-32 md:py-40 overflow-hidden"
    >
      {/* Background accent */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-2/3 bg-gradient-to-b from-transparent via-[#C4A265]/20 to-transparent" />

      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1fr,1.5fr] gap-16 lg:gap-24 items-start">
          {/* Left: Label & Quote */}
          <div>
            <div className="obsidian-reveal">
              <span className="text-[11px] tracking-[0.3em] uppercase text-[#C4A265]/70 block mb-6">
                Chapter I
              </span>
              <h2
                className="text-3xl md:text-4xl lg:text-5xl text-[#E8E2D4] tracking-tight leading-[1.1]"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Reading is not
                <br />
                a solitary act
              </h2>
            </div>

            <div className="obsidian-reveal mt-10 pl-6 border-l border-[#C4A265]/20">
              <blockquote
                className="text-lg md:text-xl text-[#8A8478] italic leading-relaxed"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                &ldquo;A reader lives a thousand lives before he dies. The man who never reads
                lives only one.&rdquo;
              </blockquote>
              <cite className="mt-4 block text-[13px] tracking-[0.08em] text-[#C4A265]/50 not-italic uppercase">
                George R.R. Martin
              </cite>
            </div>
          </div>

          {/* Right: Philosophy text */}
          <div className="lg:pt-12">
            <div className="obsidian-reveal space-y-6">
              <p className="text-base md:text-lg text-[#A09A8E] leading-relaxed">
                Every book you read becomes part of who you are. Librarium believes that your
                reading history deserves more than a forgotten shelf &mdash; it deserves to be
                understood, celebrated, and built upon.
              </p>
              <p className="text-base md:text-lg text-[#A09A8E] leading-relaxed">
                We built Librarium for readers who treat their library as a living collection.
                Not a to-do list. Not a competition. A mirror that reflects your intellectual
                curiosity and growth over time.
              </p>
              <p className="text-base md:text-lg text-[#A09A8E] leading-relaxed">
                From the first page to the last, every reading session is tracked with care.
                Your statistics reveal patterns you never noticed. Your shelves organize
                themselves around your tastes. Your library becomes your autobiography.
              </p>
            </div>

            {/* Stats */}
            <div className="obsidian-reveal mt-12 grid grid-cols-3 gap-8">
              {[
                { value: "100%", label: "Free to use" },
                { value: "Instant", label: "Book search" },
                { value: "\u221E", label: "Books tracked" },
              ].map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <div
                    className="text-2xl md:text-3xl text-[#C4A265] font-light"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {stat.value}
                  </div>
                  <div className="mt-1 text-[11px] tracking-[0.15em] uppercase text-[#8A8478]/60">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
