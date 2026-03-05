import { BookOpenTextIcon } from "@phosphor-icons/react";
import Link from "next/link";

const footerLinks = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "Integrations", href: "#services" },
    { label: "FAQ", href: "#faq" },
  ],
  Company: [
    { label: "GitHub", href: "https://github.com/andersbekkevard/librarium-app" },
    { label: "Roadmap", href: "#services" },
    { label: "About", href: "#" },
  ],
};

export const FooterSection = () => {
  return (
    <footer id="footer" className="landing-shell pt-10">
      <div className="rounded-[2rem] border border-border/70 bg-card/90 p-8 md:p-10">
        <div className="grid gap-8 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand-primary/30 bg-brand-primary/10 text-brand-primary">
                <BookOpenTextIcon className="h-5 w-5" weight="duotone" />
              </span>
              <span className="font-heading text-2xl">Librarium</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              Personal library management with editorial calm, clear signals, and production-ready fundamentals.
            </p>
          </div>

          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h3 className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">{group}</h3>
              <ul className="mt-4 space-y-2 text-sm">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="transition-colors hover:text-brand-primary"
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-border/60 pt-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>Copyright 2026 Librarium</p>
          <p>Designed for modern book culture</p>
        </div>
      </div>
    </footer>
  );
};
