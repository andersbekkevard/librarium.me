"use client";

import { cn } from "@/lib/utils/utils";
import { useEffect, useState } from "react";

const chapters = [
  { id: "hero", number: "01" },
  { id: "track", number: "02" },
  { id: "discover", number: "03" },
  { id: "connect", number: "04" },
  { id: "join", number: "05" },
];

export function ChapterProgressIndicator() {
  const [activeChapter, setActiveChapter] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const sectionElements = chapters.map((ch) =>
      document.getElementById(`chapter-${ch.id}`)
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sectionElements.findIndex(
              (el) => el === entry.target
            );
            if (index !== -1) {
              setActiveChapter(index);
            }
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: "-10% 0px -40% 0px",
      }
    );

    sectionElements.forEach((el) => {
      if (el) observer.observe(el);
    });

    // Show/hide based on scroll position
    const handleScroll = () => {
      setIsVisible(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClick = (id: string) => {
    const el = document.getElementById(`chapter-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      aria-label="Chapter navigation"
      className={cn(
        "fixed left-6 top-1/2 -translate-y-1/2 z-50 hidden xl:flex flex-col items-center gap-3 transition-opacity duration-500",
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
    >
      {chapters.map((chapter, index) => {
        const isActive = index === activeChapter;
        const isPast = index < activeChapter;

        return (
          <button
            key={chapter.id}
            onClick={() => handleClick(chapter.id)}
            aria-label={`Go to chapter ${chapter.number}`}
            aria-current={isActive ? "step" : undefined}
            className="group flex items-center gap-3 cursor-pointer"
          >
            {/* Chapter number */}
            <span
              className={cn(
                "text-xs font-mono tracking-wider transition-all duration-300",
                isActive
                  ? "text-[#244633] font-semibold scale-110"
                  : isPast
                    ? "text-[#789D72]"
                    : "text-[#789D72]/40"
              )}
            >
              {chapter.number}
            </span>

            {/* Dot indicator */}
            <div className="relative flex items-center justify-center">
              <div
                className={cn(
                  "rounded-full transition-all duration-300",
                  isActive
                    ? "w-2.5 h-2.5 bg-[#244633]"
                    : isPast
                      ? "w-2 h-2 bg-[#789D72]"
                      : "w-1.5 h-1.5 bg-[#789D72]/30"
                )}
              />
              {isActive && (
                <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-[#244633]/20 animate-ping" />
              )}
            </div>

            {/* Connecting line */}
            {index < chapters.length - 1 && (
              <div
                className={cn(
                  "absolute left-[2.85rem] top-full w-px h-3",
                  isPast ? "bg-[#789D72]" : "bg-[#789D72]/20"
                )}
              />
            )}
          </button>
        );
      })}

      {/* Current position label */}
      <div className="mt-2 text-[10px] font-mono text-[#789D72]/60 tracking-widest">
        {String(activeChapter + 1).padStart(2, "0")}/05
      </div>
    </nav>
  );
}
