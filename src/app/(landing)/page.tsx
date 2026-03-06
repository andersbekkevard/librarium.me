"use client";

import { AuroraHeroSection } from "@/components/landing/sections/aurora-hero";
import { AuroraPhilosophySection } from "@/components/landing/sections/aurora-philosophy";
import { AuroraExperienceSection } from "@/components/landing/sections/aurora-experience";
import { AuroraInvitationSection } from "@/components/landing/sections/aurora-invitation";
import { AuroraFooterSection } from "@/components/landing/sections/aurora-footer";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthContext } from "@/lib/providers/AuthProvider";

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
    <div className="aurora-page">
      <AuroraHeroSection />
      <AuroraPhilosophySection />
      <AuroraExperienceSection />
      <AuroraInvitationSection />
      <AuroraFooterSection />
    </div>
  );
}
