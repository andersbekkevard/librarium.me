"use client";

import { BookDoodle } from "@/components/landing/doodles";
import { useAuthContext } from "@/lib/providers/AuthProvider";
import { ListIcon, CircleNotchIcon } from "@phosphor-icons/react";
import { ArrowRightIcon } from "@phosphor-icons/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { ToggleTheme } from "../toggle-theme";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

interface RouteProps {
  href: string;
  label: string;
}

const routeList: RouteProps[] = [
  { href: "#how-it-works", label: "How it works" },
  { href: "#features", label: "Features" },
  { href: "#testimonials", label: "Reviews" },
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
    <header className="w-[90%] md:w-[80%] lg:w-[85%] lg:max-w-screen-xl top-5 mx-auto sticky z-40 rounded-2xl flex justify-between items-center px-4 py-3 bg-background/90 backdrop-blur-md border border-border/40 shadow-sm">
      {/* Mobile Menu */}
      <div className="flex items-center lg:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => setIsOpen(!isOpen)}
              className="mr-2 text-muted-foreground hover:text-foreground"
              aria-label="Open menu"
            >
              <ListIcon className="h-5 w-5" weight="light" />
            </Button>
          </SheetTrigger>

          <SheetContent
            side="left"
            className="flex flex-col justify-between bg-background border-border/40"
          >
            <div>
              <SheetHeader className="mb-6">
                <SheetTitle className="flex items-center">
                  <Link
                    href="/"
                    className="flex items-center gap-2.5 hover:opacity-80 transition-opacity"
                  >
                    <BookDoodle className="w-7 h-7" color="var(--nook-forest)" />
                    <span className="text-xl text-foreground tracking-tight font-heading font-semibold">
                      Librarium
                    </span>
                  </Link>
                </SheetTitle>
              </SheetHeader>

              <nav className="flex flex-col gap-1">
                {routeList.map(({ href, label }) => (
                  <Button
                    key={href}
                    onClick={() => setIsOpen(false)}
                    asChild
                    variant="ghost"
                    className="justify-start text-base font-normal text-muted-foreground hover:text-foreground rounded-xl"
                  >
                    <Link href={href}>{label}</Link>
                  </Button>
                ))}

                <Separator className="my-3" />

                <Button
                  onClick={handleLogin}
                  disabled={isSigningIn}
                  className="justify-center font-semibold rounded-xl bg-nook-forest hover:bg-[#1A3526] text-white group/arrow"
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
                      <ArrowRightIcon className="size-4 ml-2 group-hover/arrow:translate-x-1 transition-transform" />
                    </>
                  ) : (
                    <>
                      Login
                      <ArrowRightIcon className="size-4 ml-2 group-hover/arrow:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </nav>
            </div>

            <SheetFooter className="flex-col sm:flex-col justify-start items-start">
              <Separator className="mb-3" />
              <ToggleTheme />
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>

      {/* Logo */}
      <Link
        href="/"
        className="flex items-center gap-2.5 hover:opacity-80 transition-opacity"
      >
        <BookDoodle className="w-7 h-7 shrink-0" color="var(--nook-forest)" />
        <span className="text-xl text-foreground tracking-tight font-heading font-semibold hidden sm:block">
          Librarium
        </span>
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden lg:flex items-center gap-1">
        {routeList.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-xl hover:bg-nook-mint/10"
          >
            {label}
          </Link>
        ))}
      </nav>

      {/* Right Side */}
      <div className="flex items-center gap-2">
        <Button
          onClick={handleLogin}
          disabled={isSigningIn}
          className="hidden lg:flex h-9 px-5 font-semibold rounded-xl bg-nook-forest hover:bg-[#1A3526] text-white group/arrow"
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
              Dashboard
              <ArrowRightIcon className="size-4 ml-2 group-hover/arrow:translate-x-1 transition-transform" />
            </>
          ) : (
            <>
              Login
              <ArrowRightIcon className="size-4 ml-2 group-hover/arrow:translate-x-1 transition-transform" />
            </>
          )}
        </Button>

        <ToggleTheme />
      </div>
    </header>
  );
};
