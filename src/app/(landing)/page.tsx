"use client";

import { ObsidianHero } from "@/components/landing/obsidian/obsidian-hero";
import { ObsidianPhilosophy } from "@/components/landing/obsidian/obsidian-philosophy";
import { ObsidianFeatures } from "@/components/landing/obsidian/obsidian-features";
import { ObsidianShowcase } from "@/components/landing/obsidian/obsidian-showcase";
import { ObsidianTestimonials } from "@/components/landing/obsidian/obsidian-testimonials";
import { ObsidianCTA } from "@/components/landing/obsidian/obsidian-cta";
import { ObsidianFooter } from "@/components/landing/obsidian/obsidian-footer";
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
    <div className="obsidian-landing">
      <ObsidianHero />
      <ObsidianPhilosophy />
      <ObsidianFeatures />
      <ObsidianShowcase />
      <ObsidianTestimonials />
      <ObsidianCTA />
      <ObsidianFooter />
    </div>
  );
}
