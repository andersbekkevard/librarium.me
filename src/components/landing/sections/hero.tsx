"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/lib/providers/AuthProvider";
import { ArrowRightIcon, CircleNotchIcon } from "@phosphor-icons/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const HeroSection = () => {
  const router = useRouter();
  const { loading, isAuthenticated, signInWithGoogle } = useAuthContext();
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const handlePrimaryCta = async () => {
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
      console.error("Unable to sign in", error);
      setIsSigningIn(false);
      setAuthError("Sign-in failed. Please try again.");
    }
  };

  if (loading) {
    return (
      <section className="landing-shell py-24 md:py-28">
        <div className="flex items-center justify-center">
          <CircleNotchIcon className="h-8 w-8 animate-spin text-brand-primary" weight="bold" />
        </div>
      </section>
    );
  }

  return (
    <section className="landing-shell pb-14 pt-6 md:pb-20 md:pt-10">
      <div className="landing-hero-grid">
        <div className="space-y-7 reveal-up">
          <div className="landing-meta-row">
            <span>Edition Spring 2026</span>
            <span className="landing-meta-divider" aria-hidden="true" />
            <span>Personal Library Suite</span>
          </div>
          <Badge variant="outline" className="landing-kicker">
            Editorial Variant A
          </Badge>
          <h1 className="landing-display">
            The reading room
            <br />
            for modern collectors.
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
            Librarium brings literary calm to your digital shelf. Catalog titles, trace your reading rhythm, and move
            through your library with intention.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button onClick={handlePrimaryCta} disabled={isSigningIn} className="h-11 rounded-full px-7">
              {isSigningIn ? (
                <>
                  <CircleNotchIcon className="mr-2 h-4 w-4 animate-spin" weight="bold" />
                  Signing in...
                </>
              ) : isAuthenticated ? (
                <>
                  Enter dashboard
                  <ArrowRightIcon className="ml-2 h-4 w-4" />
                </>
              ) : (
                <>
                  Start with Google
                  <ArrowRightIcon className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
            <a href="#features" className="landing-inline-link">
              Explore the feature index
            </a>
          </div>
          {authError ? <p className="text-sm text-status-error">{authError}</p> : null}
          <div className="grid max-w-xl grid-cols-3 gap-5 border-t border-border/70 pt-6 text-sm">
            <div>
              <p className="font-heading text-2xl">45k+</p>
              <p className="text-muted-foreground">Books discoverable</p>
            </div>
            <div>
              <p className="font-heading text-2xl">3</p>
              <p className="text-muted-foreground">Reading states</p>
            </div>
            <div>
              <p className="font-heading text-2xl">24h</p>
              <p className="text-muted-foreground">Motivation refresh</p>
            </div>
          </div>
        </div>

        <div className="reveal-up delay-1">
          <div className="landing-image-frame">
            <div className="landing-image-overlay" aria-hidden="true" />
            <Image
              src="/images/hero-image-light-2.jpg"
              alt="Librarium dashboard preview"
              width={1600}
              height={1100}
              priority
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
