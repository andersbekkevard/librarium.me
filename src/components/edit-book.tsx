"use client";

import { FloppyDiskIcon, TrashIcon, WarningCircleIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { editProblems, STATE_LABEL } from "@/lib/domain";
import type { BookEdit } from "@/lib/library";
import { useLibrary } from "@/lib/store";
import { READING_STATES, type Book, type ReadingState } from "@/lib/types";
import { attempt } from "./toast";
import { Button, Dialog, Field, Input, Segmented, Stars, Textarea } from "./ui";

type Form = Required<Pick<BookEdit, "title" | "author" | "description" | "state" | "progress" | "isbn" | "genre" | "publishedDate" | "coverImage" | "isOwned">> & { rating?: number | null };

const formOf = (b: Book): Form => ({
  title: b.title,
  author: b.author,
  description: b.description || "",
  state: b.state,
  progress: { currentPage: b.progress.currentPage, totalPages: b.progress.totalPages },
  rating: b.rating,
  isbn: b.isbn || "",
  genre: b.genre || "",
  publishedDate: b.publishedDate || "",
  coverImage: b.coverImage || "",
  isOwned: b.isOwned,
});

/** Manual correction of any field, including the reading state (bypasses the state machine). */
export function EditBookDialog({ book, open, onOpenChange, onDeleted }: { book: Book; open: boolean; onOpenChange: (o: boolean) => void; onDeleted: () => void }) {
  const { actions } = useLibrary();
  const [form, setForm] = useState(() => formOf(book));
  const [errors, setErrors] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const set = <K extends keyof Form>(key: K, value: Form[K]) => setForm((f) => ({ ...f, [key]: value }));
  const page = (key: "currentPage" | "totalPages", value: string) => set("progress", { ...form.progress, [key]: parseInt(value) || 0 });

  const save = async () => {
    const problems = editProblems({ ...form, rating: form.rating ?? undefined });
    setErrors(problems);
    if (problems.length) return;
    setBusy(true);
    const ok = await attempt(actions.editBook(book.id, form), "Changes saved");
    setBusy(false);
    if (ok) onOpenChange(false);
  };
  const remove = async () => {
    setBusy(true);
    const ok = await attempt(actions.deleteBook(book.id), `Removed “${book.title}”`);
    setBusy(false);
    if (!ok) return;
    setConfirming(false);
    onOpenChange(false);
    onDeleted();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange} title="Edit book" description="Correct any detail, including the reading state." className="max-w-2xl">
      <div className="space-y-6">
        {errors.length > 0 && (
          <div role="alert" className="flex gap-2 rounded-xl border border-status-error/25 bg-status-error/8 p-3 text-sm text-status-error">
            <WarningCircleIcon className="mt-0.5 size-4 shrink-0" />
            <ul className="space-y-0.5">{errors.map((e) => <li key={e}>{e}</li>)}</ul>
          </div>
        )}
        <section className="grid gap-4 sm:grid-cols-2">
          <Field label="Title"><Input value={form.title} onChange={(e) => set("title", e.target.value)} /></Field>
          <Field label="Author"><Input value={form.author} onChange={(e) => set("author", e.target.value)} /></Field>
          <Field label="Description" className="sm:col-span-2"><Textarea rows={3} value={form.description} onChange={(e) => set("description", e.target.value)} /></Field>
        </section>
        <section className="space-y-4 border-t border-border pt-5">
          <h3 className="text-base">Reading status</h3>
          <Segmented<ReadingState> label="Reading state" value={form.state} onChange={(v) => set("state", v)} options={READING_STATES.map((s) => ({ value: s, label: STATE_LABEL[s] }))} />
          <div className="grid grid-cols-2 gap-4">
            <Field label="Current page"><Input type="number" min={0} value={form.progress.currentPage} onChange={(e) => page("currentPage", e.target.value)} /></Field>
            <Field label="Total pages"><Input type="number" min={0} value={form.progress.totalPages} onChange={(e) => page("totalPages", e.target.value)} /></Field>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium">Rating</span>
            <Stars size="md" value={form.rating ?? 0} onChange={(r) => set("rating", r)} />
            {form.rating != null && <Button size="sm" variant="ghost" onClick={() => set("rating", book.rating === undefined ? undefined : null)}>Clear</Button>}
          </div>
        </section>
        <section className="grid gap-4 border-t border-border pt-5 sm:grid-cols-2">
          <Field label="ISBN"><Input value={form.isbn} placeholder="10 or 13 digits" onChange={(e) => set("isbn", e.target.value)} /></Field>
          <Field label="Genre"><Input value={form.genre} onChange={(e) => set("genre", e.target.value)} /></Field>
          <Field label="Published"><Input value={form.publishedDate} placeholder="YYYY, YYYY-MM or YYYY-MM-DD" onChange={(e) => set("publishedDate", e.target.value)} /></Field>
          <Field label="Cover image URL"><Input value={form.coverImage} placeholder="https://…" onChange={(e) => set("coverImage", e.target.value)} /></Field>
          <div className="space-y-1.5 text-sm">
            <span className="font-medium">Ownership</span>
            <div><Segmented label="Ownership" value={form.isOwned ? "owned" : "wishlist"} onChange={(v) => set("isOwned", v === "owned")} options={[{ value: "owned", label: "Owned" }, { value: "wishlist", label: "Wishlist" }]} /></div>
          </div>
        </section>
        <div className="flex flex-wrap items-center gap-2 border-t border-border pt-5">
          <Button variant="ghost" className="text-status-error hover:bg-status-error/8 hover:text-status-error" onClick={() => setConfirming(true)} disabled={busy}>
            <TrashIcon /> Delete book
          </Button>
          <span className="flex-1" />
          <Button variant="ghost" onClick={() => (setForm(formOf(book)), setErrors([]))} disabled={busy}>Reset</Button>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={busy}>Cancel</Button>
          <Button busy={busy} onClick={save}><FloppyDiskIcon /> Save changes</Button>
        </div>
      </div>
      <Dialog open={confirming} onOpenChange={setConfirming} title="Delete this book?" description={<>“{book.title}” by {book.author} will be removed from your library. Its reading history stays in your activity log.</>}>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setConfirming(false)}>Cancel</Button>
          <Button variant="danger" busy={busy} onClick={remove}><TrashIcon /> Delete book</Button>
        </div>
      </Dialog>
    </Dialog>
  );
}
