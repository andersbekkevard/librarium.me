import Link from "next/link";

export const VelvetFooter = () => {
  return (
    <footer className="relative py-12 md:py-16">
      <div className="px-6 md:px-10 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            {/* Logo + tagline */}
            <div>
              <Link href="/" className="inline-block">
                <span
                  className="text-2xl tracking-[-0.04em] font-medium text-foreground"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  Librarium
                </span>
              </Link>
              <p
                className="mt-2 text-sm text-muted-foreground max-w-xs"
                style={{ fontFamily: "var(--font-geist-sans)" }}
              >
                A contemplative space for readers.
              </p>
            </div>

            {/* Links */}
            <nav
              className="flex flex-wrap gap-x-8 gap-y-3"
              style={{ fontFamily: "var(--font-geist-sans)" }}
            >
              {[
                { label: "Features", href: "#features" },
                { label: "Philosophy", href: "#manifesto" },
                { label: "GitHub", href: "https://github.com/andersbekkevard/librarium-app" },
              ].map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  className="text-[13px] uppercase tracking-[0.12em] text-muted-foreground hover:text-foreground transition-colors duration-300"
                  {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Bottom bar */}
          <div className="mt-10 pt-6 border-t border-border/30 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <span
              className="text-[12px] text-muted-foreground tracking-wide"
              style={{ fontFamily: "var(--font-geist-sans)" }}
            >
              &copy; {new Date().getFullYear()} Librarium
            </span>
            <span
              className="text-[12px] text-muted-foreground/60 tracking-wide"
              style={{ fontFamily: "var(--font-geist-sans)" }}
            >
              Crafted by Anders Bekkevard
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
