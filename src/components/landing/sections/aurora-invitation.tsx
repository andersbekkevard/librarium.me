"use client";

import { useAuthContext } from "@/lib/providers/AuthProvider";
import { ArrowRightIcon, CircleNotchIcon } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const useInView = (threshold = 0.2) => {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, inView };
};

export const AuroraInvitationSection = () => {
  const { ref, inView } = useInView(0.2);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const router = useRouter();
  const { isAuthenticated, signInWithGoogle } = useAuthContext();

  const handleStart = async () => {
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
    <section
      id="invitation"
      ref={ref}
      className="relative py-32 md:py-44 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #080f0b 0%, #12200f 25%, #1a2e15 45%, #12200f 75%, #080f0b 100%)",
      }}
    >
      {/* Large ambient amber glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full bg-[#c4841d]/6 blur-[150px]" />

      {/* Horizontal line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c4841d]/15 to-transparent" />

      <div className="max-w-4xl mx-auto px-6 md:px-10 relative z-10 text-center">
        {/* Section label */}
        <div
          className={`mb-12 transition-all duration-1000 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-xs tracking-[0.3em] uppercase text-[#c4841d]/50">
            03 / Invitation
          </span>
        </div>

        {/* Headline */}
        <h2
          className={`text-[#f5efe0] leading-[1.05] tracking-[-0.03em] mb-8 transition-all duration-1000 delay-200 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
          style={{
            fontFamily: "var(--font-serif)",
            fontWeight: 500,
            fontSize: "clamp(2.5rem, 7vw, 5rem)",
          }}
        >
          Begin your
          <br />
          <span className="aurora-text-shimmer italic" style={{ fontWeight: 400 }}>
            reading life
          </span>
        </h2>

        {/* Subtitle */}
        <p
          className={`max-w-lg mx-auto text-[#f5efe0]/35 text-lg md:text-xl leading-relaxed mb-12 transition-all duration-1000 delay-400 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Free to use. No credit card. Just sign in with Google
          and your library awaits.
        </p>

        {/* CTA */}
        <div
          className={`transition-all duration-1000 delay-500 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <button
            onClick={handleStart}
            disabled={isSigningIn}
            className="group relative inline-flex items-center gap-3 px-12 py-5 rounded-full bg-gradient-to-r from-[#c4841d] via-[#d4a03c] to-[#c4841d] text-[#080f0b] font-semibold text-sm tracking-[0.05em] uppercase transition-all duration-500 hover:shadow-[0_0_60px_rgba(196,132,29,0.25)] hover:scale-[1.03] disabled:opacity-50"
          >
            {isSigningIn ? (
              <>
                <CircleNotchIcon className="size-4 animate-spin" weight="bold" />
                Signing in
              </>
            ) : isAuthenticated ? (
              <>
                Open Dashboard
                <ArrowRightIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </>
            ) : (
              <>
                Create Your Library
                <ArrowRightIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </>
            )}
            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-[#c4841d] to-[#e8c066] opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-700" />
          </button>
        </div>

        {/* Trust signals */}
        <div
          className={`mt-16 flex items-center justify-center gap-8 transition-all duration-1000 delay-700 ${
            inView ? "opacity-100" : "opacity-0"
          }`}
        >
          {["Open source", "Privacy-first", "No ads"].map((signal) => (
            <span
              key={signal}
              className="text-[11px] tracking-[0.15em] uppercase text-[#f5efe0]/20"
            >
              {signal}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
