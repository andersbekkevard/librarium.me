"use client";

import { useAuthContext } from "@/lib/providers/AuthProvider";
import { CircleNotchIcon } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

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
    <header className="w-full border-b border-[#E8E8E8] bg-white">
      <div className="mx-auto max-w-[1200px] px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="text-[15px] font-semibold text-[#111111] tracking-tight"
        >
          Librarium
        </Link>
        <button
          onClick={handleLogin}
          disabled={isSigningIn}
          className="text-[14px] text-[#244633] hover:underline disabled:opacity-50 bg-transparent border-none cursor-pointer p-0"
        >
          {isSigningIn ? (
            <span className="flex items-center gap-1.5">
              <CircleNotchIcon
                className="size-3.5 animate-spin"
                weight="bold"
              />
              Signing in
            </span>
          ) : isAuthenticated ? (
            "Dashboard"
          ) : (
            "Log in"
          )}
        </button>
      </div>
    </header>
  );
};
