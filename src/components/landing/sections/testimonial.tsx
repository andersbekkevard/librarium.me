const quotes = [
  {
    quote: "The layout feels like a high-end magazine for my books. I actually enjoy updating progress now.",
    person: "Marta K.",
    role: "Early user",
  },
  {
    quote: "Importing books is fast and the dashboard gives me exactly what I need without clutter.",
    person: "Evan L.",
    role: "Non-fiction reader",
  },
  {
    quote: "I like the calm visual tone. It feels crafted, not another generic tracking app.",
    person: "Priya S.",
    role: "Weekend reader",
  },
];

export const TestimonialSection = () => {
  return (
    <section id="testimonials" className="landing-shell section-spacing">
      <div className="mb-10 reveal-up">
        <p className="landing-section-label">Voices</p>
        <h2 className="landing-section-title">Early reactions from the reading community.</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {quotes.map((item, index) => (
          <figure key={item.person} className={`landing-quote reveal-up delay-${(index % 3) + 1}`}>
            <blockquote className="relative pl-5 text-sm leading-relaxed text-foreground">
              <span className="absolute left-0 top-0 font-heading text-xl leading-none text-brand-primary">“</span>
              {item.quote}
            </blockquote>
            <figcaption className="mt-5 border-t border-border/60 pt-4">
              <p className="font-medium">{item.person}</p>
              <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{item.role}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
};
