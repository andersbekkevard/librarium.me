# Data objects: the Firestore schema contract

Firestore is schemaless, so the live schema *is* what the legacy code wrote. These shapes were taken from the legacy writers (see BUSINESS_RULES.md) and are pinned by `tests/oracle` (both implementations write them; documents are compared field by field) and by `tests/e2e/insights.spec.ts` (documents in exactly the legacy shape are seeded into the emulator and rendered by the new UI). Types live in `src/lib/types.ts`.

All data sits under `users/{uid}/…`; `firestore.rules` restricts every path to its owner.

## `users/{uid}/profile/main`

| Field | Type | Written | Notes |
| --- | --- | --- | --- |
| `id` | string | create | the uid (readers rely on it: the doc id is `main`) |
| `displayName` | string | create | `"Anonymous User"` when Google gives none |
| `email` | string | create | `""` when absent (legacy then failed to create the profile; the rewrite allows it) |
| `photoURL` | string? | create | omitted when absent |
| `emailVerified` | boolean | create | |
| `lastSignInTime` | string | create | Firebase Auth metadata string, `""` fallback; never refreshed (legacy behaviour kept) |
| `totalBooksRead`, `currentlyReading`, `booksInLibrary` | number | create (0) | never maintained by either version; live counts are computed |
| `createdAt`, `updatedAt` | Timestamp | create | client time |

Created once, on first sign-in, together with the welcome book (one batch in the rewrite).

## `users/{uid}/books/{autoId}`

| Field | Type | Notes |
| --- | --- | --- |
| `title`, `author` | string | non-blank |
| `state` | `"not_started" \| "in_progress" \| "finished"` | forward-only machine except manual edits |
| `progress` | `{ currentPage, totalPages, lastUpdated? }` | `lastUpdated` (Timestamp) is added by progress updates and dropped by manual edits — kept for schema parity |
| `isOwned` | boolean | `false` = wishlist; Google adds default to wishlist |
| `rating` | number? 1–5 | manual edits may now delete it (`deleteField`) |
| `isbn`, `coverImage`, `publishedDate`, `description`, `genre` | string? | may be `""` (Google books without categories; manual edits of blank fields) |
| `notes` | string? | only on the welcome book |
| `addedAt`, `updatedAt` | Timestamp | |
| `startedAt` | Timestamp? | **new writer**: set on not_started → in_progress (declared but never written by legacy; D3) |
| `finishedAt` | Timestamp? | set on → finished; also by a manual edit to finished when missing (D8) |

## `users/{uid}/events/{autoId}` (append-only)

Envelope: `{ type, bookId, userId, timestamp: Timestamp, data }`. The rewrite writes timestamps that strictly increase within a process so that events committed in one batch keep their order.

| `type` | `data` |
| --- | --- |
| `state_change` | `{ previousState, newState }` |
| `progress_update` | `{ previousPage, newPage }` |
| `rating_added` | `{ rating }` |
| `comment` | `{ comment (trimmed), commentState, commentPage }` |
| `review` | `{ review (trimmed), reviewCreatedAt, reviewUpdatedAt }` — an update appends a new event keeping `reviewCreatedAt`; the latest wins |
| `manual_update` | `{ comment: "Manual update: <keys>" \| "Book added via barcode scanning (…)", commentState, commentPage }` |
| `delete_book` | `{ deletedBookTitle, deletedBookAuthor }` (`"Unknown Book"`/`"Unknown Author"` fallbacks); the book's earlier events are kept |

Read window: the newest 1,000 events (both versions).

## `users/{uid}/messages/{autoId}`

`{ userId, content (10–500 chars when AI-written), timestamp }`. At most one generated per calendar day unless refreshed; never cleaned up (both versions).

## Indexes

The rewrite queries only single-field orderings (`addedAt`, `timestamp`) and one equality filter (`bookId`), all served by Firestore's automatic indexes; legacy's `bookId + timestamp` composite query is gone.
