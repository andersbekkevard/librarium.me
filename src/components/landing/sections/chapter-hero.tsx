"use client";

import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/lib/providers/AuthProvider";
import { ArrowRightIcon, CircleNotchIcon } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function ChapterHero() {
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

  if (loading) {
    return (
      <section
        id="chapter-hero"
        className="min-h-[85vh] flex items-center justify-center bg-[#FFF8F0]"
      >
        <CircleNotchIcon
          className="h-8 w-8 animate-spin text-[#244633]"
          weight="bold"
        />
      </section>
    );
  }

  return (
    <section
      id="chapter-hero"
      className="relative min-h-[85vh] flex items-center justify-center bg-[#FFF8F0] overflow-hidden"
    >
      {/* Book spine decorations on sides */}
      <div className="absolute left-0 top-0 bottom-0 w-[3px] hidden lg:block">
        <div className="h-full w-full bg-gradient-to-b from-transparent via-[#789D72]/30 to-transparent" />
      </div>
      <div className="absolute left-[6px] top-0 bottom-0 w-[1px] hidden lg:block">
        <div className="h-full w-full bg-gradient-to-b from-transparent via-[#789D72]/15 to-transparent" />
      </div>
      <div className="absolute right-0 top-0 bottom-0 w-[3px] hidden lg:block">
        <div className="h-full w-full bg-gradient-to-b from-transparent via-[#789D72]/30 to-transparent" />
      </div>
      <div className="absolute right-[6px] top-0 bottom-0 w-[1px] hidden lg:block">
        <div className="h-full w-full bg-gradient-to-b from-transparent via-[#789D72]/15 to-transparent" />
      </div>

      <div className="relative z-10 max-w-[800px] mx-auto px-6 text-center">
        {/* Chapter label */}
        <div className="mb-8 animate-fade-in">
          <span className="inline-block text-xs font-mono tracking-[0.3em] text-[#789D72] uppercase">
            Chapter One
          </span>
        </div>

        {/* Main headline */}
        <h1
          className="text-[2.5rem] sm:text-[3rem] md:text-[3.5rem] leading-[1.1] tracking-tight text-[#244633] mb-6 animate-fade-in-up delay-200"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Your Reading Journey
          <br />
          <span className="italic font-light">Begins</span>
        </h1>

        {/* Subheadline */}
        <p
          className="text-lg md:text-xl text-[#244633]/60 max-w-[540px] mx-auto mb-10 leading-relaxed animate-fade-in-up delay-300"
          style={{ fontFamily: "var(--font-geist-sans)" }}
        >
          Track your reading, discover new books, and connect with fellow
          readers. Librarium is the companion every book lover deserves.
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up delay-500">
          <Button
            onClick={handleGetStarted}
            disabled={isSigningIn}
            size="lg"
            className="bg-[#244633] text-white hover:bg-[#1a3425] px-8 py-3 text-base rounded-xl group"
          >
            {showSuccess ? (
              "Welcome! Redirecting..."
            ) : isSigningIn ? (
              <>
                <CircleNotchIcon
                  className="size-4 mr-2 animate-spin"
                  weight="bold"
                />
                Signing in...
              </>
            ) : isAuthenticated ? (
              <>
                Go to Dashboard
                <ArrowRightIcon className="size-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </>
            ) : (
              <>
                Start Reading
                <ArrowRightIcon className="size-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </Button>

          <button
            onClick={() => {
              const el = document.getElementById("chapter-track");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="text-sm text-[#789D72] hover:text-[#244633] transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            Explore what&apos;s inside
            <ArrowRightIcon className="size-3.5 rotate-90" />
          </button>
        </div>

        {/* Social proof */}
        <div className="mt-16 animate-fade-in delay-700">
          <p className="text-sm text-[#789D72]/70 font-mono tracking-wide">
            Join readers tracking their journey
          </p>
        </div>
      </div>
    </section>
  );
}
