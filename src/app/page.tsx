"use client";

import {
  ArrowRightIcon, BookIcon, CaretDownIcon, ChartBarIcon, GithubLogoIcon, ListIcon, MagnifyingGlassIcon, SparkleIcon, StarIcon, TrendUpIcon, UsersIcon, XIcon,
} from "@phosphor-icons/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo, ThemeToggle } from "@/components/shell";
import { toast } from "@/components/toast";
import { Badge, Button, buttonClass, cn, Spinner } from "@/components/ui";
import { authMessage, signIn, useLibrary } from "@/lib/store";

const GITHUB = "https://github.com/andersbekkevard/librarium-app";
const SECTIONS = [["#features", "Features"], ["#benefits", "Benefits"], ["#services", "Integrations"], ["#early-access", "Early access"], ["#faq", "FAQ"]];

const BENEFITS = [
  [BookIcon, "Stay Organized", "Keep all your books in one place with basic organization. Filter by reading state and ownership to find what you need."],
  [TrendUpIcon, "Track Your Progress", "Monitor your reading with simple page-by-page tracking and see basic statistics about your reading habits."],
  [SparkleIcon, "Easy Book Discovery", "Search millions of books through Google Books API and add them to your library with automatic metadata."],
  [UsersIcon, "More Features Coming", "Community features, advanced analytics, reading goals, and personalized recommendations are in development."],
] as const;

const FEATURES = [
  [BookIcon, "Reading Progress", "Track your reading progress page by page with three simple states: not started, in progress, and finished."],
  [BookIcon, "Personal Library", "Organize your book collection with basic filtering by reading state and ownership. Search and sort your books easily."],
  [MagnifyingGlassIcon, "Book Discovery", "Search millions of books through Google Books API and automatically populate details like covers, pages, and descriptions."],
  [ChartBarIcon, "Basic Statistics", "View essential reading stats on your dashboard: total books, finished books, pages read, and current reading count."],
  [StarIcon, "Book Ratings", "Rate finished books with a 1-5 star system to remember your favorites and track your reading preferences."],
  [UsersIcon, "Coming Soon", "Social reading features, advanced analytics, reading goals, and custom shelves are planned for future releases."],
] as const;

const INTEGRATIONS = [
  ["Google Books Integration", false, "Search millions of books and automatically fetch metadata, covers, and descriptions. Add books to your library with one click."],
  ["Firebase Authentication", false, "Secure Google sign-in with cloud synchronization across all your devices. Your library stays up-to-date everywhere."],
  ["Advanced Reading Analytics", true, "Detailed insights into your reading patterns, speed, and preferences with comprehensive data visualization. Coming soon!"],
  ["Social Reading Features", true, "Share books with friends, join reading groups, and discover what fellow readers are enjoying. In development!"],
] as const;

const FAQ = [
  ["Is Librarium free to use?", "Yes! Librarium is currently completely free to use. All current features are available at no cost. Future premium features may be introduced as the app grows."],
  ["What can I do with Librarium right now?", "You can build your personal library, track reading progress page-by-page, search and add books via Google Books API, rate finished books, and view basic reading statistics on your dashboard."],
  ["How does reading progress tracking work?", "Simply update your current page number as you read. Books progress through three states: not started, in progress, and finished. Your dashboard shows real-time stats about your reading habits."],
  ["Is my reading data private and secure?", "Yes, your privacy is our priority. All your reading data is securely stored in Firebase with encryption. Only you can access your personal library and reading data."],
  ["What features are coming next?", "We're working on advanced analytics, reading goals, social features, custom shelves, and AI-powered recommendations. The app is actively being developed with regular updates."],
];

/** Sign in with Google, then go to the dashboard; failures are explained, not swallowed. */
function useStart() {
  const { user } = useLibrary();
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const start = async () => {
    if (user) return router.push("/dashboard");
    setBusy(true);
    try {
      await signIn();
      router.push("/dashboard");
    } catch (e) {
      toast(authMessage(e), "error");
      setBusy(false);
    }
  };
  return { start, busy, signedIn: !!user };
}

function SectionTitle({ eyebrow, title, children }: { eyebrow?: string; title: string; children?: React.ReactNode }) {
  return (
    <div className="reveal mx-auto mb-12 max-w-2xl text-center">
      {eyebrow && <p className="mb-2 text-sm font-medium uppercase tracking-widest text-brand-accent">{eyebrow}</p>}
      <h2 className="mb-4 text-3xl tracking-tight md:text-4xl">{title}</h2>
      {children && <p className="text-lg text-muted-foreground">{children}</p>}
    </div>
  );
}

function Navbar() {
  const { start, busy, signedIn } = useStart();
  const [open, setOpen] = useState(false);
  const cta = (className: string) => (
    <Button busy={busy} onClick={start} className={cn("group", className)}>
      {busy ? "Signing in…" : signedIn ? "Dashboard" : "Login"} {!busy && <ArrowRightIcon className="transition-transform group-hover:translate-x-1" />}
    </Button>
  );
  return (
    <header className="sticky top-4 z-40 mx-auto flex w-[92%] max-w-screen-xl items-center justify-between rounded-2xl border border-border/60 bg-background/80 px-4 py-2.5 shadow-soft backdrop-blur-md">
      <Logo href="/" />
      <nav className="hidden items-center gap-1 lg:flex">
        {SECTIONS.map(([href, label]) => <a key={href} href={href} className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">{label}</a>)}
      </nav>
      <div className="flex items-center gap-1">
        {cta("hidden h-9 lg:inline-flex")}
        <ThemeToggle />
        <a href={GITHUB} target="_blank" rel="noreferrer" aria-label="View on GitHub" className={buttonClass("ghost", "icon", "hidden lg:inline-flex")}><GithubLogoIcon /></a>
        <Button variant="ghost" size="icon" className="lg:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen((o) => !o)}>{open ? <XIcon /> : <ListIcon />}</Button>
      </div>
      {open && (
        <nav className="absolute inset-x-0 top-full mt-2 flex flex-col gap-1 rounded-2xl border border-border bg-popover p-3 shadow-xl animate-settle lg:hidden">
          {SECTIONS.map(([href, label]) => <a key={href} href={href} onClick={() => setOpen(false)} className="rounded-lg px-3 py-2.5 text-muted-foreground hover:bg-muted hover:text-foreground">{label}</a>)}
          {cta("mt-2")}
        </nav>
      )}
    </header>
  );
}

function Hero() {
  const { start, busy, signedIn } = useStart();
  return (
    <section className="mx-auto max-w-screen-xl px-6 pb-16 pt-20 text-center md:pt-28">
      <div className="space-y-8">
        <Badge tone="outline" className="mx-auto gap-2 py-1 pl-1 pr-3 text-sm animate-rise">
          <Badge tone="brand" className="bg-brand-primary text-white dark:text-background">New</Badge> AI-powered reading companion is here!
        </Badge>
        <h1 className="mx-auto max-w-3xl text-5xl tracking-tight animate-rise md:text-7xl" style={{ "--i": 1 } as React.CSSProperties}>
          Track your <span className="bg-gradient-to-r from-brand-accent to-brand-primary bg-clip-text pr-2 italic text-transparent">reading</span> journey
        </h1>
        <p className="mx-auto max-w-xl text-xl text-muted-foreground animate-rise" style={{ "--i": 2 } as React.CSSProperties}>
          Build your personal library, track reading progress, and discover new books. Start with the essentials - more features coming soon.
        </p>
        <div className="flex flex-col items-center justify-center gap-3 animate-rise sm:flex-row" style={{ "--i": 3 } as React.CSSProperties}>
          <Button size="lg" busy={busy} onClick={start} className="group w-full sm:w-auto" aria-label={signedIn ? "Go to your dashboard" : "Sign in with Google to start reading"}>
            {busy ? "Signing in…" : signedIn ? "Go to dashboard" : "Start reading"} {!busy && <ArrowRightIcon className="transition-transform group-hover:translate-x-1" />}
          </Button>
          <a href="#features" className={buttonClass("outline", "lg", "w-full sm:w-auto")}>Explore features</a>
        </div>
      </div>
      <div className="relative mt-20 animate-rise" style={{ "--i": 5 } as React.CSSProperties}>
        <div className="absolute left-1/2 top-4 h-40 w-[85%] -translate-x-1/2 rounded-full bg-brand-primary/40 blur-3xl lg:-top-8 lg:h-80" />
        <Image src="/images/hero-image-light-2.jpg" alt="The Librarium dashboard" width={1200} height={750} priority className="relative mx-auto rounded-2xl border border-border shadow-2xl transition-transform duration-500 hover:-translate-y-1 dark:hidden" />
        <Image src="/images/hero-image-dark-2.jpg" alt="The Librarium dashboard" width={1200} height={750} className="relative mx-auto hidden rounded-2xl border border-border shadow-2xl transition-transform duration-500 hover:-translate-y-1 dark:block" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-background md:h-40" />
      </div>
    </section>
  );
}

const card = "rounded-2xl border border-border/60 bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-soft";

export default function LandingPage() {
  const { user, authReady } = useLibrary();
  const router = useRouter();
  useEffect(() => {
    if (authReady && user) router.replace("/dashboard");
  }, [authReady, user, router]);
  if (!authReady || user) return <div className="grid min-h-screen place-items-center"><Spinner className="size-8" /></div>;

  return (
    <div className="overflow-x-clip pt-4">
      <Navbar />
      <Hero />

      <section id="features" className="mx-auto max-w-screen-xl scroll-mt-24 px-6 py-24">
        <SectionTitle eyebrow="Features" title="Essential Reading Tools">
          Core features are ready now, with advanced capabilities planned for future releases. Start tracking your reading journey today.
        </SectionTitle>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(([I, title, text]) => (
            <div key={title} className={cn(card, "reveal border-transparent bg-transparent text-center hover:border-border/60 hover:bg-card")}>
              <span className="mx-auto mb-4 grid size-12 place-items-center rounded-full bg-brand-primary/10 text-brand-primary ring-8 ring-brand-primary/5"><I className="size-6" /></span>
              <h3 className="mb-2 text-lg">{title}</h3>
              <p className="text-sm text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="benefits" className="mx-auto grid max-w-screen-xl scroll-mt-24 items-center gap-12 px-6 py-24 lg:grid-cols-2 lg:gap-24">
        <div className="reveal">
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-brand-accent">Benefits</p>
          <h2 className="mb-4 text-3xl tracking-tight md:text-4xl">Start Your Reading Journey</h2>
          <p className="text-xl text-muted-foreground">Get started with essential reading tools that work today. Simple, effective book tracking with a roadmap for exciting features ahead.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {BENEFITS.map(([I, title, text], i) => (
            <div key={title} className={cn(card, "group reveal bg-muted/40 dark:bg-card")}>
              <div className="mb-6 flex justify-between">
                <I className="size-8 text-brand-primary" />
                <span className="font-serif text-5xl text-muted-foreground/15 transition-colors group-hover:text-muted-foreground/30">0{i + 1}</span>
              </div>
              <h3 className="mb-2 text-lg">{title}</h3>
              <p className="text-sm text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="services" className="mx-auto max-w-screen-xl scroll-mt-24 px-6 py-24">
        <SectionTitle eyebrow="Integrations" title="Current & Planned Integrations">
          Essential integrations are live now, with advanced features and social capabilities coming in future releases.
        </SectionTitle>
        <div className="grid gap-4 lg:grid-cols-2">
          {INTEGRATIONS.map(([title, pro, text]) => (
            <div key={title} className={cn(card, "reveal bg-muted/40 dark:bg-card")}>
              <div className="mb-2 flex items-start justify-between gap-4">
                <h3 className="text-lg">{title}</h3>
                {pro && <Badge tone="brand" className="bg-brand-primary text-white dark:text-background">PRO</Badge>}
              </div>
              <p className="text-sm text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="early-access" className="mx-auto max-w-screen-xl scroll-mt-24 px-6 py-24">
        <SectionTitle title="Early Access Preview">Librarium is in active development. Join the early access to help shape the future of reading tracking.</SectionTitle>
        <div className="reveal mx-auto max-w-3xl rounded-3xl border border-border/60 bg-gradient-to-br from-brand-primary/[0.05] via-card to-brand-accent/[0.08] p-10 text-center shadow-soft">
          <h3 className="mb-4 text-2xl">Be Part of the Journey</h3>
          <p className="mb-6 text-lg text-muted-foreground">Librarium is a work in progress, built for readers who want simple, effective book tracking. Your feedback helps us build the features that matter most to you.</p>
          <div className="flex flex-wrap justify-center gap-2">
            {["Essential reading tools ready", "Regular updates", "Community-driven development", "Privacy-focused"].map((t) => <Badge key={t} tone="outline">{t}</Badge>)}
          </div>
        </div>
      </section>

      <section id="faq" className="mx-auto max-w-2xl scroll-mt-24 px-6 py-24">
        <SectionTitle eyebrow="FAQ" title="Frequently Asked Questions" />
        <div className="divide-y divide-border border-y border-border">
          {FAQ.map(([q, a]) => (
            <details key={q} className="group reveal">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-medium transition-colors hover:text-brand-primary">
                {q} <CaretDownIcon className="size-4 shrink-0 transition-transform duration-300 group-open:rotate-180" />
              </summary>
              <p className="pb-5 text-muted-foreground animate-rise">{a}</p>
            </details>
          ))}
        </div>
      </section>

      <footer className="mx-auto max-w-screen-xl px-6 pb-10 pt-12">
        <div className="flex flex-col gap-8 rounded-3xl border border-border/60 bg-card p-10 md:flex-row md:items-start md:justify-between">
          <div className="space-y-3">
            <Logo href="/" />
            <p className="max-w-xs text-sm text-muted-foreground">A quiet, personal library for tracking what you read.</p>
          </div>
          <nav className="grid grid-cols-2 gap-x-12 gap-y-2 text-sm">
            {SECTIONS.map(([href, label]) => <a key={href} href={href} className="text-muted-foreground hover:text-foreground">{label}</a>)}
            <a href={GITHUB} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground">GitHub</a>
          </nav>
        </div>
        <div className="mt-6 flex flex-col justify-between gap-2 px-2 text-sm text-muted-foreground md:flex-row">
          <span>© {new Date().getFullYear()} Librarium. All rights reserved.</span>
          <span>Made with ❤️ by Anders Bekkevard</span>
        </div>
      </footer>
    </div>
  );
}
