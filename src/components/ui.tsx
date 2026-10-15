"use client";

import { BookOpenIcon, CheckCircleIcon, CircleNotchIcon, ClockIcon, PlayIcon, StarIcon, XIcon, type Icon } from "@phosphor-icons/react";
import * as RadixDialog from "@radix-ui/react-dialog";
import { clsx, type ClassValue } from "clsx";
import Image from "next/image";
import { useState, type ComponentProps, type ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { STATE_LABEL } from "@/lib/domain";
import type { ReadingState } from "@/lib/types";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

const BUTTON = {
  primary: "bg-brand-primary text-white shadow-sm hover:bg-brand-primary-hover hover:shadow-md dark:text-background",
  outline: "border border-border bg-card hover:bg-accent hover:border-brand-accent/40",
  ghost: "hover:bg-accent text-muted-foreground hover:text-foreground",
  soft: "bg-brand-primary/10 text-brand-primary hover:bg-brand-primary/15",
  danger: "bg-status-error text-white hover:bg-status-error/90",
};
const SIZE = { sm: "h-8 px-3 text-xs rounded-lg gap-1.5", md: "h-10 px-4 text-sm rounded-xl gap-2", lg: "h-11 px-6 text-base rounded-xl gap-2", icon: "size-9 rounded-lg" };

export const buttonClass = (variant: keyof typeof BUTTON = "primary", size: keyof typeof SIZE = "md", className?: string) =>
  cn(
    "inline-flex shrink-0 select-none items-center justify-center whitespace-nowrap font-medium transition-all duration-200 active:scale-[0.97]",
    "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
    BUTTON[variant], SIZE[size], className,
  );

export function Button({ variant, size, busy, className, children, ...props }: ComponentProps<"button"> & { variant?: keyof typeof BUTTON; size?: keyof typeof SIZE; busy?: boolean }) {
  return (
    <button type="button" className={buttonClass(variant, size, className)} disabled={busy || props.disabled} {...props}>
      {busy && <CircleNotchIcon className="animate-spin" weight="bold" />}
      {children}
    </button>
  );
}

export const Card = ({ className, ...props }: ComponentProps<"div">) => (
  <div className={cn("rounded-2xl border border-border/70 bg-card", className)} {...props} />
);

export function CardHeader({ icon: I, title, action, className }: { icon?: Icon; title: ReactNode; action?: ReactNode; className?: string }) {
  return (
    <div className={cn("flex items-center justify-between gap-3 px-5 pt-5 pb-4", className)}>
      <h2 className="flex items-center gap-2 text-lg text-foreground">
        {I && <I className="size-5 text-brand-accent" weight="duotone" />}
        {title}
      </h2>
      {action}
    </div>
  );
}

const TONE = {
  neutral: "bg-muted text-muted-foreground border-border/60",
  brand: "bg-brand-primary/10 text-brand-primary border-transparent",
  success: "bg-status-success/15 text-brand-primary border-transparent dark:text-status-success",
  warning: "bg-status-warning/20 text-foreground border-transparent",
  outline: "bg-transparent text-foreground border-border",
};

export const Badge = ({ tone = "neutral", className, ...props }: ComponentProps<"span"> & { tone?: keyof typeof TONE }) => (
  <span className={cn("inline-flex w-fit items-center gap-1 whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-medium [&_svg]:size-3", TONE[tone], className)} {...props} />
);

const STATE_STYLE: Record<ReadingState, { tone: keyof typeof TONE; icon: Icon }> = {
  not_started: { tone: "neutral", icon: ClockIcon },
  in_progress: { tone: "brand", icon: PlayIcon },
  finished: { tone: "success", icon: CheckCircleIcon },
};

export function StateBadge({ state, icon }: { state: ReadingState; icon?: boolean }) {
  const { tone, icon: I } = STATE_STYLE[state] ?? STATE_STYLE.not_started;
  return (
    <Badge tone={tone}>
      {icon && <I weight="bold" />}
      {STATE_LABEL[state] ?? "Unknown"}
    </Badge>
  );
}

const FIELD = "w-full rounded-xl border border-border bg-input px-3.5 py-2.5 text-sm text-foreground outline-none transition placeholder:text-muted-foreground/70 focus:border-brand-accent focus:ring-2 focus:ring-ring/25 disabled:opacity-60 dark:bg-input/60";
export const Input = ({ className, ...props }: ComponentProps<"input">) => <input className={cn(FIELD, "h-10 py-0", className)} {...props} />;
export const Textarea = ({ className, ...props }: ComponentProps<"textarea">) => <textarea className={cn(FIELD, "min-h-24 resize-y leading-relaxed", className)} {...props} />;
export const Select = ({ className, ...props }: ComponentProps<"select">) => <select className={cn(FIELD, "h-10 cursor-pointer py-0 pr-8", className)} {...props} />;

export function Field({ label, hint, error, className, children }: { label: string; hint?: ReactNode; error?: string; className?: string; children: ReactNode }) {
  return (
    <label className={cn("grid gap-1.5 text-sm", className)}>
      <span className="font-medium text-foreground">{label}</span>
      {children}
      {(error || hint) && <span className={cn("text-xs", error ? "text-status-error" : "text-muted-foreground")}>{error || hint}</span>}
    </label>
  );
}

export const Spinner = ({ className }: { className?: string }) => <CircleNotchIcon className={cn("size-6 animate-spin text-brand-accent", className)} weight="bold" />;

export function ProgressBar({ value, className }: { value: number; className?: string }) {
  return (
    <div className={cn("h-1.5 w-full overflow-hidden rounded-full bg-muted", className)} role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100}>
      <div className="h-full rounded-full bg-gradient-to-r from-brand-accent to-brand-primary transition-[width] duration-700 ease-out-soft" style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
    </div>
  );
}

/** Five stars; interactive when `onChange` is given. */
export function Stars({ value = 0, onChange, size = "sm", label = "Rating" }: { value?: number; onChange?: (rating: number) => void; size?: "sm" | "md"; label?: string }) {
  const [hover, setHover] = useState(0);
  const shown = hover || value;
  return (
    <div className="flex items-center gap-0.5" role={onChange ? "radiogroup" : "img"} aria-label={onChange ? label : `${value} out of 5 stars`} onMouseLeave={() => setHover(0)}>
      {[1, 2, 3, 4, 5].map((n) => {
        const star = <StarIcon weight={n <= shown ? "fill" : "regular"} className={cn(size === "md" ? "size-6" : "size-3.5", n <= shown ? "text-status-warning" : "text-muted-foreground/40", "transition-transform duration-150")} />;
        return onChange ? (
          <button key={n} type="button" role="radio" aria-checked={n === value} aria-label={`${n} star${n > 1 ? "s" : ""}`} className="rounded p-0.5 hover:scale-125" onMouseEnter={() => setHover(n)} onClick={() => onChange(n)}>
            {star}
          </button>
        ) : (
          <span key={n}>{star}</span>
        );
      })}
    </div>
  );
}

/** A book cover, or a typeset placeholder when there is none. */
export function Cover({ src, title, author, sizes = "96px", className }: { src?: string; title: string; author?: string; sizes?: string; className?: string }) {
  const [broken, setBroken] = useState(false);
  return (
    <div className={cn("relative aspect-[2/3] overflow-hidden rounded-lg bg-gradient-to-br from-brand-accent/25 via-secondary to-brand-primary/15 shadow-sm ring-1 ring-black/5", className)}>
      {src && !broken ? (
        <Image src={src.replace(/^http:\/\//, "https://")} alt={`${title} cover`} fill sizes={sizes} unoptimized className="object-cover" onError={() => setBroken(true)} />
      ) : (
        <div className="flex h-full flex-col items-center justify-center gap-1 p-2 text-center">
          <BookOpenIcon className="size-1/4 text-brand-primary/50" weight="duotone" />
          <span className="line-clamp-3 font-serif text-[0.7em] leading-tight text-brand-primary/80">{title}</span>
          {author && <span className="line-clamp-1 text-[0.55em] text-muted-foreground">{author}</span>}
        </div>
      )}
    </div>
  );
}

export function EmptyState({ icon: I, title, children, action, className }: { icon: Icon; title: string; children?: ReactNode; action?: ReactNode; className?: string }) {
  return (
    <div className={cn("flex flex-col items-center justify-center gap-3 px-6 py-12 text-center", className)}>
      <div className="grid size-12 place-items-center rounded-2xl bg-brand-primary/8 text-brand-accent">
        <I className="size-6" weight="duotone" />
      </div>
      <div className="space-y-1">
        <p className="font-serif text-lg text-foreground">{title}</p>
        {children && <p className="mx-auto max-w-sm text-sm text-muted-foreground">{children}</p>}
      </div>
      {action}
    </div>
  );
}

export function PageHeader({ title, subtitle, eyebrow, actions }: { title: ReactNode; subtitle?: ReactNode; eyebrow?: ReactNode; actions?: ReactNode }) {
  return (
    <header className="mb-8 flex flex-wrap items-end justify-between gap-4 animate-rise">
      <div className="space-y-1.5">
        {eyebrow && <p className="text-[13px] font-medium text-muted-foreground">{eyebrow}</p>}
        <h1 className="text-3xl tracking-tight text-foreground sm:text-4xl">{title}</h1>
        {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
      </div>
      {actions}
    </header>
  );
}

export function Segmented<T extends string>({ options, value, onChange, label }: { options: { value: T; label: ReactNode }[]; value: T; onChange: (v: T) => void; label: string }) {
  return (
    <div role="tablist" aria-label={label} className="inline-flex rounded-xl border border-border bg-muted p-1">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          role="tab"
          aria-selected={o.value === value}
          onClick={() => onChange(o.value)}
          className={cn(
            "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-all duration-200 [&_svg]:size-4",
            o.value === value ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground",
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export function Dialog({ open, onOpenChange, title, description, children, className }: { open: boolean; onOpenChange: (open: boolean) => void; title: ReactNode; description?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <RadixDialog.Root open={open} onOpenChange={onOpenChange}>
      <RadixDialog.Portal>
        <RadixDialog.Overlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px] data-[state=open]:animate-fade" />
        <RadixDialog.Content
          className={cn(
            "fixed left-1/2 top-1/2 z-50 max-h-[90dvh] w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl border border-border bg-popover p-6 shadow-2xl outline-none data-[state=open]:animate-settle",
            className,
          )}
        >
          <RadixDialog.Title className="pr-8 font-serif text-xl text-foreground">{title}</RadixDialog.Title>
          {description ? <RadixDialog.Description className="mt-1 text-sm text-muted-foreground">{description}</RadixDialog.Description> : <RadixDialog.Description className="sr-only">{title}</RadixDialog.Description>}
          <div className="mt-5">{children}</div>
          <RadixDialog.Close className={buttonClass("ghost", "icon", "absolute right-4 top-4")} aria-label="Close">
            <XIcon />
          </RadixDialog.Close>
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
}
