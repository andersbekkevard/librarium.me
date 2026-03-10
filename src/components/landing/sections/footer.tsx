import { BookIcon } from "@phosphor-icons/react";
import Link from "next/link";

const footerLinks = {
  Company: [
    { label: "About", href: "#about" },
    { label: "Press", href: "#" },
    { label: "Legal", href: "#" },
    { label: "Privacy Policy", href: "#" },
  ],
  Social: [
    { label: "Twitter", href: "#" },
    { label: "Instagram", href: "#" },
    { label: "GitHub", href: "https://github.com/andersbekkevard/librarium-app" },
    { label: "TikTok", href: "#" },
  ],
  Support: [
    { label: "API", href: "#" },
    { label: "Widget", href: "#" },
    { label: "Contact", href: "#" },
    { label: "FAQ", href: "#" },
  ],
  App: [
    { label: "iPhone", href: "#" },
    { label: "Android", href: "#" },
    { label: "Web app", href: "/dashboard" },
  ],
};

export const FooterSection = () => {
  return (
    <footer className="bg-[#244633] text-white">
      <div className="max-w-[1100px] mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-white/15 rounded-lg flex items-center justify-center">
                <BookIcon className="h-4 w-4 text-white" weight="fill" />
              </div>
              <span
                className="text-lg font-semibold tracking-tight"
                style={{ fontFamily: "var(--font-geist-sans)" }}
              >
                Librarium
              </span>
            </Link>
            <p className="text-sm text-white/50 leading-relaxed">
              The social reading tracker for people who love books.
            </p>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4
                className="text-sm font-semibold mb-4"
                style={{ fontFamily: "var(--font-geist-sans)" }}
              >
                {category}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/50 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} Librarium. All rights reserved.
          </p>
          <p className="text-xs text-white/40">
            Made with care by Anders Bekkevard
          </p>
        </div>
      </div>
    </footer>
  );
};
