import { BookDoodle } from "@/components/landing/doodles";
import Link from "next/link";

const footerLinks = [
  {
    heading: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "How it works", href: "#how-it-works" },
      { label: "Reviews", href: "#testimonials" },
    ],
  },
  {
    heading: "Resources",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/andersbekkevard/librarium-app",
        external: true,
      },
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
    ],
  },
];

export function FooterSection() {
  return (
    <footer className="bg-nook-forest text-white/90 py-14">
      <div className="mx-auto max-w-[720px] px-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10 mb-10">
          {/* Branding */}
          <div className="flex-1 max-w-[280px]">
            <div className="flex items-center gap-2.5 mb-3">
              <BookDoodle className="w-7 h-7" color="#A7D7C5" />
              <span className="text-xl font-heading font-semibold text-white">
                Librarium
              </span>
            </div>
            <p className="text-sm text-white/60 leading-relaxed">
              A cozy reading tracker for people who love books. Built with care
              in Trondheim, Norway.
            </p>
          </div>

          {/* Links */}
          {footerLinks.map((group) => (
            <div key={group.heading}>
              <h4 className="text-sm font-semibold text-white/40 uppercase tracking-wider mb-3 font-body">
                {group.heading}
              </h4>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/70 hover:text-white transition-colors"
                      {...("external" in link && link.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
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
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} Librarium. All rights reserved.
          </p>
          <p className="text-xs text-white/30 font-heading italic">
            Made with love & lots of coffee
          </p>
        </div>
      </div>
    </footer>
  );
}
