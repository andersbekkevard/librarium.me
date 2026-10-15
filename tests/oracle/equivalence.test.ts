import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import type { Auth } from "firebase/auth";
import type { Firestore } from "firebase/firestore";
import { beforeAll, describe, expect, test, vi } from "vitest";
import { LIBRARY_QUERIES, SEARCHES, type Driver } from "./driver";
import { Clock, connect, dump, normalize, resetEmulators, signUp } from "./harness";
import { legacyDriver } from "./legacy-driver";
import { scenarios, type AiBehavior, type Scenario } from "./scenarios";

/** Gemini is replaced by a scripted model for both implementations. */
const ai: { now: AiBehavior } = { now: { fail: "not configured" } };
vi.mock("firebase/ai", async (original) => ({
  ...(await original<typeof import("firebase/ai")>()),
  getAI: () => ({}),
  getGenerativeModel: () => ({
    generateContent: async () => {
      if ("fail" in ai.now) throw new Error(ai.now.fail);
      const text = ai.now.reply;
      return { response: { text: () => text } };
    },
  }),
}));

/**
 * Deliberate, reviewed differences from legacy behaviour. Paths are omitted from the strict comparison
 * and the intended new behaviour is asserted explicitly in `expectImprovements`.
 */
export const DEVIATIONS = [
  { id: "D1", scenarios: ["S13"], omit: ["*"], why: "An out-of-range page on an unstarted book no longer flips it to in_progress before failing." },
  { id: "D2", scenarios: ["S13"], omit: ["*"], why: "Jumping from not_started straight to the last page now finishes the book (legacy only auto-finished books already in progress)." },
  { id: "D3", scenarios: "*", omit: ["books.*.startedAt"], why: "startedAt is recorded when reading starts; legacy declared and displayed it but never wrote it." },
  { id: "D4", scenarios: ["S12"], omit: ["derived.stats.readingStreak"], why: "The reading streak counts distinct days; legacy counted every book finished on the same day as another day." },
  { id: "D5", scenarios: ["S07"], omit: ["steps.8.error"], why: "The duplicate-review message no longer tells readers to 'Use updateReview to modify it.'" },
  { id: "D8", scenarios: ["S08"], omit: ["books.*.finishedAt", "derived.stats.booksReadThisMonth", "derived.stats.booksReadThisYear", "derived.stats.readingStreak"], why: "A manual edit that marks a book finished records finishedAt, so it counts toward this month/year." },
] as const;

const OUT = join(import.meta.dirname, "../../analysis/librarium/equivalence");
let auth: Auth;
let db: Firestore;
let modernDriver: ((user: import("firebase/auth").User) => Promise<Driver>) | undefined;

beforeAll(async () => {
  ({ auth, db } = await connect());
  if (process.env.ORACLE_ONLY !== "legacy") ({ modernDriver } = await import("./modern-driver"));
  vi.spyOn(Math, "random").mockReturnValue(0);
});

async function play(s: Scenario, make: (user: import("firebase/auth").User) => Promise<Driver>) {
  await resetEmulators();
  ai.now = { fail: "not configured" };
  const user = await signUp(auth);
  const d = await make(user);
  const clock = new Clock();
  const labels = new Map<string, string>();
  const steps: { step: string; ok: boolean; value?: string; error?: string }[] = [];
  let i = 0;
  await s.run({
    d,
    ai: (b) => (ai.now = b),
    id: (label) => [...labels].find(([, l]) => l === label)?.[0] ?? `missing:${label}`,
    step: (name, run, label) =>
      clock.step(++i, async () => {
        try {
          const value = await run();
          if (label && typeof value === "string") labels.set(value, label);
          steps.push({ step: name, ok: true, ...(typeof value === "string" ? { value: label ?? value } : {}) });
        } catch (e) {
          steps.push({ step: name, ok: false, error: (e as Error).message });
        }
      }),
  });
  const raw = await dump(db, user.uid);
  for (const b of raw.books as { id: string; title: string }[]) if (!labels.has(b.id)) labels.set(b.id, `book:${b.title}`);
  const derived = await d.derive(LIBRARY_QUERIES, SEARCHES);
  return normalize({ ...raw, steps, derived }, labels, user.uid, clock) as Record<string, unknown>;
}

function omit(value: unknown, path: string[]): unknown {
  if (!path.length || !value || typeof value !== "object") return value;
  const [head, ...rest] = path;
  const copy: Record<string, unknown> | unknown[] = Array.isArray(value) ? [...value] : { ...(value as object) };
  const keys = head === "*" ? Object.keys(copy) : [head];
  for (const k of keys) {
    if (!(k in copy)) continue;
    if (!rest.length) delete (copy as Record<string, unknown>)[k];
    else (copy as Record<string, unknown>)[k] = omit((copy as Record<string, unknown>)[k], rest);
  }
  return copy;
}

const strict = (id: string, dumpValue: Record<string, unknown>) =>
  DEVIATIONS.filter((d) => d.scenarios === "*" || (d.scenarios as readonly string[]).includes(id))
    .flatMap((d) => d.omit)
    .reduce<unknown>((acc, p) => (p === "*" ? {} : omit(acc, p.split("."))), dumpValue);

function write(side: "legacy" | "new", id: string, value: unknown) {
  mkdirSync(join(OUT, side), { recursive: true });
  writeFileSync(join(OUT, side, `${id}.json`), JSON.stringify(value, null, 2) + "\n");
}

describe.each(scenarios)("$id $title", (s) => {
  test("legacy and modern leave identical data and read models", async () => {
    const legacy = await play(s, legacyDriver);
    write("legacy", s.id, legacy);
    if (!modernDriver) return;
    const modern = await play(s, modernDriver);
    write("new", s.id, modern);
    expect(strict(s.id, modern)).toEqual(strict(s.id, legacy));
    expectImprovements(s.id, legacy, modern);
  });
});

type Dump = { books: Record<string, unknown>[]; steps: { step: string; ok: boolean; error?: string }[]; derived: { stats: Record<string, number> } };

/** The new behaviour behind each approved deviation, asserted explicitly. */
function expectImprovements(id: string, legacyDump: Record<string, unknown>, modernDump: Record<string, unknown>) {
  const legacy = legacyDump as unknown as Dump, modern = modernDump as unknown as Dump;
  const book = (d: Dump, title: string) => d.books.find((b) => b.title === title)!;
  for (const b of modern.books) expect("startedAt" in b).toBe(b.state !== "not_started" && b.title !== "Ulysses (Annotated)"); // D3
  if (id === "S13") {
    expect(book(legacy, "Persuasion").state).toBe("in_progress"); // D1: legacy flipped state, then failed
    expect(book(modern, "Persuasion").state).toBe("not_started");
    expect(modern.steps[2]).toMatchObject({ ok: false, error: "Current page cannot exceed total pages" });
    expect(book(legacy, "Sanditon").state).toBe("in_progress"); // D2: legacy stopped short of finishing
    expect(book(modern, "Sanditon")).toMatchObject({ state: "finished", progress: { currentPage: 120 } });
  }
  if (id === "S12") {
    expect(legacy.derived.stats.readingStreak).toBe(2); // D4: two books finished today
    expect(modern.derived.stats.readingStreak).toBe(1);
  }
  if (id === "S08") {
    expect(book(legacy, "Ulysses (Annotated)").finishedAt).toBeUndefined(); // D8
    expect(book(modern, "Ulysses (Annotated)").finishedAt).toBe("@step3");
  }
}
