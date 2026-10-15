import type { Auth } from "firebase/auth";
import type { Firestore } from "firebase/firestore";

export const PROJECT = "demo-librarium";
const FIRESTORE = "http://127.0.0.1:8080";
const AUTH = "http://127.0.0.1:9099";

/** Boots the default Firebase app the way the legacy app does, pointed at the emulators. */
export async function connect(): Promise<{ auth: Auth; db: Firestore }> {
  const { auth, db } = await import("../../.legacy/src/lib/api/firebase");
  const g = globalThis as { __librariumEmulators?: boolean };
  if (!g.__librariumEmulators) {
    const { connectAuthEmulator } = await import("firebase/auth");
    const { connectFirestoreEmulator } = await import("firebase/firestore");
    connectAuthEmulator(auth, AUTH, { disableWarnings: true });
    connectFirestoreEmulator(db, "127.0.0.1", 8080);
    g.__librariumEmulators = true;
  }
  return { auth, db };
}

export async function resetEmulators() {
  await fetch(`${FIRESTORE}/emulator/v1/projects/${PROJECT}/databases/(default)/documents`, { method: "DELETE" });
  await fetch(`${AUTH}/emulator/v1/projects/${PROJECT}/accounts`, { method: "DELETE" });
}

/** Signs up the scenario's reader with a Google-like profile. */
export async function signUp(auth: Auth) {
  const { createUserWithEmailAndPassword, updateProfile, signOut } = await import("firebase/auth");
  await signOut(auth);
  const { user } = await createUserWithEmailAndPassword(auth, "ada@example.com", "correct-horse");
  await updateProfile(user, { displayName: "Ada Lovelace", photoURL: "https://lh3.googleusercontent.com/a/ada" });
  return user;
}

/** Records which scenario step produced each timestamp, so runs at different wall-clock times compare. */
export class Clock {
  private windows: { step: number; from: number; to: number }[] = [];
  async step<T>(index: number, run: () => Promise<T>): Promise<T> {
    const from = Date.now();
    try {
      return await run();
    } finally {
      this.windows.push({ step: index, from, to: Date.now() });
      await new Promise((r) => setTimeout(r, 3));
    }
  }
  label(ms: number) {
    const hit = this.windows.find((w) => ms >= w.from && ms <= w.to);
    return hit ? `@step${hit.step}` : "@outside";
  }
}

type Json = null | boolean | number | string | Json[] | { [k: string]: Json };

/** Reads every document the user owns, straight from the emulator, as plain JSON. */
export async function dump(db: Firestore, uid: string) {
  const { collection, doc, getDocFromServer, getDocsFromServer, Timestamp } = await import("firebase/firestore");
  const plain = (v: unknown): Json => {
    if (v instanceof Timestamp) return { $ts: v.toMillis(), $nanos: v.nanoseconds } as unknown as Json;
    if (Array.isArray(v)) return v.map(plain);
    if (v && typeof v === "object") return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, plain(x)]));
    return v as Json;
  };
  const read = async (name: string) =>
    (await getDocsFromServer(collection(db, "users", uid, name))).docs.map((d) => ({ id: d.id, ...(plain(d.data()) as object) }));
  const profile = await getDocFromServer(doc(db, "users", uid, "profile", "main"));
  return {
    profile: profile.exists() ? plain(profile.data()) : null,
    books: await read("books"),
    events: await read("events"),
    messages: await read("messages"),
  };
}

/** Maps run-specific values (ids, uid, clock) to stable labels and sorts collections deterministically. */
export function normalize(raw: unknown, ids: Map<string, string>, uid: string, clock: Clock): Json {
  const tsKey = (v: unknown) => (v as { $ts: number; $nanos: number });
  const walk = (v: unknown, key?: string): Json => {
    if (v && typeof v === "object" && "$ts" in (v as object)) return clock.label(tsKey(v).$ts);
    if (typeof v === "number" && key && /timestamp|At$/.test(key) && v > 1e12) return clock.label(v);
    if (Array.isArray(v)) return v.map((x) => walk(x));
    if (v && typeof v === "object") {
      const out: Record<string, Json> = {};
      const entries = Object.entries(v).map(([k, x]) => [ids.get(k) ?? k, x, k] as const);
      for (const [label, x, k] of entries.sort(([a], [b]) => a.localeCompare(b))) out[label] = walk(x, k);
      return out;
    }
    if (typeof v === "string") {
      if (v === uid) return "<uid>";
      if (key === "lastSignInTime") return "<lastSignInTime>";
      if (key === "email" && v.includes("@")) return "<email>";
      return ids.get(v) ?? v;
    }
    return v as Json;
  };
  const order = (a: Record<string, unknown>, b: Record<string, unknown>, field: string) => {
    const x = tsKey(a[field]), y = tsKey(b[field]);
    return x.$ts - y.$ts || x.$nanos - y.$nanos || String(a.type).localeCompare(String(b.type));
  };
  const { profile, books, events, messages, ...rest } = raw as Record<string, Record<string, unknown>[]> & { profile: unknown };
  const d = { profile, books, events, messages };
  const strip = (items: Record<string, unknown>[], keepId: boolean) =>
    items.map(({ id, ...rest }) => (keepId ? { id, ...rest } : rest));
  return walk({
    profile: d.profile,
    books: strip([...d.books].sort((a, b) => order(a, b, "addedAt") || String(a.title).localeCompare(String(b.title))), true),
    events: strip([...d.events].sort((a, b) => order(a, b, "timestamp")), false),
    messages: strip([...d.messages].sort((a, b) => order(a, b, "timestamp")), false),
    ...rest,
  });
}
