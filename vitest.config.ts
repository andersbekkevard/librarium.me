import path from "node:path";
import { defineConfig, type Plugin } from "vitest/config";

/** `@/` resolves to src/, or to the legacy worktree's src/ when the importer lives there. */
const aliases: Plugin = {
  name: "librarium-aliases",
  enforce: "pre",
  resolveId(source, importer) {
    if (!source.startsWith("@/")) return null;
    const root = importer?.includes(`${path.sep}.legacy${path.sep}`) ? ".legacy/src" : "src";
    return this.resolve(path.resolve(import.meta.dirname, root, source.slice(2)), importer, { skipSelf: true });
  },
};

const firebaseEnv = {
  NEXT_PUBLIC_FIREBASE_API_KEY: "demo-key",
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: "demo-librarium.firebaseapp.com",
  NEXT_PUBLIC_FIREBASE_PROJECT_ID: "demo-librarium",
  NEXT_PUBLIC_FIREBASE_APP_ID: "1:000000000000:web:demo",
  NEXT_PUBLIC_FIREBASE_EMULATORS: "true",
  NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY: "demo-books-key",
};

export default defineConfig({
  plugins: [aliases],
  test: {
    env: firebaseEnv,
    server: { deps: { inline: [/firebase/] } },
    projects: [
      { extends: true, test: { name: "unit", include: ["tests/unit/**/*.test.ts"], environment: "node" } },
      {
        extends: true,
        test: { name: "oracle", include: ["tests/oracle/**/*.test.ts"], environment: "node", testTimeout: 120_000, hookTimeout: 120_000, fileParallelism: false },
      },
    ],
  },
});
