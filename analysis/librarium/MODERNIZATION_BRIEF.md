# Modernization brief: Librarium

**Goal (from the owner's brief):** take ownership of Librarium and modernize it as far as possible: clean, idiomatic TypeScript with the middle layers removed, feature parity proven end to end against the live database schema on a local machine, at least half the code, and UI touch-ups for consistency, taste and motion.

**Checkpoints.** The plugin's human gates (rule review, brief approval, accepting differences, signing the proof) were exercised by Claude under that brief; every judgement call is listed in TRANSFORMATION_NOTES.md as **pending the owner's sign-off**. Nothing outside this repository (Firebase project, production data) was touched.

## Target

| Concern | Before | After | Why |
| --- | --- | --- | --- |
| Framework | Next 15.3, React 19.0 | Next 16.4 (Turbopack), React 19.3 | current majors; no API breaks for a client-rendered app |
| Firebase | 11 | 12.19 | latest line that runs on Node 20/22 (13 requires Node 24) |
| Layers | Components → Providers → Services → Repositories | Components → `useLibrary()` → typed commands | one validation and one error path per action |
| Writes | sequential, unchecked | one `writeBatch` per action (book update + audit events) | history can no longer disagree with the book |
| Reads | one-off fetches + manual refresh | live `onSnapshot` on books and events | activity, comments and stats are never stale |
| Errors | three result wrappers, generic UI text | thrown `Error` with the reader-facing message, shown as a toast | real reasons reach the reader |
| UI kit | 25 shadcn/custom files, 9 unused deps | one `ui.tsx`, Radix only for dialogs | consistency and size |
| Tests | 13.7k lines of mocked layer tests (14 failing) | emulator oracle + property-based differential + Playwright E2E | proof against real Firestore and the legacy code |
| Tooling | Jest, `next lint` | Vitest 5, ESLint 10 flat config, Playwright 1.56 | `next lint` is removed in Next 16 |

## Module map

```
src/lib/types.ts       domain types (the schema contract, see DATA_OBJECTS.md)
src/lib/domain.ts      pure rules: state machine, validation, progress, library query/search, comments, reviews
src/lib/insights.ts    pure read models: stats, streak, activity feed, charts, pace
src/lib/library.ts     every Firestore write (batched) + live watchers + daily AI message
src/lib/books-api.ts   Google Books search, ISBN handling, volume/manual → book
src/lib/ai.ts          Gemini prompt, fallback messages
src/lib/store.tsx      LibraryProvider: auth, profile, live books/events, bound commands
src/components/*       ui primitives, shell, cards, dialogs, scanner, toasts
src/app/**             one file per route
```

## Phases (all completed in this change)

1. **Preflight + assess** — `ASSESSMENT.md`. Command: `assess`.
2. **Extract rules** — 195 cards in `BUSINESS_RULES.md`, schema in `DATA_OBJECTS.md`. Command: `extract-rules`.
3. **Characterize** — `tests/oracle`: 13 scenarios recorded from the legacy services against the emulators. Entry: emulators run locally. Exit: legacy dumps recorded.
4. **Transform the data layer** — Command: `transform`. Exit: oracle 13/13 equal modulo listed deviations; canary turns it red.
5. **Transform the UI** — Exit: typecheck, lint (0 warnings), build, E2E green on desktop and mobile.
6. **Verify** — differential property tests, `compare.py` → `EQUIVALENCE.json`, notes. Command: `verify`.
