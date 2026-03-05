"use client";

import { BenefitsSection } from "@/components/landing/sections/benefits";
import { FAQSection } from "@/components/landing/sections/faq";
import { FeaturesSection } from "@/components/landing/sections/features";
import { FooterSection } from "@/components/landing/sections/footer";
import { HeroSection } from "@/components/landing/sections/hero";
import { ServicesSection } from "@/components/landing/sections/services";
import { TestimonialSection } from "@/components/landing/sections/testimonial";
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
  }, [isAuthenticated, loading, router]);

  if (!loading && isAuthenticated) {
    return null;
  }

  return (
    <main className="relative overflow-hidden pb-12">
      <div className="landing-atmosphere" aria-hidden="true" />
      <HeroSection />
      <BenefitsSection />
      <FeaturesSection />
      <ServicesSection />
      <TestimonialSection />
      <FAQSection />
      <FooterSection />
    </main>
  );
}
