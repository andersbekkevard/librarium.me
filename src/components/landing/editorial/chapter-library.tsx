"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ScrollReveal } from "./scroll-reveal";

const bookCovers = [
  { title: "Dune", author: "Frank Herbert", spine: "#1a3325", cover: "#244633", accent: "#F5C54D", pages: 412 },
  { title: "Klara and the Sun", author: "Kazuo Ishiguro", spine: "#c4a030", cover: "#F5C54D", accent: "#244633", pages: 307 },
  { title: "Piranesi", author: "Susanna Clarke", spine: "#5c7e56", cover: "#789D72", accent: "#fff", pages: 272 },
  { title: "The Overstory", author: "Richard Powers", spine: "#2a4f38", cover: "#3d6b4f", accent: "#F5C54D", pages: 502 },
  { title: "Circe", author: "Madeline Miller", spine: "#a07830", cover: "#c4944a", accent: "#fff", pages: 393 },
  { title: "Pachinko", author: "Min Jin Lee", spine: "#3e564a", cover: "#526D5E", accent: "#F5C54D", pages: 490 },
  { title: "Normal People", author: "Sally Rooney", spine: "#789D72", cover: "#9ab894", accent: "#244633", pages: 266 },
  { title: "Shōgun", author: "James Clavell", spine: "#244633", cover: "#1a3325", accent: "#F5C54D", pages: 1152 },
];

const shelves = [
  { label: "Currently Reading", count: 3, color: "bg-brand-primary dark:bg-brand-accent" },
  { label: "Want to Read", count: 24, color: "bg-golden-amber" },
  { label: "Finished", count: 87, color: "bg-brand-secondary" },
];

function BookCover({
  book,
  index,
}: {
  book: (typeof bookCovers)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });

  return (
    <motion.div
      ref={ref}
      className="group relative"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{
        duration: 0.7,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{ perspective: "600px" }}
    >
      {/* Book shadow — sits below the cover */}
      <div className="absolute -bottom-2 left-2 right-2 h-4 bg-black/[0.06] dark:bg-black/20 rounded-md blur-md transition-all duration-500 group-hover:blur-lg group-hover:-bottom-3 group-hover:bg-black/[0.1] dark:group-hover:bg-black/30" />

      <div
        className="relative w-full aspect-[2/3] rounded-lg overflow-hidden cursor-pointer transition-all duration-500 group-hover:-translate-y-2 group-hover:rotate-[-2deg] group-hover:shadow-2xl"
        style={{
          background: `linear-gradient(160deg, ${book.cover} 0%, ${book.spine} 100%)`,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Spine edge */}
        <div
          className="absolute left-0 top-0 bottom-0 w-1"
          style={{ background: book.spine }}
        />
        <div className="absolute left-1 top-0 bottom-0 w-px bg-black/10" />

        {/* Top edge highlight */}
        <div className="absolute top-0 left-0 right-0 h-px bg-white/15" />

        {/* Title content */}
        <div className="absolute inset-0 p-3 sm:p-4 flex flex-col justify-between">
          <div>
            <p
              className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.15em] mb-1 opacity-60"
              style={{ color: book.accent }}
            >
              {book.author}
            </p>
            <p className="text-white text-xs sm:text-sm font-heading font-bold leading-tight">
              {book.title}
            </p>
          </div>

          {/* Decorative accent line */}
          <div className="flex items-center gap-2">
            <div
              className="h-px flex-1 opacity-30"
              style={{ background: book.accent }}
            />
            <span className="text-[8px] font-mono opacity-40" style={{ color: book.accent }}>
              {book.pages}p
            </span>
          </div>
        </div>

        {/* Paper texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.08] mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          }}
        />
      </div>
    </motion.div>
  );
}

export function ChapterLibrary() {
  return (
    <section className="py-24 md:py-36 px-6 md:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Section copy — larger, bolder */}
        <div className="max-w-3xl mb-20">
          <ScrollReveal>
            <h2 className="font-heading font-bold text-5xl md:text-6xl lg:text-7xl leading-[0.9] tracking-tight text-foreground mb-8">
              Your library,
              <br />
              <span className="text-brand-primary dark:text-brand-accent italic">
                beautifully organized.
              </span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
              Every book you&apos;ve read, want to read, or are reading right now
              — all in one place. Watch your collection grow.
            </p>
          </ScrollReveal>
        </div>

        {/* Shelf indicators */}
        <ScrollReveal delay={0.2}>
          <div className="flex flex-wrap gap-8 mb-14">
            {shelves.map((shelf) => (
              <div key={shelf.label} className="flex items-center gap-3">
                <div className={`w-2.5 h-2.5 rounded-full ${shelf.color}`} />
                <span className="text-sm text-muted-foreground">
                  {shelf.label}
                </span>
                <span className="text-sm font-mono text-foreground font-semibold">
                  {shelf.count}
                </span>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Book grid — 8 books, 4 per row on desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
          {bookCovers.map((book, i) => (
            <BookCover key={book.title} book={book} index={i} />
          ))}
        </div>

        {/* Total counter — monumental */}
        <ScrollReveal delay={0.5} className="mt-20">
          <div className="text-center">
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground/60 mb-3">
              Total books tracked
            </p>
            <p className="font-heading text-7xl md:text-8xl font-bold text-foreground leading-none">
              114
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
