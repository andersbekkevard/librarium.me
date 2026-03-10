"use client";

import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/lib/providers/AuthProvider";
import { useScrollAnimation } from "@/lib/hooks/useScrollAnimation";
import { ArrowRightIcon, CircleNotchIcon } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function ChapterJoin() {
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
    } catch {
      setIsSigningIn(false);
    }
  };

  return (
    <section
      id="chapter-join"
      className="py-24 md:py-32 bg-[#f5f8f5]"
      ref={elementRef as React.RefObject<HTMLElement>}
    >
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Chapter label */}
        <div
          className={`mb-6 text-center scroll-fade-in-up ${isVisible ? "animate" : ""}`}
        >
          <span className="text-xs font-mono tracking-[0.3em] text-[#789D72] uppercase">
            Chapter Five
          </span>
        </div>

        <div className="max-w-[640px] mx-auto text-center">
          <h2
            className={`text-3xl md:text-[2.75rem] leading-[1.15] tracking-tight text-[#244633] mb-6 scroll-fade-in-up ${isVisible ? "animate" : ""}`}
            style={{
              fontFamily: "var(--font-serif)",
              transitionDelay: "150ms",
            }}
          >
            The Next Chapter
            <br />
            <span className="italic font-light">Is Yours</span>
          </h2>

          <p
            className={`text-base md:text-lg text-[#244633]/55 leading-relaxed mb-10 scroll-fade-in-up ${isVisible ? "animate" : ""}`}
            style={{ transitionDelay: "250ms" }}
          >
            Join a growing community of readers who track their progress,
            discover new books, and share their reading journey.
          </p>

          <div
            className={`scroll-fade-in-up ${isVisible ? "animate" : ""}`}
            style={{ transitionDelay: "400ms" }}
          >
            <Button
              onClick={handleGetStarted}
              disabled={isSigningIn}
              size="lg"
              className="bg-[#244633] text-white hover:bg-[#1a3425] px-10 py-3.5 text-base rounded-xl group"
            >
              {isSigningIn ? (
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
                  Start Your Journey
                  <ArrowRightIcon className="size-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </div>

          {/* Social proof */}
          <div
            className={`mt-10 flex items-center justify-center gap-6 scroll-fade-in-up ${isVisible ? "animate" : ""}`}
            style={{ transitionDelay: "550ms" }}
          >
            {/* Reader count */}
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="w-7 h-7 rounded-full border-2 border-[#f5f8f5] flex items-center justify-center text-[9px] font-medium text-white"
                    style={{
                      backgroundColor:
                        ["#244633", "#3a5e47", "#526D5E", "#789D72", "#9DB89A"][
                          i - 1
                        ],
                    }}
                  >
                    {["E", "A", "L", "K", "M"][i - 1]}
                  </div>
                ))}
              </div>
              <p className="text-sm text-[#244633]/50">
                <span className="font-medium text-[#244633]">Free</span>
                {" "}— no credit card required
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
