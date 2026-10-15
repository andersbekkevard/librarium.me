"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { AppShell } from "@/components/shell";
import { Spinner } from "@/components/ui";
import { useLibrary } from "@/lib/store";

/** Every page under (app) requires a signed-in reader. */
export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { user, authReady } = useLibrary();
  const router = useRouter();
  useEffect(() => {
    if (authReady && !user) router.replace("/");
  }, [authReady, user, router]);
  if (!user)
    return (
      <div className="grid min-h-screen place-items-center">
        <Spinner className="size-8" />
      </div>
    );
  return <AppShell>{children}</AppShell>;
}
