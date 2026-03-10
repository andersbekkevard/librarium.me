"use client";

import { useAuthContext } from "@/lib/providers/AuthProvider";
import { BookIcon, ListIcon, CircleNotchIcon } from "@phosphor-icons/react";
import { ArrowRightIcon } from "@phosphor-icons/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
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
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#testimonials", label: "Reviews" },
  { href: "#pricing", label: "Pricing" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();
  const { isAuthenticated, signInWithGoogle } = useAuthContext();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
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
    } catch (err) {
      console.error("Login failed:", err);
      setIsSigningIn(false);
    }
  };

  return (
    <header
      className={`w-[90%] md:w-[80%] lg:w-[85%] lg:max-w-screen-xl top-5 mx-auto sticky z-40 rounded-xl flex justify-between items-center px-4 py-3 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md border border-[#789D72]/15 shadow-sm"
          : "bg-[#244633]/60 backdrop-blur-md border border-[#FEF3C7]/10"
      }`}
    >
      {/* Mobile Menu */}
      <div className="flex items-center lg:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => setIsOpen(!isOpen)}
              className={isScrolled ? "text-[#526D5E] hover:text-[#244633]" : "text-[#FEF3C7]/70 hover:text-[#FEF3C7]"}
              aria-label="Open menu"
            >
              <ListIcon className="h-5 w-5" weight="light" />
            </Button>
          </SheetTrigger>

          <SheetContent
            side="left"
            className="flex flex-col justify-between bg-white border-[#789D72]/15"
          >
            <div>
              <SheetHeader className="mb-6">
                <SheetTitle className="flex items-center">
                  <Link
                    href="/"
                    className="flex items-center gap-2.5 hover:opacity-80 transition-opacity"
                  >
                    <div className="w-9 h-9 bg-[#244633]/8 rounded-xl flex items-center justify-center">
                      <BookIcon className="h-5 w-5 text-[#244633]" weight="duotone" />
                    </div>
                    <span
                      className="text-xl text-[#244633] tracking-tight"
                      style={{ fontFamily: "var(--font-geist-sans)" }}
                    >
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
                    className="justify-start text-base font-normal text-[#526D5E] hover:text-[#244633] hover:bg-[#244633]/5"
                  >
                    <Link href={href}>{label}</Link>
                  </Button>
                ))}

                <Separator className="my-3 bg-[#789D72]/15" />

                <Button
                  onClick={handleLogin}
                  disabled={isSigningIn}
                  className="justify-center font-semibold bg-[#244633] text-white hover:bg-[#1a3326]"
                >
                  {isSigningIn ? (
                    <>
                      <CircleNotchIcon className="size-4 mr-2 animate-spin" weight="bold" />
                      Signing in...
                    </>
                  ) : isAuthenticated ? (
                    <>
                      Dashboard
                      <ArrowRightIcon className="size-4 ml-2" />
                    </>
                  ) : (
                    <>
                      Login
                      <ArrowRightIcon className="size-4 ml-2" />
                    </>
                  )}
                </Button>
              </nav>
            </div>

            <SheetFooter className="flex-col sm:flex-col justify-start items-start">
              <Separator className="mb-3 bg-[#789D72]/15" />
              <p className="text-xs text-[#526D5E]">Librarium &mdash; Your Reading Story</p>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>

      {/* Logo */}
      <Link
        href="/"
        className="flex items-center gap-2.5 hover:opacity-80 transition-opacity"
      >
        <div
          className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
            isScrolled ? "bg-[#244633]/8" : "bg-[#FEF3C7]/15"
          }`}
        >
          <BookIcon
            className={`h-5 w-5 transition-colors ${isScrolled ? "text-[#244633]" : "text-[#FEF3C7]"}`}
            weight="duotone"
          />
        </div>
        <span
          className={`text-xl tracking-tight hidden sm:block transition-colors ${
            isScrolled ? "text-[#244633]" : "text-[#FEF3C7]"
          }`}
          style={{ fontFamily: "var(--font-geist-sans)" }}
        >
          Librarium
        </span>
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden lg:flex items-center gap-1">
        {routeList.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={`px-3 py-2 text-sm transition-colors rounded-lg ${
              isScrolled
                ? "text-[#526D5E] hover:text-[#244633] hover:bg-[#244633]/5"
                : "text-[#FEF3C7]/70 hover:text-[#FEF3C7] hover:bg-[#FEF3C7]/10"
            }`}
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
          className={`hidden lg:flex h-9 px-5 font-semibold rounded-xl transition-all ${
            isScrolled
              ? "bg-[#244633] text-white hover:bg-[#1a3326]"
              : "bg-[#FEF3C7] text-[#244633] hover:bg-[#fde68a]"
          }`}
        >
          {isSigningIn ? (
            <>
              <CircleNotchIcon className="size-4 mr-2 animate-spin" weight="bold" />
              Signing in...
            </>
          ) : isAuthenticated ? (
            <>
              Dashboard
              <ArrowRightIcon className="size-4 ml-2" />
            </>
          ) : (
            "Login"
          )}
        </Button>
      </div>
    </header>
  );
};
