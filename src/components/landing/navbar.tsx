"use client";

import { useAuthContext } from "@/lib/providers/AuthProvider";
import {
  ArrowRightIcon,
  BookOpenTextIcon,
  CircleNotchIcon,
  GithubLogoIcon,
  ListIcon,
} from "@phosphor-icons/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ToggleTheme } from "../toggle-theme";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

interface RouteProps {
  href: string;
  label: string;
}

const routes: RouteProps[] = [
  { href: "#features", label: "Features" },
  { href: "#benefits", label: "Rhythm" },
  { href: "#services", label: "Flow" },
  { href: "#testimonials", label: "Notes" },
  { href: "#faq", label: "FAQ" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const router = useRouter();
  const { isAuthenticated, signInWithGoogle } = useAuthContext();

  const handleLogin = async () => {
    if (isAuthenticated) {
      router.push("/dashboard");
      return;
    }

    setIsSigningIn(true);

    try {
      await signInWithGoogle();
      router.push("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      setIsSigningIn(false);
    }
  };

  return (
    <header className="sticky top-4 z-40 mx-auto flex w-[94%] max-w-screen-xl items-center justify-between rounded-2xl border border-primary/10 bg-background/80 px-4 py-3 backdrop-blur-xl shadow-[0_10px_40px_rgba(34,68,51,0.08)]">
      <div className="flex items-center lg:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => setIsOpen(!isOpen)}
              className="mr-2 text-muted-foreground hover:text-foreground"
              aria-label="Open menu"
            >
              <ListIcon className="h-5 w-5" weight="bold" />
            </Button>
          </SheetTrigger>

          <SheetContent side="left" className="border-primary/10 bg-background/95">
            <SheetHeader>
              <SheetTitle>
                <Link href="/" className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
                    <BookOpenTextIcon className="h-5 w-5 text-primary" weight="duotone" />
                  </div>
                  <span className="landing-ui text-lg font-semibold tracking-tight">Librarium</span>
                </Link>
              </SheetTitle>
            </SheetHeader>

            <nav className="mt-8 flex flex-col gap-1">
              {routes.map(({ href, label }) => (
                <Button
                  key={href}
                  onClick={() => setIsOpen(false)}
                  asChild
                  variant="ghost"
                  className="justify-start landing-ui text-base"
                >
                  <Link href={href}>{label}</Link>
                </Button>
              ))}

              <Separator className="my-4" />

              <Button onClick={handleLogin} disabled={isSigningIn} className="landing-ui h-10 bg-primary text-primary-foreground hover:bg-brand-primary-hover">
                {isSigningIn ? (
                  <>
                    <CircleNotchIcon className="mr-2 size-4 animate-spin" weight="bold" />
                    Signing in...
                  </>
                ) : isAuthenticated ? (
                  <>
                    Open Dashboard
                    <ArrowRightIcon className="ml-2 size-4" />
                  </>
                ) : (
                  <>
                    Enter Librarium
                    <ArrowRightIcon className="ml-2 size-4" />
                  </>
                )}
              </Button>
            </nav>

            <SheetFooter className="mt-8 items-start">
              <ToggleTheme />
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>

      <Link href="/" className="flex items-center gap-2.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
          <BookOpenTextIcon className="h-5 w-5 text-primary" weight="duotone" />
        </div>
        <span className="landing-ui hidden text-lg font-semibold tracking-tight sm:block">Librarium</span>
      </Link>

      <nav className="hidden items-center gap-1 lg:flex">
        {routes.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className="landing-ui rounded-xl px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-primary/5 hover:text-foreground"
          >
            {label}
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-2">
        <Button
          onClick={handleLogin}
          disabled={isSigningIn}
          className="hidden h-9 px-5 lg:flex landing-ui bg-primary text-primary-foreground hover:bg-brand-primary-hover"
        >
          {isSigningIn ? (
            <>
              <CircleNotchIcon className="mr-2 size-4 animate-spin" weight="bold" />
              Signing in...
            </>
          ) : isAuthenticated ? (
            <>
              Dashboard
              <ArrowRightIcon className="ml-2 size-4" />
            </>
          ) : (
            <>
              Start Reading
              <ArrowRightIcon className="ml-2 size-4" />
            </>
          )}
        </Button>

        <ToggleTheme />

        <Button
          asChild
          size="icon-sm"
          variant="ghost"
          aria-label="View on GitHub"
          className="hidden lg:flex text-muted-foreground hover:text-foreground"
        >
          <Link href="https://github.com/andersbekkevard/librarium-app" target="_blank" aria-label="View on GitHub">
            <GithubLogoIcon className="size-4" />
          </Link>
        </Button>
      </div>
    </header>
  );
};
