"use client";

import {
  BookDoodle,
  BookmarkDoodle,
  CoffeeDoodle,
  StarDoodle,
  HeartDoodle,
  SparklesDoodle,
} from "@/components/landing/doodles";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/lib/providers/AuthProvider";
import { ArrowRightIcon, CircleNotchIcon } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const bookCovers = [
  {
    title: "Norwegian Wood",
    color: "#789D72",
    rotation: -6,
    top: "8%",
    left: "2%",
  },
  {
    title: "Kafka on the Shore",
    color: "#C44536",
    rotation: 4,
    top: "4%",
    right: "8%",
  },
  {
    title: "The Great Gatsby",
    color: "#244633",
    rotation: -3,
    top: "38%",
    left: "6%",
  },
  {
    title: "Educated",
    color: "#D4A843",
    rotation: 5,
    top: "42%",
    right: "4%",
  },
  {
    title: "Pachinko",
    color: "#5C82B5",
    rotation: -2,
    top: "22%",
    right: "2%",
  },
];

const statCards = [
  { label: "Books this year", value: "24", emoji: "\u{1F4DA}" },
  { label: "Pages read", value: "7,342", emoji: "\u{1F4D6}" },
  { label: "Current streak", value: "12 days", emoji: "\u{1F525}" },
];

const friendAvatars = [
  { name: "Emma", initial: "E", bg: "#A7D7C5" },
  { name: "Marcus", initial: "M", bg: "#789D72" },
  { name: "Siri", initial: "S", bg: "#D4A843" },
  { name: "Oliver", initial: "O", bg: "#5C82B5" },
];

export function HeroSection() {
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { isAuthenticated, signInWithGoogle } = useAuthContext();

  const handleGetStarted = async () => {
    if (isAuthenticated) {
      router.push("/dashboard");
      return;
    }
    setIsSigningIn(true);
    setError(null);
    try {
      await signInWithGoogle();
      router.push("/dashboard");
    } catch (err) {
      console.error("Sign in failed:", err);
      setError("Something went wrong. Please try again.");
      setIsSigningIn(false);
    }
  };

  return (
    <section className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28">
      {/* Scattered doodles */}
      <BookDoodle className="absolute top-20 left-[5%] w-10 h-10 text-nook-sage/20 animate-float-slow hidden md:block" />
      <CoffeeDoodle className="absolute top-32 right-[8%] w-12 h-12 text-nook-sage/15 animate-float hidden md:block" />
      <BookmarkDoodle className="absolute bottom-20 left-[10%] w-8 h-8 text-nook-mint/30 animate-float-delay hidden md:block" />
      <StarDoodle className="absolute top-48 left-[85%] w-7 h-7 text-nook-sage/20 animate-float-slow hidden lg:block" />
      <SparklesDoodle className="absolute bottom-32 right-[12%] w-8 h-8 text-nook-mint/25 animate-float hidden md:block" />

      <div className="mx-auto max-w-[720px] px-6 relative z-10">
        {/* Collage hero area */}
        <div className="relative mb-12 md:mb-16 min-h-[280px] md:min-h-[320px]">
          {/* Book covers scattered around */}
          {bookCovers.map((book, i) => (
            <div
              key={book.title}
              className="absolute w-[90px] md:w-[110px] h-[130px] md:h-[155px] rounded-xl shadow-lg animate-float hidden md:block"
              style={{
                backgroundColor: book.color,
                transform: `rotate(${book.rotation}deg)`,
                top: book.top,
                left: book.left,
                right: book.right,
                animationDelay: `${i * 0.7}s`,
              }}
            >
              <div className="p-3 h-full flex flex-col justify-end">
                <p className="text-white/90 text-[10px] md:text-xs font-bold leading-tight font-heading">
                  {book.title}
                </p>
              </div>
            </div>
          ))}

          {/* Central content */}
          <div className="relative z-10 text-center pt-4 md:pt-8">
            {/* Small badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-nook-mint/20 text-nook-forest text-sm font-medium mb-6 animate-fade-in">
              <HeartDoodle className="w-4 h-4" color="var(--nook-forest)" />
              <span>Strava for books</span>
            </div>

            {/* Main headline */}
            <h1 className="text-display-lg mb-5 animate-fade-in-up text-nook-forest leading-[1.1]">
              Your cozy little
              <br />
              <span className="italic text-nook-sage">reading corner</span>
            </h1>

            {/* Intro paragraph — serif body */}
            <p className="font-heading text-lg md:text-xl text-foreground/80 leading-relaxed max-w-[540px] mx-auto mb-8 animate-fade-in-up delay-200">
              Track the books you love, see how far you&apos;ve come, and share
              your reading journey with friends who get it.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 animate-fade-in-up delay-300">
              <Button
                onClick={handleGetStarted}
                disabled={isSigningIn}
                className="h-12 px-8 rounded-2xl text-base font-semibold bg-nook-forest hover:bg-[#1A3526] text-white shadow-md hover:shadow-lg transition-all group/arrow"
              >
                {isSigningIn ? (
                  <>
                    <CircleNotchIcon
                      className="size-5 mr-2 animate-spin"
                      weight="bold"
                    />
                    Signing in...
                  </>
                ) : isAuthenticated ? (
                  <>
                    Go to Dashboard
                    <ArrowRightIcon className="size-4 ml-2 group-hover/arrow:translate-x-1 transition-transform" />
                  </>
                ) : (
                  <>
                    Start reading
                    <ArrowRightIcon className="size-4 ml-2 group-hover/arrow:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
              <Button
                variant="ghost"
                asChild
                className="h-12 px-6 rounded-2xl text-base font-medium text-nook-forest hover:bg-nook-mint/10"
              >
                <a href="#how-it-works">See how it works</a>
              </Button>
            </div>

            {error && (
              <p className="text-sm text-red-600 mt-3 animate-fade-in" role="alert">
                {error}
              </p>
            )}
          </div>
        </div>

        {/* Stats + friends collage row */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 animate-fade-in-up delay-500">
          {statCards.map((stat) => (
            <div
              key={stat.label}
              className="bg-card rounded-2xl px-5 py-4 shadow-sm border border-border/50 hover-lift"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg">{stat.emoji}</span>
                <span className="text-2xl font-bold text-nook-forest font-heading">
                  {stat.value}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}

          {/* Friend avatars card */}
          <div className="bg-card rounded-2xl px-5 py-4 shadow-sm border border-border/50 hover-lift">
            <div className="flex -space-x-2 mb-1">
              {friendAvatars.map((friend) => (
                <div
                  key={friend.name}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-card"
                  style={{ backgroundColor: friend.bg }}
                  title={friend.name}
                >
                  {friend.initial}
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">Friends reading</p>
          </div>
        </div>
      </div>
    </section>
  );
}
