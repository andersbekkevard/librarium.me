"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useScrollAnimation } from "@/lib/hooks/useScrollAnimation";

const faqItems = [
  {
    question: "Is Librarium free to use?",
    answer:
      "Yes! Librarium is completely free. All current features — library management, reading tracking, book discovery, and statistics — are available at no cost.",
    value: "faq-1",
  },
  {
    question: "How does reading progress tracking work?",
    answer:
      "Simply update your current page number as you read. Books move through three states: not started, in progress, and finished. Your dashboard updates in real-time with stats about your reading habits.",
    value: "faq-2",
  },
  {
    question: "Where do the book details come from?",
    answer:
      "We use the Google Books API to search millions of titles. When you add a book, covers, page counts, descriptions, and author information are automatically populated.",
    value: "faq-3",
  },
  {
    question: "Is my reading data private?",
    answer:
      "Absolutely. Your reading data is securely stored with encryption. Only you can access your personal library and reading data. We don't sell or share your information.",
    value: "faq-4",
  },
  {
    question: "What social features are coming?",
    answer:
      "We're building reading clubs, friend activity feeds, shared bookshelves, and community recommendations. Follow our updates to be the first to know when they launch.",
    value: "faq-5",
  },
];

export function ChapterFaq() {
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section
      className="py-24 md:py-32 bg-white"
      ref={elementRef as React.RefObject<HTMLElement>}
    >
      <div className="max-w-[680px] mx-auto px-6">
        <div
          className={`text-center mb-10 scroll-fade-in-up ${isVisible ? "animate" : ""}`}
        >
          <span className="text-xs font-mono tracking-[0.3em] text-[#789D72] uppercase block mb-4">
            Common Questions
          </span>
          <h2
            className="text-3xl md:text-[2.25rem] tracking-tight text-[#244633]"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Frequently Asked
          </h2>
        </div>

        <Accordion type="single" collapsible className="space-y-3">
          {faqItems.map(({ question, answer, value }, index) => (
            <div
              key={value}
              className={`scroll-fade-in-up ${isVisible ? "animate" : ""}`}
              style={{ transitionDelay: `${150 + index * 100}ms` }}
            >
              <AccordionItem
                value={value}
                className="rounded-xl border border-[#789D72]/15 bg-[#FFF8F0] px-5 my-0"
              >
                <AccordionTrigger className="text-left text-[#244633] hover:no-underline py-4">
                  {question}
                </AccordionTrigger>
                <AccordionContent className="text-[#244633]/55 text-[15px] leading-relaxed">
                  {answer}
                </AccordionContent>
              </AccordionItem>
            </div>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
