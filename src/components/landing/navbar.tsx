"use client";

import { useAuthContext } from "@/lib/providers/AuthProvider";
import { ArrowRightIcon, CircleNotchIcon, ListIcon } from "@phosphor-icons/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { ToggleTheme } from "../toggle-theme";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

const navLinks = [
  { href: "#manifesto", label: "Philosophy" },
  { href: "#features", label: "Features" },
  { href: "#testimonials", label: "Praise" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const { isAuthenticated, signInWithGoogle } = useAuthContext();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogin = async () => {
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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/90 backdrop-blur-md border-b border-border/40"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex items-center justify-between px-6 md:px-10 lg:px-16 py-4">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-3">
          <span
            className="text-[1.35rem] tracking-[-0.04em] font-medium text-foreground transition-opacity group-hover:opacity-70"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Librarium
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-[13px] uppercase tracking-[0.15em] text-muted-foreground hover:text-foreground transition-colors duration-300"
              style={{ fontFamily: "var(--font-geist-sans)" }}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <ToggleTheme />

          <button
            onClick={handleLogin}
            disabled={isSigningIn}
            className="hidden md:inline-flex items-center gap-2 px-5 py-2 text-[13px] uppercase tracking-[0.12em] font-medium bg-foreground text-background rounded-full hover:opacity-85 transition-all duration-300 disabled:opacity-50"
            style={{ fontFamily: "var(--font-geist-sans)" }}
          >
            {isSigningIn ? (
              <>
                <CircleNotchIcon className="size-3.5 animate-spin" weight="bold" />
                <span>Signing in</span>
              </>
            ) : isAuthenticated ? (
              <>
                <span>Dashboard</span>
                <ArrowRightIcon className="size-3.5" />
              </>
            ) : (
              <>
                <span>Enter</span>
                <ArrowRightIcon className="size-3.5" />
              </>
            )}
          </button>

          {/* Mobile menu */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon-sm" aria-label="Open menu">
                  <ListIcon className="h-5 w-5" weight="light" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-background border-border/40 w-72">
                <SheetHeader className="mb-8">
                  <SheetTitle>
                    <span
                      className="text-xl tracking-[-0.04em]"
                      style={{ fontFamily: "var(--font-serif)" }}
                    >
                      Librarium
                    </span>
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-6">
                  {navLinks.map(({ href, label }) => (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => setIsOpen(false)}
                      className="text-[13px] uppercase tracking-[0.15em] text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {label}
                    </Link>
                  ))}
                  <div className="h-px bg-border/60 my-2" />
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      handleLogin();
                    }}
                    disabled={isSigningIn}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-[13px] uppercase tracking-[0.12em] font-medium bg-foreground text-background rounded-full hover:opacity-85 transition-all"
                  >
                    {isSigningIn ? "Signing in..." : isAuthenticated ? "Dashboard" : "Enter"}
                    {!isSigningIn && <ArrowRightIcon className="size-3.5" />}
                  </button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};
