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
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} id="social-proof" className="py-16 md:py-20 overflow-hidden">
      <div className="container mx-auto mb-10 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="font-heading text-2xl md:text-3xl font-bold text-foreground"
        >
          Right now, readers everywhere are&hellip;
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.15 }}
          className="text-muted-foreground mt-2"
        >
          A live pulse of the Librarium community
        </motion.p>
      </div>

      {/* Scrolling strip */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div
          className="animate-scroll-left flex gap-6"
          style={{
            width: "max-content",
            ["--scroll-duration" as string]: "55s",
          }}
        >
          {[...currentlyReading, ...currentlyReading].map((item, i) => {
            const book = BOOK_COVERS[item.bookIdx];
            return (
              <div key={`${item.user}-${i}`} className="flex flex-col items-center gap-2 flex-shrink-0">
                <div className="relative">
                  <StylizedBookCover book={book} size="sm" className="!shadow-lg" />
                  {/* User avatar overlay */}
                  <div className="absolute -bottom-2 -right-2 w-7 h-7 rounded-full bg-sage/90 dark:bg-sage/80 text-white text-[9px] font-bold flex items-center justify-center border-2 border-background shadow-sm">
                    {item.avatar}
                  </div>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap">{item.user}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
