# Transformation notes: Librarium

Legacy: git `b6304a9` (`scripts/legacy.sh` checks it out into `.legacy/`). Equivalence is **execution-based**: the legacy services and the new commands both run against the Firebase emulators in the same process and their Firestore documents and read models are compared.

## Proof

| Check | Command | Result |
| --- | --- | --- |
| Emulator oracle: legacy vs new, 13 scenarios, every document + stats/activity/comments/reviews/library views/search | `npm run test:oracle` | 13/13 equal after omitting the approved-deviation paths; each deviation's new behaviour asserted explicitly |
| Byte-level judge (plugin `compare.py`) | see `EQUIVALENCE.json` | PROVEN: 19 cases, 12 byte-identical (6 raw + 6 strict), 7 differing only by approved deviations |
| Differential properties vs legacy pure functions (fast-check, 400 runs each; also run at 4,000) | `npm test` | 18/18 |
| Deviation and new-function unit tests | `npm test` | 21/21 |
| Playwright E2E: production build + emulators, Google APIs stubbed, desktop + mobile | `npm run test:e2e` | 16/16 |
| Typecheck / lint / build | `npm run typecheck`, `npm run lint`, `npm run build` | clean, 0 warnings |

**Equivalence cases executed: 13 scenarios (≈150 user actions) + 18 properties × 400 inputs.**

**Canary:** changing the auto-finish threshold in `library.ts` from `page >= totalPages` to `page > totalPages` → **3 oracle scenarios failed** (S04, S05, S12); restored → green.

**Legacy data compatibility:** `tests/e2e/insights.spec.ts` seeds a library in the exact legacy document shape (including `progress.lastUpdated`, `genre: ""`, a manually finished book without `finishedAt`, review updates, events of a deleted book) and checks the new dashboard, statistics, activity history and book pages render it correctly.

## Approved deviations (pending the owner's sign-off)

Each is a legacy defect found during rule extraction. Data-level ones are omitted from the oracle's strict comparison and asserted on their own.

| ID | Change | Legacy rule | Pinned by |
| --- | --- | --- | --- |
| D1 | An out-of-range page on an unstarted book fails *before* the automatic start (legacy flipped the state, logged it, then failed) | RULE-158 | oracle S13 |
| D2 | Jumping from not_started straight to the last page finishes the book | RULE-160 | oracle S13 |
| D3 | `startedAt` is written on not_started → in_progress (declared and displayed, never written) | RULE-157 | oracle (all) |
| D4 | The reading streak counts distinct days (legacy counted two books finished the same day as two days) | RULE-007 | oracle S12, unit |
| D5 | The duplicate-review message drops "Use updateReview to modify it." | RULE-103 | oracle S07 |
| D6 | Clearing a rating in the edit dialog deletes it (legacy silently kept it) | RULE-165 | unit (`bookProblem`), E2E |
| D7 | 979-prefixed ISBNs are looked up whole (legacy converted them to the ISBN-10 of a *different* 978 book) | RULE-121 | unit |
| D8 | A manual edit to finished records `finishedAt` (and to in_progress, `startedAt`) when missing | RULE-163 | oracle S08 |
| D9 | The dashboard feed filters first and then takes 5/7 items, and is live (legacy took 6 events, then filtered, and only refreshed after comments/reviews) | RULE-025, 186 | unit |
| D10 | The 12-month chart and "this month" include the whole last day of each month | RULE-014 | unit |
| D11 | Activity-history date filters use local days and include the end date | RULE-035 | E2E |
| D12 | Library text search trims what was typed | RULE-036 | unit |

Additional UI-only corrections (no data impact): real error messages instead of "An unexpected error occurred" (RULE-147, 148); dialogs no longer report success on failure (RULE-135, 136); sign-in failures are shown and do not redirect (RULE-150); every app route is guarded (RULE-143); review text appears in the history (legacy read the wrong field); "1 star" singular; Recently Read ordered by finish date; the comment form shows the page that is stored; the delete dialog no longer claims history is erased; Google descriptions shown as text, not HTML (XSS fix); a working flashlight toggle; the same barcode can be scanned again after an error; one colour per genre across both charts; `/wishlist` opens the library filtered to the wishlist; the dead `/settings` link and `#` footer links are gone; profile creation happens only on a confirmed "not found" and is atomic with the welcome book; a Google account without an email can sign up.

## Legacy → new map

| Legacy (lines) | New |
| --- | --- |
| `repositories/*` (1,283), `services/*` (3,167), `providers/*` (2,018), `errors/*` (787) | `lib/library.ts`, `lib/store.tsx`, `lib/domain.ts` |
| `models/models.ts` (452), `services/types.ts`, `repositories/types.ts` | `lib/types.ts`, validators in `lib/domain.ts` |
| `books/book-utils.ts`, `books/book-validation.ts`, `utils/isbn-utils.ts`, `api/google-books-api.ts` (1,333) | `lib/books-api.ts`, `lib/domain.ts` (`editProblems`) |
| `services/UserService` stats, `EventService` activity, statistics page calculations, `utils/genre-colors.ts` | `lib/insights.ts` |
| `services/MessageService.ts`, `providers/MessageProvider.tsx` | `lib/ai.ts`, `dailyMessage` in `lib/library.ts`, `Companion` on the dashboard |
| `utils/pagination-utils.ts`, `hooks/usePagination.ts`, `ui/pagination*.tsx`, `ui/page-size-selector.tsx` (~830) | `pageList` + 20 lines in the activity page |
| `components/ui/*` (25 files) | `components/ui.tsx`, `components/toast.tsx` |
| `components/app/books/scanning/*`, `ui/image-cropper.tsx`, `utils/scanning-errors.ts` (~1,770) | `components/scanner.tsx` |
| `components/landing/*`, `hooks/useScrollAnimation.ts` (~1,500) | `app/page.tsx` (CSS scroll-driven reveals, native `<details>`) |
| `globals.css` (490) | `globals.css` (176) |

**Not migrated (dead or unreachable):** `importBooks`, `addBookFromISBN`, `getBooksByState`, `batchUpdateBooks`, `deleteBookEvents`, `deleteAllUserEvents`, `getMessageHistory`, `deleteOldMessages`, `updateUserStats`, `refreshMessage`, `getEventsByType/DateRange`, `advancedSearch`, `searchFreeEbooks`, `validateISBN13`, `formatISBN`, `convertISBN10to13`, `StatsGrid`/`StatCard`/`StatsSummaryCard`/`ReadingStreakCard`, the reading-goal section (never populated), the commented-out testimonial carousel and pricing/sponsors sections, `error-logging.ts` (console logging), `@/lib/design/colors.ts` (Tailwind class constants), `useIsMobile` (one responsive preview dialog replaces the separate mobile preview page).

## Size

| | Legacy | New | Change |
| --- | --- | --- | --- |
| App source lines (TS/TSX/CSS) | 26,523 in 142 files | 3,738 in 30 files | −86% |
| App source, non-whitespace characters | 562k | 153k | −73% (lines are longer now; characters are the fairer measure) |
| Test lines | 13,665 (mocked; 14 failing) | 1,696 (emulator, property-based, E2E) | −88% |
| Runtime dependencies | 23 | 12 | −11 |

## Follow-ups

- Owner: review D1–D12, the SME questions in BUSINESS_RULES.md, and restrict the Firebase web API key that appears in git history.
- Deploy `firestore.rules` (owner-only) if the console rules are looser.
- The Gemini prompt interpolates user-entered titles (prompt injection into the reader's own message); consider quoting or truncating them.
- `signInWithPopup` itself is exercised only manually: in CI the Google OAuth script host is unreachable, so E2E signs in through the auth emulator with a Google credential (an emulator-only hook compiled out of production builds).
