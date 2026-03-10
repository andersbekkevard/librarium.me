import { BookIcon } from "@phosphor-icons/react";
import Link from "next/link";

const footerLinks = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "Reading Lists", href: "#reading-lists" },
    { label: "Trending", href: "#trending" },
  ],
  Company: [
    { label: "About", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Careers", href: "#" },
  ],
  Resources: [
    { label: "Help Center", href: "#" },
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
  ],
  Community: [
    {
      label: "GitHub",
      href: "https://github.com/andersbekkevard/librarium-app",
    },
    { label: "Discord", href: "#" },
    { label: "Twitter", href: "#" },
  ],
};

export const FooterSection = () => {
  return (
    <footer className="bg-[#162618] py-16 md:py-20">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 md:gap-8">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <BookIcon
                className="h-5 w-5 text-[#789D72]"
                weight="duotone"
              />
              <span
                className="text-[#FFF8F0] text-lg tracking-tight"
                style={{ fontFamily: "var(--font-fraunces)", fontWeight: 600 }}
              >
                Librarium
              </span>
            </Link>
            <p className="text-[#FFF8F0]/35 text-sm leading-relaxed">
              Your reading life, curated.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-[#FFF8F0]/50 text-xs font-semibold tracking-[0.15em] uppercase mb-4">
                {category}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[#FFF8F0]/40 text-sm hover:text-[#FFF8F0]/70 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-[#FFF8F0]/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#FFF8F0]/25 text-xs">
            &copy; {new Date().getFullYear()} Librarium. All rights reserved.
          </p>
          <p className="text-[#FFF8F0]/20 text-xs">
            Made for readers, by readers.
          </p>
        </div>
      </div>
    </footer>
  );
};
