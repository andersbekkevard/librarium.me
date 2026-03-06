"use client";

import { useAuthContext } from "@/lib/providers/AuthProvider";
import { ArrowRightIcon, CircleNotchIcon } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export function ObsidianCTA() {
  const [isSigningIn, setIsSigningIn] = useState(false);
  const router = useRouter();
  const { isAuthenticated, signInWithGoogle } = useAuthContext();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("obsidian-visible");
          }
        });
      },
      { threshold: 0.2 }
    );

    const elements = sectionRef.current?.querySelectorAll(".obsidian-reveal");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleLogin = async () => {
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
    <section ref={sectionRef} className="relative py-32 md:py-44 overflow-hidden">
      {/* Background dramatic glow */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse_at_center,_#C4A265_0%,_transparent_60%)] opacity-[0.06]" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        {/* Decorative rule */}
        <div className="obsidian-reveal flex items-center justify-center gap-4 mb-12">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#C4A265]/30" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#C4A265]/40" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#C4A265]/30" />
        </div>

        <h2
          className="obsidian-reveal text-4xl md:text-5xl lg:text-6xl text-[#E8E2D4] tracking-tight leading-[1.05]"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Your next chapter
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C4A265] via-[#E8C872] to-[#C4A265]">
            starts here
          </span>
        </h2>

        <p className="obsidian-reveal mt-6 text-lg text-[#8A8478] max-w-lg mx-auto">
          Join readers who believe their library deserves more than a dusty shelf.
          Free forever. No credit card required.
        </p>

        <div className="obsidian-reveal mt-10">
          <button
            onClick={handleLogin}
            disabled={isSigningIn}
            className="group relative inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-[#C4A265] to-[#B08A40] text-[#0A0A08] font-medium text-sm tracking-[0.08em] uppercase rounded overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-[#C4A265]/20 disabled:opacity-50"
          >
            <span className="relative z-10 flex items-center gap-2">
              {isSigningIn ? (
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
                  Create Your Library
                  <ArrowRightIcon className="size-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </span>
            {/* Shimmer */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </button>
        </div>

        <p className="obsidian-reveal mt-6 text-[12px] tracking-[0.08em] text-[#8A8478]/40">
          Sign in with Google &middot; Takes 10 seconds
        </p>
      </div>
    </section>
  );
}
