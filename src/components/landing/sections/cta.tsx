"use client";

import { useAuthContext } from "@/lib/providers/AuthProvider";
import { useScrollAnimation } from "@/lib/hooks/useScrollAnimation";
import { CircleNotchIcon, ArrowRightIcon } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export const CTASection = () => {
  const [isSigningIn, setIsSigningIn] = useState(false);
  const router = useRouter();
  const { isAuthenticated, signInWithGoogle } = useAuthContext();
  const { elementRef, isVisible } = useScrollAnimation();

  const handleGetStarted = async () => {
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
    <section className="bg-[#1a2e1f] py-24 md:py-32">
      <div
        ref={elementRef as React.RefObject<HTMLDivElement>}
        className={`max-w-[1200px] mx-auto px-6 text-center scroll-fade-in-up ${isVisible ? "animate" : ""}`}
      >
        <h2
          className="text-[#FFF8F0] text-3xl md:text-4xl lg:text-5xl tracking-tight mb-6 max-w-2xl mx-auto leading-[1.15]"
          style={{ fontFamily: "var(--font-fraunces)", fontWeight: 700 }}
        >
          Your library is waiting to be built
        </h2>

        <p className="text-[#FFF8F0]/60 text-lg mb-10 max-w-lg mx-auto">
          Join thousands of readers who&apos;ve made Librarium the home for their
          reading life.
        </p>

        <button
          onClick={handleGetStarted}
          disabled={isSigningIn}
          className="inline-flex items-center gap-2 bg-[#FFF8F0] text-[#1a2e1f] px-10 py-4 text-[15px] font-semibold tracking-wide transition-all hover:bg-[#FFF8F0]/90 disabled:opacity-50 group"
        >
          {isSigningIn ? (
            <>
              <CircleNotchIcon
                className="size-4 animate-spin"
                weight="bold"
              />
              Signing in...
            </>
          ) : isAuthenticated ? (
            <>
              Go to Dashboard
              <ArrowRightIcon className="size-4 group-hover:translate-x-1 transition-transform" />
            </>
          ) : (
            <>
              Get Started — It&apos;s Free
              <ArrowRightIcon className="size-4 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </div>
    </section>
  );
};
