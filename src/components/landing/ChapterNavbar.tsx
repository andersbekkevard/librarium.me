"use client";

import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/lib/providers/AuthProvider";
import { BookOpenIcon, ListIcon, CircleNotchIcon } from "@phosphor-icons/react";
import { ArrowRightIcon } from "@phosphor-icons/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navLinks = [
  { href: "#chapter-track", label: "Track" },
  { href: "#chapter-discover", label: "Discover" },
  { href: "#chapter-connect", label: "Connect" },
  { href: "#chapter-join", label: "Join" },
];

export function ChapterNavbar() {
  const [isOpen, setIsOpen] = useState(false);
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

  const scrollTo = (href: string) => {
    setIsOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="sticky top-4 z-50 mx-auto w-[92%] md:w-[85%] lg:max-w-[1200px]">
      <div className="flex items-center justify-between rounded-2xl border border-[#789D72]/20 bg-[#FFF8F0]/95 px-5 py-3 backdrop-blur-md">
        {/* Mobile menu */}
        <div className="flex items-center lg:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon-sm"
                className="text-[#244633]/60 hover:text-[#244633]"
                aria-label="Open menu"
              >
                <ListIcon className="h-5 w-5" weight="light" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="border-[#789D72]/20 bg-[#FFF8F0]"
            >
              <SheetHeader className="mb-6">
                <SheetTitle>
                  <Link href="/" className="flex items-center gap-2.5">
                    <BookOpenIcon
                      className="h-5 w-5 text-[#244633]"
                      weight="duotone"
                    />
                    <span
                      className="text-lg text-[#244633] tracking-tight"
                      style={{ fontFamily: "var(--font-geist-sans)" }}
                    >
                      Librarium
                    </span>
                  </Link>
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-4">
                {navLinks.map(({ href, label }) => (
                  <button
                    key={href}
                    onClick={() => scrollTo(href)}
                    className="px-3 py-2.5 text-left text-base text-[#244633]/70 hover:text-[#244633] transition-colors rounded-lg hover:bg-[#244633]/5"
                  >
                    {label}
                  </button>
                ))}
                <div className="my-3 h-px bg-[#789D72]/20" />
                <Button
                  onClick={handleLogin}
                  disabled={isSigningIn}
                  className="bg-[#244633] text-white hover:bg-[#1a3425]"
                >
                  {isSigningIn ? (
                    <>
                      <CircleNotchIcon className="size-4 mr-2 animate-spin" weight="bold" />
                      Signing in...
                    </>
                  ) : isAuthenticated ? (
                    "Go to Dashboard"
                  ) : (
                    "Get Started"
                  )}
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 hover:opacity-80 transition-opacity"
        >
          <BookOpenIcon
            className="h-5 w-5 text-[#244633]"
            weight="duotone"
          />
          <span
            className="text-lg text-[#244633] tracking-tight hidden sm:block"
            style={{ fontFamily: "var(--font-geist-sans)" }}
          >
            Librarium
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map(({ href, label }) => (
            <button
              key={href}
              onClick={() => scrollTo(href)}
              className="px-3.5 py-2 text-sm text-[#244633]/60 hover:text-[#244633] transition-colors rounded-lg hover:bg-[#244633]/5 cursor-pointer"
            >
              {label}
            </button>
          ))}
        </nav>

        {/* CTA */}
        <Button
          onClick={handleLogin}
          disabled={isSigningIn}
          size="sm"
          className="bg-[#244633] text-white hover:bg-[#1a3425] hidden sm:flex"
        >
          {isSigningIn ? (
            <>
              <CircleNotchIcon className="size-3.5 mr-1.5 animate-spin" weight="bold" />
              Signing in...
            </>
          ) : isAuthenticated ? (
            <>
              Dashboard
              <ArrowRightIcon className="size-3.5 ml-1" />
            </>
          ) : (
            <>
              Start Reading
              <ArrowRightIcon className="size-3.5 ml-1" />
            </>
          )}
        </Button>
      </div>
    </header>
  );
}
