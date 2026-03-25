"use client";

import { Navbar } from "@/components/landing/warm-bento/navbar";
import { HeroSection } from "@/components/landing/warm-bento/hero";
import { BentoSectionOne } from "@/components/landing/warm-bento/bento-section-one";
import { BentoSectionTwo } from "@/components/landing/warm-bento/bento-section-two";
import { SocialProofStrip } from "@/components/landing/warm-bento/social-proof";
import { TestimonialsSection } from "@/components/landing/warm-bento/testimonials";
import { FinalCTA } from "@/components/landing/warm-bento/final-cta";
import { Footer } from "@/components/landing/warm-bento/footer";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <BentoSectionOne />
        <BentoSectionTwo />
        <SocialProofStrip />
        <TestimonialsSection />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
