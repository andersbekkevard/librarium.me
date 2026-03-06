"use client";

import { useEffect, useRef, useState } from "react";
import {
  BookOpenIcon,
  ChartBarIcon,
  MagnifyingGlassIcon,
  BarcodeIcon,
  StackIcon,
  SparkleIcon,
} from "@phosphor-icons/react";

const features = [
  {
    icon: BookOpenIcon,
    title: "Reading Tracker",
    description:
      "Log progress page by page. Set reading goals. Watch your library grow with every session.",
    accent: "bg-brand-primary/8 dark:bg-brand-primary/15",
    iconColor: "text-brand-primary",
  },
  {
    icon: ChartBarIcon,
    title: "Analytics",
    description:
      "Understand your habits. Reading pace, genre distribution, completion rates — all at a glance.",
    accent: "bg-brand-accent/10 dark:bg-brand-accent/15",
    iconColor: "text-brand-accent",
  },
  {
    icon: MagnifyingGlassIcon,
    title: "Discovery",
    description:
      "Surface your next great read. Recommendations tuned to your taste, not trending lists.",
    accent: "bg-status-info/8 dark:bg-status-info/15",
    iconColor: "text-status-info",
  },
  {
    icon: BarcodeIcon,
    title: "Scan & Add",
    description:
      "Point your camera at any barcode. Book data fills in automatically. Your shelf in seconds.",
    accent: "bg-brand-secondary/8 dark:bg-brand-secondary/15",
    iconColor: "text-brand-secondary",
  },
  {
    icon: StackIcon,
    title: "Collections",
    description:
      "Organize by mood, project, or season. Create living bibliographies that evolve with you.",
    accent: "bg-status-warning/8 dark:bg-status-warning/15",
    iconColor: "text-status-warning dark:text-status-warning",
  },
  {
    icon: SparkleIcon,
    title: "AI Assistant",
    description:
      "Ask questions about your library. Get summaries, find connections, spark new reading paths.",
    accent: "bg-chart-5/8 dark:bg-chart-5/15",
    iconColor: "text-chart-5",
  },
];

export const VelvetFeatures = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="features" ref={ref} className="relative py-28 md:py-40">
      <div className="px-6 md:px-10 lg:px-16">
        {/* Header */}
        <div className="max-w-5xl mx-auto mb-16 md:mb-24">
          <div
            className={`mb-6 transition-all duration-1000 ease-out ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <span
              className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground"
              style={{ fontFamily: "var(--font-geist-sans)" }}
            >
              <span className="inline-block w-8 h-px bg-brand-primary mr-3 align-middle" />
              Capabilities
            </span>
          </div>
          <h2
            className={`text-[clamp(2rem,5vw,4rem)] leading-[1.05] tracking-[-0.03em] font-medium max-w-3xl transition-all duration-1000 delay-200 ease-out ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Everything you need.{" "}
            <span className="text-muted-foreground">Nothing you don&apos;t.</span>
          </h2>
        </div>

        {/* Feature grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className={`group relative p-7 md:p-8 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-border transition-all duration-500 hover:shadow-[0_8px_40px_-12px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_8px_40px_-12px_rgba(0,0,0,0.3)] ${
                  visible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{
                  transitionDelay: visible ? `${300 + i * 100}ms` : "0ms",
                }}
              >
                {/* Icon chip */}
                <div
                  className={`inline-flex items-center justify-center w-10 h-10 rounded-xl ${feature.accent} mb-5`}
                >
                  <Icon className={`size-5 ${feature.iconColor}`} weight="duotone" />
                </div>

                <h3
                  className="text-lg tracking-[-0.02em] font-semibold mb-2"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {feature.title}
                </h3>

                <p
                  className="text-sm text-muted-foreground leading-relaxed"
                  style={{ fontFamily: "var(--font-geist-sans)" }}
                >
                  {feature.description}
                </p>

                {/* Hover accent line */}
                <div className="absolute bottom-0 left-7 right-7 h-px bg-gradient-to-r from-transparent via-brand-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
