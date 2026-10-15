# Assessment: Librarium (legacy, git `b6304a9`)

## What it is

A personal reading tracker: Google sign-in, a library of books with a three-state reading lifecycle, page progress, ratings, comments, reviews, an append-only activity log, statistics and charts, Google Books search, barcode scanning and a daily Gemini-written "reading companion" message. Next.js 15 (App Router, React 19, all client components), Tailwind 4, Firebase Auth + Firestore, Firebase AI Logic (Gemini), Recharts.

## Inventory

| | Legacy | Notes |
| --- | --- | --- |
| App source (TS/TSX/CSS, excluding tests) | 142 files, 26,523 lines, 562k non-whitespace chars | |
| Tests | 49 suites, 13,665 lines | 780 pass, 14 fail, 18 skipped at `b6304a9`; mostly mocked unit tests of the layers themselves |
| `tsc --noEmit` | 16 errors | all in test files |
| `next lint` | ~60 warnings | `any`, unused vars |
| Runtime dependencies | 23 | 9 unused (lucide-react, embla-carousel, cmdk, 4 Radix packages, cva, storage) |

## Architecture

Strict four-layer pipeline: **Components → Providers → Services → Repositories → Firestore**, enforced by convention (`.cursor/rules/architecture.mdc`).

- 4 repository classes + 4 interfaces wrap Firestore calls and convert errors to strings.
- 5 service classes (`BookService` 928 lines, `EventService` 903, `UserService` 612, `MessageService` 338, `AuthService` 122) re-validate, re-wrap errors as `StandardError`, and return `ServiceResult<T>`.
- 5 React context providers (`BooksProvider` 814 lines) wrap every service call again in `try/catch`, logging and `ProviderResult<T>`.
- An error framework (`error-handling.ts` 489 lines, `error-logging.ts` 298) whose user messages are overwritten by the providers, so users see "An unexpected error occurred" for almost every failure (RULE-147).

Each user action passes through three hand-written result types and four error conversions; most service and repository methods (`importBooks`, `addBookFromISBN`, `getBooksByState`, `batchUpdateBooks`, `deleteBookEvents`, `getMessageHistory`, `cleanupOldMessages`, `updateUserStats`, …) have no callers.

## Debt and defects (selection; full list in BUSINESS_RULES.md)

- **Data integrity:** book updates and their audit events are separate, unchecked writes; progress validation runs after an automatic state change (RULE-158); a jump to the last page never finishes an unstarted book (RULE-160); `startedAt` is declared and displayed but never written (RULE-157); manual "finished" books get no `finishedAt` and vanish from monthly/yearly stats (RULE-163); a profile can be re-created (and a second welcome book added) after a transient read failure (RULE-168).
- **Stale UI:** activity, comments and history only refresh after comment/review actions (RULE-185, 186); the dashboard feed fetches 6 events and filters afterwards.
- **Swallowed errors:** dialogs report success on failure (RULE-135, 136); sign-in failures still redirect (RULE-150).
- **Test-shaped production code:** `generateVisiblePages` hard-codes test fixtures (RULE-043).
- **Dead UI:** `StatsGrid`, `StatCard`, `StatsSummaryCard`, `ReadingStreakCard`, the reading-goal section, a `/settings` link to a missing page, a non-functional wishlist page, a fake torch toggle, footer links to `#`.

## Security

| Finding | Severity | Status in rewrite |
| --- | --- | --- |
| Google Books descriptions rendered with `dangerouslySetInnerHTML` (BookPreviewDialog, BookPreviewPage) | Medium (XSS from third-party content) | Fixed: rendered as text via `plainText()` |
| No Firestore security rules in the repository; only the dashboard route was guarded | Medium (depends on console config) | `firestore.rules` (owner-only) added and exercised by the emulator suites; all app routes guarded |
| User-entered names/titles interpolated into the Gemini prompt | Low (prompt injection into the reader's own message) | Unchanged behaviour; noted |
| A Firebase web API key was once committed (`AIzaSyBX****`, in git history) | Info (web keys are public identifiers) | Recommend API restrictions in Google Cloud console |
| Cover images stored as `http://` URLs (mixed content) | Low | Displayed via `https://` |

## Recommended pattern

Same platform, rebuilt from intent (plugin "transform", whole system): keep Next.js + Firestore and the **exact document schema** (live data must keep working), collapse the four layers into a typed domain module plus batched Firestore commands and live listeners, and prove equivalence by running legacy and new code side by side against the Firebase emulators.
