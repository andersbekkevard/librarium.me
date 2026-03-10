"use client";

import { useScrollAnimation } from "@/lib/hooks/useScrollAnimation";
import {
  BookOpenIcon,
  ChartLineUpIcon,
  TargetIcon,
} from "@phosphor-icons/react";

export function ChapterTrack() {
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.15 });

  return (
    <section
      id="chapter-track"
      className="py-24 md:py-32 bg-white"
      ref={elementRef as React.RefObject<HTMLElement>}
    >
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Chapter label */}
        <div
          className={`mb-12 scroll-fade-in-up ${isVisible ? "animate" : ""}`}
        >
          <span className="text-xs font-mono tracking-[0.3em] text-[#789D72] uppercase">
            Chapter Two
          </span>
        </div>

        {/* 2-column split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text */}
          <div
            className={`scroll-slide-in-left ${isVisible ? "animate" : ""}`}
            style={{ transitionDelay: "200ms" }}
          >
            <h2
              className="text-3xl md:text-[2.5rem] leading-[1.15] tracking-tight text-[#244633] mb-6"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Track Every Page,
              <br />
              <span className="italic font-light">Every Chapter</span>
            </h2>

            <p
              className="text-base md:text-lg text-[#244633]/60 leading-relaxed mb-8 max-w-[480px]"
              style={{ fontFamily: "var(--font-geist-sans)" }}
            >
              Update your progress page by page. Watch your reading stats grow
              on a beautiful dashboard that shows total books, pages read, and
              your current reading streak.
            </p>

            <div className="space-y-4">
              {[
                {
                  icon: BookOpenIcon,
                  title: "Page-by-page tracking",
                  desc: "Simple progress updates as you read",
                },
                {
                  icon: ChartLineUpIcon,
                  title: "Reading statistics",
                  desc: "Books finished, pages read, current streaks",
                },
                {
                  icon: TargetIcon,
                  title: "Reading states",
                  desc: "Not started, in progress, and finished",
                },
              ].map(({ icon: Icon, title, desc }, i) => (
                <div
                  key={title}
                  className="flex items-start gap-4"
                  style={{ transitionDelay: `${400 + i * 150}ms` }}
                >
                  <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#244633]/5">
                    <Icon className="h-4.5 w-4.5 text-[#244633]" weight="duotone" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#244633]">{title}</p>
                    <p className="text-sm text-[#244633]/50">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Dashboard mockup */}
          <div
            className={`scroll-slide-in-right ${isVisible ? "animate" : ""}`}
            style={{ transitionDelay: "400ms" }}
          >
            <div className="relative rounded-2xl border border-[#789D72]/20 bg-[#FFF8F0] p-6 md:p-8 shadow-sm">
              {/* Mock dashboard header */}
              <div className="mb-6">
                <p className="text-xs font-mono text-[#789D72] tracking-wider mb-1">
                  DASHBOARD
                </p>
                <p
                  className="text-xl text-[#244633]"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  Your Reading Stats
                </p>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                {[
                  { label: "Books Read", value: "24" },
                  { label: "Pages", value: "7,842" },
                  { label: "Current", value: "3" },
                  { label: "This Month", value: "5" },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    className="rounded-xl bg-white border border-[#789D72]/10 p-4"
                  >
                    <p className="text-2xl font-semibold text-[#244633]">
                      {value}
                    </p>
                    <p className="text-xs text-[#244633]/50 mt-1">{label}</p>
                  </div>
                ))}
              </div>

              {/* Progress bar mockup */}
              <div className="rounded-xl bg-white border border-[#789D72]/10 p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-[#244633]">Currently Reading</p>
                  <p className="text-xs text-[#789D72]">68%</p>
                </div>
                <div className="h-2 rounded-full bg-[#789D72]/10">
                  <div
                    className="h-full rounded-full bg-[#244633] transition-all duration-1000"
                    style={{ width: isVisible ? "68%" : "0%" }}
                  />
                </div>
                <p className="text-xs text-[#244633]/40 mt-2">
                  Project Hail Mary — Page 218 of 320
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
