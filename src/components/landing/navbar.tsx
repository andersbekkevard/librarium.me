"use client";

import { useAuthContext } from "@/lib/providers/AuthProvider";
import { BookIcon, CircleNotchIcon } from "@phosphor-icons/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const Navbar = () => {
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
    <header className="w-full border-b border-border/40 bg-white dark:bg-background sticky top-0 z-50">
      <div className="max-w-[1100px] mx-auto px-6 flex items-center justify-between h-14">
        <Link
          href="/"
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <div className="w-8 h-8 bg-[#244633] rounded-lg flex items-center justify-center">
            <BookIcon className="h-4 w-4 text-white" weight="fill" />
          </div>
          <span
            className="text-lg font-semibold text-foreground tracking-tight"
            style={{ fontFamily: "var(--font-geist-sans)" }}
          >
            Librarium
          </span>
        </Link>

        <nav className="flex items-center gap-6">
          <Link
            href="#about"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors hidden sm:block"
          >
            About
          </Link>
          <button
            onClick={handleLogin}
            disabled={isSigningIn}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {isSigningIn ? (
              <CircleNotchIcon className="size-4 animate-spin" weight="bold" />
            ) : isAuthenticated ? (
              "Dashboard"
            ) : (
              "Sign in"
            )}
          </button>
          <button
            onClick={handleLogin}
            disabled={isSigningIn}
            className="text-sm font-medium text-white bg-[#244633] hover:bg-[#1a3426] px-4 py-2 rounded-lg transition-colors"
          >
            {isAuthenticated ? "Dashboard" : "Join"}
          </button>
        </nav>
      </div>
    </header>
  );
};
