"use client";

import { BookOpenIcon, CalendarBlankIcon, CaretLeftIcon, CaretRightIcon, ChatCircleIcon, CheckCircleIcon, FunnelIcon, GearIcon, PenNibIcon, StarIcon, TrashIcon, XIcon, type Icon } from "@phosphor-icons/react";
import { endOfDay, format, formatDistanceToNow, parseISO, startOfDay } from "date-fns";
import { Suspense, useMemo, useState, useSyncExternalStore } from "react";
import { Button, Card, cn, EmptyState, Field, Input, PageHeader, Select } from "@/components/ui";
import { STATE_LABEL } from "@/lib/domain";
import { useLibrary } from "@/lib/store";
import type { Book, BookEvent, EventType } from "@/lib/types";
import { useSearchState } from "@/lib/use-search-state";

const TYPES: [EventType, string, Icon, string][] = [
  ["state_change", "Status changes", CheckCircleIcon, "text-status-info bg-status-info/10"],
  ["progress_update", "Progress updates", BookOpenIcon, "text-brand-primary bg-brand-primary/10"],
  ["rating_added", "Ratings", StarIcon, "text-status-warning bg-status-warning/15"],
  ["comment", "Comments", ChatCircleIcon, "text-brand-accent bg-brand-accent/15"],
  ["review", "Reviews", PenNibIcon, "text-brand-secondary bg-brand-secondary/10"],
  ["manual_update", "Manual updates", GearIcon, "text-muted-foreground bg-muted"],
  ["delete_book", "Deleted books", TrashIcon, "text-status-error bg-status-error/10"],
];
const STYLE = Object.fromEntries(TYPES.map(([t, , icon, tone]) => [t, { icon, tone }]));

function title(e: BookEvent) {
  const { previousState, newState, previousPage, newPage, rating } = e.data;
  switch (e.type) {
    case "state_change":
      return newState === "finished" ? "Finished reading" : newState === "in_progress" && previousState === "not_started" ? "Started reading" : newState === "not_started" && !previousState ? "Added to library" : "Status changed";
    case "progress_update": {
      const read = newPage ? newPage - (previousPage || 0) : 0;
      return read > 0 ? `Read ${read} page${read === 1 ? "" : "s"}` : "Updated progress";
    }
    case "rating_added": return `Rated ${rating || 0} star${rating === 1 ? "" : "s"}`;
    case "comment": return "Added a comment";
    case "review": return e.data.reviewUpdatedAt && e.data.reviewCreatedAt && e.data.reviewUpdatedAt.toMillis() > e.data.reviewCreatedAt.toMillis() ? "Updated a review" : "Added a review";
    case "manual_update": return "Manual book update";
    case "delete_book": return "Deleted book from library";
  }
}

function details(e: BookEvent, book?: Book): [string, string][] {
  const d = e.data;
  switch (e.type) {
    case "state_change": return d.previousState && d.newState ? [["Status", `${STATE_LABEL[d.previousState]} → ${STATE_LABEL[d.newState]}`]] : [];
    case "progress_update": {
      const delta = d.previousPage && d.newPage ? d.newPage - d.previousPage : 0;
      return [["Progress", `${d.newPage || 0} / ${book?.progress.totalPages || "?"} pages`], ...(delta ? [["Pages read", `${delta > 0 ? "+" : ""}${delta} pages`] as [string, string]] : [])];
    }
    case "rating_added": return [["Rating", `${d.rating || 0} out of 5 stars`]];
    case "comment": return d.comment ? [["Comment", d.comment]] : [];
    case "review": return d.review ? [["Review", d.review]] : [];
    case "manual_update": return d.comment ? [["Details", d.comment]] : [];
    case "delete_book": return [["Book", d.deletedBookTitle], ["Author", d.deletedBookAuthor]].filter((x): x is [string, string] => !!x[1]);
  }
}

/** Page numbers with -1 marking a gap, e.g. 1 … 4 5 6 … 12. */
function pageList(current: number, total: number): number[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const middle = [current - 1, current, current + 1].filter((p) => p > 1 && p < total);
  return [1, ...(middle[0] > 2 ? [-1] : []), ...middle, ...(middle.at(-1)! < total - 1 ? [-1] : []), total];
}

const SIZE_KEY = "activity-history-page-size";
const noop = () => () => {};
const DEFAULTS = { eventType: "all", bookId: "all", startDate: "", endDate: "" };

function ActivityHistory() {
  const { events, books, ready } = useLibrary();
  const [f, set] = useSearchState(DEFAULTS);
  const [page, setPage] = useState(1);
  const stored = Number(useSyncExternalStore(noop, () => localStorage.getItem(SIZE_KEY), () => null));
  const [chosen, setSize] = useState<number>();
  const size = chosen ?? ([10, 25, 50, 100].includes(stored) ? stored : 25);

  const byId = useMemo(() => new Map(books.map((b) => [b.id, b])), [books]);
  const filtered = useMemo(() => {
    const from = f.startDate ? startOfDay(parseISO(f.startDate)).getTime() : -Infinity;
    const to = f.endDate ? endOfDay(parseISO(f.endDate)).getTime() : Infinity;
    return events.filter((e) => (f.eventType === "all" || e.type === f.eventType) && (f.bookId === "all" || e.bookId === f.bookId) && e.timestamp.toMillis() >= from && e.timestamp.toMillis() <= to);
  }, [events, f.eventType, f.bookId, f.startDate, f.endDate]);
  const pages = Math.max(1, Math.ceil(filtered.length / size));
  const current = Math.min(page, pages);
  const shown = filtered.slice((current - 1) * size, current * size);
  const filtering = Object.entries(f).some(([k, v]) => v !== DEFAULTS[k as keyof typeof DEFAULTS]);
  const filter = (u: Partial<typeof DEFAULTS>) => (set(u), setPage(1));
  const go = (p: number) => (setPage(p), window.scrollTo({ top: 0, behavior: "smooth" }));

  return (
    <>
      <PageHeader title="Activity History" subtitle="Every step of your reading journey, in order." />
      <div className="grid gap-6 lg:grid-cols-4">
        <Card className="h-fit space-y-4 p-5 animate-rise lg:sticky lg:top-24" style={{ "--i": 1 } as React.CSSProperties}>
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-lg"><FunnelIcon className="size-5 text-brand-accent" weight="duotone" /> Filters</h2>
            {filtering && <Button size="sm" variant="ghost" onClick={() => filter(DEFAULTS)}>Clear <XIcon /></Button>}
          </div>
          <Field label="Event type">
            <Select aria-label="Filter by event type" value={f.eventType} onChange={(e) => filter({ eventType: e.target.value })}>
              <option value="all">All events</option>
              {TYPES.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
            </Select>
          </Field>
          <Field label="Book">
            <Select aria-label="Filter by book" value={f.bookId} onChange={(e) => filter({ bookId: e.target.value })}>
              <option value="all">All books</option>
              {books.map((b) => <option key={b.id} value={b.id}>{b.title}</option>)}
            </Select>
          </Field>
          <Field label="From"><Input type="date" value={f.startDate} max={f.endDate || undefined} onChange={(e) => filter({ startDate: e.target.value })} /></Field>
          <Field label="To"><Input type="date" value={f.endDate} min={f.startDate || undefined} onChange={(e) => filter({ endDate: e.target.value })} /></Field>
          <p className="border-t border-border pt-4 text-sm text-muted-foreground">
            Showing <span className="font-medium text-foreground">{filtered.length}</span> event{filtered.length === 1 ? "" : "s"}
          </p>
        </Card>
        <Card className="lg:col-span-3 animate-rise" style={{ "--i": 2 } as React.CSSProperties}>
          {!ready ? (
            <div className="space-y-3 p-5">{[0, 1, 2, 3].map((i) => <div key={i} className="skeleton h-20" />)}</div>
          ) : filtered.length === 0 ? (
            <EmptyState icon={CalendarBlankIcon} title="No activity found">
              {events.length ? "Try adjusting your filters to see more results." : "No reading activity recorded yet. Start reading to see your history!"}
            </EmptyState>
          ) : (
            <>
              <ol className="divide-y divide-border/60">
                {shown.map((e, i) => {
                  const { icon: I, tone } = STYLE[e.type] ?? STYLE.manual_update;
                  const at = e.timestamp.toDate();
                  return (
                    <li key={e.id} className="flex gap-4 p-5 transition-colors hover:bg-muted/30 animate-rise" style={{ "--i": Math.min(i, 10) } as React.CSSProperties}>
                      <span className={cn("grid size-10 shrink-0 place-items-center rounded-xl", tone)}><I className="size-5" weight="duotone" /></span>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                          <h3 className="font-serif text-base font-semibold">{title(e)}</h3>
                          <time dateTime={at.toISOString()} title={format(at, "MMM d, yyyy 'at' h:mm a")} className="text-xs text-muted-foreground">{formatDistanceToNow(at, { addSuffix: true })}</time>
                        </div>
                        <p className="truncate text-sm text-muted-foreground">{byId.get(e.bookId)?.title ?? e.data.deletedBookTitle ?? "Unknown book"}</p>
                        {details(e, byId.get(e.bookId)).map(([label, value]) => (
                          <p key={label} className="mt-1.5 text-sm"><span className="text-muted-foreground">{label}: </span><span className="whitespace-pre-wrap">{value}</span></p>
                        ))}
                      </div>
                    </li>
                  );
                })}
              </ol>
              <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-border px-5 py-4 text-sm">
                <span className="text-muted-foreground">{(current - 1) * size + 1}–{Math.min(current * size, filtered.length)} of {filtered.length}</span>
                {pages > 1 && (
                  <nav className="flex items-center gap-1" aria-label="Pagination">
                    <Button size="icon" variant="ghost" aria-label="Previous page" disabled={current === 1} onClick={() => go(current - 1)}><CaretLeftIcon /></Button>
                    {pageList(current, pages).map((p, i) => p < 0 ? <span key={`gap${i}`} className="px-1 text-muted-foreground">…</span> : (
                      <Button key={p} size="icon" variant={p === current ? "soft" : "ghost"} aria-current={p === current ? "page" : undefined} onClick={() => go(p)}>{p}</Button>
                    ))}
                    <Button size="icon" variant="ghost" aria-label="Next page" disabled={current === pages} onClick={() => go(current + 1)}><CaretRightIcon /></Button>
                  </nav>
                )}
                <Select aria-label="Events per page" value={size} className="h-8 w-auto text-xs" onChange={(e) => (setSize(+e.target.value), setPage(1), globalThis.localStorage?.setItem(SIZE_KEY, e.target.value))}>
                  {[10, 25, 50, 100].map((n) => <option key={n} value={n}>{n} per page</option>)}
                </Select>
              </footer>
            </>
          )}
        </Card>
      </div>
    </>
  );
}

export default function ActivityHistoryPage() {
  return (
    <Suspense>
      <ActivityHistory />
    </Suspense>
  );
}
