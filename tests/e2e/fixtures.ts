import { test as base, expect, type Page, type Route } from "@playwright/test";
import { bare, dune, goodOmens } from "../fixtures/volumes";

export const AI_REPLY = "Ada, your shelf is filling with good company. Keep turning pages: tonight's chapter is waiting for you.";
const PROJECT = "demo-librarium";
const PNG = Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkqPpfDwAE8gJ3Pp8VbgAAAABJRU5ErkJggg==", "base64");

/** Canned Google Books answers, keyed by what the app asks for. */
function books(route: Route) {
  const q = new URL(route.request().url()).searchParams.get("q") ?? "";
  if (/rate-limit/i.test(q)) return route.fulfill({ status: 429, json: { error: { code: 429 } } });
  const items = /dune|0441013597|herbert/i.test(q) ? [dune] : /omens|pratchett|0060853980/i.test(q) ? [goodOmens, bare] : [];
  return route.fulfill({ json: { kind: "books#volumes", totalItems: items.length, items } });
}

export interface Reader {
  uid: string;
  name: string;
  email: string;
}

export const test = base.extend<{ stubs: { aiCalls: number } }>({
  stubs: [
    async ({ page }, use) => {
      const stubs = { aiCalls: 0 };
      await page.route("https://www.googleapis.com/books/v1/volumes**", books);
      await page.route("https://firebasevertexai.googleapis.com/**", (route) => {
        stubs.aiCalls++;
        return route.fulfill({ json: { candidates: [{ content: { role: "model", parts: [{ text: AI_REPLY }] }, finishReason: "STOP" }] } });
      });
      await page.route(/https:\/\/(books\.google\.com|lh3\.googleusercontent\.com)\/.*/, (route) => route.fulfill({ contentType: "image/png", body: PNG }));
      await page.route("https://apis.google.com/**", (route) => route.abort());
      await use(stubs);
    },
    { auto: true },
  ],
});
export { expect };

let readers = 0;

/** Signs a brand-new Google user in through the auth emulator and lands on the dashboard. */
export async function signIn(page: Page, name = "Ada Lovelace"): Promise<Reader> {
  const google = { uid: `google-${Date.now()}-${process.pid}-${++readers}`, name, email: `reader${readers}.${Date.now()}@example.com`, photo: "https://lh3.googleusercontent.com/a/reader" };
  await page.goto("/");
  await page.waitForFunction(() => "__signInAsGoogleUser" in window);
  const uid = await page.evaluate(
    async (u) => (await (window as unknown as { __signInAsGoogleUser: (u: object) => Promise<{ user: { uid: string } }> }).__signInAsGoogleUser(u)).user.uid,
    google,
  );
  const reader = { uid, name, email: google.email };
  await page.waitForURL("**/dashboard");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(name.split(" ")[0]);
  return reader;
}

type Value = string | number | boolean | Date | null | Value[] | { [k: string]: Value };

const encode = (v: Value): object => {
  if (v === null) return { nullValue: null };
  if (v instanceof Date) return { timestampValue: v.toISOString() };
  if (Array.isArray(v)) return { arrayValue: { values: v.map(encode) } };
  if (typeof v === "object") return { mapValue: { fields: Object.fromEntries(Object.entries(v).map(([k, x]) => [k, encode(x)])) } };
  if (typeof v === "number") return Number.isInteger(v) ? { integerValue: String(v) } : { doubleValue: v };
  return typeof v === "boolean" ? { booleanValue: v } : { stringValue: v };
};

/** Writes a document straight into the emulator as an admin (bypassing rules), the way legacy data already sits in production. */
export async function seed(uid: string, path: string, data: Record<string, Value>) {
  const res = await fetch(`http://127.0.0.1:8080/v1/projects/${PROJECT}/databases/(default)/documents/users/${uid}/${path}`, {
    method: "PATCH",
    headers: { Authorization: "Bearer owner", "Content-Type": "application/json" },
    body: JSON.stringify({ fields: Object.fromEntries(Object.entries(data).map(([k, v]) => [k, encode(v)])) }),
  });
  expect(res.ok, await res.text()).toBe(true);
}

/** Reads a collection straight from the emulator (admin), for asserting what the UI wrote. */
export async function read(uid: string, collection: string): Promise<Record<string, unknown>[]> {
  const res = await fetch(`http://127.0.0.1:8080/v1/projects/${PROJECT}/databases/(default)/documents/users/${uid}/${collection}?pageSize=300`, {
    headers: { Authorization: "Bearer owner" },
  });
  const decode = (f: Record<string, unknown>): unknown => {
    const [[type, v]] = Object.entries(f);
    if (type === "mapValue") return Object.fromEntries(Object.entries((v as { fields?: object }).fields ?? {}).map(([k, x]) => [k, decode(x)]));
    if (type === "arrayValue") return ((v as { values?: Record<string, unknown>[] }).values ?? []).map(decode);
    if (type === "integerValue") return Number(v);
    return v;
  };
  const { documents = [] } = (await res.json()) as { documents?: { name: string; fields: Record<string, Record<string, unknown>> }[] };
  return documents.map((d) => ({ id: d.name.split("/").pop(), ...(decode({ mapValue: { fields: d.fields } }) as object) }));
}
