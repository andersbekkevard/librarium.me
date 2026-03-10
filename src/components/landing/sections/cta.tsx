"use client";

import { useAuthContext } from "@/lib/providers/AuthProvider";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function CTASection() {
  const [isSigningIn, setIsSigningIn] = useState(false);
  const router = useRouter();
  const { isAuthenticated, signInWithGoogle } = useAuthContext();

  const handleClick = async () => {
    if (isAuthenticated) {
      router.push("/dashboard");
      return;
    }
    setIsSigningIn(true);
    try {
      await signInWithGoogle();
      router.push("/dashboard");
    } catch (err) {
      console.error("Sign-up failed:", err);
      setIsSigningIn(false);
    }
  };

  return (
    <section className="mx-auto max-w-[640px] px-6 mt-16 mb-32">
      <button
        onClick={handleClick}
        disabled={isSigningIn}
        className="text-[15px] text-[#244633] hover:underline disabled:opacity-50 bg-transparent border-none cursor-pointer p-0"
      >
        {isSigningIn ? "Signing in..." : "Try Librarium \u2192"}
      </button>
    </section>
  );
}
