"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

function useCountUp(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    let startTime: number | null = null;
    let frame: number;

    function step(timestamp: number) {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));

      if (progress < 1) {
        frame = requestAnimationFrame(step);
      }
    }

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [target, duration, start]);

  return count;
}

const stats = [
  { value: 2400000, label: "Books tracked", display: "2.4M" },
  { value: 180000, label: "Active readers", display: "180K" },
  { value: 52000, label: "Challenges completed", display: "52K" },
];

function StatItem({
  value,
  display,
  label,
  inView,
  delay,
}: {
  value: number;
  display: string;
  label: string;
  inView: boolean;
  delay: number;
}) {
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => setStarted(true), delay * 1000);
      return () => clearTimeout(timer);
    }
  }, [inView, delay]);

  const isMillion = display.endsWith("M");
  const isThousand = display.endsWith("K");
  const divisor = isMillion ? 1000000 : isThousand ? 1000 : 1;
  const suffix = isMillion ? "M" : isThousand ? "K" : "";
  const decimals = isMillion ? 1 : 0;

  const rawCount = useCountUp(value, 2400, started);
  const displayCount = (rawCount / divisor).toFixed(decimals);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.9,
        delay,
        ease: EASE_OUT,
      }}
      className="text-center"
    >
      <span
        className="block font-display font-bold leading-none tracking-[-0.04em] text-landing-amber"
        style={{ fontSize: "clamp(4rem, 10vw, 7.5rem)" }}
      >
        {started ? displayCount : "0"}
        {suffix}
      </span>
      <span className="mt-3 block font-display text-sm font-medium uppercase tracking-[0.15em] text-landing-sage md:text-base">
        {label}
      </span>
    </motion.div>
  );
}

export function StatsSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <section ref={ref} className="px-6 py-32 md:py-48">
      {/* Thin horizontal rules framing the stats */}
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1, ease: EASE_OUT }}
          className="h-px origin-left bg-landing-sage/20"
        />

        <div className="grid grid-cols-1 gap-16 py-16 md:grid-cols-3 md:gap-8 md:py-20">
          {stats.map((stat, i) => (
            <StatItem
              key={stat.label}
              value={stat.value}
              display={stat.display}
              label={stat.label}
              inView={isInView}
              delay={i * 0.18}
            />
          ))}
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1, delay: 0.1, ease: EASE_OUT }}
          className="h-px origin-right bg-landing-sage/20"
        />
      </div>
    </section>
  );
}
