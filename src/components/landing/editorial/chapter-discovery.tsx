"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ScrollReveal, StaggerContainer, StaggerChild } from "./scroll-reveal";

const genres = [
  "Science Fiction",
  "Literary Fiction",
  "Fantasy",
  "Non-Fiction",
  "Mystery",
  "Memoir",
  "Historical",
  "Philosophy",
];

const recommendations = [
  {
    title: "Children of Time",
    author: "Adrian Tchaikovsky",
    reason: "Because you loved Dune",
    match: 94,
    color: "#244633",
  },
  {
    title: "The Left Hand of Darkness",
    author: "Ursula K. Le Guin",
    reason: "Popular in your circle",
    match: 91,
    color: "#789D72",
  },
  {
    title: "Exhalation",
    author: "Ted Chiang",
    reason: "Trending this month",
    match: 88,
    color: "#526D5E",
  },
];

const trendingBooks = [
  { title: "Intermezzo", author: "Sally Rooney", readers: 3421 },
  { title: "James", author: "Percival Everett", readers: 2890 },
  { title: "The Women", author: "Kristin Hannah", readers: 2654 },
];

export function ChapterDiscovery() {
  const genreRef = useRef<HTMLDivElement>(null);
  const genreInView = useInView(genreRef, { once: true, margin: "-40px" });

  return (
    <section className="py-20 md:py-32 px-6 md:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 md:gap-20 items-start">
          {/* Left: Recommendations */}
          <div>
            <ScrollReveal>
              <h2 className="font-heading font-bold text-4xl md:text-5xl leading-tight tracking-tight text-foreground mb-6">
                Find your next
                <br />
                <span className="text-brand-primary dark:text-brand-accent">obsession.</span>
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <p className="text-lg text-muted-foreground leading-relaxed mb-12">
                Personalized recommendations powered by what you and your friends
                love. Not algorithms — real taste, real people, real books.
              </p>
            </ScrollReveal>

            {/* Recommendation cards */}
            <StaggerContainer className="space-y-4" staggerDelay={0.12}>
              {recommendations.map((rec) => (
                <StaggerChild key={rec.title}>
                  <div className="flex items-start gap-4 bg-white dark:bg-[rgba(255,255,255,0.04)] rounded-xl p-4 border border-[rgba(36,70,51,0.08)] dark:border-[rgba(120,157,114,0.08)] hover:border-[rgba(36,70,51,0.15)] dark:hover:border-[rgba(120,157,114,0.15)] transition-all duration-300 group cursor-pointer hover:shadow-sm">
                    {/* Mini book cover */}
                    <div
                      className="w-12 h-16 rounded-md shrink-0 flex items-end p-1.5 transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-1"
                      style={{
                        background: `linear-gradient(135deg, ${rec.color}dd, ${rec.color})`,
                      }}
                    >
                      <p className="text-white text-[8px] font-mono leading-tight truncate opacity-70">
                        {rec.author.split(" ").pop()}
                      </p>
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground group-hover:text-brand-primary dark:group-hover:text-brand-accent transition-colors">
                        {rec.title}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {rec.author}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs text-brand-primary dark:text-brand-accent font-mono">
                          {rec.match}% match
                        </span>
                        <span className="text-muted-foreground/30">·</span>
                        <span className="text-xs text-muted-foreground">
                          {rec.reason}
                        </span>
                      </div>
                    </div>
                  </div>
                </StaggerChild>
              ))}
            </StaggerContainer>
          </div>

          {/* Right: Genres + Trending */}
          <div className="md:sticky md:top-32">
            {/* Genre cloud */}
            <ScrollReveal delay={0.2}>
              <p className="font-mono text-xs tracking-[0.15em] uppercase text-muted-foreground mb-4">
                Explore genres
              </p>
            </ScrollReveal>

            <div ref={genreRef} className="flex flex-wrap gap-2 mb-12">
              {genres.map((genre, i) => (
                <motion.span
                  key={genre}
                  className="px-4 py-2 rounded-full text-sm border border-[rgba(36,70,51,0.12)] dark:border-[rgba(120,157,114,0.12)] text-foreground hover:bg-brand-primary hover:text-white dark:hover:bg-brand-accent dark:hover:text-[#0A0F0D] hover:border-transparent cursor-pointer transition-colors duration-200"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={
                    genreInView
                      ? { opacity: 1, scale: 1 }
                      : { opacity: 0, scale: 0.8 }
                  }
                  transition={{
                    duration: 0.4,
                    delay: 0.05 * i,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                >
                  {genre}
                </motion.span>
              ))}
            </div>

            {/* Trending in your circle */}
            <ScrollReveal delay={0.4}>
              <p className="font-mono text-xs tracking-[0.15em] uppercase text-muted-foreground mb-4">
                Trending in your circle
              </p>
            </ScrollReveal>

            <StaggerContainer className="space-y-3" staggerDelay={0.1}>
              {trendingBooks.map((book, i) => (
                <StaggerChild key={book.title}>
                  <div className="flex items-center gap-4 group cursor-pointer">
                    <span className="font-heading text-2xl font-bold text-brand-primary/20 dark:text-brand-accent/20 w-8">
                      {i + 1}
                    </span>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground group-hover:text-brand-primary dark:group-hover:text-brand-accent transition-colors">
                        {book.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {book.author}
                      </p>
                    </div>
                    <span className="text-xs font-mono text-muted-foreground">
                      {book.readers.toLocaleString()} readers
                    </span>
                  </div>
                </StaggerChild>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </div>
    </section>
  );
}
