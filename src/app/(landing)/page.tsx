"use client";

import { CTASection } from "@/components/landing/sections/cta";
import { FooterSection } from "@/components/landing/sections/footer";
import { HowItWorksSection } from "@/components/landing/sections/how-it-works";
import { OpeningSection } from "@/components/landing/sections/opening";
import { PhilosophySection } from "@/components/landing/sections/philosophy";
import { PricingSection } from "@/components/landing/sections/pricing";
import { ScreenshotSection } from "@/components/landing/sections/screenshot";
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
      <main>
        <OpeningSection />
        <ScreenshotSection />
        <HowItWorksSection />
        <PhilosophySection />
        <PricingSection />
        <CTASection />
      </main>
      <FooterSection />
    </>
  );
}
