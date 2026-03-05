"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/lib/providers/AuthProvider";
import {
  ArrowRightIcon,
  BookOpenTextIcon,
  ChartLineUpIcon,
  CheckCircleIcon,
  CircleNotchIcon,
  CompassIcon,
  SparkleIcon,
  StackIcon,
} from "@phosphor-icons/react";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const displaySerif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const bodySans = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const heroSignals = [
  { label: "Sync behavior", value: "Real-time" },
  { label: "Analytics horizon", value: "12 months" },
  { label: "AI motivation", value: "Daily" },
];

const featureCards = [
  {
    icon: BookOpenTextIcon,
    title: "Collection architecture",
    description:
      "Capture books instantly, organize by intent, and keep every edition in one coherent library.",
  },
  {
    icon: ChartLineUpIcon,
    title: "Reading telemetry",
    description:
      "See streaks, pace, completion flow, and trend signals without noise-heavy dashboards.",
  },
  {
    icon: CompassIcon,
    title: "Metadata enrichment",
    description:
      "Search millions of titles and auto-fill trustworthy metadata, covers, and contextual details.",
  },
  {
    icon: SparkleIcon,
    title: "Momentum coaching",
    description:
      "Receive personalized encouragement informed by your own reading rhythm and activity history.",
  },
];

const workflow = [
  "Add books from search or manual entry in seconds.",
  "Move from planning to in-progress to finished with consistent state tracking.",
  "Review trends weekly and adjust your reading system with clear evidence.",
];

const faqs = [
  {
    question: "Is Librarium production-ready for daily use?",
    answer:
      "Yes. Core library management, progress tracking, search, ratings, and analytics are stable and actively used.",
  },
  {
    question: "How does authentication and sync work?",
    answer:
      "Google sign-in is powered by Firebase Authentication, and your library updates in real time across devices.",
  },
  {
    question: "Can I use Librarium for free today?",
    answer:
      "Yes. Librarium is free while the product evolves and premium capabilities are designed.",
  },
];

export default function LandingPage() {
  const router = useRouter();
  const { isAuthenticated, loading, signInWithGoogle } = useAuthContext();
  const [isSigningIn, setIsSigningIn] = useState(false);

  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, loading, router]);

  const handlePrimaryAction = async () => {
    if (isAuthenticated) {
      router.push("/dashboard");
      return;
    }

    setIsSigningIn(true);

    try {
      await signInWithGoogle();
      router.push("/dashboard");
    } catch (error) {
      console.error("Sign-in failed:", error);
      setIsSigningIn(false);
    }
  };

  if (!loading && isAuthenticated) {
    return null;
  }

  return (
    <main className={`${bodySans.className} relative overflow-x-clip pb-24`}>
      <div className="landing-grid pointer-events-none absolute inset-0 opacity-55" />
      <div className="pointer-events-none absolute -top-32 right-[-16rem] h-[36rem] w-[36rem] rounded-full bg-brand-primary/20 blur-3xl" />
      <div className="pointer-events-none absolute top-[24rem] -left-44 h-[26rem] w-[26rem] rounded-full bg-brand-accent/30 blur-3xl" />

      <section className="container pt-10 md:pt-16">
        <div className="grid items-start gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-8">
            <Badge className="rounded-full bg-brand-primary/10 px-4 py-1.5 text-brand-primary">
              Variant C: Bold Contemporary Contrast
            </Badge>

            <h1
              className={`${displaySerif.className} max-w-4xl text-5xl leading-[0.88] tracking-tight text-foreground md:text-7xl lg:text-8xl`}
            >
              Build a reading
              <span className="block text-brand-primary">practice, not a list.</span>
            </h1>

            <p className="max-w-xl text-lg text-muted-foreground md:text-xl">
              Librarium combines collection management, live progress tracking,
              and intelligent analytics in a crafted white-and-green interface.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                onClick={handlePrimaryAction}
                disabled={isSigningIn}
                size="lg"
                className="group rounded-2xl bg-brand-primary px-8 text-white hover:bg-brand-primary-hover"
              >
                {isSigningIn ? (
                  <>
                    <CircleNotchIcon className="size-5 animate-spin" />
                    Signing in...
                  </>
                ) : isAuthenticated ? (
                  <>
                    Open Dashboard
                    <ArrowRightIcon className="size-5 transition-transform group-hover:translate-x-1" />
                  </>
                ) : (
                  <>
                    Continue with Google
                    <ArrowRightIcon className="size-5 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-2xl border-brand-primary/30 bg-white/85 px-8 hover:bg-brand-primary/5"
              >
                <a href="#experience">See the system</a>
              </Button>
            </div>
          </div>

          <aside className="relative lg:translate-y-8">
            <div className="absolute -left-8 top-8 hidden h-32 w-32 rounded-full border border-brand-primary/35 lg:block" />
            <div className="relative overflow-hidden rounded-[2rem] border border-border/70 bg-white/88 p-6 shadow-[0_30px_90px_rgba(17,63,39,0.2)] backdrop-blur">
              <div className="mb-6 flex items-center justify-between border-b border-border/80 pb-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary">
                  Reader Control Room
                </p>
                <StackIcon className="size-5 text-brand-primary" />
              </div>

              <div className="space-y-3">
                {heroSignals.map((item, index) => (
                  <article
                    key={item.label}
                    className="animate-fade-in-up rounded-2xl border border-border/80 bg-background px-4 py-4"
                    style={{ animationDelay: `${index * 120}ms` }}
                  >
                    <p className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                      {item.label}
                    </p>
                    <p className={`${displaySerif.className} mt-1 text-3xl text-brand-primary`}>
                      {item.value}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section id="experience" className="container mt-20 md:mt-28">
        <div className="grid gap-6 lg:grid-cols-[0.65fr_1.35fr]">
          <article className="rounded-[2rem] border border-brand-primary/20 bg-brand-primary p-8 text-primary-foreground md:p-10">
            <p className="text-xs uppercase tracking-[0.2em] text-primary-foreground/80">Workflow</p>
            <h2 className={`${displaySerif.className} mt-4 text-4xl leading-tight md:text-5xl`}>
              From capture to reflection in one continuous flow.
            </h2>
            <ul className="mt-8 space-y-4 text-sm md:text-base">
              {workflow.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircleIcon className="mt-0.5 size-5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-[2rem] border border-border/70 bg-gradient-to-br from-white via-white to-brand-accent/20 p-8 md:p-10">
            <p className="text-xs uppercase tracking-[0.2em] text-brand-primary">Design language</p>
            <h3 className={`${displaySerif.className} mt-4 max-w-3xl text-4xl leading-tight md:text-5xl`}>
              Asymmetric layout, high contrast surfaces, and editorial type with calm motion.
            </h3>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Variant C intentionally avoids template patterns. The composition
              uses offset blocks, strong typography, and white-space discipline
              so information feels premium and readable on desktop and mobile.
            </p>
          </article>
        </div>
      </section>

      <section id="features" className="container mt-20 md:mt-28">
        <div className="mb-8 flex flex-col gap-4 md:mb-12 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-brand-primary">Core capabilities</p>
            <h2 className={`${displaySerif.className} mt-2 text-4xl md:text-5xl`}>
              Purpose-built for serious readers.
            </h2>
          </div>
          <p className="max-w-md text-muted-foreground">
            Stable foundations today, with clear room for future social and
            planning layers as Librarium evolves.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {featureCards.map(({ icon: Icon, title, description }, index) => (
            <article
              key={title}
              className="animate-fade-in-up rounded-3xl border border-border/80 bg-white/85 p-6 shadow-[0_18px_44px_rgba(16,56,36,0.1)]"
              style={{ animationDelay: `${index * 110}ms` }}
            >
              <div className="mb-4 inline-flex rounded-xl bg-brand-primary/10 p-2.5 text-brand-primary">
                <Icon className="size-6" />
              </div>
              <h3 className={`${displaySerif.className} text-3xl leading-tight`}>{title}</h3>
              <p className="mt-3 text-muted-foreground">{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="proof" className="container mt-20 md:mt-28">
        <article className="rounded-[2rem] border border-border/70 bg-white/90 p-8 md:p-12">
          <p className="text-xs uppercase tracking-[0.2em] text-brand-primary">Product signal</p>
          <h2 className={`${displaySerif.className} mt-3 max-w-3xl text-4xl md:text-5xl`}>
            Focused, readable, and engineered for long-term use.
          </h2>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
            Librarium keeps cognitive load low while preserving depth. The
            interface is built for daily reading decisions, not presentation
            vanity metrics.
          </p>
        </article>
      </section>

      <section id="faq" className="container mt-20 md:mt-28">
        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-brand-primary">FAQ</p>
            <h2 className={`${displaySerif.className} mt-2 text-4xl md:text-5xl`}>
              Practical answers.
            </h2>
          </div>
          <div className="space-y-3">
            {faqs.map((item) => (
              <details key={item.question} className="group rounded-2xl border border-border/80 bg-white/85 p-5">
                <summary className="cursor-pointer list-none text-lg font-semibold text-foreground group-open:text-brand-primary">
                  {item.question}
                </summary>
                <p className="mt-3 text-muted-foreground">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="container mt-20 md:mt-28">
        <div className="rounded-[2rem] border border-brand-primary/20 bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary p-8 text-white md:flex md:items-center md:justify-between md:p-12">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-white/70">Start now</p>
            <h2 className={`${displaySerif.className} mt-2 text-4xl md:text-5xl`}>
              Build your reading operating system.
            </h2>
          </div>
          <Button
            onClick={handlePrimaryAction}
            disabled={isSigningIn}
            size="lg"
            className="mt-6 rounded-2xl bg-white px-8 font-semibold text-brand-primary hover:bg-white/90 md:mt-0"
          >
            {isSigningIn ? (
              <>
                <CircleNotchIcon className="size-5 animate-spin" />
                Signing in...
              </>
            ) : isAuthenticated ? (
              "Go to dashboard"
            ) : (
              "Continue with Google"
            )}
          </Button>
        </div>
      </section>
    </main>
  );
}
