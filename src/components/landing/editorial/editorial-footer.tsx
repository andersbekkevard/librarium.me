"use client";

import { ScrollReveal } from "./scroll-reveal";
import Link from "next/link";

const footerLinks = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#ch-feed" },
      { label: "Challenges", href: "#ch-challenges" },
      { label: "Community", href: "#ch-community" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Careers", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
    ],
  },
];

export function EditorialFooter() {
  return (
    <footer>
      {/* Full-bleed CTA band — forest green */}
      <div className="relative bg-[#244633] dark:bg-[#0d1f16] overflow-hidden">
        {/* Grain texture */}
        <div
          className="absolute inset-0 opacity-[0.1] mix-blend-soft-light pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Amber glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-golden-amber/[0.05] rounded-full blur-[120px] pointer-events-none" />

        <ScrollReveal>
          <div className="relative text-center py-28 md:py-36 px-6">
            <h2 className="font-heading font-bold text-5xl md:text-6xl lg:text-7xl leading-[0.9] tracking-tight text-white mb-4">
              Your next chapter
            </h2>
            <p className="font-heading font-bold text-5xl md:text-6xl lg:text-7xl leading-[0.9] tracking-tight text-golden-amber italic mb-10">
              starts here.
            </p>
            <p className="text-base text-white/50 max-w-md mx-auto mb-12">
              Join thousands of readers who track, share, and celebrate their
              reading journeys together.
            </p>
            <Link
              href="#"
              className="group inline-flex items-center gap-3 bg-white text-[#244633] px-9 py-4.5 rounded-full text-base font-medium transition-all duration-300 hover:shadow-xl hover:shadow-white/10 hover:scale-[1.03] active:scale-[0.97]"
            >
              Start reading — it&apos;s free
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </ScrollReveal>
      </div>

      {/* Footer links on cream bg */}
      <div className="px-6 md:px-8 py-16 md:py-20">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-lg bg-brand-primary dark:bg-brand-accent flex items-center justify-center">
                  <svg
                    className="w-3.5 h-3.5 text-white dark:text-[#0A0F0D]"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                  </svg>
                </div>
                <span className="text-sm font-medium tracking-tight text-foreground">
                  Librarium
                </span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                The social reading tracker for people who love books and the
                friends who read them.
              </p>
            </div>

            {/* Link columns */}
            {footerLinks.map((group) => (
              <div key={group.title}>
                <p className="font-mono text-xs tracking-[0.15em] uppercase text-muted-foreground mb-4">
                  {group.title}
                </p>
                <ul className="space-y-2.5">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Copyright */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-[rgba(36,70,51,0.06)] dark:border-[rgba(120,157,114,0.06)]">
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} Librarium. All rights reserved.
            </p>
            <a
              href="https://github.com/andersbekkevard/librarium-app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="GitHub"
            >
              <svg
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
