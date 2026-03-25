"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ScrollReveal } from "./scroll-reveal";

const bookCovers = [
  { title: "Dune", author: "Frank Herbert", spine: "#244633", cover: "#2d5a3f", pages: 412 },
  { title: "Klara and the Sun", author: "Kazuo Ishiguro", spine: "#F5C54D", cover: "#f0d078", pages: 307 },
  { title: "Piranesi", author: "Susanna Clarke", spine: "#789D72", cover: "#8aab84", pages: 272 },
  { title: "The Overstory", author: "Richard Powers", spine: "#3d6b4f", cover: "#4a7d5c", pages: 502 },
  { title: "Circe", author: "Madeline Miller", spine: "#c4944a", cover: "#d4a862", pages: 393 },
  { title: "Pachinko", author: "Min Jin Lee", spine: "#526D5E", cover: "#6a8575", pages: 490 },
];

const shelves = [
  { label: "Currently Reading", count: 3, color: "bg-brand-primary dark:bg-brand-accent" },
  { label: "Want to Read", count: 24, color: "bg-golden-amber" },
  { label: "Finished", count: 87, color: "bg-brand-secondary" },
];

function BookSpine({ book, index }: { book: typeof bookCovers[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });

  return (
    <motion.div
      ref={ref}
      className="group relative cursor-pointer"
      initial={{ opacity: 0, y: 40, rotateY: -15 }}
      animate={isInView ? { opacity: 1, y: 0, rotateY: 0 } : { opacity: 0, y: 40, rotateY: -15 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
      style={{ perspective: "800px" }}
    >
      <div
        className="relative w-full aspect-[2/3] rounded-lg overflow-hidden transition-transform duration-500 group-hover:scale-[1.03] group-hover:-rotate-1 group-hover:shadow-xl"
        style={{
          background: `linear-gradient(135deg, ${book.cover} 0%, ${book.spine} 100%)`,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Book spine shadow */}
        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-black/15" />

        {/* Title */}
        <div className="absolute inset-0 p-4 flex flex-col justify-between">
          <div>
            <p className="text-white text-xs font-mono uppercase tracking-wider opacity-70 mb-1">
              {book.author}
            </p>
            <p className="text-white text-sm font-heading font-bold leading-tight">
              {book.title}
            </p>
          </div>

          <p className="text-white/50 text-[10px] font-mono">
            {book.pages}p
          </p>
        </div>

        {/* Subtle grain overlay */}
        <div className="absolute inset-0 opacity-10 mix-blend-overlay" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
        }} />
      </div>
    </motion.div>
  );
}

export function ChapterLibrary() {
  return (
    <section className="py-20 md:py-32 px-6 md:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Section copy */}
        <div className="max-w-2xl mb-16">
          <ScrollReveal>
            <h2 className="font-heading font-bold text-4xl md:text-5xl leading-tight tracking-tight text-foreground mb-6">
              Your library,
              <br />
              <span className="text-brand-primary dark:text-brand-accent">beautifully organized.</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Every book you&apos;ve read, want to read, or are reading right now — all in one
              place. Organize by shelves, track your progress, and watch your
              collection grow.
            </p>
          </ScrollReveal>
        </div>

        {/* Shelf indicators */}
        <ScrollReveal delay={0.2}>
          <div className="flex flex-wrap gap-6 mb-12">
            {shelves.map((shelf) => (
              <div key={shelf.label} className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${shelf.color}`} />
                <span className="text-sm text-muted-foreground">
                  {shelf.label}
                </span>
                <span className="text-sm font-mono text-foreground font-medium">
                  {shelf.count}
                </span>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Book grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 md:gap-6">
          {bookCovers.map((book, i) => (
            <BookSpine key={book.title} book={book} index={i} />
          ))}
        </div>

        {/* Total counter */}
        <ScrollReveal delay={0.5} className="mt-12">
          <div className="text-center">
            <p className="font-mono text-xs tracking-[0.15em] uppercase text-muted-foreground">
              Total books tracked
            </p>
            <p className="font-heading text-5xl md:text-6xl font-bold text-foreground mt-2">
              114
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
