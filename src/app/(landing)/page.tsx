"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthContext } from "@/lib/providers/AuthProvider";
import { VelvetHero } from "@/components/landing/sections/hero";
import { VelvetManifesto } from "@/components/landing/sections/manifesto";
import { VelvetFeatures } from "@/components/landing/sections/features";
import { VelvetTestimonial } from "@/components/landing/sections/testimonial";
import { VelvetCTA } from "@/components/landing/sections/cta";
import { VelvetFooter } from "@/components/landing/sections/footer";

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
    <main className="velvet-landing">
      <VelvetHero />
      <VelvetManifesto />
      <VelvetFeatures />
      <VelvetTestimonial />
      <VelvetCTA />
      <VelvetFooter />
    </main>
  );
}
