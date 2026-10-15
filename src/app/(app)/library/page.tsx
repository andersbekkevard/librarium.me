"use client";

import { BookOpenIcon, GridFourIcon, ListIcon, MagnifyingGlassIcon, SortAscendingIcon, SortDescendingIcon, XIcon } from "@phosphor-icons/react";
import { Suspense, useMemo } from "react";
import { BookCard, BookRow } from "@/components/book-card";
import { Button, Card, EmptyState, Input, PageHeader, Segmented, Select, Spinner } from "@/components/ui";
import { genresOf, queryLibrary } from "@/lib/domain";
import { useLibrary } from "@/lib/store";
import { useSearchState } from "@/lib/use-search-state";

const DEFAULTS = { search: "", filter: "all", ownership: "all", genre: "all", sort: "title", direction: "asc", view: "grid" };
const SORTS = [["title", "Title"], ["author", "Author"], ["pages", "Pages"], ["rating", "Rating"], ["progress", "Progress"], ["dateAdded", "Added"]] as const;

function Library() {
  const { books, ready } = useLibrary();
  const [q, set] = useSearchState(DEFAULTS);
  const shown = useMemo(
    () => queryLibrary(books, { search: q.search, status: q.filter, ownership: q.ownership, genre: q.genre, sort: q.sort, direction: q.direction as "asc" | "desc" }),
    [books, q.search, q.filter, q.ownership, q.genre, q.sort, q.direction],
  );
  const genres = useMemo(() => genresOf(books), [books]);
  const activeFilters = [q.filter, q.ownership, q.genre].filter((v) => v !== "all").length;
  const clear = () => set({ search: "", filter: "all", ownership: "all", genre: "all" });

  return (
    <>
      <PageHeader
        title="My Library"
        subtitle="Manage and organize your book collection"
        actions={
          <Segmented
            label="View"
            value={q.view as "grid" | "list"}
            onChange={(view) => set({ view })}
            options={[{ value: "grid", label: <><GridFourIcon /> Grid</> }, { value: "list", label: <><ListIcon /> List</> }]}
          />
        }
      />
      <Card className="mb-4 space-y-4 p-4 animate-rise sm:p-5" style={{ "--i": 1 } as React.CSSProperties}>
        <div className="flex flex-wrap gap-3">
          <div className="relative min-w-56 flex-1">
            <MagnifyingGlassIcon className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input aria-label="Filter books" placeholder="Filter by title, author, genre…" value={q.search} onChange={(e) => set({ search: e.target.value })} className="pl-10" />
          </div>
          <Select aria-label="Filter by reading status" value={q.filter} onChange={(e) => set({ filter: e.target.value })} className="w-auto">
            <option value="all">All statuses</option>
            <option value="not_started">Not started</option>
            <option value="in_progress">Reading</option>
            <option value="finished">Finished</option>
          </Select>
          <Select aria-label="Filter by ownership status" value={q.ownership} onChange={(e) => set({ ownership: e.target.value })} className="w-auto">
            <option value="all">Owned & wishlist</option>
            <option value="owned">Owned</option>
            <option value="wishlist">Wishlist</option>
          </Select>
          {genres.length > 0 && (
            <Select aria-label="Filter by genre" value={q.genre} onChange={(e) => set({ genre: e.target.value })} className="w-auto max-w-48">
              <option value="all">All genres</option>
              {genres.map((g) => <option key={g} value={g}>{g}</option>)}
            </Select>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 text-sm text-muted-foreground">Sort by</span>
          {SORTS.map(([key, label]) => (
            <Button
              key={key}
              size="sm"
              variant={q.sort === key ? "soft" : "ghost"}
              aria-pressed={q.sort === key}
              onClick={() => set({ sort: key, direction: q.sort === key && q.direction === "asc" ? "desc" : "asc" })}
            >
              {label}
              {q.sort === key && (q.direction === "asc" ? <SortAscendingIcon /> : <SortDescendingIcon />)}
            </Button>
          ))}
          {(activeFilters > 0 || q.search) && (
            <Button size="sm" variant="ghost" onClick={clear} className="ml-auto">
              <XIcon /> Clear filters{activeFilters ? ` (${activeFilters})` : ""}
            </Button>
          )}
        </div>
      </Card>
      <p className="mb-4 text-sm text-muted-foreground" aria-live="polite">Showing {shown.length} of {books.length} books</p>
      {!ready ? (
        <div className="grid place-items-center py-20"><Spinner className="size-8" /></div>
      ) : shown.length === 0 ? (
        <Card>
          <EmptyState icon={BookOpenIcon} title="No books found" action={activeFilters > 0 || q.search ? <Button variant="outline" onClick={clear}>Clear all filters</Button> : undefined}>
            {books.length ? "Try adjusting your filters or search terms." : "Your library is empty. Start by adding some books!"}
          </EmptyState>
        </Card>
      ) : q.view === "list" ? (
        <div className="space-y-2">{shown.map((b, i) => <BookRow key={b.id} book={b} index={Math.min(i, 12)} />)}</div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{shown.map((b, i) => <BookCard key={b.id} book={b} index={Math.min(i, 12)} />)}</div>
      )}
    </>
  );
}

export default function LibraryPage() {
  return (
    <Suspense>
      <Library />
    </Suspense>
  );
}
