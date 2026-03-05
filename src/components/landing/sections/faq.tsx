import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  useScrollAnimation,
  useStaggeredScrollAnimation,
} from "@/lib/hooks/useScrollAnimation";

interface FAQItem {
  question: string;
  answer: string;
  value: string;
}

const faqItems: FAQItem[] = [
  {
    question: "Is Librarium free right now?",
    answer:
      "Yes. Current core features are available at no cost while the product matures. Roadmap features may later introduce optional paid tiers.",
    value: "item-1",
  },
  {
    question: "What does progress tracking include today?",
    answer:
      "You can update current page counts, move across reading states, and review activity history that reflects your actual reading sessions.",
    value: "item-2",
  },
  {
    question: "How is my data handled?",
    answer:
      "Your library is stored securely in Firebase with authenticated access. Librarium is designed around private personal-use reading data.",
    value: "item-3",
  },
  {
    question: "Can I quickly add books without manual entry?",
    answer:
      "Yes. Search via Google Books integration to pull metadata automatically, then refine details only if you want to.",
    value: "item-4",
  },
  {
    question: "What is coming next?",
    answer:
      "Planned work includes deeper analytics, richer goal tracking, and optional social reading features for shared recommendations.",
    value: "item-5",
  },
];

export const FAQSection = () => {
  const { elementRef: headerRef, isVisible: headerVisible } =
    useScrollAnimation();
  const { elementRef: accordionRef, visibleItems } =
    useStaggeredScrollAnimation(faqItems.length);

  return (
    <section id="faq" className="container py-16 md:py-24">
      <div
        ref={headerRef as React.RefObject<HTMLDivElement>}
        className={`scroll-fade-in-up mx-auto mb-10 max-w-3xl text-center ${headerVisible ? "animate" : ""}`}
      >
        <p className="landing-ui mb-3 text-xs uppercase tracking-[0.2em] text-primary/70">
          Clear Answers
        </p>
        <h2 className="landing-display text-4xl md:text-5xl">Questions readers ask before they commit.</h2>
      </div>

      <Accordion
        ref={accordionRef as React.RefObject<HTMLDivElement>}
        type="single"
        collapsible
        className="mx-auto max-w-3xl"
      >
        {faqItems.map(({ question, answer, value }, index) => (
          <AccordionItem
            key={value}
            value={value}
            className={`scroll-fade-in-up rounded-2xl border border-primary/10 bg-background/65 px-5 transition-all ${
              visibleItems[index] ? "animate" : ""
            }`}
            style={{
              transitionDelay: visibleItems[index] ? `${index * 100}ms` : "0ms",
            }}
          >
            <AccordionTrigger className="landing-ui text-left text-base font-medium hover:no-underline">
              {question}
            </AccordionTrigger>
            <AccordionContent className="landing-ui text-sm leading-relaxed text-muted-foreground">
              {answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};
