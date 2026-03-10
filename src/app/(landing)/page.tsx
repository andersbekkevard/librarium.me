"use client";

import { ChapterProgressIndicator } from "@/components/landing/ChapterProgressIndicator";
import { ChapterHero } from "@/components/landing/sections/chapter-hero";
import { ChapterTrack } from "@/components/landing/sections/chapter-track";
import { ChapterDiscover } from "@/components/landing/sections/chapter-discover";
import { ChapterConnect } from "@/components/landing/sections/chapter-connect";
import { ChapterJoin } from "@/components/landing/sections/chapter-join";
import { ChapterFaq } from "@/components/landing/sections/chapter-faq";
import { ChapterFooter } from "@/components/landing/sections/chapter-footer";
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
      <ChapterProgressIndicator />
      <ChapterHero />
      <ChapterTrack />
      <ChapterDiscover />
      <ChapterConnect />
      <ChapterJoin />
      <ChapterFaq />
      <ChapterFooter />
    </>
  );
}
