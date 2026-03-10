"use client";

import { useAuthContext } from "@/lib/providers/AuthProvider";
import {
  BookIcon,
  ListIcon,
  CircleNotchIcon,
  ArrowRightIcon,
} from "@phosphor-icons/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

interface RouteProps {
  href: string;
  label: string;
}

const routeList: RouteProps[] = [
  { href: "#trending", label: "Trending" },
  { href: "#reading-lists", label: "Lists" },
  { href: "#features", label: "Features" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const { isAuthenticated, signInWithGoogle } = useAuthContext();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#1a2e1f]/95 backdrop-blur-sm border-b border-[#FFF8F0]/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <BookIcon className="h-5 w-5 text-[#789D72]" weight="duotone" />
          <span
            className="text-[#FFF8F0] text-lg tracking-tight"
            style={{ fontFamily: "var(--font-fraunces)", fontWeight: 600 }}
          >
            Librarium
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {routeList.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-[#FFF8F0]/50 text-sm hover:text-[#FFF8F0] transition-colors"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleLogin}
            disabled={isSigningIn}
            className="hidden md:inline-flex items-center gap-2 text-[#FFF8F0] text-sm font-medium px-5 py-2 border border-[#FFF8F0]/25 hover:border-[#FFF8F0]/50 transition-colors disabled:opacity-50 group"
          >
            {isSigningIn ? (
              <>
                <CircleNotchIcon
                  className="size-3.5 animate-spin"
                  weight="bold"
                />
                Signing in...
              </>
            ) : isAuthenticated ? (
              <>
                Dashboard
                <ArrowRightIcon className="size-3.5 group-hover:translate-x-0.5 transition-transform" />
              </>
            ) : (
              <>
                Sign In
                <ArrowRightIcon className="size-3.5 group-hover:translate-x-0.5 transition-transform" />
              </>
            )}
          </button>

          {/* Mobile menu */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <button
                  className="text-[#FFF8F0]/60 hover:text-[#FFF8F0] transition-colors p-2"
                  aria-label="Open menu"
                >
                  <ListIcon className="h-5 w-5" weight="light" />
                </button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="bg-[#1a2e1f] border-[#FFF8F0]/10 w-72"
              >
                <SheetHeader className="mb-8">
                  <SheetTitle className="text-[#FFF8F0] flex items-center gap-2">
                    <BookIcon
                      className="h-5 w-5 text-[#789D72]"
                      weight="duotone"
                    />
                    <span
                      style={{
                        fontFamily: "var(--font-fraunces)",
                        fontWeight: 600,
                      }}
                    >
                      Librarium
                    </span>
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-1">
                  {routeList.map(({ href, label }) => (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => setIsOpen(false)}
                      className="text-[#FFF8F0]/50 text-sm py-3 px-2 hover:text-[#FFF8F0] transition-colors border-b border-[#FFF8F0]/5"
                    >
                      {label}
                    </Link>
                  ))}
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      handleLogin();
                    }}
                    disabled={isSigningIn}
                    className="mt-6 inline-flex items-center justify-center gap-2 bg-[#FFF8F0] text-[#1a2e1f] px-6 py-3 text-sm font-semibold disabled:opacity-50"
                  >
                    {isSigningIn ? (
                      <>
                        <CircleNotchIcon
                          className="size-3.5 animate-spin"
                          weight="bold"
                        />
                        Signing in...
                      </>
                    ) : isAuthenticated ? (
                      "Go to Dashboard"
                    ) : (
                      "Sign In"
                    )}
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
