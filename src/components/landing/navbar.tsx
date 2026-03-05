"use client";

import { useAuthContext } from "@/lib/providers/AuthProvider";
import { ArrowRightIcon, BookOpenTextIcon, CircleNotchIcon, ListIcon } from "@phosphor-icons/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";

const navLinks = [
  { href: "#benefits", label: "Approach" },
  { href: "#features", label: "Features" },
  { href: "#services", label: "Integrations" },
  { href: "#testimonials", label: "Voices" },
  { href: "#faq", label: "FAQ" },
];

export const Navbar = () => {
  const router = useRouter();
  const { isAuthenticated, signInWithGoogle } = useAuthContext();
  const [isOpen, setIsOpen] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);

  const handleLogin = async () => {
    if (isAuthenticated) {
      router.push("/dashboard");
      return;
    }

    setIsSigningIn(true);
    try {
      await signInWithGoogle();
      router.push("/dashboard");
    } catch (error) {
      console.error("Login failed", error);
      setIsSigningIn(false);
    }
  };

  return (
    <header className="landing-shell sticky top-5 z-50 mb-10">
      <div className="landing-nav-frame">
        <Link href="/" className="inline-flex items-center gap-3" aria-label="Librarium home">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-brand-primary/30 bg-brand-primary/10 text-brand-primary">
            <BookOpenTextIcon className="h-5 w-5" weight="duotone" />
          </span>
          <div className="flex flex-col leading-none">
            <span className="font-heading text-xl tracking-tight">Librarium</span>
            <span className="text-[0.62rem] uppercase tracking-[0.18em] text-muted-foreground">Issue 01</span>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="landing-nav-link">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            onClick={handleLogin}
            disabled={isSigningIn}
            className="hidden h-10 rounded-full px-5 lg:inline-flex"
          >
            {isSigningIn ? (
              <>
                <CircleNotchIcon className="mr-2 h-4 w-4 animate-spin" weight="bold" />
                Signing in...
              </>
            ) : isAuthenticated ? (
              <>
                Dashboard
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </>
            ) : (
              <>
                Enter Librarium
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon-sm" className="lg:hidden" aria-label="Open menu">
                <ListIcon className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-background/95 backdrop-blur-sm">
              <SheetHeader>
                <SheetTitle className="font-heading text-2xl">Explore</SheetTitle>
              </SheetHeader>
              <nav className="mt-10 flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-lg text-muted-foreground transition-colors hover:text-foreground"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <Button onClick={handleLogin} disabled={isSigningIn} className="mt-8 w-full rounded-full">
                {isSigningIn ? "Signing in..." : isAuthenticated ? "Open dashboard" : "Sign in with Google"}
              </Button>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
