import { BookOpenTextIcon } from "@phosphor-icons/react";
import Link from "next/link";

const footerLinks = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "Reading Rhythm", href: "#benefits" },
    { label: "Platform Flow", href: "#services" },
  ],
  Explore: [
    { label: "Reader Notes", href: "#testimonials" },
    { label: "FAQ", href: "#faq" },
    { label: "GitHub", href: "https://github.com/andersbekkevard/librarium-app" },
  ],
};

export const FooterSection = () => {
  return (
    <footer id="footer" className="container pb-16 pt-12 md:pb-24">
      <div className="rounded-[2rem] border border-primary/10 bg-background/80 p-8 shadow-[0_18px_45px_rgba(26,52,36,0.1)] md:p-10">
        <div className="grid gap-8 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                <BookOpenTextIcon className="h-5 w-5 text-primary" weight="duotone" />
              </div>
              <span className="landing-ui text-lg font-semibold tracking-tight">Librarium</span>
            </Link>

            <p className="landing-ui mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
              Built for readers who want a beautiful, precise place to keep the
              signal of their reading life.
            </p>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="landing-display text-2xl">{title}</h3>
              <div className="mt-4 flex flex-col gap-2.5">
                {links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="landing-ui text-sm text-muted-foreground transition-colors hover:text-foreground"
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-primary/10 pt-6">
          <div className="landing-ui flex flex-col gap-2 text-xs uppercase tracking-[0.12em] text-muted-foreground md:flex-row md:items-center md:justify-between">
            <span>© 2026 Librarium</span>
            <span>Crafted in Norway</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
