"use client";

import { useAuthContext } from "@/lib/providers/AuthProvider";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Testimonial {
  name: string;
  handle: string;
  avatar: string;
  platform: "twitter" | "instagram" | "tiktok";
  text: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Emma L.",
    handle: "@emmalitreads",
    avatar: "E",
    platform: "twitter",
    text: "Love Librarium so much! Finally a reading tracker that doesn't feel like it was designed in 2005 😍",
  },
  {
    name: "Jake R.",
    handle: "@jakereadsbooks",
    avatar: "J",
    platform: "instagram",
    text: "The book club feature is incredible. We used to coordinate in a group chat. Never again.",
  },
  {
    name: "Sarah K.",
    handle: "@sarahkbooks",
    avatar: "S",
    platform: "twitter",
    text: "Honestly this is the only reading app I'm using right now and I absolutely LOOOOOVE it!! 🥺♥️",
  },
  {
    name: "Tom W.",
    handle: "@tomwrites",
    avatar: "T",
    platform: "tiktok",
    text: "Moved my entire library from Goodreads in about 30 seconds. The import tool is 🔥",
  },
  {
    name: "Ana M.",
    handle: "@anamreads",
    avatar: "A",
    platform: "twitter",
    text: "The reading goals feature keeps me so motivated. Already at 23 books this year!",
  },
  {
    name: "Marcus",
    handle: "@marcusbookish",
    avatar: "M",
    platform: "instagram",
    text: "Finally an app that understands that reading is social. Following friends and seeing their highlights is *chef's kiss*",
  },
  {
    name: "Priya S.",
    handle: "@priyashelves",
    avatar: "P",
    platform: "twitter",
    text: "The barcode scanner! Just walk past your bookshelf and boom, your whole library is digitised 📚",
  },
  {
    name: "Chris D.",
    handle: "@chrisdreads",
    avatar: "C",
    platform: "tiktok",
    text: "Clean, fast, beautiful. Everything Goodreads should have been. And the dark mode 🖤",
  },
  {
    name: "Olivia N.",
    handle: "@livreads",
    avatar: "O",
    platform: "twitter",
    text: "My reading has gone up 40% since I started using Librarium. There's something about tracking that motivates you.",
  },
  {
    name: "David P.",
    handle: "@davidpages",
    avatar: "D",
    platform: "instagram",
    text: "I love how I can see what my friends ACTUALLY think about a book, not just internet strangers.",
  },
  {
    name: "Mia T.",
    handle: "@miaturnspages",
    avatar: "M",
    platform: "twitter",
    text: "Started a book club with 3 friends on here and we're actually finishing books now for the first time ever 😂📖",
  },
  {
    name: "Noah B.",
    handle: "@noahbiblio",
    avatar: "N",
    platform: "tiktok",
    text: "The profiles are gorgeous. Shared mine on BookTok and got like 50 people asking what app it is lol",
  },
  {
    name: "Sophie R.",
    handle: "@sophiereading",
    avatar: "S",
    platform: "twitter",
    text: "Highlights and notes synced across all my devices. Finally! This is how a reading app should work.",
  },
  {
    name: "Alex K.",
    handle: "@alexkbooks",
    avatar: "A",
    platform: "instagram",
    text: "The discovery feed is addictive in the best way. Found 5 new books this week just from friends' updates.",
  },
  {
    name: "Freya H.",
    handle: "@freyahadley",
    avatar: "F",
    platform: "twitter",
    text: "This is what I've been looking for. Simple, pretty, and it just works. No bloat, no ads, just books 💚",
  },
];

const avatarColors: Record<string, string> = {
  E: "bg-amber-200",
  J: "bg-blue-200",
  S: "bg-emerald-200",
  T: "bg-rose-200",
  A: "bg-violet-200",
  M: "bg-cyan-200",
  P: "bg-orange-200",
  C: "bg-teal-200",
  O: "bg-pink-200",
  D: "bg-lime-200",
  N: "bg-indigo-200",
  F: "bg-fuchsia-200",
};

const PlatformIcon = ({ platform }: { platform: string }) => {
  if (platform === "twitter")
    return (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    );
  if (platform === "instagram")
    return (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    );
  return (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.83a8.18 8.18 0 004.77 1.52V6.8a4.83 4.83 0 01-1-.11z" />
    </svg>
  );
};

const emojiDecorations = [
  { emoji: "🔥", className: "absolute -top-3 -left-3 text-3xl" },
  { emoji: "❤️", className: "absolute top-1/4 -right-4 text-2xl" },
  { emoji: "⭐", className: "absolute bottom-1/3 -left-5 text-2xl" },
  { emoji: "📚", className: "absolute -bottom-2 right-1/4 text-3xl" },
  { emoji: "💚", className: "absolute top-1/2 -right-6 text-2xl" },
  { emoji: "✨", className: "absolute -top-4 right-1/3 text-2xl" },
];

export const SocialProofSection = () => {
  const [isSigningIn, setIsSigningIn] = useState(false);
  const router = useRouter();
  const { isAuthenticated, signInWithGoogle } = useAuthContext();

  const handleSignUp = async () => {
    if (isAuthenticated) {
      router.push("/dashboard");
      return;
    }
    setIsSigningIn(true);
    try {
      await signInWithGoogle();
      router.push("/dashboard");
    } catch (err) {
      console.error("Sign in failed:", err);
      setIsSigningIn(false);
    }
  };

  const col1 = testimonials.filter((_, i) => i % 3 === 0);
  const col2 = testimonials.filter((_, i) => i % 3 === 1);
  const col3 = testimonials.filter((_, i) => i % 3 === 2);

  return (
    <section className="py-20 bg-[#F7F7F7] dark:bg-card/50 overflow-hidden">
      <div className="max-w-[1100px] mx-auto px-6">
        <h2
          className="text-2xl sm:text-3xl font-bold text-center mb-4 tracking-tight"
          style={{ fontFamily: "var(--font-geist-sans)" }}
        >
          Loved by everyone who loves books
        </h2>

        <div className="flex justify-center gap-4 mb-3">
          {["Twitter", "Instagram", "TikTok"].map((platform) => (
            <span
              key={platform}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              {platform}
            </span>
          ))}
        </div>

        <div className="flex justify-center mb-10">
          <button
            onClick={handleSignUp}
            disabled={isSigningIn}
            className="text-sm font-medium text-white bg-[#244633] hover:bg-[#1a3426] px-5 py-2 rounded-lg transition-colors disabled:opacity-50"
          >
            {isSigningIn ? "Signing in..." : "Sign up now"}
          </button>
        </div>

        <div className="relative">
          {emojiDecorations.map((dec, i) => (
            <div
              key={i}
              className={`${dec.className} hidden lg:block pointer-events-none select-none opacity-60`}
            >
              {dec.emoji}
            </div>
          ))}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[col1, col2, col3].map((col, colIndex) => (
              <div key={colIndex} className="space-y-4">
                {col.map((t) => (
                  <div
                    key={t.handle}
                    className="bg-white dark:bg-background rounded-2xl p-5 hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-8 h-8 ${avatarColors[t.avatar] || "bg-gray-200"} rounded-full flex items-center justify-center text-xs font-semibold`}
                        >
                          {t.avatar}
                        </div>
                        <div>
                          <div className="text-sm font-medium">{t.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {t.handle}
                          </div>
                        </div>
                      </div>
                      <div className="text-muted-foreground">
                        <PlatformIcon platform={t.platform} />
                      </div>
                    </div>
                    <p className="text-sm text-foreground/80 leading-relaxed">
                      {t.text}
                    </p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
