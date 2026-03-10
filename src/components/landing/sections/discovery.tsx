"use client";

import {
  CompassIcon,
  HeartIcon,
  UserCircleIcon,
  StarIcon,
} from "@phosphor-icons/react";

export const DiscoverySection = () => {
  return (
    <section className="py-20 bg-white dark:bg-background">
      <div className="max-w-[1100px] mx-auto px-6">
        <h2
          className="text-2xl sm:text-3xl font-bold text-center mb-12 tracking-tight"
          style={{ fontFamily: "var(--font-geist-sans)" }}
        >
          Discover your next favourite book
          <br className="hidden sm:block" /> through someone you trust
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#F7F7F7] dark:bg-card rounded-2xl p-6 hover:shadow-md transition-shadow duration-300">
            <div className="w-10 h-10 bg-[#244633]/10 rounded-xl flex items-center justify-center mb-4">
              <CompassIcon
                className="w-5 h-5 text-[#244633] dark:text-brand-accent"
                weight="duotone"
              />
            </div>
            <h3
              className="text-base font-semibold mb-2"
              style={{ fontFamily: "var(--font-geist-sans)" }}
            >
              Find something new
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Browse what your friends are reading and find your next great read
              based on people, not algorithms.
            </p>
          </div>

          <div className="md:col-span-2 bg-[#F7F7F7] dark:bg-card rounded-2xl p-6 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-start gap-6">
              <div className="flex-1">
                <div className="w-10 h-10 bg-[#244633]/10 rounded-xl flex items-center justify-center mb-4">
                  <HeartIcon
                    className="w-5 h-5 text-[#244633] dark:text-brand-accent"
                    weight="duotone"
                  />
                </div>
                <h3
                  className="text-base font-semibold mb-2"
                  style={{ fontFamily: "var(--font-geist-sans)" }}
                >
                  See what moves the people you care about
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Your feed shows updates from friends — what they&apos;re
                  reading, their ratings, highlights, and reviews. Real
                  recommendations from real people.
                </p>
              </div>
              <div className="hidden md:block w-48 space-y-2 shrink-0">
                <div className="bg-white dark:bg-background rounded-xl p-3 border border-border/40">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 bg-amber-200 rounded-full flex items-center justify-center text-[10px] font-medium">
                      E
                    </div>
                    <span className="text-xs font-medium">Emma</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground">
                    &quot;This changed how I think about habits&quot;
                  </p>
                  <div className="flex gap-0.5 mt-1.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <StarIcon
                        key={s}
                        className="w-3 h-3 text-amber-400"
                        weight="fill"
                      />
                    ))}
                  </div>
                </div>
                <div className="bg-white dark:bg-background rounded-xl p-3 border border-border/40">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 bg-emerald-200 rounded-full flex items-center justify-center text-[10px] font-medium">
                      J
                    </div>
                    <span className="text-xs font-medium">Jake</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground">
                    &quot;Couldn&apos;t put it down — finished in 2 days&quot;
                  </p>
                  <div className="flex gap-0.5 mt-1.5">
                    {[1, 2, 3, 4].map((s) => (
                      <StarIcon
                        key={s}
                        className="w-3 h-3 text-amber-400"
                        weight="fill"
                      />
                    ))}
                    <StarIcon className="w-3 h-3 text-muted" weight="regular" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-2 bg-[#F7F7F7] dark:bg-card rounded-2xl p-6 hover:shadow-md transition-shadow duration-300">
            <div className="w-10 h-10 bg-[#244633]/10 rounded-xl flex items-center justify-center mb-4">
              <UserCircleIcon
                className="w-5 h-5 text-[#244633] dark:text-brand-accent"
                weight="duotone"
              />
            </div>
            <h3
              className="text-base font-semibold mb-2"
              style={{ fontFamily: "var(--font-geist-sans)" }}
            >
              Your book corner on the internet
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              A beautiful public profile showcasing your reading life. Share what
              you&apos;re reading, your favourites, and your reading stats.
            </p>
            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                {["9780451524935", "9780743273565", "9780547928227"].map(
                  (isbn) => (
                    <div
                      key={isbn}
                      className="w-10 h-14 rounded-md overflow-hidden shadow-sm bg-muted"
                    >
                      <img
                        src={`https://covers.openlibrary.org/b/isbn/${isbn}-S.jpg`}
                        alt="Book cover"
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  )
                )}
              </div>
              <div className="text-xs text-muted-foreground">
                <span className="font-medium text-foreground">42 books</span>{" "}
                read this year
              </div>
            </div>
          </div>

          <div className="bg-[#F7F7F7] dark:bg-card rounded-2xl p-6 hover:shadow-md transition-shadow duration-300">
            <div className="w-10 h-10 bg-[#244633]/10 rounded-xl flex items-center justify-center mb-4">
              <StarIcon
                className="w-5 h-5 text-[#244633] dark:text-brand-accent"
                weight="duotone"
              />
            </div>
            <h3
              className="text-base font-semibold mb-2"
              style={{ fontFamily: "var(--font-geist-sans)" }}
            >
              Not your average ratings
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              See how your friends rated a book, not just the internet average.
              Discover your taste twins.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
