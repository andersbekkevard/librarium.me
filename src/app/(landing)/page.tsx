"use client";

import { BenefitsSection } from "@/components/landing/sections/benefits";
import { FAQSection } from "@/components/landing/sections/faq";
import { FeaturesSection } from "@/components/landing/sections/features";
import { FooterSection } from "@/components/landing/sections/footer";
import { HeroSection } from "@/components/landing/sections/hero";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ServicesSection } from "@/components/landing/sections/services";
import { TestimonialSection } from "@/components/landing/sections/testimonial";
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
    <main className="landing-organic">
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
