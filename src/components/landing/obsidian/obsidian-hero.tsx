"use client";

import { useAuthContext } from "@/lib/providers/AuthProvider";
import { ArrowRightIcon, CircleNotchIcon } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function ObsidianHero() {
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
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
      setShowSuccess(true);
      setTimeout(() => router.push("/dashboard"), 1000);
    } catch {
      setAuthError("Failed to sign in");
      setIsSigningIn(false);
    }
  };

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center">
        <CircleNotchIcon className="h-8 w-8 animate-spin text-[#C4A265]" weight="bold" />
      </section>
    );
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0">
        {/* Radial glow from center-top */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[radial-gradient(ellipse_at_center,_#C4A265_0%,_transparent_70%)] opacity-[0.06]" />
        {/* Subtle diagonal lines texture */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `repeating-linear-gradient(
              -45deg,
              transparent,
              transparent 80px,
              #C4A265 80px,
              #C4A265 81px
            )`,
          }}
        />
        {/* Grain overlay */}
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Decorative flourish */}
        <div className="obsidian-fade-in mb-8 flex items-center justify-center gap-4">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#C4A265]/40" />
          <span className="text-[11px] tracking-[0.3em] uppercase text-[#C4A265]/70">
            A sanctuary for the devoted reader
          </span>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#C4A265]/40" />
        </div>

        {/* Main headline */}
        <h1
          className="obsidian-fade-in obsidian-delay-1 font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[6.5rem] tracking-tight leading-[0.9] text-[#E8E2D4]"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          <span className="block">Your Library,</span>
          <span className="block mt-2">
            <span className="relative">
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-[#C4A265] via-[#E8C872] to-[#C4A265]">
                Illuminated
              </span>
              {/* Glow behind the golden word */}
              <span className="absolute inset-0 blur-2xl bg-gradient-to-r from-[#C4A265]/20 via-[#E8C872]/30 to-[#C4A265]/20 -z-10" />
            </span>
          </span>
        </h1>

        {/* Subheading */}
        <p className="obsidian-fade-in obsidian-delay-2 mt-8 md:mt-10 max-w-2xl mx-auto text-lg md:text-xl text-[#8A8478] leading-relaxed font-light">
          Librarium transforms your reading life into a curated collection.
          Track every page, discover patterns in your journey, and build a
          library that reflects who you are.
        </p>

        {/* CTA */}
        <div className="obsidian-fade-in obsidian-delay-3 mt-10 md:mt-14 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={handleGetStarted}
            disabled={isSigningIn}
            className="group relative px-8 py-3.5 bg-gradient-to-r from-[#C4A265] to-[#B08A40] text-[#0A0A08] font-medium text-sm tracking-[0.06em] uppercase rounded overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-[#C4A265]/20 disabled:opacity-50"
          >
            <span className="relative z-10 flex items-center gap-2">
              {showSuccess ? (
                "Welcome! Redirecting..."
              ) : isSigningIn ? (
                <>
                  <CircleNotchIcon className="size-4 animate-spin" weight="bold" />
                  Signing in...
                </>
              ) : isAuthenticated ? (
                <>
                  Go to Dashboard
                  <ArrowRightIcon className="size-4 group-hover:translate-x-1 transition-transform" />
                </>
              ) : (
                <>
                  Begin Your Collection
                  <ArrowRightIcon className="size-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </span>
            {/* Shimmer effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </button>

          <a
            href="#features"
            className="px-8 py-3.5 text-sm tracking-[0.06em] uppercase text-[#8A8478] hover:text-[#C4A265] border border-[#2A2A28] hover:border-[#C4A265]/30 rounded transition-all duration-300"
          >
            Explore Features
          </a>
        </div>

        {/* Error/Success messages */}
        {authError && (
          <div className="mt-6 text-sm text-red-400/80 animate-pulse">{authError}</div>
        )}
        {showSuccess && (
          <div className="mt-6 text-sm text-[#C4A265]">
            Successfully signed in. Welcome to Librarium.
          </div>
        )}

        {/* Scroll indicator */}
        <div className="obsidian-fade-in obsidian-delay-4 mt-20 md:mt-28">
          <div className="flex flex-col items-center gap-2 text-[#8A8478]/40">
            <span className="text-[10px] tracking-[0.2em] uppercase">Scroll</span>
            <div className="w-px h-8 bg-gradient-to-b from-[#C4A265]/30 to-transparent obsidian-float" />
          </div>
        </div>
      </div>
    </section>
  );
}
