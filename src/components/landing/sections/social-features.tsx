"use client";

import {
  UsersThreeIcon,
  ChatCircleDotsIcon,
  BookOpenIcon,
  CalendarBlankIcon,
} from "@phosphor-icons/react";

const clubFeatures = [
  "Start or join a book club",
  "Set shared reading schedules",
  "Discuss chapters together",
  "Vote on your next read",
  "Track group progress",
];

export const SocialFeaturesSection = () => {
  return (
    <section className="py-20 bg-[#F7F7F7] dark:bg-card/50">
      <div className="max-w-[1100px] mx-auto px-6">
        <h2
          className="text-2xl sm:text-3xl font-bold text-center mb-12 tracking-tight"
          style={{ fontFamily: "var(--font-geist-sans)" }}
        >
          Follow friends & join book clubs
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="md:col-span-3 bg-white dark:bg-background rounded-2xl p-8 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#244633]/10 rounded-xl flex items-center justify-center">
                <UsersThreeIcon
                  className="w-5 h-5 text-[#244633] dark:text-brand-accent"
                  weight="duotone"
                />
              </div>
              <h3
                className="text-lg font-semibold"
                style={{ fontFamily: "var(--font-geist-sans)" }}
              >
                Join or start a book club
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {clubFeatures.map((feature) => (
                <div key={feature} className="flex items-center gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#244633] dark:bg-brand-accent shrink-0" />
                  <span className="text-sm text-muted-foreground">
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 flex gap-3">
              <div className="flex -space-x-2">
                {[
                  "bg-amber-200",
                  "bg-emerald-200",
                  "bg-blue-200",
                  "bg-rose-200",
                ].map((color, i) => (
                  <div
                    key={i}
                    className={`w-8 h-8 ${color} rounded-full border-2 border-white dark:border-background flex items-center justify-center text-xs font-medium`}
                  >
                    {["A", "S", "M", "J"][i]}
                  </div>
                ))}
              </div>
              <span className="text-xs text-muted-foreground self-center">
                12 members reading together
              </span>
            </div>
          </div>

          <div className="md:col-span-2 bg-white dark:bg-background rounded-2xl p-8 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#244633]/10 rounded-xl flex items-center justify-center">
                <ChatCircleDotsIcon
                  className="w-5 h-5 text-[#244633] dark:text-brand-accent"
                  weight="duotone"
                />
              </div>
              <h3
                className="text-lg font-semibold"
                style={{ fontFamily: "var(--font-geist-sans)" }}
              >
                Chat with others
              </h3>
            </div>

            <div className="space-y-3">
              <div className="bg-[#F7F7F7] dark:bg-card rounded-xl p-3">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-6 h-6 bg-emerald-200 rounded-full flex items-center justify-center text-[10px] font-medium">
                    S
                  </div>
                  <span className="text-xs font-medium">Sarah</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Just finished Chapter 12, that plot twist!
                </p>
              </div>
              <div className="bg-[#F7F7F7] dark:bg-card rounded-xl p-3">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center text-[10px] font-medium">
                    M
                  </div>
                  <span className="text-xs font-medium">Marcus</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  No spoilers! I&apos;m on Chapter 10 still
                </p>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <BookOpenIcon className="w-3.5 h-3.5" weight="duotone" />
                <span>Group read</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <CalendarBlankIcon className="w-3.5 h-3.5" weight="duotone" />
                <span>Weekly meetup</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
