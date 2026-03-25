"use client";

import { FinalCTASection } from "@/components/landing/sections/final-cta";
import { HeroSection } from "@/components/landing/sections/hero";
import { StatementSection } from "@/components/landing/sections/statement";
import { StatsSection } from "@/components/landing/sections/stats";
import { TestimonialsSection } from "@/components/landing/sections/testimonials";
import { SocialFeedMockup } from "@/components/landing/mockups/social-feed";
import { LibraryViewMockup } from "@/components/landing/mockups/library-view";
import { ChallengesMockup } from "@/components/landing/mockups/challenges";
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
    <main className="overflow-x-hidden">
      <HeroSection />

      <StatementSection headline="See what your friends are reading" direction="right">
        <SocialFeedMockup />
      </StatementSection>

      <StatementSection headline="Build your library" direction="left">
        <LibraryViewMockup />
      </StatementSection>

      <StatsSection />

      <StatementSection headline="Join the challenge" direction="right">
        <ChallengesMockup />
      </StatementSection>

      <TestimonialsSection />

      <FinalCTASection />
    </main>
  );
}
