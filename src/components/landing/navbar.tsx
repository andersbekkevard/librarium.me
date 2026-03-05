"use client";

import { useAuthContext } from "@/lib/providers/AuthProvider";
import {
  ArrowRightIcon,
  BookOpenTextIcon,
  CircleNotchIcon,
  ListIcon,
} from "@phosphor-icons/react";
import { Cormorant_Garamond } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { ToggleTheme } from "../toggle-theme";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

const brandSerif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["600", "700"],
});

interface RouteProps {
  href: string;
  label: string;
}

const routeList: RouteProps[] = [
  { href: "#experience", label: "Experience" },
  { href: "#features", label: "Features" },
  { href: "#proof", label: "Approach" },
  { href: "#faq", label: "FAQ" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const router = useRouter();
  const { isAuthenticated, signInWithGoogle } = useAuthContext();

  const handleLogin = async () => {
    if (isAuthenticated) {
      router.push("/dashboard");
      return;
    }

    setIsSigningIn(true);

    try {
      await signInWithGoogle();
      router.push("/dashboard");
    } catch (err) {
      console.error("Login failed:", err);
      setIsSigningIn(false);
    }
  };

  return (
    <header className="sticky top-4 z-40 mx-auto mt-4 flex w-[92%] max-w-[1360px] items-center justify-between gap-3 rounded-2xl border border-brand-primary/15 bg-background/86 px-4 py-3 shadow-[0_12px_35px_rgba(15,50,32,0.08)] backdrop-blur-md md:px-6">
      <div className="flex items-center gap-3">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden"
              aria-label="Open menu"
            >
              <ListIcon className="h-5 w-5" weight="light" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="bg-background">
            <div>
              <SheetHeader className="mb-8">
                <SheetTitle>
                  <Link href="/" className="flex items-center gap-2">
                    <span className="rounded-lg bg-brand-primary/10 p-2 text-brand-primary">
                      <BookOpenTextIcon className="size-5" />
                    </span>
                    <span className={`${brandSerif.className} text-2xl leading-none`}>
                      Librarium
                    </span>
                  </Link>
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-2">
                {routeList.map(({ href, label }) => (
                  <Button
                    key={href}
                    asChild
                    variant="ghost"
                    className="justify-start text-base"
                    onClick={() => setIsOpen(false)}
                  >
                    <Link href={href}>{label}</Link>
                  </Button>
                ))}
              </nav>
            </div>
            <SheetFooter className="flex-col items-start">
              <Button
                onClick={handleLogin}
                disabled={isSigningIn}
                className="mt-4 w-full rounded-xl bg-brand-primary text-white hover:bg-brand-primary-hover"
              >
                {isSigningIn ? (
                  <>
                    <CircleNotchIcon className="size-4 animate-spin" weight="bold" />
                    Signing in...
                  </>
                ) : isAuthenticated ? (
                  "Open Dashboard"
                ) : (
                  "Continue with Google"
                )}
              </Button>
              <ToggleTheme />
            </SheetFooter>
          </SheetContent>
        </Sheet>

        <Link href="/" className="flex items-center gap-2.5">
          <span className="rounded-xl bg-brand-primary/10 p-2 text-brand-primary">
            <BookOpenTextIcon className="size-5" />
          </span>
          <span className={`${brandSerif.className} hidden text-3xl leading-none sm:block`}>
            Librarium
          </span>
        </Link>
      </div>

      <nav className="hidden items-center gap-1 lg:flex">
        {routeList.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className="rounded-xl px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-brand-primary/7 hover:text-foreground"
          >
            {label}
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-2">
        <ToggleTheme />
        <Button
          onClick={handleLogin}
          disabled={isSigningIn}
          size="sm"
          className="group hidden rounded-xl bg-brand-primary px-4 text-white hover:bg-brand-primary-hover lg:flex"
        >
          {isSigningIn ? (
            <>
              <CircleNotchIcon className="size-4 animate-spin" weight="bold" />
              Signing in...
            </>
          ) : isAuthenticated ? (
            <>
              Dashboard
              <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
            </>
          ) : (
            <>
              Get Started
              <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
            </>
          )}
        </Button>
      </div>
    </header>
  );
};
