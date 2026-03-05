"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/lib/providers/AuthProvider";
import {
  ArrowRightIcon,
  CircleNotchIcon,
  NotebookIcon,
  SparkleIcon,
} from "@phosphor-icons/react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const HeroSection = () => {
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const router = useRouter();
  const { loading, isAuthenticated, signInWithGoogle } = useAuthContext();
  const { theme } = useTheme();

  const handleGetStarted = async () => {
    if (isAuthenticated) {
      router.push("/dashboard");
      return;
    }

    setIsSigningIn(true);
    setAuthError(null);

    try {
      await signInWithGoogle();
      router.push("/dashboard");
    } catch (error) {
      console.error("Sign in failed:", error);
      setAuthError("Sign in failed. Please try again.");
      setIsSigningIn(false);
    }
  };

  if (loading) {
    return (
      <section className="container py-28 md:py-36">
        <div className="grid place-items-center">
          <CircleNotchIcon className="h-8 w-8 animate-spin text-primary" weight="bold" />
        </div>
      </section>
    );
  }

  return (
    <section className="container relative py-20 md:py-28">
      <div className="landing-moss-orb left-0 top-16" aria-hidden="true" />
      <div className="landing-moss-orb right-4 top-[28rem]" aria-hidden="true" />

      <div className="mx-auto max-w-5xl text-center">
        <Badge variant="outline" className="landing-ui animate-fade-in-up rounded-full border-primary/20 bg-background/70 px-4 py-2 text-xs uppercase tracking-[0.14em]">
          <SparkleIcon className="mr-1.5 size-3.5 text-primary" weight="fill" />
          Daily AI reading encouragement
        </Badge>

        <h1 className="landing-display mt-8 animate-fade-in-up text-5xl leading-[0.95] tracking-tight md:text-7xl md:leading-[0.92]">
          A living library
          <br />
          for your reading life.
        </h1>

        <p className="landing-ui mx-auto mt-7 max-w-2xl animate-fade-in-up text-lg leading-relaxed text-muted-foreground md:text-xl">
          Librarium keeps your books, notes, and momentum in one calm place.
          Track page by page, reflect in context, and watch your year of reading
          take shape.
        </p>

        <div className="mt-10 flex animate-fade-in-up flex-col items-center justify-center gap-3 sm:flex-row">
          <Button
            onClick={handleGetStarted}
            disabled={isSigningIn}
            className="landing-ui group h-11 w-full max-w-64 bg-primary text-primary-foreground hover:bg-brand-primary-hover"
          >
            {isSigningIn ? (
              <>
                <CircleNotchIcon className="mr-2 size-4 animate-spin" weight="bold" />
                Signing in...
              </>
            ) : isAuthenticated ? (
              <>
                Open Dashboard
                <ArrowRightIcon className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
              </>
            ) : (
              <>
                Begin Your Shelves
                <ArrowRightIcon className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </Button>

          <Button asChild variant="outline" className="landing-ui h-11 w-full max-w-64 border-primary/20 bg-background/70 hover:bg-primary/5">
            <Link href="#features">
              Explore the Experience
              <NotebookIcon className="ml-2 size-4" weight="duotone" />
            </Link>
          </Button>
        </div>

        {authError && (
          <p className="landing-ui mt-4 text-sm text-status-error" role="alert">
            {authError}
          </p>
        )}
      </div>

      <div className="mx-auto mt-16 max-w-6xl animate-scale-in rounded-[2rem] border border-primary/15 bg-background/80 p-3 shadow-[0_30px_70px_rgba(20,52,35,0.14)] backdrop-blur">
        <div className="relative overflow-hidden rounded-[1.5rem] border border-primary/10 bg-muted/40">
          <Image
            width={1400}
            height={940}
            className="h-auto w-full"
            src={
              theme === "light"
                ? "/images/hero-image-light-2.jpg"
                : "/images/hero-image-dark-2.jpg"
            }
            alt="Librarium dashboard preview"
            priority
          />
          <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-background via-background/65 to-transparent" />
        </div>
      </div>
    </section>
  );
};
