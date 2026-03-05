const services = [
  {
    title: "Google Books",
    state: "Live",
    body: "Search millions of titles, import descriptions and covers, and move from discovery to shelf in one action.",
  },
  {
    title: "Firebase Auth",
    state: "Live",
    body: "Secure Google sign-in with profile creation and cross-device access to your personal library.",
  },
  {
    title: "Advanced Analytics",
    state: "Roadmap",
    body: "Deeper trend analysis, genre pacing, and personalized reading velocity dashboards.",
  },
  {
    title: "Reading Circles",
    state: "Roadmap",
    body: "Shared shelves, discussion spaces, and collaborative momentum for book clubs.",
  },
];

export const ServicesSection = () => {
  return (
    <section id="services" className="landing-shell section-spacing">
      <div className="landing-split-grid">
        <div className="reveal-up">
          <p className="landing-section-label">Integrations</p>
          <h2 className="landing-section-title">Built on stable foundations, expanding with intent.</h2>
          <p className="mt-4 max-w-md text-muted-foreground">
            The platform starts with reliable core services and layers premium capabilities only where they improve the
            reading experience.
          </p>
          <div className="mt-8 rounded-3xl border border-border/70 bg-card/85 p-5">
            <p className="text-[0.66rem] uppercase tracking-[0.2em] text-muted-foreground">Current Stack</p>
            <ul className="mt-4 space-y-2 text-sm text-foreground">
              <li>Next.js 15 + React 19</li>
              <li>Firebase Auth + Firestore</li>
              <li>Google Books metadata intake</li>
            </ul>
          </div>
        </div>

        <div className="space-y-3">
          {services.map((service, index) => (
            <article key={service.title} className={`landing-row reveal-up delay-${(index % 3) + 1}`}>
              <div>
                <h3 className="font-heading text-2xl">{service.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{service.body}</p>
              </div>
              <span className={`landing-chip ${service.state === "Live" ? "landing-chip-live" : "landing-chip-roadmap"}`}>
                {service.state}
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
