"use client";

import Link from "next/link";
import { progressPercent } from "@/lib/domain";
import type { Book } from "@/lib/types";
import { Badge, cn, Cover, ProgressBar, Stars, StateBadge } from "./ui";

function Progress({ book }: { book: Book }) {
  const { currentPage, totalPages } = book.progress;
  if (book.state !== "in_progress" || !currentPage || !totalPages) return null;
  const pct = progressPercent(book);
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-[11px]">
        <span className="text-muted-foreground">
          {currentPage} / {totalPages} pages
        </span>
        <span className="font-semibold text-brand-primary">{pct}%</span>
      </div>
      <ProgressBar value={pct} />
    </div>
  );
}

const hover = "transition-all duration-300 ease-out-soft hover:-translate-y-0.5 hover:border-brand-accent/40 hover:shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

export function BookCard({ book, index = 0 }: { book: Book; index?: number }) {
  return (
    <Link
      href={`/books/${book.id}`}
      aria-label={`View details for ${book.title} by ${book.author}`}
      style={{ "--i": index } as React.CSSProperties}
      className={cn("group flex h-44 gap-4 rounded-2xl border border-border/60 bg-card p-3.5 animate-rise", hover)}
    >
      <Cover src={book.coverImage} title={book.title} author={book.author} className="h-full w-auto shrink-0 text-xs transition-transform duration-500 group-hover:scale-[1.03]" />
      <div className="flex min-w-0 flex-1 flex-col">
        <h3 className="line-clamp-2 font-serif text-[15px] font-semibold leading-snug text-foreground transition-colors group-hover:text-brand-primary">{book.title}</h3>
        <p className="mt-0.5 line-clamp-1 text-[13px] text-muted-foreground">by {book.author}</p>
        <div className="my-2.5 flex flex-wrap gap-1.5">
          <Badge>{book.genre || "Unknown"}</Badge>
          <StateBadge state={book.state} />
        </div>
        <div className="mt-auto">
          <Progress book={book} />
          {book.state === "finished" && !!book.rating && <Stars value={book.rating} />}
        </div>
      </div>
    </Link>
  );
}

export function BookRow({ book, index = 0 }: { book: Book; index?: number }) {
  return (
    <Link
      href={`/books/${book.id}`}
      style={{ "--i": index } as React.CSSProperties}
      className={cn("group flex items-center gap-4 rounded-2xl border border-border/60 bg-card p-3 animate-rise", hover)}
    >
      <Cover src={book.coverImage} title={book.title} className="w-12 shrink-0 text-[8px]" sizes="48px" />
      <div className="grid min-w-0 flex-1 items-center gap-x-6 gap-y-2 sm:grid-cols-[minmax(0,2.5fr)_repeat(3,minmax(0,1fr))]">
        <div className="min-w-0">
          <h3 className="truncate font-serif text-base font-semibold text-foreground group-hover:text-brand-primary">{book.title}</h3>
          <p className="truncate text-sm text-muted-foreground">{book.author}</p>
          <div className="mt-2 max-w-64">
            <Progress book={book} />
          </div>
        </div>
        <span className="hidden text-sm text-muted-foreground sm:block">{book.progress.totalPages || "?"} pages</span>
        <div className="flex flex-wrap gap-1.5 sm:contents">
          <span><Badge tone="outline">{book.isOwned ? "Owned" : "Wishlist"}</Badge></span>
          <span className="flex items-center gap-2">
            <StateBadge state={book.state} />
            {book.state === "finished" && !!book.rating && <Stars value={book.rating} />}
          </span>
        </div>
      </div>
    </Link>
  );
}
