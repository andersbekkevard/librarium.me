import type { Icon } from "@phosphor-icons/react";

export function ComingSoon({ icon: I, title, children }: { icon: Icon; title: string; children: React.ReactNode }) {
  return (
    <div className="grid min-h-[60vh] place-items-center">
      <div className="flex max-w-lg flex-col items-center gap-5 rounded-3xl border border-border bg-card p-12 text-center shadow-soft animate-settle">
        <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Feature preview</span>
        <span className="grid size-20 place-items-center rounded-full bg-brand-primary/8 ring-2 ring-brand-accent/40">
          <I className="size-10 text-brand-primary" weight="duotone" />
        </span>
        <h1 className="text-4xl tracking-tight">{title}</h1>
        <p className="text-muted-foreground">{children}</p>
      </div>
    </div>
  );
}
