"use client";

import { useAuthContext } from "@/lib/providers/AuthProvider";
import { BookIcon, ListIcon, CircleNotchIcon, ArrowRightIcon } from "@phosphor-icons/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

const navLinks = [
  { href: "#philosophy", label: "Philosophy" },
  { href: "#features", label: "Features" },
  { href: "#experience", label: "Experience" },
  { href: "#voices", label: "Voices" },
];

export function ObsidianNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const { isAuthenticated, signInWithGoogle } = useAuthContext();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
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
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#0A0A08]/90 backdrop-blur-xl border-b border-[#C4A265]/10"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#C4A265] to-[#8B7035] flex items-center justify-center shadow-lg shadow-[#C4A265]/20 group-hover:shadow-[#C4A265]/40 transition-shadow">
                <BookIcon className="h-4 w-4 text-[#0A0A08]" weight="fill" />
              </div>
              <span className="text-lg tracking-[0.15em] uppercase text-[#E8E2D4] font-light">
                Librarium
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="px-4 py-2 text-[13px] tracking-[0.08em] uppercase text-[#8A8478] hover:text-[#C4A265] transition-colors duration-300"
                >
                  {label}
                </Link>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              <button
                onClick={handleLogin}
                disabled={isSigningIn}
                className="hidden lg:flex items-center gap-2 px-5 py-2 text-[13px] tracking-[0.08em] uppercase bg-[#C4A265] text-[#0A0A08] font-medium rounded hover:bg-[#D4B275] transition-all duration-300 hover:shadow-lg hover:shadow-[#C4A265]/20 disabled:opacity-50"
              >
                {isSigningIn ? (
                  <>
                    <CircleNotchIcon className="size-4 animate-spin" weight="bold" />
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

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-2 text-[#8A8478] hover:text-[#C4A265] transition-colors"
                aria-label="Toggle menu"
              >
                <ListIcon className="h-5 w-5" weight="light" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-0 bottom-0 w-72 bg-[#0A0A08] border-l border-[#C4A265]/10 p-8 flex flex-col">
            <button
              onClick={() => setIsOpen(false)}
              className="self-end mb-8 text-[#8A8478] hover:text-[#C4A265] text-2xl"
            >
              &times;
            </button>
            <nav className="flex flex-col gap-1">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setIsOpen(false)}
                  className="px-3 py-3 text-sm tracking-[0.1em] uppercase text-[#8A8478] hover:text-[#C4A265] transition-colors border-b border-[#1A1A18]"
                >
                  {label}
                </Link>
              ))}
            </nav>
            <button
              onClick={handleLogin}
              disabled={isSigningIn}
              className="mt-8 flex items-center justify-center gap-2 px-5 py-3 text-sm tracking-[0.08em] uppercase bg-[#C4A265] text-[#0A0A08] font-medium rounded hover:bg-[#D4B275] transition-all disabled:opacity-50"
            >
              {isSigningIn ? (
                <>
                  <CircleNotchIcon className="size-4 animate-spin" weight="bold" />
                  Signing in
                </>
              ) : isAuthenticated ? (
                "Dashboard"
              ) : (
                "Enter Library"
              )}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
