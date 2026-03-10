"use client";

import { DiscoverySection } from "@/components/landing/sections/discovery";
import { FooterSection } from "@/components/landing/sections/footer";
import { HelpBuildSection } from "@/components/landing/sections/help-build";
import { HeroSection } from "@/components/landing/sections/hero";
import { SocialFeaturesSection } from "@/components/landing/sections/social-features";
import { SocialProofSection } from "@/components/landing/sections/social-proof";
import { TrackReadingSection } from "@/components/landing/sections/track-reading";
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
      <TrackReadingSection />
      <SocialFeaturesSection />
      <DiscoverySection />
      <HelpBuildSection />
      <SocialProofSection />
      <FooterSection />
    </>
  );
}
