"use client";

import { BoldHero } from "@/components/landing/sections/bold-hero";
import { BoldManifesto } from "@/components/landing/sections/bold-manifesto";
import { BoldFeatures } from "@/components/landing/sections/bold-features";
import { BoldNumbers } from "@/components/landing/sections/bold-numbers";
import { BoldCta } from "@/components/landing/sections/bold-cta";
import { BoldFooter } from "@/components/landing/sections/bold-footer";
import { useAuthContext } from "@/lib/providers/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LandingPage() {
  const { isAuthenticated, loading } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.push("/dashboard");
    }
  }, [loading, isAuthenticated, router]);

  if (!loading && isAuthenticated) {
    return null;
  }

  return (
    <>
      <BoldHero />
      <BoldManifesto />
      <BoldFeatures />
      <BoldNumbers />
      <BoldCta />
      <BoldFooter />
    </>
  );
}
