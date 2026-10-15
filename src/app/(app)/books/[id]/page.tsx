"use client";

import {
  ArrowLeftIcon, BookOpenIcon, CalendarIcon, CaretDownIcon, ChatCircleIcon, CheckCircleIcon, FileTextIcon, HashIcon,
  PencilSimpleIcon, PlayIcon, TagIcon, TrendUpIcon,
} from "@phosphor-icons/react";
import { formatDistanceToNow } from "date-fns";
import { useParams, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { EditBookDialog } from "@/components/edit-book";
import { attempt } from "@/components/toast";
import { Badge, Button, Card, CardHeader, cn, Cover, Dialog, EmptyState, Field, Input, ProgressBar, Spinner, Stars, StateBadge, Textarea } from "@/components/ui";
import { plainText } from "@/lib/books-api";
import { commentsFor, isValidComment, isValidReview, progressPercent, reviewFor, STATE_LABEL } from "@/lib/domain";
import { useLibrary } from "@/lib/store";
import type { Timestamp } from "firebase/firestore";
import type { Book, BookComment, BookEvent, BookReview } from "@/lib/types";

const stagger = (i: number) => ({ "--i": i }) as React.CSSProperties;

export default function BookPage() {
  const { id } = useParams<{ id: string }>();
  const { books, events, ready } = useLibrary();
  const router = useRouter();
  const book = books.find((b) => b.id === id);
  const comments = useMemo(() => commentsFor(events, id), [events, id]);
  const review = useMemo(() => reviewFor(events, id), [events, id]);
  const [editing, setEditing] = useState(false);
  const [reviewing, setReviewing] = useState(false);

  if (!ready) return <div className="grid min-h-[50vh] place-items-center"><Spinner className="size-8" /></div>;
  if (!book)
    return (
      <EmptyState icon={BookOpenIcon} title="Book not found" action={<Button variant="outline" onClick={() => router.push("/library")}><ArrowLeftIcon /> Back to library</Button>}>
        The book you&apos;re looking for doesn&apos;t exist or you don&apos;t have access to it.
      </EmptyState>
    );

  return (
    <>
      <Button variant="ghost" size="sm" onClick={() => router.back()} className="mb-6 -ml-2">
        <ArrowLeftIcon /> Back
      </Button>
      <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
        <div className="space-y-6">
          <CoverPanel book={book} hasReview={!!review} onEdit={() => setEditing(true)} onReview={() => setReviewing(true)} />
          <Timeline book={book} events={events} />
        </div>
        <div className="space-y-6 lg:col-span-2">
          <BookInfo book={book} />
          {book.state === "in_progress" && <ProgressTracker key={book.progress.currentPage} book={book} />}
          {review && <ReviewCard review={review} onEdit={() => setReviewing(true)} />}
          <Comments book={book} comments={comments} />
        </div>
      </div>
      <EditBookDialog key={`${book.id}-${book.updatedAt?.toMillis()}`} book={book} open={editing} onOpenChange={setEditing} onDeleted={() => router.push("/library")} />
      <ReviewDialog key={review?.id ?? "new"} book={book} review={review} open={reviewing} onOpenChange={setReviewing} />
    </>
  );
}

function CoverPanel({ book, hasReview, onEdit, onReview }: { book: Book; hasReview: boolean; onEdit: () => void; onReview: () => void }) {
  const { actions } = useLibrary();
  const [busy, setBusy] = useState(false);
  const run = async (action: Promise<unknown>, done: string) => {
    setBusy(true);
    await attempt(action, done);
    setBusy(false);
  };
  const pct = progressPercent(book);
  return (
    <Card className="p-5 animate-rise">
      <Cover src={book.coverImage} title={book.title} author={book.author} sizes="(max-width: 1024px) 60vw, 25vw" className="mx-auto mb-5 w-full max-w-44 text-lg shadow-soft sm:max-w-64" />
      <div className="mb-4 flex flex-wrap gap-2">
        <StateBadge state={book.state} icon />
        <Badge tone="outline">{book.isOwned ? "Owned" : "Wishlist"}</Badge>
      </div>
      {book.state === "in_progress" && (
        <div className="mb-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium">{pct}% complete</span>
            <span className="text-xs text-muted-foreground">{book.progress.currentPage || 0} / {book.progress.totalPages || "?"} pages</span>
          </div>
          <ProgressBar value={pct} />
        </div>
      )}
      {book.state === "finished" && (
        <div className="mb-4 space-y-1.5">
          <p className="text-sm font-medium">Your rating</p>
          <Stars size="md" value={book.rating} label="Your rating" onChange={(r) => attempt(actions.rateBook(book.id, r), `Rated ${r} star${r > 1 ? "s" : ""}`)} />
        </div>
      )}
      <div className="grid gap-2">
        {book.state === "not_started" && <Button busy={busy} onClick={() => run(actions.startReading(book.id), "Happy reading!")}><PlayIcon weight="fill" /> Start reading</Button>}
        {book.state === "in_progress" && <Button busy={busy} onClick={() => run(actions.changeState(book.id, "finished"), "Marked as finished")}><CheckCircleIcon /> Mark as finished</Button>}
        {book.state === "finished" && !hasReview && <Button variant="soft" onClick={onReview}><FileTextIcon /> Add review</Button>}
        <Button variant="outline" onClick={onEdit}><PencilSimpleIcon /> Edit book</Button>
      </div>
    </Card>
  );
}

/** Dates come from the book; books from before startedAt was recorded fall back to their history. */
function Timeline({ book, events }: { book: Book; events: BookEvent[] }) {
  const changed = (to: string) => events.filter((e) => e.bookId === book.id && e.type === "state_change" && e.data.newState === to);
  const steps = [
    ["Added to library", book.addedAt, "bg-brand-accent"],
    ["Started reading", book.state !== "not_started" && (book.startedAt ?? changed("in_progress").at(-1)?.timestamp), "bg-status-info"],
    ["Finished reading", book.state === "finished" && (book.finishedAt ?? changed("finished")[0]?.timestamp), "bg-status-success"],
  ] as const;
  return (
    <Card className="animate-rise" style={stagger(1)}>
      <CardHeader title="Reading timeline" />
      <ol className="relative mx-5 mb-5 space-y-4 border-l border-border pl-5">
        {steps.filter(([, at]) => at).map(([label, at, dot]) => (
          <li key={label} className="relative">
            <span className={cn("absolute -left-[25px] top-1.5 size-2.5 rounded-full ring-4 ring-card", dot)} />
            <p className="text-sm font-medium">{label}</p>
            <p className="text-xs text-muted-foreground">{(at as Timestamp).toDate().toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}</p>
          </li>
        ))}
      </ol>
    </Card>
  );
}

function BookInfo({ book }: { book: Book }) {
  const [expanded, setExpanded] = useState(false);
  const description = plainText(book.description);
  const meta = [
    [CalendarIcon, "Published", book.publishedDate],
    [HashIcon, "ISBN", book.isbn],
    [BookOpenIcon, "Pages", book.progress.totalPages || undefined],
    [TagIcon, "Genre", book.genre],
  ] as const;
  return (
    <Card className="p-6 animate-rise" style={stagger(1)}>
      <h1 className="text-3xl leading-tight tracking-tight">{book.title}</h1>
      <p className="mt-1 text-lg text-muted-foreground">by {book.author}</p>
      <dl className="mt-5 grid gap-3 sm:grid-cols-2">
        {meta.filter(([, , v]) => v).map(([I, label, value]) => (
          <div key={label} className="flex items-center gap-2 text-sm">
            <I className="size-4 text-muted-foreground" />
            <dt className="font-medium">{label}:</dt>
            <dd className="text-muted-foreground">{value}</dd>
          </div>
        ))}
      </dl>
      {description && (
        <div className="mt-6 border-t border-border pt-5">
          <h2 className="mb-2 text-lg">Description</h2>
          <p className={cn("whitespace-pre-line text-sm leading-relaxed text-muted-foreground", !expanded && "line-clamp-4")}>{description}</p>
          {description.length > 280 && (
            <button onClick={() => setExpanded((e) => !e)} className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-brand-primary hover:underline">
              <CaretDownIcon className={cn("size-4 transition-transform", expanded && "rotate-180")} /> {expanded ? "Read less" : "Read more"}
            </button>
          )}
        </div>
      )}
    </Card>
  );
}

function ProgressTracker({ book }: { book: Book }) {
  const { actions } = useLibrary();
  const [page, setPage] = useState(String(book.progress.currentPage ?? ""));
  const [busy, setBusy] = useState(false);
  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    await attempt(actions.updateProgress(book.id, parseInt(page) || 0), "Progress saved");
    setBusy(false);
  };
  return (
    <Card className="animate-rise" style={stagger(2)}>
      <CardHeader icon={TrendUpIcon} title="Update progress" />
      <form onSubmit={save} className="space-y-4 px-5 pb-5">
        <div className="flex flex-wrap items-end gap-3">
          <Field label="Current page" className="flex-1">
            <Input type="number" inputMode="numeric" min={0} max={book.progress.totalPages || undefined} value={page} onChange={(e) => setPage(e.target.value)} />
          </Field>
          <Field label="Total pages" className="flex-1">
            <Input value={book.progress.totalPages || ""} disabled />
          </Field>
          <Button type="submit" busy={busy}>Update</Button>
        </div>
        <ProgressBar value={progressPercent(book)} className="h-2" />
      </form>
    </Card>
  );
}

const longDate = (t: BookReview["createdAt"]) => t.toDate().toLocaleString(undefined, { dateStyle: "long", timeStyle: "short" });

function ReviewCard({ review, onEdit }: { review: BookReview; onEdit: () => void }) {
  return (
    <Card className="animate-rise" style={stagger(3)}>
      <CardHeader icon={FileTextIcon} title="Your review" action={<Button size="sm" variant="outline" onClick={onEdit}><PencilSimpleIcon /> Edit</Button>} />
      <div className="space-y-4 px-5 pb-5">
        <p className="whitespace-pre-wrap font-serif text-[17px] leading-relaxed text-foreground">{review.text}</p>
        <p className="border-t border-border pt-3 text-xs text-muted-foreground">
          Written {longDate(review.createdAt)}
          {review.updatedAt.toMillis() > review.createdAt.toMillis() && ` · Updated ${longDate(review.updatedAt)}`}
        </p>
      </div>
    </Card>
  );
}

function ReviewDialog({ book, review, open, onOpenChange }: { book: Book; review: BookReview | null; open: boolean; onOpenChange: (o: boolean) => void }) {
  const { actions } = useLibrary();
  const [text, setText] = useState(review?.text ?? "");
  const [busy, setBusy] = useState(false);
  const length = text.trim().length;
  const save = async () => {
    setBusy(true);
    const ok = await attempt(review ? actions.updateReview(book.id, text) : actions.addReview(book.id, text), review ? "Review updated" : "Review saved");
    setBusy(false);
    if (ok) onOpenChange(false);
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange} title={review ? "Edit review" : "Add review"} description={<><span className="font-medium">{book.title}</span> by {book.author}</>} className="max-w-2xl">
      <Field label="Your review" hint={`${length}/5000 characters${length < 10 ? ` (${10 - length} more needed)` : ""}`}>
        <Textarea rows={7} value={text} onChange={(e) => setText(e.target.value)} placeholder="Share your thoughts about this book…" disabled={busy} />
      </Field>
      <div className="mt-5 flex justify-end gap-2">
        <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
        <Button busy={busy} disabled={!isValidReview(text)} onClick={save}>{review ? "Update review" : "Save review"}</Button>
      </div>
    </Dialog>
  );
}

const pageLabel = (c: BookComment) => (c.readingState === "not_started" ? "Before starting" : c.readingState === "finished" ? "After finishing" : `Page ${c.currentPage}`);

function Comments({ book, comments }: { book: Book; comments: BookComment[] }) {
  const { actions } = useLibrary();
  const [writing, setWriting] = useState(false);
  const [all, setAll] = useState(false);
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const shown = all ? comments : comments.slice(0, 3);
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const ok = await attempt(actions.addComment(book.id, text, { state: book.state, page: book.progress.currentPage }), "Comment added");
    setBusy(false);
    if (ok) {
      setText("");
      setWriting(false);
    }
  };
  return (
    <Card className="animate-rise" style={stagger(4)}>
      <CardHeader
        icon={ChatCircleIcon}
        title={<>Comments {comments.length > 0 && <span className="rounded-full bg-muted px-2 py-0.5 font-sans text-xs text-muted-foreground">{comments.length}</span>}</>}
        action={!writing && <Button size="sm" onClick={() => setWriting(true)}>{comments.length ? "Add comment" : "Add first comment"}</Button>}
      />
      <div className="px-5 pb-5">
        {writing && (
          <form onSubmit={submit} className="mb-6 space-y-3 rounded-xl border border-border bg-muted/40 p-4 animate-settle">
            <Textarea autoFocus rows={4} maxLength={2000} value={text} onChange={(e) => setText(e.target.value)} placeholder="What are your thoughts?" aria-label="Comment text" disabled={busy} />
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
              <span>
                {text.length}/2000 · {book.state === "in_progress" ? `Page ${book.progress.currentPage}` : STATE_LABEL[book.state]}
              </span>
              <span className="flex gap-2">
                <Button size="sm" variant="ghost" onClick={() => setWriting(false)}>Cancel</Button>
                <Button size="sm" type="submit" busy={busy} disabled={!isValidComment(text)}>Add comment</Button>
              </span>
            </div>
          </form>
        )}
        {comments.length === 0 && !writing ? (
          <EmptyState icon={ChatCircleIcon} title="No comments yet">Share your thoughts about this book as you read.</EmptyState>
        ) : (
          <ol className="space-y-5">
            {shown.map((c, i) => (
              <li key={c.id} className="relative pl-7 animate-rise" style={stagger(i)}>
                <span className="absolute left-0 top-1.5 size-3 rounded-full border-2 border-brand-accent bg-card" />
                {i < shown.length - 1 && <span className="absolute left-[5px] top-5 h-[calc(100%+0.5rem)] w-px bg-border" />}
                <p className="whitespace-pre-wrap rounded-xl bg-muted/50 p-3.5 text-sm leading-relaxed text-foreground">{c.text}</p>
                <p className="mt-2 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                  {formatDistanceToNow(c.timestamp.toDate(), { addSuffix: true })} · {pageLabel(c)} <StateBadge state={c.readingState} />
                </p>
              </li>
            ))}
          </ol>
        )}
        {comments.length > 3 && (
          <Button variant="ghost" size="sm" className="mt-4 w-full" onClick={() => setAll((a) => !a)}>
            <CaretDownIcon className={cn("transition-transform", all && "rotate-180")} /> {all ? "Show fewer" : `Show ${comments.length - 3} more`}
          </Button>
        )}
      </div>
    </Card>
  );
}
