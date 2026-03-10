"use client";

import { useAuthContext } from "@/lib/providers/AuthProvider";
import { CircleNotchIcon, ArrowRightIcon } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const genres = [
  "Fiction",
  "Non-Fiction",
  "Sci-Fi",
  "Philosophy",
  "Biography",
  "Poetry",
  "History",
  "Psychology",
  "Fantasy",
  "Essays",
];

export const HeroSection = () => {
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [activeGenre, setActiveGenre] = useState<string | null>(null);
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
      router.push("/dashboard");
    } catch {
      setIsSigningIn(false);
    }
  };

  if (loading) {
    return (
      <section className="bg-[#1a2e1f] min-h-[80vh] flex items-center justify-center">
        <CircleNotchIcon
          className="h-8 w-8 animate-spin text-[#FFF8F0]/60"
          weight="bold"
        />
      </section>
    );
  }

  return (
    <section className="relative bg-[#1a2e1f] overflow-hidden">
      {/* Subtle organic texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5 C25 15, 15 25, 5 30 C15 35, 25 45, 30 55 C35 45, 45 35, 55 30 C45 25, 35 15, 30 5Z' fill='none' stroke='%23FFF8F0' stroke-width='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative max-w-[1200px] mx-auto px-6 pt-32 pb-24 md:pt-40 md:pb-32">
        {/* Masthead-style headline */}
        <div className="max-w-3xl">
          <h1
            className="text-[#FFF8F0] text-5xl md:text-6xl lg:text-[72px] leading-[1.05] tracking-tight mb-6 animate-fade-in-up"
            style={{ fontFamily: "var(--font-fraunces)", fontWeight: 800 }}
          >
            Your Reading Life,
            <br />
            Curated
          </h1>

          <p className="text-[#FFF8F0]/70 text-lg md:text-xl max-w-xl mb-10 leading-relaxed animate-fade-in-up delay-200">
            Track your journey through literature. Discover what the community
            is reading. Build a library that reflects who you are.
          </p>

          {/* CTA Button — squared-off, no pill shape */}
          <div className="flex items-center gap-4 mb-16 animate-fade-in-up delay-300">
            <button
              onClick={handleGetStarted}
              disabled={isSigningIn}
              className="inline-flex items-center gap-2 bg-[#FFF8F0] text-[#1a2e1f] px-8 py-3.5 text-[15px] font-semibold tracking-wide transition-all hover:bg-[#FFF8F0]/90 disabled:opacity-50 group"
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
                  Start Reading
                  <ArrowRightIcon className="size-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Genre filter pills */}
        <div className="animate-fade-in-up delay-500">
          <p className="text-[#789D72] text-xs font-semibold tracking-[0.2em] uppercase mb-4">
            Browse by genre
          </p>
          <div className="flex flex-wrap gap-2">
            {genres.map((genre) => (
              <button
                key={genre}
                onClick={() =>
                  setActiveGenre(activeGenre === genre ? null : genre)
                }
                className={`px-4 py-2 text-sm border transition-all ${
                  activeGenre === genre
                    ? "bg-[#FFF8F0] text-[#1a2e1f] border-[#FFF8F0]"
                    : "border-[#FFF8F0]/25 text-[#FFF8F0]/70 hover:border-[#FFF8F0]/50 hover:text-[#FFF8F0]"
                }`}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
