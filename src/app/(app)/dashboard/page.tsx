"use client";

import { ArrowRightIcon, BookOpenIcon, BooksIcon, CaretDownIcon, FlameIcon, SparkleIcon, StarIcon, TrendUpIcon, type Icon } from "@phosphor-icons/react";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { BookCard } from "@/components/book-card";
import { buttonClass, Card, CardHeader, cn, EmptyState, PageHeader, Spinner } from "@/components/ui";
import { recentActivity, timeAgo } from "@/lib/insights";
import { watchMessage } from "@/lib/library";
import { useLibrary, useStats } from "@/lib/store";
import type { Activity, PersonalizedMessage } from "@/lib/types";

const greeting = (hour = new Date().getHours()) => (hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening");

export default function Dashboard() {
  const { profile, books, events, ready } = useLibrary();
  const stats = useStats();
  if (!ready) return <div className="grid min-h-[50vh] place-items-center"><Spinner className="size-8" /></div>;

  const reading = books.filter((b) => b.state === "in_progress");
  const finished = books
    .filter((b) => b.state === "finished")
    .sort((a, b) => (b.finishedAt?.toMillis() ?? 0) - (a.finishedAt?.toMillis() ?? 0));
  const ribbon: [Icon, number | string, string][] = [
    [BooksIcon, stats.booksInLibrary, "In library"],
    [BookOpenIcon, stats.currentlyReading, "Reading"],
    [TrendUpIcon, stats.booksReadThisYear, "This year"],
    [FlameIcon, stats.readingStreak, "Day streak"],
    [BookOpenIcon, stats.totalPagesRead.toLocaleString(), "Pages read"],
    ...(stats.averageRating > 0 ? [[StarIcon, stats.averageRating.toFixed(1), "Avg rating"] as [Icon, string, string]] : []),
  ];

  return (
    <>
      <PageHeader
        eyebrow={new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
        title={`${greeting()}, ${profile?.displayName?.split(" ")[0] || "Reader"}`}
      />
      <Card role="group" aria-label="Reading stats" className="mb-6 flex flex-wrap gap-x-8 gap-y-4 px-5 py-4 animate-rise" style={{ "--i": 1 } as React.CSSProperties}>
        {ribbon.map(([I, value, label]) => (
          <div key={label} className="flex items-center gap-2.5">
            <span className="grid size-8 place-items-center rounded-lg bg-brand-primary/8 text-brand-primary">
              <I className="size-4" weight={label === "Day streak" && stats.readingStreak > 0 ? "fill" : "regular"} />
            </span>
            <span className="leading-none">
              <span className="block text-base font-semibold tabular-nums text-foreground">{value}</span>
              <span className="text-[11px] text-muted-foreground">{label}</span>
            </span>
          </div>
        ))}
      </Card>

      {profile && <Companion />}

      <div className="mb-6 grid gap-6 lg:grid-cols-3">
        <BookShelf title="Currently Reading" books={reading.slice(0, 4)} href="/library?filter=in_progress" empty="No books in progress. Add a book to start tracking your reading!" className="lg:col-span-2" grid="md:grid-cols-2" />
        <RecentActivity items={recentActivity(events, books, reading.length <= 2 ? 5 : 7)} />
      </div>
      <BookShelf title="Recently Read" books={finished.slice(0, 6)} href="/library?filter=finished" empty="No books finished yet. Start reading to see your completed books here!" grid="md:grid-cols-2 xl:grid-cols-3" />
    </>
  );
}

function BookShelf({ title, books, href, empty, grid, className }: { title: string; books: ReturnType<typeof useLibrary>["books"]; href: string; empty: string; grid: string; className?: string }) {
  return (
    <Card role="region" aria-label={title} className={cn("animate-rise", className)} style={{ "--i": 3 } as React.CSSProperties}>
      <CardHeader
        title={title}
        action={books.length > 0 && <Link href={href} className={buttonClass("ghost", "sm")}>View all <ArrowRightIcon /></Link>}
      />
      {books.length ? (
        <div className={cn("grid gap-4 px-5 pb-5", grid)}>{books.map((b, i) => <BookCard key={b.id} book={b} index={i} />)}</div>
      ) : (
        <EmptyState icon={BookOpenIcon} title="Nothing here yet">{empty}</EmptyState>
      )}
    </Card>
  );
}

const DOT: Record<Activity["type"], string> = {
  finished: "bg-status-success", started: "bg-brand-primary", added: "bg-brand-accent", progress: "bg-status-info",
  rated: "bg-status-warning", commented: "bg-brand-secondary", manually_updated: "bg-status-warning", deleted: "bg-status-error",
};

function describe(a: Activity) {
  const title = <span className="font-medium">{a.bookTitle}</span>;
  const pages = Number.parseInt(a.details ?? "");
  switch (a.type) {
    case "finished": return <>Finished {title}</>;
    case "started": return <>Started {title}</>;
    case "added": return <>Added {title}</>;
    case "rated": return <>Rated {title} {a.details?.replace(/^1 stars$/, "1 star")}</>;
    case "commented": return <>Commented on {title}</>;
    case "progress": return Number.isNaN(pages) ? <>Updated progress in {title}</> : <>{pages > 0 ? `Read ${pages}` : `Went back ${-pages}`} page{Math.abs(pages) === 1 ? "" : "s"} in {title}</>;
    default: return title;
  }
}

function RecentActivity({ items }: { items: Activity[] }) {
  return (
    <Card role="region" aria-label="Recent Activity" className="flex flex-col animate-rise" style={{ "--i": 4 } as React.CSSProperties}>
      <CardHeader title="Recent Activity" />
      {items.length ? (
        <>
          <ol className="flex-1 space-y-3.5 px-5">
            {items.map((a, i) => (
              <li key={a.id} className="flex gap-3 animate-rise" style={{ "--i": i + 4 } as React.CSSProperties}>
                <span className={cn("mt-1.5 size-2 shrink-0 rounded-full", DOT[a.type])} />
                <div className="min-w-0">
                  <p className="text-sm leading-snug text-foreground">{describe(a)}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{timeAgo(a.timestamp)}</p>
                </div>
              </li>
            ))}
          </ol>
          <Link href="/activity-history" className={buttonClass("ghost", "sm", "m-3 mt-4")}>View all activity <ArrowRightIcon /></Link>
        </>
      ) : (
        <EmptyState icon={TrendUpIcon} title="No recent activity" className="flex-1" />
      )}
    </Card>
  );
}

/** The daily AI reading companion: generated once a day, shown live from Firestore. */
function Companion() {
  const { user, profile, books, events, actions } = useLibrary();
  const stats = useStats();
  const [message, setMessage] = useState<PersonalizedMessage | null | undefined>(undefined);
  const [open, setOpen] = useState(false);
  const requested = useRef(false);
  const input = useMemo(
    () => ({
      totalBooks: stats.booksInLibrary, finishedBooks: stats.booksReadThisYear, totalPagesRead: stats.totalPagesRead,
      currentlyReading: stats.currentlyReading, readingStreak: stats.readingStreak,
    }),
    [stats],
  );

  useEffect(() => (user ? watchMessage(user.uid, setMessage) : undefined), [user]);
  useEffect(() => {
    if (requested.current || !profile) return;
    requested.current = true;
    actions.dailyMessage({ profile, books, stats: input, activity: recentActivity(events, books, 6) }).catch(() => undefined);
  }, [profile, books, events, input, actions]);

  const thinking = !message;
  return (
    <section className="relative mb-6 overflow-hidden rounded-2xl border border-brand-primary/20 bg-gradient-to-br from-brand-primary/[0.04] via-card to-brand-accent/[0.07] shadow-soft animate-rise" style={{ "--i": 2 } as React.CSSProperties}>
      <div className="pointer-events-none absolute -right-16 -top-20 size-48 rounded-full bg-brand-accent/15 blur-3xl" />
      <button onClick={() => setOpen((o) => !o)} aria-expanded={open} className="relative flex w-full items-center gap-4 p-5 text-left md:pointer-events-none">
        <span className="relative grid size-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand-primary to-brand-secondary text-white shadow-md">
          <SparkleIcon className="size-5" weight="fill" />
          {thinking && <span className="absolute inset-0 animate-ping rounded-xl border-2 border-brand-accent/60" />}
        </span>
        <span className="flex-1">
          <span className="flex items-center gap-2 font-serif text-lg text-brand-primary">
            Librarium AI <span className="rounded-full border border-brand-primary/20 bg-brand-primary/10 px-2 py-0.5 font-sans text-[10px] font-medium">Reading companion</span>
          </span>
          <span className="text-xs text-muted-foreground md:hidden">{thinking ? "Thinking…" : open ? "Tap to hide" : "Tap to read today's note"}</span>
        </span>
        <CaretDownIcon className={cn("size-4 text-brand-primary transition-transform duration-300 md:hidden", open && "rotate-180")} />
      </button>
      <div className={cn("relative grid transition-[grid-template-rows] duration-300 ease-out-soft md:grid-rows-[1fr]", open ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
        <div className="overflow-hidden">
          <div className="px-5 pb-5 md:pl-20">
            {thinking ? (
              <div className="space-y-2.5">
                <div className="skeleton h-4 w-full" />
                <div className="skeleton h-4 w-5/6" />
                <div className="skeleton h-4 w-2/3" />
              </div>
            ) : (
              <blockquote className="text-[15px] leading-relaxed text-foreground/90 animate-fade">{message?.content}</blockquote>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
