"use client";

import { BookOpenIcon, BuildingsIcon, CalendarIcon, CheckIcon, PlusIcon, StarIcon } from "@phosphor-icons/react";
import { coverOf, formatAuthors, plainText, type GoogleVolume } from "@/lib/books-api";
import { Badge, Button, cn, Cover } from "./ui";

export const year = (date?: string) => date?.slice(0, 4);

export function AddButton({ added, adding, onAdd, className }: { added: boolean; adding: boolean; onAdd: () => void; className?: string }) {
  return (
    <Button className={className} busy={adding} disabled={added} variant={added ? "soft" : "primary"} onClick={(e) => (e.stopPropagation(), onAdd())}>
      {added ? <><CheckIcon weight="bold" /> Added</> : adding ? "Adding…" : <><PlusIcon weight="bold" /> Add to library</>}
    </Button>
  );
}

export function VolumeCard({ volume, index = 0, onPreview, ...add }: { volume: GoogleVolume; index?: number; onPreview?: () => void; added: boolean; adding: boolean; onAdd: () => void }) {
  const info = volume.volumeInfo;
  const facts = [[CalendarIcon, year(info.publishedDate)], [BookOpenIcon, info.pageCount && `${info.pageCount}p`], [BuildingsIcon, info.publisher]] as const;
  return (
    <article
      onClick={onPreview}
      style={{ "--i": Math.min(index, 10) } as React.CSSProperties}
      className={cn("flex gap-4 rounded-2xl border border-border/60 bg-card p-4 animate-rise", onPreview && "cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-accent/40 hover:shadow-soft")}
    >
      <Cover src={coverOf(volume)} title={info.title} author={formatAuthors(info.authors)} className="w-24 shrink-0 self-start text-xs sm:w-28" sizes="112px" />
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div>
          <h3 className="line-clamp-2 font-serif text-base font-semibold leading-snug">{info.title}</h3>
          <p className="text-sm text-muted-foreground">{formatAuthors(info.authors)}</p>
        </div>
        <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
          {facts.filter(([, v]) => v).map(([I, v]) => <span key={String(v)} className="flex max-w-40 items-center gap-1 truncate"><I className="size-3 shrink-0" /> {v}</span>)}
          {info.averageRating && <span className="flex items-center gap-1"><StarIcon weight="fill" className="size-3 text-status-warning" /> {info.averageRating}</span>}
        </div>
        {info.categories && <div className="flex flex-wrap gap-1">{info.categories.slice(0, 2).map((c) => <Badge key={c}>{c}</Badge>)}</div>}
        {info.description && <p className="hidden text-sm text-muted-foreground sm:line-clamp-2">{plainText(info.description)}</p>}
        <AddButton {...add} className="mt-auto w-full sm:w-fit" />
      </div>
    </article>
  );
}
