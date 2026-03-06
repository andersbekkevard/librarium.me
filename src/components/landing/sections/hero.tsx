"use client";

import { useAuthContext } from "@/lib/providers/AuthProvider";
import { ArrowRightIcon, CircleNotchIcon } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export const VelvetHero = () => {
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const { loading, isAuthenticated, signInWithGoogle } = useAuthContext();

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  const handleGetStarted = async () => {
    if (isAuthenticated) {
      router.push("/dashboard");
      return;
    }
    setIsSigningIn(true);
    try {
      await signInWithGoogle();
      setShowSuccess(true);
      setTimeout(() => router.push("/dashboard"), 800);
    } catch {
      setIsSigningIn(false);
    }
  };

  if (loading) {
    return (
      <section className="h-screen flex items-center justify-center">
        <CircleNotchIcon className="h-6 w-6 animate-spin text-muted-foreground" weight="bold" />
      </section>
    );
  }

  return (
    <section className="relative min-h-[100svh] flex flex-col justify-end overflow-hidden">
      {/* Grain overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-10 opacity-[0.035] dark:opacity-[0.06]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
        }}
      />

      {/* Decorative line elements */}
      <div className="absolute top-0 left-[15%] w-px h-full bg-gradient-to-b from-transparent via-border/30 to-transparent" />
      <div className="absolute top-0 right-[25%] w-px h-full bg-gradient-to-b from-transparent via-border/20 to-transparent hidden lg:block" />

      {/* Content */}
      <div className="relative z-20 px-6 md:px-10 lg:px-16 pb-16 md:pb-24 pt-32">
        {/* Eyebrow */}
        <div
          className={`mb-8 md:mb-12 transition-all duration-1000 ease-out ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span
            className="inline-flex items-center gap-3 text-[11px] md:text-[12px] uppercase tracking-[0.2em] text-muted-foreground"
            style={{ fontFamily: "var(--font-geist-sans)" }}
          >
            <span className="inline-block w-8 h-px bg-brand-primary" />
            Personal Library Management
          </span>
        </div>

        {/* Main headline */}
        <div className="max-w-[90vw] lg:max-w-[75vw]">
          <h1
            className={`text-[clamp(3rem,10vw,9rem)] leading-[0.88] tracking-[-0.04em] font-medium transition-all duration-1000 delay-200 ease-out ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ fontFamily: "var(--font-serif)" }}
          >
            <span className="block">Your Library,</span>
            <span className="block mt-1 md:mt-2">
              <em className="not-italic text-brand-primary dark:text-brand-accent">Redefined</em>
            </span>
          </h1>
        </div>

        {/* Subtext + CTA row */}
        <div
          className={`mt-10 md:mt-16 flex flex-col md:flex-row md:items-end md:justify-between gap-8 md:gap-16 transition-all duration-1000 delay-500 ease-out ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <p
            className="max-w-md text-base md:text-lg text-muted-foreground leading-relaxed"
            style={{ fontFamily: "var(--font-geist-sans)" }}
          >
            Build your personal collection. Track every page. Discover what to read next.
            A contemplative space for readers who care about their craft.
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <button
              onClick={handleGetStarted}
              disabled={isSigningIn}
              className="group inline-flex items-center gap-3 px-7 py-3.5 bg-foreground text-background rounded-full text-[13px] uppercase tracking-[0.12em] font-medium hover:opacity-85 transition-all duration-300 disabled:opacity-50"
              style={{ fontFamily: "var(--font-geist-sans)" }}
            >
              {showSuccess ? (
                <span>Welcome</span>
              ) : isSigningIn ? (
                <>
                  <CircleNotchIcon className="size-4 animate-spin" weight="bold" />
                  <span>Signing in</span>
                </>
              ) : isAuthenticated ? (
                <>
                  <span>Dashboard</span>
                  <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
                </>
              ) : (
                <>
                  <span>Start Reading</span>
                  <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>

            <a
              href="#features"
              className="text-[13px] uppercase tracking-[0.12em] text-muted-foreground hover:text-foreground transition-colors duration-300 underline underline-offset-4 decoration-border hover:decoration-foreground"
              style={{ fontFamily: "var(--font-geist-sans)" }}
            >
              Explore Features
            </a>
          </div>
        </div>

        {/* Bottom feature chips */}
        <div
          className={`mt-16 md:mt-24 flex flex-wrap gap-3 transition-all duration-1000 delay-700 ease-out ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {[
            "Track Progress",
            "AI Recommendations",
            "Reading Analytics",
            "Barcode Scanning",
            "Personal Collections",
          ].map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-4 py-1.5 rounded-full border border-border/60 text-[11px] md:text-[12px] uppercase tracking-[0.1em] text-muted-foreground bg-background/50 backdrop-blur-sm"
              style={{ fontFamily: "var(--font-geist-sans)" }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Hard bottom edge */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-border/40" />
    </section>
  );
};
