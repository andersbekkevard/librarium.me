"use client";

import { useAuthContext } from "@/lib/providers/AuthProvider";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const BoldHero = () => {
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const router = useRouter();
  const { loading, isAuthenticated, signInWithGoogle } = useAuthContext();

  const handleGetStarted = async () => {
    if (isAuthenticated) {
      router.push("/dashboard");
      return;
    }

    setIsSigningIn(true);
    setAuthError(null);

    try {
      await signInWithGoogle();
      router.push("/dashboard");
    } catch {
      setAuthError("Failed to sign in. Please try again.");
      setIsSigningIn(false);
    }
  };

  return (
    <section className="relative min-h-[95vh] flex flex-col justify-center px-6 md:px-12 lg:px-20">
      <div className="max-w-[1400px] mx-auto w-full">
        {/* Giant stacked headline */}
        <h1
          className="font-heading font-black uppercase leading-[0.92] tracking-[-0.03em] text-[clamp(3.5rem,12vw,8rem)] text-[#f5f0e8]"
        >
          Read
          <br />
          More.
          <br />
          <span className="text-[#FEF3C7]">Together.</span>
        </h1>

        {/* Subline */}
        <p
          className="mt-8 md:mt-10 max-w-[520px] text-base md:text-lg text-[#f5f0e8]/70 leading-relaxed"
          style={{ fontFamily: "var(--font-geist-sans)" }}
        >
          Track every page. Discover through friends.
          Build the shelf that tells your story.
        </p>

        {/* CTA button */}
        <div className="mt-10 md:mt-12">
          <button
            onClick={handleGetStarted}
            disabled={isSigningIn || loading}
            className="inline-block px-10 py-4 bg-[#FEF3C7] text-[#0f1f15] text-sm md:text-base font-semibold uppercase tracking-[0.15em] transition-colors duration-300 hover:bg-[#fde68a] disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ fontFamily: "var(--font-geist-sans)" }}
          >
            {isSigningIn ? "Signing in..." : isAuthenticated ? "Go to Dashboard" : "Start Reading"}
          </button>
        </div>

        {/* Error */}
        {authError && (
          <p className="mt-4 text-sm text-red-400" style={{ fontFamily: "var(--font-geist-sans)" }}>
            {authError}
          </p>
        )}
      </div>

      {/* Thin sage rule at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-[#526D5E]/40" />
    </section>
  );
};
