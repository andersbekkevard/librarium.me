"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { BOOK_COVERS } from "./book-data";
import { StylizedBookCover } from "./book-cover";

const currentlyReading = [
  { user: "Emma L.", avatar: "EM", bookIdx: 0 },
  { user: "Alex R.", avatar: "AL", bookIdx: 2 },
  { user: "Jordan K.", avatar: "JO", bookIdx: 4 },
  { user: "Mia W.", avatar: "MI", bookIdx: 8 },
  { user: "Noah S.", avatar: "NO", bookIdx: 6 },
  { user: "Chloe D.", avatar: "CH", bookIdx: 1 },
  { user: "Liam P.", avatar: "LP", bookIdx: 5 },
  { user: "Ava M.", avatar: "AV", bookIdx: 3 },
  { user: "Ethan B.", avatar: "ET", bookIdx: 7 },
  { user: "Sofia G.", avatar: "SG", bookIdx: 9 },
  { user: "Lucas H.", avatar: "LH", bookIdx: 10 },
  { user: "Isla F.", avatar: "IF", bookIdx: 11 },
];

export function SocialProofStrip() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <section ref={ref} id="social-proof" className="py-20 md:py-28 overflow-hidden relative">
      {/* Decorative divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-1 rounded-full bg-amber/40" />

      <div className="container mx-auto mb-12 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ ease: [0.23, 1, 0.32, 1] }}
          className="font-heading text-2xl md:text-[2rem] lg:text-4xl font-extrabold text-foreground tracking-tight"
        >
          Right now, readers everywhere are&hellip;
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.12 }}
          className="text-muted-foreground mt-3 text-base md:text-lg"
        >
          A live pulse of the Librarium community
        </motion.p>
      </div>

      {/* Scrolling strip */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div
          className="animate-scroll-left flex gap-8"
          style={{
            width: "max-content",
            ["--scroll-duration" as string]: "50s",
          }}
        >
          {[...currentlyReading, ...currentlyReading].map((item, i) => {
            const book = BOOK_COVERS[item.bookIdx];
            return (
              <div key={`${item.user}-${i}`} className="flex flex-col items-center gap-2.5 flex-shrink-0 group">
                <div className="relative">
                  <StylizedBookCover book={book} size="md" className="!shadow-lg group-hover:!shadow-xl transition-shadow duration-300" />
                  {/* User avatar — bigger, with ring */}
                  <div className="absolute -bottom-2.5 -right-2.5 w-8 h-8 rounded-full bg-sage text-white text-[10px] font-bold flex items-center justify-center border-[2.5px] border-background shadow-md">
                    {item.avatar}
                  </div>
                </div>
                <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">{item.user}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
