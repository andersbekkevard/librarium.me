"use client";

import {
  ArrowSquareOutIcon, BarcodeIcon, CheckIcon, FileTextIcon, MagnifyingGlassIcon, PlusIcon, StarIcon,
} from "@phosphor-icons/react";
import { Suspense, useEffect, useState } from "react";
import { Scanner } from "@/components/scanner";
import { AddButton, VolumeCard, year } from "@/components/volume";
import { attempt } from "@/components/toast";
import { Badge, Button, buttonClass, Card, Cover, Dialog, EmptyState, Field, Input, PageHeader, Segmented, Select, Spinner, Textarea } from "@/components/ui";
import { coverOf, formatAuthors, isbnOf, manualToBook, plainText, searchVolumes, volumeToBook, type GoogleVolume, type ManualEntry } from "@/lib/books-api";
import { useLibrary } from "@/lib/store";
import type { NewBook } from "@/lib/types";
import { useSearchState } from "@/lib/use-search-state";

const DEFAULTS = { tab: "search", q: "", type: "title" };

function AddBooks() {
  const { actions } = useLibrary();
  const [params, set] = useSearchState(DEFAULTS);
  const [recent, setRecent] = useState<{ id: string; title: string }[]>([]);
  const added = (id: string, book: NewBook) => setRecent((r) => [{ id, title: `${book.title} by ${book.author}` }, ...r].slice(0, 5));
  const add = async (book: NewBook) => {
    let id = "";
    const ok = await attempt(actions.addBook(book).then((x) => void (id = x)), `Added “${book.title}” to your library`);
    if (ok) added(id, book);
    return ok;
  };

  return (
    <>
      <PageHeader title="Add Books" subtitle="Search millions of books, scan a barcode, or add one by hand." />
      {recent.length > 0 && (
        <Card className="mb-6 flex flex-wrap items-center gap-2 p-4 animate-settle">
          <span className="mr-1 text-sm font-medium">Recently added</span>
          {recent.map((b) => <Badge key={b.id} tone="brand"><CheckIcon weight="bold" /> {b.title}</Badge>)}
        </Card>
      )}
      <div className="mb-6 animate-rise" style={{ "--i": 1 } as React.CSSProperties}>
        <Segmented
          label="How to add"
          value={params.tab as "search" | "manual" | "scan"}
          onChange={(tab) => set({ tab })}
          options={[
            { value: "search", label: <><MagnifyingGlassIcon /> Search</> },
            { value: "manual", label: <><FileTextIcon /> Manual</> },
            { value: "scan", label: <><BarcodeIcon /> Scan</> },
          ]}
        />
      </div>
      <div key={params.tab} className="animate-rise" style={{ "--i": 2 } as React.CSSProperties}>
        {params.tab === "manual" ? (
          <ManualForm onAdd={add} />
        ) : params.tab === "scan" ? (
          <Card className="p-5">
            <Scanner onAdded={added} />
          </Card>
        ) : (
          <OnlineSearch query={params.q} type={params.type as "title" | "author"} onQuery={(q) => set({ q })} onType={(type) => set({ type })} onAdd={add} />
        )}
      </div>
    </>
  );
}

function useVolumes(query: string, type: "title" | "author") {
  const [state, setState] = useState<{ key: string; results: GoogleVolume[]; error?: string }>({ key: "", results: [] });
  const key = `${type}:${query.trim()}`;
  useEffect(() => {
    if (!query.trim()) return;
    let live = true;
    searchVolumes(query, type, 20).then(
      (results) => live && setState({ key, results }),
      (e: Error) => live && setState({ key, results: [], error: e.message }),
    );
    return () => void (live = false);
  }, [query, type, key]);
  const current = query.trim() && state.key === key;
  return { searching: !!query.trim() && !current, results: current ? state.results : [], error: current ? state.error : undefined };
}

function OnlineSearch({ query, type, onQuery, onType, onAdd }: { query: string; type: "title" | "author"; onQuery: (q: string) => void; onType: (t: string) => void; onAdd: (b: NewBook) => Promise<boolean> }) {
  const [text, setText] = useState(query);
  const [addedIds, setAddedIds] = useState<Set<string>>(new Set());
  const [adding, setAdding] = useState<string | null>(null);
  const [preview, setPreview] = useState<GoogleVolume | null>(null);
  const { searching, results, error } = useVolumes(query, type);

  useEffect(() => {
    if (text === query) return;
    const t = setTimeout(() => onQuery(text), 500);
    return () => clearTimeout(t);
  }, [text, query, onQuery]);

  const add = async (v: GoogleVolume) => {
    setAdding(v.id);
    if (await onAdd(volumeToBook(v))) setAddedIds((s) => new Set(s).add(v.id));
    setAdding(null);
  };
  const state = (v: GoogleVolume) => ({ added: addedIds.has(v.id), adding: adding === v.id, onAdd: () => add(v) });

  return (
    <Card className="p-5">
      <div className="mb-5 flex flex-wrap gap-3">
        <Segmented label="Search by" value={type} onChange={onType} options={[{ value: "title", label: "Title" }, { value: "author", label: "Author" }]} />
        <div className="relative min-w-60 flex-1">
          <MagnifyingGlassIcon className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input autoFocus aria-label="Search Google Books" placeholder={`Search by ${type}…`} value={text} onChange={(e) => setText(e.target.value)} className="pl-10" />
        </div>
      </div>
      {error && <p role="alert" className="mb-4 rounded-xl border border-status-error/25 bg-status-error/8 px-4 py-3 text-sm text-status-error">{error}</p>}
      {searching ? (
        <div className="grid place-items-center gap-3 py-16 text-sm text-muted-foreground"><Spinner /> Searching…</div>
      ) : results.length ? (
        <div className="grid gap-4 md:grid-cols-2">
          {results.map((v, i) => <VolumeCard key={v.id} volume={v} index={i} onPreview={() => setPreview(v)} {...state(v)} />)}
        </div>
      ) : (
        <EmptyState icon={MagnifyingGlassIcon} title={query.trim() ? "No books found" : "Find your next book"}>
          {query.trim() ? "Try a different title or author." : "Search Google Books by title or author and add results with one click."}
        </EmptyState>
      )}
      {preview && <VolumePreview volume={preview} onClose={() => setPreview(null)} {...state(preview)} />}
    </Card>
  );
}

function VolumePreview({ volume, onClose, ...add }: { volume: GoogleVolume; onClose: () => void; added: boolean; adding: boolean; onAdd: () => void }) {
  const info = volume.volumeInfo;
  const facts = [["Published", year(info.publishedDate)], ["Publisher", info.publisher], ["Pages", info.pageCount], ["ISBN", isbnOf(volume)]] as const;
  return (
    <Dialog open onOpenChange={(o) => !o && onClose()} title={info.title} description={`${info.subtitle ? `${info.subtitle} · ` : ""}by ${formatAuthors(info.authors)}`} className="max-w-3xl">
      <div className="grid gap-6 sm:grid-cols-[12rem_1fr]">
        <div className="space-y-3">
          <Cover src={coverOf(volume)} title={info.title} className="mx-auto w-40 text-sm shadow-soft sm:w-full" sizes="192px" />
          {info.averageRating && (
            <p className="flex items-center justify-center gap-1 text-sm">
              <StarIcon weight="fill" className="size-4 text-status-warning" /> {info.averageRating}
              {info.ratingsCount && <span className="text-xs text-muted-foreground">({info.ratingsCount} reviews)</span>}
            </p>
          )}
          <AddButton {...add} className="w-full" />
          {info.previewLink && <a href={info.previewLink} target="_blank" rel="noreferrer" className={buttonClass("outline", "md", "w-full")}><ArrowSquareOutIcon /> Preview on Google</a>}
        </div>
        <div className="space-y-4">
          <dl className="grid grid-cols-2 gap-3 text-sm">
            {facts.filter(([, v]) => v).map(([k, v]) => <div key={k}><dt className="text-xs text-muted-foreground">{k}</dt><dd className="font-medium">{v}</dd></div>)}
          </dl>
          {info.categories && <div className="flex flex-wrap gap-1.5">{info.categories.map((c) => <Badge key={c}>{c}</Badge>)}</div>}
          {info.description && <p className="whitespace-pre-line border-t border-border pt-4 text-sm leading-relaxed text-muted-foreground">{plainText(info.description)}</p>}
        </div>
      </div>
    </Dialog>
  );
}

const EMPTY: ManualEntry = { title: "", author: "", genre: "", pages: "", publishedYear: "", ownership: "wishlist", description: "" };

function ManualForm({ onAdd }: { onAdd: (b: NewBook) => Promise<boolean> }) {
  const [form, setForm] = useState(EMPTY);
  const [busy, setBusy] = useState(false);
  const field = (key: keyof ManualEntry) => ({ value: form[key], onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setForm((f) => ({ ...f, [key]: e.target.value })) });
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    if (await onAdd(manualToBook(form))) setForm(EMPTY);
    setBusy(false);
  };
  return (
    <Card className="p-5">
      <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2">
        <Field label="Title *"><Input required placeholder="Enter book title" {...field("title")} /></Field>
        <Field label="Author *"><Input required placeholder="Enter author name" {...field("author")} /></Field>
        <Field label="Genre"><Input placeholder="Optional" {...field("genre")} /></Field>
        <Field label="Pages"><Input type="number" min={0} placeholder="Number of pages" {...field("pages")} /></Field>
        <Field label="Published year"><Input type="number" min={1000} max={new Date().getFullYear()} placeholder="Year published" {...field("publishedYear")} /></Field>
        <Field label="Ownership">
          <Select {...field("ownership")}>
            <option value="wishlist">Wishlist</option>
            <option value="owned">Owned</option>
          </Select>
        </Field>
        <Field label="Description" className="sm:col-span-2"><Textarea rows={3} placeholder="Optional" {...field("description")} /></Field>
        <div className="flex gap-2 sm:col-span-2">
          <Button type="submit" busy={busy}><PlusIcon weight="bold" /> Add to library</Button>
          <Button variant="outline" onClick={() => setForm(EMPTY)} disabled={busy}>Clear form</Button>
        </div>
      </form>
    </Card>
  );
}

export default function AddBooksPage() {
  return (
    <Suspense>
      <AddBooks />
    </Suspense>
  );
}
