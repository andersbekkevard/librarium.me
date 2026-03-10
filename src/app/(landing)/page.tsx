"use client";

import { CTASection } from "@/components/landing/sections/cta";
import { FeaturesSection } from "@/components/landing/sections/features";
import { FooterSection } from "@/components/landing/sections/footer";
import { HeroSection } from "@/components/landing/sections/hero";
import { HowItWorksSection } from "@/components/landing/sections/how-it-works";
import { PricingSection } from "@/components/landing/sections/pricing";
import { SocialProofSection } from "@/components/landing/sections/social-proof";
import { TrustStripSection } from "@/components/landing/sections/trust-strip";
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
      <TrustStripSection />
      <FeaturesSection />
      <HowItWorksSection />
      <SocialProofSection />
      <PricingSection />
      <CTASection />
      <FooterSection />
    </>
  );
}
