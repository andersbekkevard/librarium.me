"use client";

import {
  BookIcon, BookOpenIcon, ChartBarIcon, ClockCounterClockwiseIcon, HouseIcon, ListIcon, MagnifyingGlassIcon, MoonIcon,
  PlusIcon, SignOutIcon, SunIcon, TargetIcon, UserIcon, UsersIcon, type Icon,
} from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { searchLibrary } from "@/lib/domain";
import { signOut, useLibrary, useStats } from "@/lib/store";
import { attempt } from "./toast";
import { Button, buttonClass, cn, Cover, StateBadge } from "./ui";

export function Logo({ href = "/dashboard" }: { href?: string }) {
  return (
    <Link href={href} className="group flex items-center gap-2.5 rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-ring">
      <span className="grid size-9 place-items-center rounded-xl bg-brand-accent/20 transition-transform duration-300 group-hover:-rotate-6">
        <BookIcon className="size-5 text-brand-primary" weight="duotone" />
      </span>
      <span className="hidden font-serif text-xl tracking-tight text-foreground sm:block">Librarium</span>
    </Link>
  );
}

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  return (
    <Button variant="ghost" size="icon" aria-label="Toggle theme" onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")} className="relative">
      <MoonIcon className="!size-5 transition-all duration-300 dark:-rotate-90 dark:scale-0" />
      <SunIcon className="absolute !size-5 rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100" />
    </Button>
  );
}

const NAV: { href: string; label: string; icon: Icon; soon?: boolean }[] = [
  { href: "/dashboard", label: "Dashboard", icon: HouseIcon },
  { href: "/library", label: "My Library", icon: BookOpenIcon },
  { href: "/statistics", label: "Statistics", icon: ChartBarIcon },
  { href: "/activity-history", label: "Activity", icon: ClockCounterClockwiseIcon },
  { href: "/progress", label: "Reading Goals", icon: TargetIcon, soon: true },
  { href: "/shared", label: "Shared Books", icon: UsersIcon, soon: true },
];

function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <nav className="flex h-full flex-col gap-1 border-r border-border/60 bg-background p-4" aria-label="Main">
      <Link href="/add-books" onClick={onNavigate} className={buttonClass("primary", "md", "mb-4 w-full")}>
        <PlusIcon weight="bold" /> Add Book
      </Link>
      {NAV.map(({ href, label, icon: I, soon }, i) => {
        const active = pathname === href || (href !== "/dashboard" && pathname.startsWith(href));
        return (
          <div key={href}>
            {soon && !NAV[i - 1].soon && <p className="mb-1 mt-5 px-3 text-[11px] font-medium uppercase tracking-wider text-muted-foreground/70">Coming soon</p>}
            {soon ? (
              <span aria-disabled className="flex cursor-not-allowed items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-muted-foreground/60">
                <I className="size-4" /> {label}
              </span>
            ) : (
              <Link
                href={href}
                onClick={onNavigate}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors duration-200",
                  active ? "bg-brand-primary/10 text-brand-primary" : "text-foreground/80 hover:bg-accent hover:text-foreground",
                )}
              >
                <span className={cn("absolute left-0 h-5 w-1 rounded-r-full bg-brand-primary transition-all duration-300", active ? "opacity-100" : "scale-y-0 opacity-0")} />
                <I className={cn("size-4", active && "text-brand-accent")} weight={active ? "fill" : "regular"} /> {label}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}

/** Library quick search: ⌘K / Ctrl+K, arrow keys, Enter. */
function QuickSearch() {
  const { books } = useLibrary();
  const router = useRouter();
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const input = useRef<HTMLInputElement>(null);
  const results = useMemo(() => searchLibrary(books, q.trim(), 8), [books, q]);
  const options = q.trim() ? [...results.map((b) => ({ key: b.id, go: () => router.push(`/books/${b.id}`) })), { key: "add", go: () => router.push(`/add-books?q=${encodeURIComponent(q.trim())}`) }] : [];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() !== "k" || !(e.metaKey || e.ctrlKey)) return;
      e.preventDefault();
      input.current?.focus();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const close = () => (setQ(""), setActive(0), input.current?.blur());
  const choose = (i: number) => (options[i]?.go(), close());

  return (
    <div className="relative w-full max-w-xl" onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setQ("")}>
      <MagnifyingGlassIcon className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      <input
        ref={input}
        value={q}
        role="combobox"
        aria-expanded={options.length > 0}
        aria-controls="quick-search"
        aria-label="Search your library"
        placeholder="Search your library…"
        onChange={(e) => (setQ(e.target.value), setActive(0))}
        onKeyDown={(e) => {
          if (e.key === "Enter") choose(active);
          else if (e.key === "ArrowDown" || e.key === "ArrowUp") {
            e.preventDefault();
            setActive((a) => Math.min(Math.max(a + (e.key === "ArrowDown" ? 1 : -1), 0), options.length - 1));
          }
          else if (e.key === "Escape") close();
        }}
        className="h-10 w-full rounded-xl border border-border/70 bg-muted/60 pl-10 pr-14 text-sm outline-none transition placeholder:text-muted-foreground/70 focus:border-brand-accent focus:bg-card focus:ring-2 focus:ring-ring/25"
      />
      <kbd className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-md border border-border bg-card px-1.5 py-0.5 text-[10px] text-muted-foreground sm:block">⌘K</kbd>
      {options.length > 0 && (
        <ul id="quick-search" role="listbox" className="absolute left-0 right-0 top-12 z-50 overflow-hidden rounded-2xl border border-border bg-popover p-1.5 shadow-2xl animate-settle">
          {results.length === 0 && <li className="px-3 py-3 text-sm text-muted-foreground">No books found in your library.</li>}
          {results.map((b, i) => (
            <li key={b.id} role="option" aria-selected={i === active}>
              <button tabIndex={-1} onMouseDown={(e) => e.preventDefault()} onMouseEnter={() => setActive(i)} onClick={() => choose(i)} className={cn("flex w-full items-center gap-3 rounded-xl p-2 text-left", i === active && "bg-accent")}>
                <Cover src={b.coverImage} title={b.title} className="w-8 rounded-md text-[8px]" sizes="32px" />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium">{b.title}</span>
                  <span className="block truncate text-xs text-muted-foreground">{b.author}</span>
                </span>
                <StateBadge state={b.state} />
              </button>
            </li>
          ))}
          <li role="option" aria-selected={active === results.length} className="mt-1 border-t border-border pt-1">
            <button tabIndex={-1} onMouseDown={(e) => e.preventDefault()} onMouseEnter={() => setActive(results.length)} onClick={() => choose(results.length)} className={cn("flex w-full items-center gap-3 rounded-xl p-2 text-left", active === results.length && "bg-accent")}>
              <span className="grid size-8 place-items-center rounded-lg bg-brand-primary text-white dark:text-background">
                <PlusIcon weight="bold" className="size-4" />
              </span>
              <span className="min-w-0">
                <span className="block truncate text-sm font-medium">Add “{q.trim()}”</span>
                <span className="block text-xs text-muted-foreground">Search Google Books to add it to your library</span>
              </span>
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}

function UserMenu() {
  const { user, profile } = useLibrary();
  const stats = useStats();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const away = (e: Event) => e instanceof KeyboardEvent ? e.key === "Escape" && setOpen(false) : !root.current?.contains(e.target as Node) && setOpen(false);
    document.addEventListener("mousedown", away);
    document.addEventListener("keydown", away);
    return () => (document.removeEventListener("mousedown", away), document.removeEventListener("keydown", away));
  }, [open]);

  const name = profile?.displayName || user?.displayName || "Reader";
  const email = profile?.email || user?.email || "";
  const photo = profile?.photoURL || user?.photoURL;
  const avatar = (size: number) =>
    photo ? <Image src={photo} alt="" width={size} height={size} unoptimized className="rounded-full object-cover" /> : <UserIcon className="size-4 text-muted-foreground" />;

  return (
    <div ref={root} className="relative flex items-center gap-3">
      <div className="hidden text-right leading-tight lg:block">
        <p className="text-sm font-medium text-foreground">{name}</p>
        <p className="text-xs text-muted-foreground">{email}</p>
      </div>
      <button onClick={() => setOpen((o) => !o)} aria-haspopup="menu" aria-expanded={open} aria-label={`Account menu for ${name}`} className="grid size-10 place-items-center rounded-full ring-offset-2 ring-offset-background transition hover:ring-2 hover:ring-brand-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
        {avatar(34)}
      </button>
      {open && (
        <div role="menu" className="absolute right-0 top-12 z-50 w-72 origin-top-right overflow-hidden rounded-2xl border border-border bg-popover shadow-2xl animate-settle">
          <div className="flex items-center gap-3 border-b border-border bg-muted/40 p-4">
            <span className="grid size-10 place-items-center rounded-full bg-brand-primary/10">{avatar(40)}</span>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">{name}</p>
              <p className="truncate text-xs text-muted-foreground">{email}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {stats.totalBooksRead} read · {stats.currentlyReading} reading · {stats.booksInLibrary} total
              </p>
            </div>
          </div>
          <div className="p-1.5">
            <MenuItem icon={ClockCounterClockwiseIcon} onClick={() => (setOpen(false), router.push("/activity-history"))}>Activity history</MenuItem>
            <MenuItem icon={SignOutIcon} danger onClick={() => attempt(signOut()).then(() => router.push("/"))}>Sign out</MenuItem>
          </div>
        </div>
      )}
    </div>
  );
}

const MenuItem = ({ icon: I, danger, onClick, children }: { icon: Icon; danger?: boolean; onClick: () => void; children: ReactNode }) => (
  <button role="menuitem" onClick={onClick} className={cn("flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors", danger ? "text-status-error hover:bg-status-error/8" : "hover:bg-accent")}>
    <I className="size-4" /> {children}
  </button>
);

export function AppShell({ children }: { children: ReactNode }) {
  const [drawer, setDrawer] = useState(false);
  const pathname = usePathname();
  return (
    <div className="min-h-screen">
      <header className="fixed inset-x-0 top-0 z-40 flex h-16 items-center gap-3 border-b border-border/60 bg-background/85 px-4 backdrop-blur-md lg:px-6">
        <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu" onClick={() => setDrawer(true)}>
          <ListIcon className="!size-5" />
        </Button>
        <div className="lg:w-52">
          <Logo />
        </div>
        <QuickSearch />
        <div className="ml-auto flex items-center gap-1 sm:gap-2">
          <ThemeToggle />
          <UserMenu />
        </div>
      </header>
      <aside className="fixed bottom-0 left-0 top-16 z-30 hidden w-64 lg:block">
        <Sidebar />
      </aside>
      {drawer && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal aria-label="Navigation">
          <div className="absolute inset-0 bg-black/40 animate-fade" onClick={() => setDrawer(false)} />
          <div className="absolute inset-y-0 left-0 w-72 animate-slide-in pt-4 shadow-2xl [&>nav]:border-0">
            <div className="h-full bg-background">
              <div className="px-4 pb-2">
                <Logo />
              </div>
              <Sidebar onNavigate={() => setDrawer(false)} />
            </div>
          </div>
        </div>
      )}
      <main key={pathname} className="px-4 pb-16 pt-24 sm:px-6 lg:ml-64 lg:px-10">
        <div className="mx-auto max-w-6xl">{children}</div>
      </main>
    </div>
  );
}
