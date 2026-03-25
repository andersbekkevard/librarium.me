"use client";

import { ChapterDivider } from "@/components/landing/editorial/chapter-divider";
import { ChapterFeed } from "@/components/landing/editorial/chapter-feed";
import { ChapterLibrary } from "@/components/landing/editorial/chapter-library";
import { ChapterChallenges } from "@/components/landing/editorial/chapter-challenges";
import { ChapterDiscovery } from "@/components/landing/editorial/chapter-discovery";
import { ChapterCommunity } from "@/components/landing/editorial/chapter-community";
import { EditorialHero } from "@/components/landing/editorial/hero";
import { EditorialFooter } from "@/components/landing/editorial/editorial-footer";

export default function LandingPage() {
  return (
    <main>
      <EditorialHero />

      <ChapterDivider chapter={1} total={5} title="Your Feed" id="ch-feed" />
      <ChapterFeed />

      <ChapterDivider chapter={2} total={5} title="Your Library" id="ch-library" />
      <ChapterLibrary />

      <ChapterDivider chapter={3} total={5} title="The Challenge" id="ch-challenges" />
      <ChapterChallenges />

      <ChapterDivider chapter={4} total={5} title="Discover" id="ch-discover" />
      <ChapterDiscovery />

      <ChapterDivider chapter={5} total={5} title="The Community" id="ch-community" />
      <ChapterCommunity />

      <EditorialFooter />
    </main>
  );
}
