"use client";

import { useAuthContext } from "@/lib/providers/AuthProvider";
import { useScrollAnimation } from "@/lib/hooks/useScrollAnimation";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const BoldCta = () => {
  const [isSigningIn, setIsSigningIn] = useState(false);
  const router = useRouter();
  const { loading, isAuthenticated, signInWithGoogle } = useAuthContext();
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.2 });

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
    <section className="px-6 md:px-12 lg:px-20 py-32 md:py-40 lg:py-52">
      <div
        ref={elementRef as React.RefObject<HTMLDivElement>}
        className={`max-w-[1400px] mx-auto text-center transition-all duration-[800ms] ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <h2 className="font-heading font-black text-[#f5f0e8] text-[clamp(3rem,10vw,7rem)] leading-[0.95] tracking-[-0.03em]">
          Start Reading
        </h2>

        <div className="mt-12 md:mt-16">
          <button
            onClick={handleGetStarted}
            disabled={isSigningIn || loading}
            className="inline-block px-12 py-5 bg-[#FEF3C7] text-[#0f1f15] text-sm md:text-base font-semibold uppercase tracking-[0.15em] transition-colors duration-300 hover:bg-[#fde68a] disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ fontFamily: "var(--font-geist-sans)" }}
          >
            {isSigningIn ? "Signing in..." : isAuthenticated ? "Go to Dashboard" : "Get Started Free"}
          </button>
        </div>
      </div>
    </section>
  );
};
