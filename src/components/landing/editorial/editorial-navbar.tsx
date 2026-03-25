"use client";

import { cn } from "@/lib/utils/utils";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";

const navLinks = [
  { href: "#ch-feed", label: "Feed" },
  { href: "#ch-library", label: "Library" },
  { href: "#ch-challenges", label: "Challenges" },
  { href: "#ch-discover", label: "Discover" },
  { href: "#ch-community", label: "Community" },
];

export function EditorialNavbar() {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setVisible(latest > 500);
  });

  return (
    <motion.header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-colors duration-300",
        visible
          ? "bg-background/90 backdrop-blur-md border-b border-[rgba(36,70,51,0.08)] dark:border-[rgba(120,157,114,0.1)]"
          : "pointer-events-none"
      )}
      initial={{ y: -80 }}
      animate={{ y: visible ? 0 : -80 }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="max-w-5xl mx-auto px-6 md:px-8 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 pointer-events-auto"
        >
          <div className="w-7 h-7 rounded-lg bg-brand-primary dark:bg-brand-accent flex items-center justify-center">
            <svg className="w-3.5 h-3.5 text-white dark:text-[#0A0F0D]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
            </svg>
          </div>
          <span className="text-sm font-medium tracking-tight text-foreground">
            Librarium
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 pointer-events-auto">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3 py-1.5 text-xs font-mono tracking-wider uppercase text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right side: dark mode toggle + CTA */}
        <div className="flex items-center gap-3 pointer-events-auto">
          {/* Animated Dark Mode Toggle */}
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="relative w-12 h-6 rounded-full bg-brand-primary/10 dark:bg-brand-accent/15 border border-[rgba(36,70,51,0.12)] dark:border-[rgba(120,157,114,0.2)] transition-colors duration-300 flex items-center"
              aria-label="Toggle dark mode"
            >
              <motion.div
                className="absolute w-5 h-5 rounded-full bg-brand-primary dark:bg-brand-accent flex items-center justify-center shadow-sm"
                animate={{ x: theme === "dark" ? 25 : 3 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                {theme === "dark" ? (
                  <svg className="w-3 h-3 text-[#0A0F0D]" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M7.455 2.004a.75.75 0 01.26.77 7 7 0 009.958 7.967.75.75 0 011.067.853A8.5 8.5 0 1110.5 2a.75.75 0 01-.045.004z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </motion.div>
            </button>
          )}

          <a
            href="#ch-feed"
            className="hidden sm:inline-flex text-xs font-medium px-4 py-2 rounded-full bg-brand-primary dark:bg-brand-accent text-white dark:text-[#0A0F0D] hover:opacity-90 transition-opacity duration-200"
          >
            Get started
          </a>
        </div>
      </div>
    </motion.header>
  );
}
