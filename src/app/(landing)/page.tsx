"use client";

import { CTASection } from "@/components/landing/sections/cta";
import { FeaturesSection } from "@/components/landing/sections/features";
import { FooterSection } from "@/components/landing/sections/footer";
import { HeroSection } from "@/components/landing/sections/hero";
import { ReadingListsSection } from "@/components/landing/sections/reading-lists";
import { SocialProofSection } from "@/components/landing/sections/social-proof";
import { TrendingSection } from "@/components/landing/sections/trending";
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
      <HeroSection />
      <TrendingSection />
      <ReadingListsSection />
      <SocialProofSection />
      <FeaturesSection />
      <CTASection />
      <FooterSection />
    </>
  );
}
