import { BookIcon } from "@phosphor-icons/react";
import Link from "next/link";

const footerLinks = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Pricing", href: "#pricing" },
      { label: "How It Works", href: "#how-it-works" },
      { label: "Download", href: "#" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "Book Clubs", href: "#" },
      { label: "Reading Groups", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Events", href: "#" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Center", href: "#" },
      { label: "Contact Us", href: "#" },
      { label: "Status", href: "#" },
      { label: "Feedback", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Cookie Policy", href: "#" },
      { label: "GDPR", href: "#" },
    ],
  },
];

export const FooterSection = () => {
  return (
    <footer className="bg-forest-footer">
      <div className="max-w-[1200px] mx-auto px-6 py-16 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
          {/* Brand column */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 bg-[#FEF3C7]/15 rounded-xl flex items-center justify-center shrink-0">
                <BookIcon className="h-5 w-5 text-[#FEF3C7]" weight="duotone" />
              </div>
              <span
                className="text-xl text-[#FEF3C7] tracking-tight"
                style={{ fontFamily: "var(--font-geist-sans)" }}
              >
                Librarium
              </span>
            </Link>
            <p className="text-sm text-[#FEF3C7]/50 max-w-xs leading-relaxed">
              The social reading tracker built for book lovers. Track, share, and celebrate every page.
            </p>
          </div>

          {/* Link columns */}
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h4
                className="text-sm font-semibold text-[#FEF3C7] mb-4"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                {group.title}
              </h4>
              <ul className="space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-[#FEF3C7]/50 hover:text-[#FEF3C7]/80 transition-colors"
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
        <div className="border-t border-[#FEF3C7]/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-[#FEF3C7]/40">
              &copy; {new Date().getFullYear()} Librarium. All rights reserved.
            </p>
            <p className="text-sm text-[#FEF3C7]/40">
              Made by Anders Bekkevard
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
