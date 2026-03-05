import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faq = [
  {
    q: "Is Librarium free to use?",
    a: "Yes. Current features are available for free while the platform evolves.",
    value: "item-1",
  },
  {
    q: "Can I import books quickly?",
    a: "Yes. Google Books integration lets you search and add titles with metadata and cover assets in one flow.",
    value: "item-2",
  },
  {
    q: "How does progress tracking work?",
    a: "Each book moves through not started, in progress, and finished states while storing page-level progress.",
    value: "item-3",
  },
  {
    q: "What is planned next?",
    a: "Advanced analytics, social reading circles, and richer personalization are on the roadmap.",
    value: "item-4",
  },
];

export const FAQSection = () => {
  return (
    <section id="faq" className="landing-shell section-spacing">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 text-center reveal-up">
          <p className="landing-section-label">FAQ</p>
          <h2 className="landing-section-title">Questions readers usually ask first.</h2>
        </div>
        <Accordion type="single" collapsible className="rounded-3xl border border-border/60 bg-card/80 p-3 md:p-5">
          {faq.map((item, index) => (
            <AccordionItem key={item.value} value={item.value} className={`reveal-up delay-${(index % 3) + 1}`}>
              <AccordionTrigger className="text-left font-heading text-xl">{item.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <p className="mt-5 text-center text-sm text-muted-foreground">
          Need more detail? Scroll to the footer and open the GitHub repository for the full project documentation.
        </p>
      </div>
    </section>
  );
};
