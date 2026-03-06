"use client";

import { useAuthContext } from "@/lib/providers/AuthProvider";
import { ArrowRightIcon, CircleNotchIcon } from "@phosphor-icons/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const navLinks = [
  { href: "#philosophy", label: "Philosophy" },
  { href: "#experience", label: "Experience" },
  { href: "#invitation", label: "Begin" },
];

export const AuroraNavbar = () => {
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
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
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled
            ? "bg-[#080f0b]/90 backdrop-blur-xl border-b border-[#1a3d28]/30"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#c4841d] to-[#e8c066] flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#080f0b"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
              </svg>
            </div>
            <span
              className="text-lg tracking-[0.02em] text-[#f5efe0]/90 transition-colors duration-300 group-hover:text-[#e8c066]"
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
                className="text-sm tracking-[0.08em] uppercase text-[#f5efe0]/40 hover:text-[#e8c066] transition-colors duration-500"
                style={{ fontFamily: "var(--font-geist-sans)" }}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Right */}
          <div className="flex items-center gap-4">
            <button
              onClick={handleLogin}
              disabled={isSigningIn}
              className="hidden md:flex items-center gap-2 px-5 py-2 text-sm tracking-[0.05em] uppercase rounded-full border border-[#c4841d]/40 text-[#e8c066] hover:bg-[#c4841d]/10 hover:border-[#c4841d]/60 transition-all duration-500 disabled:opacity-50"
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

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden flex flex-col gap-1.5 p-2"
              aria-label="Toggle menu"
            >
              <span
                className={`block w-5 h-px bg-[#f5efe0]/60 transition-all duration-300 ${
                  mobileOpen ? "rotate-45 translate-y-[3.5px]" : ""
                }`}
              />
              <span
                className={`block w-5 h-px bg-[#f5efe0]/60 transition-all duration-300 ${
                  mobileOpen ? "-rotate-45 -translate-y-[3.5px]" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-[#080f0b]/98 backdrop-blur-xl flex flex-col items-center justify-center gap-8">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className="text-2xl tracking-[0.12em] uppercase text-[#f5efe0]/60 hover:text-[#e8c066] transition-colors duration-500"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              {label}
            </Link>
          ))}
          <button
            onClick={() => {
              setMobileOpen(false);
              handleLogin();
            }}
            className="mt-4 px-8 py-3 text-sm tracking-[0.08em] uppercase rounded-full border border-[#c4841d]/40 text-[#e8c066] hover:bg-[#c4841d]/10 transition-all duration-500"
          >
            {isAuthenticated ? "Dashboard" : "Enter"}
          </button>
        </div>
      )}
    </>
  );
};
