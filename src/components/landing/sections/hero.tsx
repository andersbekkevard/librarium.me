"use client";

import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/lib/providers/AuthProvider";
import {
  ArrowRightIcon,
  CircleNotchIcon,
  BookOpenIcon,
  ChartBarIcon,
  UsersIcon,
  TrendUpIcon,
  StarIcon,
  BookmarkSimpleIcon,
} from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

function DashboardPreviewCard() {
  return (
    <div className="preview-card p-5 w-[280px] sm:w-[320px] float-gentle">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-7 h-7 rounded-lg bg-[#244633] flex items-center justify-center">
          <ChartBarIcon className="w-4 h-4 text-[#FEF3C7]" weight="fill" />
        </div>
        <span className="text-sm font-medium text-[#244633]">Your Dashboard</span>
      </div>
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-[#FFF8F0] rounded-xl p-3">
          <p className="text-xs text-[#526D5E] mb-1">Books Read</p>
          <p className="text-2xl font-semibold text-[#244633]" style={{ fontFamily: "var(--font-serif)" }}>47</p>
        </div>
        <div className="bg-[#FFF8F0] rounded-xl p-3">
          <p className="text-xs text-[#526D5E] mb-1">Pages</p>
          <p className="text-2xl font-semibold text-[#244633]" style={{ fontFamily: "var(--font-serif)" }}>14,328</p>
        </div>
        <div className="bg-[#FFF8F0] rounded-xl p-3">
          <p className="text-xs text-[#526D5E] mb-1">Reading</p>
          <p className="text-2xl font-semibold text-[#244633]" style={{ fontFamily: "var(--font-serif)" }}>3</p>
        </div>
        <div className="bg-[#FFF8F0] rounded-xl p-3">
          <p className="text-xs text-[#526D5E] mb-1">Streak</p>
          <p className="text-2xl font-semibold text-[#244633]" style={{ fontFamily: "var(--font-serif)" }}>12d</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <TrendUpIcon className="w-4 h-4 text-[#789D72]" weight="bold" />
        <span className="text-xs text-[#789D72] font-medium">+23% from last month</span>
      </div>
    </div>
  );
}

function ReadingProgressCard() {
  return (
    <div className="preview-card p-5 w-[260px] sm:w-[280px] float-gentle-alt">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-7 h-7 rounded-lg bg-[#789D72] flex items-center justify-center">
          <BookOpenIcon className="w-4 h-4 text-white" weight="fill" />
        </div>
        <span className="text-sm font-medium text-[#244633]">Currently Reading</span>
      </div>
      <div className="space-y-3">
        {[
          { title: "Project Hail Mary", author: "Andy Weir", progress: 72 },
          { title: "Klara and the Sun", author: "Kazuo Ishiguro", progress: 35 },
          { title: "The Midnight Library", author: "Matt Haig", progress: 91 },
        ].map((book) => (
          <div key={book.title} className="flex items-center gap-3">
            <div className="w-8 h-11 rounded bg-gradient-to-b from-[#244633] to-[#526D5E] flex items-center justify-center shrink-0">
              <BookmarkSimpleIcon className="w-4 h-4 text-[#FEF3C7]" weight="fill" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-[#244633] truncate">{book.title}</p>
              <p className="text-[10px] text-[#526D5E]">{book.author}</p>
              <div className="mt-1 h-1.5 bg-[#f0f5ee] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#789D72] rounded-full transition-all"
                  style={{ width: `${book.progress}%` }}
                />
              </div>
            </div>
            <span className="text-[10px] font-medium text-[#526D5E] shrink-0">{book.progress}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function FriendActivityCard() {
  return (
    <div className="preview-card p-5 w-[240px] sm:w-[260px] float-gentle-slow">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-7 h-7 rounded-lg bg-[#F5C54E] flex items-center justify-center">
          <UsersIcon className="w-4 h-4 text-[#244633]" weight="fill" />
        </div>
        <span className="text-sm font-medium text-[#244633]">Friend Activity</span>
      </div>
      <div className="space-y-3">
        {[
          { name: "Sarah K.", action: "finished", book: "Dune", rating: 5 },
          { name: "Marcus T.", action: "started", book: "1984", rating: 0 },
          { name: "Lily W.", action: "reviewed", book: "Circe", rating: 4 },
        ].map((activity) => (
          <div key={activity.name} className="flex items-start gap-2.5">
            <div className="w-7 h-7 rounded-full bg-[#f0f5ee] flex items-center justify-center shrink-0 text-xs font-medium text-[#526D5E]">
              {activity.name.charAt(0)}
            </div>
            <div className="min-w-0">
              <p className="text-xs text-[#244633]">
                <span className="font-medium">{activity.name}</span>{" "}
                <span className="text-[#526D5E]">{activity.action}</span>
              </p>
              <p className="text-xs text-[#526D5E] truncate">{activity.book}</p>
              {activity.rating > 0 && (
                <div className="flex gap-0.5 mt-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon
                      key={i}
                      className="w-2.5 h-2.5"
                      weight={i < activity.rating ? "fill" : "regular"}
                      style={{ color: i < activity.rating ? "#F5C54E" : "#d4d4d4" }}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export const HeroSection = () => {
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
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
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    } catch (err) {
      setAuthError("Failed to sign in. Please try again.");
      setIsSigningIn(false);
    }
  };

  if (loading) {
    return (
      <section className="hero-forest min-h-[60vh] flex items-center justify-center">
        <CircleNotchIcon className="h-8 w-8 animate-spin text-[#FEF3C7]" weight="bold" />
      </section>
    );
  }

  return (
    <section className="hero-forest relative">
      <div className="golden-specks" />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 pt-32 pb-16 md:pt-40 md:pb-24">
        {/* Text content */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <h1
            className="text-[2.5rem] sm:text-[3rem] md:text-[3.5rem] leading-[1.1] tracking-tight text-[#FEF3C7] mb-6 animate-fade-in-up"
            style={{ fontFamily: "var(--font-serif)", fontWeight: 700 }}
          >
            Your Reading Story,
            <br />
            Beautifully Told
          </h1>

          <p className="text-lg md:text-xl text-[#FEF3C7]/75 max-w-xl mx-auto mb-10 animate-fade-in-up delay-200 leading-relaxed">
            Track your reading journey, discover books with friends, and celebrate every page turned.
            The social reading tracker built for book lovers.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up delay-300">
            <Button
              onClick={handleGetStarted}
              disabled={isSigningIn}
              className="h-12 px-8 text-base font-semibold rounded-xl bg-[#FEF3C7] text-[#244633] hover:bg-[#fde68a] shadow-lg hover:shadow-xl transition-all active:scale-[0.98]"
              aria-label={isAuthenticated ? "Go to your dashboard" : "Sign in with Google to start reading"}
            >
              {showSuccess ? (
                "Welcome! Redirecting..."
              ) : isSigningIn ? (
                <>
                  <CircleNotchIcon className="size-4 mr-2 animate-spin" weight="bold" />
                  Signing in...
                </>
              ) : isAuthenticated ? (
                <>
                  Go to Dashboard
                  <ArrowRightIcon className="size-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </>
              ) : (
                <>
                  Start Reading
                  <ArrowRightIcon className="size-5 ml-1" />
                </>
              )}
            </Button>

            <Button
              asChild
              variant="ghost"
              className="h-12 px-8 text-base font-medium rounded-xl border border-[#FEF3C7]/30 text-[#FEF3C7] hover:bg-[#FEF3C7]/10 hover:text-[#FEF3C7] transition-all"
            >
              <a href="#how-it-works">See How It Works</a>
            </Button>
          </div>

          {/* Error/Success messages */}
          {authError && (
            <div className="mt-6 p-3 bg-red-500/15 border border-red-400/30 rounded-xl animate-fade-in" role="alert">
              <p className="text-sm text-red-200 text-center">{authError}</p>
            </div>
          )}
          {showSuccess && (
            <div className="mt-6 p-3 bg-green-500/15 border border-green-400/30 rounded-xl animate-fade-in" role="status">
              <p className="text-sm text-green-200 text-center">Successfully signed in! Welcome to Librarium.</p>
            </div>
          )}
        </div>

        {/* Overlapping preview cards */}
        <div className="relative max-w-4xl mx-auto hidden md:block">
          <div className="flex justify-center items-start gap-[-20px]">
            {/* Left card - Reading Progress */}
            <div className="relative z-10 -mr-8 mt-12 animate-fade-in-up delay-500">
              <ReadingProgressCard />
            </div>

            {/* Center card - Dashboard (larger) */}
            <div className="relative z-20 animate-fade-in-up delay-300">
              <DashboardPreviewCard />
            </div>

            {/* Right card - Friend Activity */}
            <div className="relative z-10 -ml-8 mt-16 animate-fade-in-up delay-700">
              <FriendActivityCard />
            </div>
          </div>
        </div>

        {/* Mobile: single card preview */}
        <div className="md:hidden flex justify-center animate-fade-in-up delay-500">
          <DashboardPreviewCard />
        </div>
      </div>

      {/* Bottom gradient fade into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-[#FFF8F0]" />
    </section>
  );
};
