"use client";

import { UsersIcon } from "@phosphor-icons/react";
import { ComingSoon } from "@/components/coming-soon";

export default function SharedPage() {
  return (
    <ComingSoon icon={UsersIcon} title="Shared Books">
      Soon you&apos;ll be able to connect with friends and family to share your favorite books and discover new ones.
    </ComingSoon>
  );
}
