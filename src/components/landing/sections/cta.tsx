"use client";

import { CoffeeDoodle, HeartDoodle } from "@/components/landing/doodles";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/lib/providers/AuthProvider";
import { useScrollAnimation } from "@/lib/hooks/useScrollAnimation";
import { ArrowRightIcon, CircleNotchIcon } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function CTASection() {
  const [isSigningIn, setIsSigningIn] = useState(false);
  const router = useRouter();
  const { isAuthenticated, signInWithGoogle } = useAuthContext();
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
    } catch (err) {
      console.error("Sign in failed:", err);
      setIsSigningIn(false);
    }
  };

  return (
    <section className="py-20 md:py-28 bg-nook-cream-dark/50">
      <div className="mx-auto max-w-[720px] px-6">
        <div
          ref={elementRef as React.RefObject<HTMLDivElement>}
          className={`scroll-scale-in ${isVisible ? "animate" : ""} relative bg-nook-mint/15 rounded-3xl p-8 md:p-12 text-center overflow-hidden`}
        >
          {/* Decorative doodles */}
          <CoffeeDoodle
            className="absolute top-4 left-4 w-10 h-10 text-nook-sage/20 hidden md:block"
          />
          <HeartDoodle
            className="absolute bottom-4 right-4 w-8 h-8 text-nook-sage/20 hidden md:block"
          />

          <h2 className="text-display mb-4 text-nook-forest">
            Ready to start <span className="italic">your</span> shelf?
          </h2>

          <p className="font-heading text-lg text-foreground/75 leading-relaxed max-w-[460px] mx-auto mb-8">
            Join readers who track their books with care, not complexity.
            Free forever for your personal library.
          </p>

          <Button
            onClick={handleGetStarted}
            disabled={isSigningIn}
            className="h-12 px-8 rounded-2xl text-base font-semibold bg-nook-forest hover:bg-[#1A3526] text-white shadow-md hover:shadow-lg transition-all group/arrow"
          >
            {isSigningIn ? (
              <>
                <CircleNotchIcon className="size-5 mr-2 animate-spin" weight="bold" />
                Signing in...
              </>
            ) : isAuthenticated ? (
              <>
                Go to Dashboard
                <ArrowRightIcon className="size-4 ml-2 group-hover/arrow:translate-x-1 transition-transform" />
              </>
            ) : (
              <>
                Get started free
                <ArrowRightIcon className="size-4 ml-2 group-hover/arrow:translate-x-1 transition-transform" />
              </>
            )}
          </Button>

          <p className="mt-6 text-sm text-muted-foreground font-heading italic">
            Happy reading! ☕
          </p>
        </div>
      </div>
    </section>
  );
}
