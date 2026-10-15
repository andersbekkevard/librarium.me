# Architecture

Librarium is a client-rendered Next.js app talking directly to Firebase. There are three layers, and each is just modules and functions:

```
pages & components ──useLibrary()──▶ commands (lib/library.ts) ──▶ Firestore
        │                                   │
        └──── pure rules & read models ◀────┘
              (lib/domain.ts, lib/insights.ts)
```

## Modules

| File | Responsibility |
| --- | --- |
| `src/lib/types.ts` | Domain types; the Firestore schema contract (see `analysis/librarium/DATA_OBJECTS.md`) |
| `src/lib/domain.ts` | Pure rules: state machine, validation with reader-facing messages, progress, library query and search, comments and reviews from events |
| `src/lib/insights.ts` | Pure read models: stats, streak, activity feed, monthly pages, genre distribution, pace |
| `src/lib/library.ts` | Every write, one `writeBatch` per action (book change + its audit events), plus live watchers and the daily message |
| `src/lib/books-api.ts` | Google Books search, ISBN handling, volume or manual entry → book |
| `src/lib/ai.ts` | Gemini prompt and fallback messages |
| `src/lib/firebase.ts` | App, auth, Firestore; connects to the emulators when `NEXT_PUBLIC_FIREBASE_EMULATORS=true` |
| `src/lib/store.tsx` | `LibraryProvider`: auth state, profile bootstrap, live books and events, and every command bound to the signed-in user |
| `src/components/ui.tsx` | Design-system primitives (button, card, inputs, badges, stars, cover, dialog, segmented control) |
| `src/components/*` | Shell (header, sidebar, quick search, user menu), book cards, edit dialog, scanner, toasts |
| `src/app/**` | One file per route; `(app)/layout.tsx` guards every signed-in route |

## Conventions

- **Reads are live.** `watchBooks` and `watchEvents` stream into the provider; derived data (stats, activity, comments, reviews) is computed with pure functions, so nothing needs a manual refresh.
- **Writes are commands.** A command validates with `domain.ts`, then commits the document change and its events in one batch. Failures throw an `Error` whose message is meant for the reader; the UI shows it with `attempt(promise, successText)` from `components/toast.tsx`.
- **Events are the history.** Comments and reviews exist only as events; the latest review event wins. Deleting a book keeps its earlier events.
- **Timestamps** are client-side and strictly increasing within a session (`stamp()`), so events written in one batch keep their order.
- **Styling** uses the Tailwind tokens defined in `src/app/globals.css` (light and dark), plus the shared animation utilities there (`animate-rise`, `reveal`, …), which respect reduced motion.

## Adding a feature

1. Add or extend the type in `types.ts` and any rule in `domain.ts` (with a unit test in `tests/unit`).
2. Add a command in `library.ts` and list it in `COMMANDS` in `store.tsx`; it is then available as `useLibrary().actions.yourCommand(...)` with the uid bound.
3. Build the UI from `components/ui.tsx`.

## Testing

| Suite | Location | Runs against |
| --- | --- | --- |
| Unit + property-based differential tests (fast-check vs the legacy pure functions) | `tests/unit` | nothing external |
| Equivalence oracle: 13 scenarios executed by the legacy services and the new commands | `tests/oracle` | Firebase emulators |
| End to end, desktop and mobile | `tests/e2e` | production build + emulators, Google APIs stubbed |

The legacy code is checked out on demand into `.legacy/` by `scripts/legacy.sh`.
