"use client";

import { useAuthContext } from "@/lib/providers/AuthProvider";
import { ArrowRightIcon, CircleNotchIcon } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";

export const VelvetCTA = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const router = useRouter();
  const { isAuthenticated, signInWithGoogle } = useAuthContext();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleAction = async () => {
    if (isAuthenticated) {
      router.push("/dashboard");
      return;
    }
    setIsSigningIn(true);
    try {
      await signInWithGoogle();
      router.push("/dashboard");
    } catch {
      setIsSigningIn(false);
    }
  };

  return (
    <section ref={ref} className="relative py-32 md:py-44">
      <div className="px-6 md:px-10 lg:px-16">
        <div
          className={`max-w-4xl mx-auto text-center transition-all duration-1200 ease-out ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2
            className="text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.92] tracking-[-0.04em] font-medium mb-8 md:mb-12"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Begin your
            <br />
            <em className="not-italic text-brand-primary dark:text-brand-accent">
              reading practice
            </em>
          </h2>

          <p
            className="max-w-lg mx-auto text-base md:text-lg text-muted-foreground leading-relaxed mb-10 md:mb-14"
            style={{ fontFamily: "var(--font-geist-sans)" }}
          >
            Free to use. No credit card. No tracking beyond your books.
            Just you and your library.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handleAction}
              disabled={isSigningIn}
              className="group inline-flex items-center gap-3 px-8 py-4 bg-foreground text-background rounded-full text-[13px] uppercase tracking-[0.12em] font-medium hover:opacity-85 transition-all duration-300 disabled:opacity-50"
              style={{ fontFamily: "var(--font-geist-sans)" }}
            >
              {isSigningIn ? (
                <>
                  <CircleNotchIcon className="size-4 animate-spin" weight="bold" />
                  <span>Signing in</span>
                </>
              ) : isAuthenticated ? (
                <>
                  <span>Go to Dashboard</span>
                  <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
                </>
              ) : (
                <>
                  <span>Create Your Library</span>
                  <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>

            <span
              className="text-[12px] uppercase tracking-[0.1em] text-muted-foreground"
              style={{ fontFamily: "var(--font-geist-sans)" }}
            >
              Sign in with Google
            </span>
          </div>
        </div>
      </div>

      {/* Decorative rule */}
      <div className="absolute bottom-0 left-6 right-6 md:left-10 md:right-10 lg:left-16 lg:right-16 h-px bg-border/30" />
    </section>
  );
};
