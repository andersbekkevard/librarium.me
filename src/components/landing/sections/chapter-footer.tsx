import { BookOpenIcon } from "@phosphor-icons/react";
import Link from "next/link";

const footerLinks = {
  Features: [
    { label: "Track Reading", href: "#chapter-track" },
    { label: "Book Discovery", href: "#chapter-discover" },
    { label: "Reading Analytics", href: "#chapter-track" },
  ],
  Community: [
    { label: "Book Clubs", href: "#chapter-connect" },
    { label: "Reading Groups", href: "#chapter-connect" },
    { label: "Recommendations", href: "#chapter-discover" },
  ],
  Support: [
    { label: "Help Center", href: "#" },
    { label: "Contact Us", href: "#" },
    { label: "Privacy Policy", href: "#" },
  ],
  Company: [
    { label: "About", href: "#" },
    { label: "Blog", href: "#" },
    { label: "GitHub", href: "https://github.com/andersbekkevard/librarium-app" },
  ],
};

export function ChapterFooter() {
  return (
    <footer className="bg-[#244633] text-white">
      <div className="max-w-[1200px] mx-auto px-6 py-16 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 md:gap-12">
          {/* Logo + tagline */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <BookOpenIcon className="h-5 w-5 text-[#789D72]" weight="duotone" />
              <span
                className="text-lg tracking-tight text-white"
                style={{ fontFamily: "var(--font-geist-sans)" }}
              >
                Librarium
              </span>
            </Link>
            <p className="text-sm text-white/40 leading-relaxed max-w-[240px]">
              The reading companion for book lovers. Track, discover, and share
              your literary journey.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4
                className="text-sm font-medium text-white/80 mb-4"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                {category}
              </h4>
              <ul className="space-y-2.5">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-sm text-white/40 hover:text-white/70 transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/30">
            &copy; {new Date().getFullYear()} Librarium. All rights reserved.
          </p>
          <p className="text-xs text-white/30">
            Made by Anders Bekkevard
          </p>
        </div>
      </div>
    </footer>
  );
}
