"use client";

import { useAuthContext } from "@/lib/providers/AuthProvider";
import { ArrowRightIcon, CircleNotchIcon } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const AuroraHeroSection = () => {
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const router = useRouter();
  const { loading, isAuthenticated, signInWithGoogle } = useAuthContext();

  const handleGetStarted = async () => {
    if (isAuthenticated) {
      router.push("/dashboard");
      return;
    }
    setIsSigningIn(true);
    try {
      await signInWithGoogle();
      setShowSuccess(true);
      setTimeout(() => router.push("/dashboard"), 1000);
    } catch {
      setIsSigningIn(false);
    }
  };

  return (
    <section className="aurora-hero relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated aurora gradient background */}
      <div className="absolute inset-0 aurora-bg" />

      {/* Grain texture overlay */}
      <div className="absolute inset-0 aurora-grain opacity-[0.03]" />

      {/* Radial vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,transparent_0%,#080f0b_100%)]" />

      {/* Ambient light orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-[#1a3d28]/20 blur-[120px] aurora-orb-1" />
      <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-[#c4841d]/8 blur-[100px] aurora-orb-2" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-10 text-center">
        {/* Eyebrow */}
        <div className="aurora-fade-in mb-8">
          <span className="inline-flex items-center gap-3 text-xs tracking-[0.25em] uppercase text-[#c4841d]/70">
            <span className="w-8 h-px bg-[#c4841d]/40" />
            A sanctuary for readers
            <span className="w-8 h-px bg-[#c4841d]/40" />
          </span>
        </div>

        {/* Main headline */}
        <h1
          className="aurora-fade-in aurora-delay-1 text-[#f5efe0] leading-[0.9] tracking-[-0.03em]"
          style={{
            fontFamily: "var(--font-serif)",
            fontWeight: 500,
            fontSize: "clamp(3.5rem, 10vw, 8rem)",
          }}
        >
          Your Library,
          <br />
          <span className="aurora-text-shimmer italic" style={{ fontWeight: 400 }}>
            Illuminated
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className="aurora-fade-in aurora-delay-2 mt-8 md:mt-10 max-w-xl mx-auto text-lg md:text-xl leading-relaxed text-[#f5efe0]/45"
          style={{ fontFamily: "var(--font-geist-sans)" }}
        >
          Build your personal library with intention. Track every page,
          discover what moves you, and let your reading life unfold.
        </p>

        {/* CTA */}
        <div className="aurora-fade-in aurora-delay-3 mt-12 md:mt-14 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={handleGetStarted}
            disabled={isSigningIn || loading}
            className="group relative px-10 py-4 rounded-full bg-gradient-to-r from-[#c4841d] to-[#d4a03c] text-[#080f0b] font-semibold text-sm tracking-[0.05em] uppercase transition-all duration-500 hover:shadow-[0_0_40px_rgba(196,132,29,0.3)] hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100"
          >
            {showSuccess ? (
              <span>Welcome — redirecting...</span>
            ) : isSigningIn ? (
              <span className="flex items-center gap-2">
                <CircleNotchIcon className="size-4 animate-spin" weight="bold" />
                Signing in
              </span>
            ) : isAuthenticated ? (
              <span className="flex items-center gap-2">
                Go to Dashboard
                <ArrowRightIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            ) : (
              <span className="flex items-center gap-2">
                Begin Reading
                <ArrowRightIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            )}
            {/* Glow ring */}
            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-[#c4841d] to-[#d4a03c] opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500" />
          </button>

          <a
            href="#philosophy"
            className="text-sm tracking-[0.08em] uppercase text-[#f5efe0]/30 hover:text-[#e8c066] transition-colors duration-500 flex items-center gap-2"
          >
            Explore
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
            </svg>
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 aurora-fade-in aurora-delay-4">
        <div className="w-px h-12 bg-gradient-to-b from-transparent via-[#c4841d]/30 to-transparent aurora-scroll-pulse" />
      </div>
    </section>
  );
};
