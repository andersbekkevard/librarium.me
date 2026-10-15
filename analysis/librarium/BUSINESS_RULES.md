# Business rules: Librarium (legacy, git b6304a9)

Extracted with the code-modernization plugin's Method B: three read-only extractor agents (calculations, validations, lifecycle) over the pinned legacy worktree, every `file:line` citation re-read by the agent before it was reported. Paths are relative to the legacy tree (`scripts/legacy.sh` recreates it in `.legacy/`).

195 rules: 75 calculations, 79 validations, 41 lifecycle/policy; 35 are P0. **How each rule fares in the rewrite** — kept, fixed (a listed deviation) or dropped as dead code — is in `TRANSFORMATION_NOTES.md`; the behaviour contract is enforced by `tests/oracle` (data) and `tests/unit/differential.test.ts` (pure functions).

| ID | Rule | Category | Priority | Source | Confidence |
| --- | --- | --- | --- | --- | --- |
| RULE-001 | Book progress percentage | Calculation | P0 | `src/lib/books/book-utils.ts:121-134` | High |
| RULE-002 | Auto-finish when the current page reaches total pages | Calculation | P0 | `src/lib/services/BookService.ts:319-326` | High |
| RULE-003 | "Start reading" seeds progress at page 1 | Calculation | P1 | `src/components/app/book-detail/BookDetailPage.tsx:86-98` | High. |
| RULE-004 | Reading streak | Calculation | P1 | `src/lib/services/UserService.ts:558-589` | High |
| RULE-005 | Total pages read (event-based, primary) | Calculation | P0 | `src/lib/services/UserService.ts:443-447` | High. |
| RULE-006 | Total pages read (books-based fallback) | Calculation | P1 | `src/lib/services/UserService.ts:504-507` | High. |
| RULE-007 | Stats recompute trigger and 1000-event cap | Calculation | P1 | `src/lib/services/UserService.ts:408-425` | High. |
| RULE-008 | Average rating | Calculation | P1 | `src/lib/services/UserService.ts:450-455` | High. |
| RULE-009 | Books read this month | Calculation | P1 | `src/lib/services/UserService.ts:464-471` | High. |
| RULE-010 | Books read this year | Calculation | P1 | `src/lib/services/UserService.ts:473-477` | High. |
| RULE-011 | Library state counts | Calculation | P1 | `src/lib/services/UserService.ts:481-484` | High. |
| RULE-012 | Favorite genres (top 3 by count) | Calculation | P2 | `src/lib/services/UserService.ts:594-608` | High. |
| RULE-013 | Stored profile counters (updateUserStats) | Calculation | P1 | `src/lib/services/UserService.ts:288-294` | Medium |
| RULE-014 | 12-month pages-read-by-genre series | Calculation | P1 | `src/app/(app)/statistics/page.tsx:29-94` | High. |
| RULE-015 | Genre distribution percentages (pie) | Calculation | P2 | `src/app/(app)/statistics/page.tsx:97-119` | High. |
| RULE-016 | Reading velocity (daily pace) | Calculation | P1 | `src/app/(app)/statistics/page.tsx:122-146` | High |
| RULE-017 | Current month pages | Calculation | P2 | `src/app/(app)/statistics/page.tsx:159-163` | High. |
| RULE-018 | Activity chart tooltip and legend limits | Calculation | P2 | `src/app/(app)/statistics/page.tsx:368-392` | High. |
| RULE-019 | Statistics summary display values | Calculation | P2 | `src/app/(app)/statistics/page.tsx:586-647` | High. |
| RULE-020 | Annual reading goal progress (never populated) | Calculation | P2 | `src/app/(app)/statistics/page.tsx:653-693` | High. |
| RULE-021 | Genre color assignment | Calculation | P2 | `src/lib/utils/genre-colors.ts:42-58` | High. |
| RULE-022 | Dashboard stats mapping | Calculation | P1 | `src/app/(app)/dashboard/page.tsx:21-39` | High. |
| RULE-023 | Dashboard header stats ribbon | Calculation | P2 | `src/components/app/dashboard/DashboardHeader.tsx:70-135` | High. |
| RULE-024 | Greeting by time of day and display name | Calculation | P2 | `src/components/app/dashboard/DashboardHeader.tsx:40-55` | High. |
| RULE-025 | Dashboard recent-activity limit (5 vs 7) | Calculation | P2 | `src/components/app/dashboard/RecentActivitySection.tsx:104-119` | High. |
| RULE-026 | Activity items require the book to still exist | Calculation | P1 | `src/lib/services/EventService.ts:733-764` | High. |
| RULE-027 | State-change classification for activity feed | Calculation | P2 | `src/lib/services/EventService.ts:769-804` | High. |
| RULE-028 | Progress activity details string | Calculation | P2 | `src/lib/services/EventService.ts:809-822` | High. |
| RULE-029 | Progress activity sentence rendering | Calculation | P2 | `src/components/app/dashboard/RecentActivitySection.tsx:67-80` | High. |
| RULE-030 | Rating activity details | Calculation | P2 | `src/lib/services/EventService.ts:827-839` | High. |
| RULE-031 | Comment / manual-update details truncation | Calculation | P2 | `src/lib/services/EventService.ts:844-860` | High. |
| RULE-032 | Time-ago formatting (dashboard) | Calculation | P2 | `src/components/app/dashboard/RecentActivitySection.tsx:18-35` | High. |
| RULE-033 | Activity-history event title | Calculation | P2 | `src/components/app/activity/ActivityDetail.tsx:89-121` | High. |
| RULE-034 | Activity-history detail rows | Calculation | P2 | `src/components/app/activity/ActivityDetail.tsx:138-176` | High. |
| RULE-035 | Activity-history filtering and date range | Calculation | P2 | `src/app/(app)/activity-history/page.tsx:51-79` | High. |
| RULE-036 | In-library search relevance ranking | Calculation | P1 | `src/lib/services/BookService.ts:578-645` | High. |
| RULE-037 | Header search fallback, debounce and caching | Calculation | P2 | `src/components/app/layout/SearchDropdown.tsx:83-97` | High. |
| RULE-038 | Library filters (status, ownership, genre, search) | Calculation | P1 | `src/lib/services/BookService.ts:659-693` | High. |
| RULE-039 | Library sort keys | Calculation | P1 | `src/lib/services/BookService.ts:696-733` | High. |
| RULE-040 | Available genres list for filter | Calculation | P2 | `src/lib/providers/BooksProvider.tsx:714-732` | High. |
| RULE-041 | Dashboard book sections (limits and order) | Calculation | P2 | `src/components/app/dashboard/BookSection.tsx:31-31` | High. |
| RULE-042 | Pagination core math | Calculation | P2 | `src/lib/utils/pagination-utils.ts:26-52` | High. |
| RULE-043 | Visible page numbers with ellipsis | Calculation | P2 | `src/lib/utils/pagination-utils.ts:57-151` | High. |
| RULE-044 | Item range display | Calculation | P2 | `src/lib/utils/pagination-utils.ts:205-218` | High. |
| RULE-045 | Safe page clamp | Calculation | P2 | `src/lib/utils/pagination-utils.ts:223-227` | High. |
| RULE-046 | Page size validation | Calculation | P2 | `src/lib/utils/pagination-utils.ts:156-168` | High. |
| RULE-047 | Page size persistence | Calculation | P2 | `src/lib/utils/pagination-utils.ts:173-187` | High. |
| RULE-048 | Custom page size entry | Calculation | P2 | `src/components/ui/page-size-selector.tsx:67-76` | High. |
| RULE-049 | Page size change resets to page 1 | Calculation | P2 | `src/lib/hooks/usePagination.ts:111-120` | High. |
| RULE-050 | Extract ISBN from barcode text | Calculation | P1 | `src/lib/utils/isbn-utils.ts:26-68` | High. |
| RULE-051 | ISBN-13 → ISBN-10 for Google Books lookup (stripISBNPrefix) | Calculation | P1 | `src/lib/utils/isbn-utils.ts:295-324` | High. |
| RULE-052 | ISBN-10 → ISBN-13 conversion (unused) | Calculation | P2 | `src/lib/utils/isbn-utils.ts:255-279` | High. |
| RULE-053 | Google Books result-count clamp | Calculation | P2 | `src/lib/api/google-books-api.ts:276-282` | High. |
| RULE-054 | Format authors list | Calculation | P1 | `src/lib/api/google-books-api.ts:485-492` | High. |
| RULE-055 | Best thumbnail selection | Calculation | P2 | `src/lib/api/google-books-api.ts:451-462` | High. |
| RULE-056 | Best ISBN selection | Calculation | P1 | `src/lib/api/google-books-api.ts:469-478` | High. |
| RULE-057 | Google Books volume → Book defaults | Calculation | P1 | `src/lib/books/book-utils.ts:25-53` | High. |
| RULE-058 | Manual entry → Book conversion | Calculation | P1 | `src/lib/books/book-utils.ts:84-119` | High. |
| RULE-059 | Published year display from Google date | Calculation | P2 | `src/components/app/books/BookSearchCard.tsx:92-97` | High. |
| RULE-060 | AI message freshness (same calendar day) | Calculation | P2 | `src/lib/services/MessageService.ts:56-58` | High. |
| RULE-061 | AI message generation and fallback flow | Calculation | P2 | `src/lib/services/MessageService.ts:200-281` | High. |
| RULE-062 | Fallback message selection thresholds | Calculation | P2 | `src/lib/services/MessageService.ts:173-194` | High. |
| RULE-063 | AI message validity length | Calculation | P2 | `src/lib/models/models.ts:401-407` | High. |
| RULE-064 | AI prompt computed inputs | Calculation | P2 | `src/lib/services/MessageService.ts:63-157` | High. |
| RULE-065 | Old AI message cleanup cutoff (unused) | Calculation | P2 | `src/lib/services/MessageService.ts:313-334` | High. |
| RULE-066 | Recently-added list size | Calculation | P2 | `src/components/app/books/AddBooksPage.tsx:132-139` | High. |
| RULE-067 | Barcode scan duration logged | Calculation | P2 | `src/components/app/books/AddBooksPage.tsx:142-155` | Medium |
| RULE-068 | Book card progress block guard | Calculation | P2 | `src/components/app/books/BookCard.tsx:100-115` | High. |
| RULE-069 | Progress bar width clamp | Calculation | P2 | `src/components/ui/progress-bar.tsx:47-47` | High. |
| RULE-070 | Profile "Reader since" year | Calculation | P2 | `src/components/app/layout/UserProfileDropdown.tsx:119-123` | High. |
| RULE-071 | Review "edited" detection | Calculation | P2 | `src/components/app/book-detail/reviews/ReviewSection.tsx:119-122` | High. |
| RULE-072 | Comment page label | Calculation | P2 | `src/components/app/book-detail/comments/CommentItem.tsx:26-30` | High. |
| RULE-073 | Comments collapsed view count | Calculation | P2 | `src/components/app/book-detail/comments/CommentsSection.tsx:129-176` | High. |
| RULE-074 | Search "Add" suggestion truncation | Calculation | P2 | `src/components/app/layout/SearchDropdown.tsx:438-440` | High. |
| RULE-075 | Published-date year window (edit validation) | Calculation | P2 | `src/lib/books/book-validation.ts:259-264` | High. |
| RULE-076 | Reading progress must stay within the book's page bounds | Validation | P0 | `src/lib/models/models.ts:202-207` | High |
| RULE-077 | A rating must be a number from 1 to 5 | Validation | P0 | `src/lib/models/models.ts:226-231` | High |
| RULE-078 | A comment must be 1 to 2000 characters after trimming | Validation | P1 | `src/lib/models/models.ts:305-311` | High |
| RULE-079 | A comment's page must be between 0 and the book's total pages | Validation | P1 | `src/lib/models/models.ts:332-343` | High |
| RULE-080 | A review must be 10 to 5000 characters after trimming | Validation | P1 | `src/lib/models/models.ts:362-368` | High |
| RULE-081 | AI-generated personalised messages must be 10 to 500 characters | Validation | P1 | `src/lib/models/models.ts:401-407` | High |
| RULE-082 | Invalid or failed AI messages fall back to the previous message or a canned one | Validation | P2 | `src/lib/services/MessageService.ts:224-246` | Medium |
| RULE-083 | Reading state must be one of three values | Validation | P1 | `src/lib/models/models.ts:147-149` | High |
| RULE-084 | Reading state may only move forward one step | Validation | P0 | `src/lib/models/models.ts:419-452` | High |
| RULE-085 | Book data checks on add and update | Validation | P0 | `src/lib/services/BookService.ts:70-88` | High |
| RULE-086 | Current page cannot be negative | Validation | P0 | `src/lib/services/BookService.ts:243-248` | High |
| RULE-087 | A progress update needs an existing book | Validation | P1 | `src/lib/services/BookService.ts:251-263` | High |
| RULE-088 | Current page cannot exceed total pages, when total pages is known | Validation | P0 | `src/lib/services/BookService.ts:280-287` | High |
| RULE-089 | First progress on an unstarted book starts it; reaching the last page finishes it | Validation | P1 | `src/lib/services/BookService.ts:320-326` | High |
| RULE-090 | State changes must follow the state machine and need a known current state | Validation | P0 | `src/lib/services/BookService.ts:349-379` | High |
| RULE-091 | Rating updates must be 1 to 5 (the service does not check whether the book is finished) | Validation | P0 | `src/lib/services/BookService.ts:433-438` | High |
| RULE-092 | Book search inside the user's library ignores blank queries | Validation | P2 | `src/lib/services/BookService.ts:584-586` | High |
| RULE-093 | Book repository errors are turned into user-facing messages | Validation | P0 | `src/lib/services/BookService.ts:43-65` | Medium |
| RULE-094 | Adding a book by ISBN requires a non-blank ISBN | Validation | P1 | `src/lib/services/BookService.ts:843-851` | High |
| RULE-095 | ISBN lookup with no result tells the user to use Manual Entry | Validation | P1 | `src/lib/services/BookService.ts:854-864` | High |
| RULE-096 | ISBN-add exceptions are mapped to rate-limit, network or service-unavailable errors | Validation | P2 | `src/lib/services/BookService.ts:882-922` | High |
| RULE-097 | Event operations require a user ID and a book ID | Validation | P1 | `src/lib/services/EventService.ts:319-331` | High |
| RULE-098 | The service rejects comments outside 1 to 2000 characters | Validation | P1 | `src/lib/services/EventService.ts:333-340` | High |
| RULE-099 | A comment needs an existing book and a valid page | Validation | P1 | `src/lib/services/EventService.ts:343-357` | High |
| RULE-100 | The service rejects reviews outside 10 to 5000 characters | Validation | P1 | `src/lib/services/EventService.ts:473-480` | High |
| RULE-101 | A review needs an existing book | Validation | P1 | `src/lib/services/EventService.ts:483-489` | High |
| RULE-102 | Only finished books can be reviewed | Validation | P0 | `src/lib/services/EventService.ts:492-499` | High |
| RULE-103 | Only one review per book | Validation | P0 | `src/lib/services/EventService.ts:502-510` | High |
| RULE-104 | Updating a review requires an existing review | Validation | P1 | `src/lib/services/EventService.ts:583-589` | High |
| RULE-105 | User profile fields cannot be blank or negative | Validation | P1 | `src/lib/services/UserService.ts:103-135` | High |
| RULE-106 | Default values for a new user profile | Validation | P1 | `src/lib/services/UserService.ts:183-199` | Medium |
| RULE-107 | User repository errors are turned into user-facing messages | Validation | P1 | `src/lib/services/UserService.ts:74-98` | High |
| RULE-108 | The edit form requires a title and an author | Validation | P0 | `src/lib/books/book-validation.ts:34-48` | High |
| RULE-109 | The edit form rejects unknown reading states and non-boolean ownership | Validation | P1 | `src/lib/books/book-validation.ts:51-98` | High |
| RULE-110 | Edit-form progress must be numeric, non-negative and not above total pages | Validation | P0 | `src/lib/books/book-validation.ts:115-141` | High |
| RULE-111 | Edit-form rating must be a whole number from 1 to 5 | Validation | P1 | `src/lib/books/book-validation.ts:152-167` | High |
| RULE-112 | Edit-form ISBN must be a well-formed ISBN-10 or ISBN-13 (no checksum) | Validation | P1 | `src/lib/books/book-validation.ts:178-200` | High |
| RULE-113 | Cover image URL must parse and look like an image or come from Google Books | Validation | P1 | `src/lib/books/book-validation.ts:211-233` | Medium |
| RULE-114 | Published date must be YYYY, YYYY-MM or YYYY-MM-DD with a plausible year | Validation | P1 | `src/lib/books/book-validation.ts:244-287` | High |
| RULE-115 | Text fields have a 500-character limit and required fields cannot be blank (live hint) | Validation | P2 | `src/lib/books/book-validation.ts:308-330` | Medium |
| RULE-116 | Numeric fields have min/max checks (live hint) | Validation | P2 | `src/lib/books/book-validation.ts:343-369` | High |
| RULE-117 | ISBN checksum validation, lenient for 13 digits | Validation | P1 | `src/lib/utils/isbn-utils.ts:87-105` | High |
| RULE-118 | ISBN-10 checksum | Validation | P1 | `src/lib/utils/isbn-utils.ts:117-139` | High |
| RULE-119 | Strict ISBN-13 checksum (not used) | Validation | P2 | `src/lib/utils/isbn-utils.ts:178-203` | High |
| RULE-120 | A barcode must contain something that looks like an ISBN | Validation | P1 | `src/lib/utils/isbn-utils.ts:26-68` | High |
| RULE-121 | 979-prefixed ISBNs are wrongly converted to ISBN-10 for lookup | Validation | P1 | `src/lib/utils/isbn-utils.ts:295-324` | Medium |
| RULE-122 | What the scanner does with each search result | Validation | P1 | `src/components/app/books/scanning/BarcodeScanner.tsx:97-114` | High |
| RULE-123 | Uploaded barcode images must be JPEG, PNG or WebP and at most 10 MB | Validation | P1 | `src/components/app/books/scanning/ImageUploader.tsx:54-67` | High |
| RULE-124 | Image scanning needs browser BarcodeDetector support and a detectable barcode | Validation | P2 | `src/components/app/books/scanning/ImageUploader.tsx:78-163` | High |
| RULE-125 | Camera scanning needs camera support and permission | Validation | P2 | `src/components/app/books/scanning/CameraScanner.tsx:45-72` | High |
| RULE-126 | Duplicate camera scans are ignored, with a 1.5-second cooldown | Validation | P2 | `src/components/app/books/scanning/CameraScanner.tsx:89-110` | Medium |
| RULE-127 | Google Books calls require an API key | Validation | P1 | `src/lib/api/google-books-api.ts:156-169` | High |
| RULE-128 | Google Books HTTP errors are mapped to user messages | Validation | P1 | `src/lib/api/google-books-api.ts:192-229` | High |
| RULE-129 | Network failures on Google Books requests become network errors | Validation | P2 | `src/lib/api/google-books-api.ts:237-250` | High |
| RULE-130 | Blank Google searches return nothing, and result count is capped at 40 | Validation | P2 | `src/lib/api/google-books-api.ts:269-282` | High |
| RULE-131 | Advanced search needs at least one criterion (not used) | Validation | P2 | `src/lib/api/google-books-api.ts:409-416` | High |
| RULE-132 | Only finished books can be rated in the UI | Validation | P1 | `src/components/app/book-detail/BookDetailPage.tsx:63-71` | High |
| RULE-133 | The "Add Review" button is shown only for finished books with no review | Validation | P2 | `src/components/app/book-detail/BookCover.tsx:157-166` | High |
| RULE-134 | The progress form is shown only for in-progress books, and blank input means page 0 | Validation | P2 | `src/components/app/book-detail/ProgressTracker.tsx:31-39` | High |
| RULE-135 | The review dialog checks length before saving | Validation | P1 | `src/components/app/book-detail/reviews/ReviewDialog.tsx:38-70` | High |
| RULE-136 | The comment form checks length before saving | Validation | P1 | `src/components/app/book-detail/comments/CommentForm.tsx:35-55` | High |
| RULE-137 | Manual entry requires title and author | Validation | P1 | `src/components/app/books/ManualEntryForm.tsx:80-133` | High |
| RULE-138 | How a manual entry is turned into a book record | Validation | P1 | `src/lib/books/book-utils.ts:92-119` | High |
| RULE-139 | The edit sheet blocks saving only on full-form validation | Validation | P0 | `src/components/app/books/EditBookSheet.tsx:233-258` | High |
| RULE-140 | The edit sheet cannot clear a rating | Validation | P1 | `src/components/app/books/EditBookSheet.tsx:218-228` | High |
| RULE-141 | Live page-number checks in the edit sheet (total pages at least 1) | Validation | P2 | `src/components/app/books/EditBookSheet.tsx:107-134` | High |
| RULE-142 | Live text-field checks in the edit sheet (500-character limit) | Validation | P2 | `src/components/app/books/EditBookSheet.tsx:139-182` | Medium |
| RULE-143 | Signed-out users are sent from the dashboard to the landing page | Validation | P0 | `src/app/(app)/dashboard/page.tsx:43-65` | Medium |
| RULE-144 | Signed-in users are sent from the landing page to the dashboard | Validation | P1 | `src/app/(landing)/page.tsx:20-30` | High |
| RULE-145 | The book detail page shows "Book not found" for missing or inaccessible books | Validation | P1 | `src/app/(app)/books/[id]/page.tsx:23-65` | High |
| RULE-146 | Provider actions need a signed-in user | Validation | P0 | `src/lib/providers/BooksProvider.tsx:126-130` | High |
| RULE-147 | Book validation messages are replaced by a generic error in the UI | Validation | P0 | `src/lib/providers/BooksProvider.tsx:343-347` | High |
| RULE-148 | Comment and review validation messages are replaced by generic text in the UI | Validation | P1 | `src/lib/providers/EventsProvider.tsx:158-165` | High |
| RULE-149 | Firebase sign-in error codes are mapped to friendly messages | Validation | P1 | `src/lib/errors/error-handling.ts:177-224` | High |
| RULE-150 | Failed sign-in still shows success and redirects | Validation | P1 | `src/components/landing/sections/hero.tsx:21-40` | High |
| RULE-151 | Firestore error codes have a friendly-message map that is never used | Validation | P2 | `src/lib/errors/error-handling.ts:229-274` | High |
| RULE-152 | Repository layer error classification | Validation | P0 | `src/lib/repositories/firebase-repository-utils.ts:36-70` | High |
| RULE-153 | Default user messages for each error type | Validation | P1 | `src/lib/errors/error-handling.ts:340-375` | High |
| RULE-154 | Bulk import fails only when every book fails | Validation | P2 | `src/lib/services/BookService.ts:534-573` | High |
| RULE-155 | Reading state machine allows only forward transitions | Lifecycle | P0 | `src/lib/models/models.ts:419-452` | High. |
| RULE-156 | State change writes state, updatedAt and finishedAt, then appends a state_change event | Lifecycle | P0 | `src/lib/services/BookService.ts:341-421` | High. |
| RULE-157 | startedAt is never set by any code path | Lifecycle | P1 | `src/lib/services/BookService.ts:381-390` | High. |
| RULE-158 | Progress update auto-starts a not_started book before validating the page | Lifecycle | P0 | `src/lib/services/BookService.ts:241-287` | High. |
| RULE-159 | Progress write includes an undeclared lastUpdated field and appends a progress_update event | Lifecycle | P0 | `src/lib/services/BookService.ts:289-317` | High. |
| RULE-160 | Auto-finish checks the stale pre-update snapshot | Lifecycle | P0 | `src/lib/services/BookService.ts:319-326` | High. |
| RULE-161 | Rating update writes rating and appends rating_added on every change | Lifecycle | P1 | `src/lib/services/BookService.ts:426-474` | High. |
| RULE-162 | Adding a book stamps addedAt/updatedAt, strips undefined fields, and logs no event | Lifecycle | P0 | `src/lib/repositories/FirebaseBookRepository.ts:140-161` | High. |
| RULE-163 | Manual edit bypasses the state machine and logs "Manual update: <keys>" | Lifecycle | P0 | `src/lib/services/BookService.ts:741-796` | High. |
| RULE-164 | Manual edit adds a state_change event after manual_update only when the state actually changed | Lifecycle | P1 | `src/lib/services/BookService.ts:798-808` | High. |
| RULE-165 | Clearing a rating in the edit sheet is silently not persisted | Lifecycle | P1 | `src/components/app/books/EditBookSheet.tsx:215-258` | High. |
| RULE-166 | Deleting a book removes only the book document and appends a delete_book event with fallback names | Lifecycle | P0 | `src/lib/services/BookService.ts:479-519` | High. |
| RULE-167 | New-book initial lifecycle defaults | Policy | P1 | `src/lib/books/book-utils.ts:25-119` | High. |
| RULE-168 | First sign-in creates a profile only when none is found | Lifecycle | P0 | `src/lib/providers/UserProvider.tsx:299-346` | Medium. |
| RULE-169 | New profile document fields | Lifecycle | P0 | `src/lib/services/UserService.ts:182-214` | High. |
| RULE-170 | Default sample book "Fermat's Last Theorem" for new users | Lifecycle | P1 | `src/lib/services/UserService.ts:41-69` | High. |
| RULE-171 | Returning sign-ins never refresh profile auth metadata | Lifecycle | P2 | `src/lib/services/UserService.ts:166-180` | High. |
| RULE-172 | Profile counters are written once and never maintained | Lifecycle | P2 | `src/lib/services/UserService.ts:279-310` | High. |
| RULE-173 | "Start Reading" performs a state change, then sets progress to page 1 | Lifecycle | P0 | `src/components/app/book-detail/BookDetailPage.tsx:86-98` | High. |
| RULE-174 | "Mark as finished" changes state only and leaves currentPage as is | Lifecycle | P0 | `src/components/app/book-detail/BookDetailPage.tsx:73-84` | High. |
| RULE-175 | Ratings can be set from the detail page only for finished books | Policy | P1 | `src/components/app/book-detail/BookDetailPage.tsx:63-71` | High. |
| RULE-176 | Adding a comment appends a comment event with a reading-context snapshot | Lifecycle | P1 | `src/lib/services/EventService.ts:310-393` | High. |
| RULE-177 | A review can be added only to a finished book that has no review yet | Lifecycle | P1 | `src/lib/services/EventService.ts:452-547` | High. |
| RULE-178 | Updating a review appends a new review event that keeps the original creation time | Lifecycle | P1 | `src/lib/services/EventService.ts:552-627` | High. |
| RULE-179 | The latest review event wins | Policy | P1 | `src/lib/services/EventService.ts:662-684` | High. |
| RULE-180 | A barcode-scan add appends an extra manual_update audit event | Lifecycle | P2 | `src/components/app/books/AddBooksPage.tsx:141-164` | High. |
| RULE-181 | The AI message is regenerated only when the latest one is not from today, or when forced | Lifecycle | P1 | `src/lib/services/MessageService.ts:200-264` | High. |
| RULE-182 | AI failure keeps the old message, otherwise uses a stats-based fallback that is saved | Policy | P1 | `src/lib/services/MessageService.ts:234-246` | High. |
| RULE-183 | First-day welcome prompt versus personalized prompt | Policy | P2 | `src/lib/services/MessageService.ts:83-98` | High. |
| RULE-184 | Message generation is re-checked whenever dashboard inputs change, and force refresh is never used | Lifecycle | P2 | `src/components/app/dashboard/PersonalizedMessageSection.tsx:30-55` | Medium. |
| RULE-185 | Events and activities are refetched only on sign-in and after comment or review actions | Lifecycle | P1 | `src/lib/providers/EventsProvider.tsx:692-702` | High. |
| RULE-186 | Book mutations do not refresh the event or activity caches | Lifecycle | P1 | `src/lib/providers/BooksProvider.tsx:144-159` | High. |
| RULE-187 | User stats recompute on every books snapshot using up to 1000 events | Lifecycle | P1 | `src/lib/services/UserService.ts:401-433` | High. |
| RULE-188 | Activity feed fetch drops events whose book no longer exists | Policy | P1 | `src/lib/services/EventService.ts:162-217` | High. |
| RULE-189 | Activity type mapping per event type | Policy | P2 | `src/lib/services/EventService.ts:733-764` | High. |
| RULE-190 | state_change to activity mapping (finished, started, added) | Policy | P2 | `src/lib/services/EventService.ts:769-804` | High. |
| RULE-191 | delete_book activity mapping is unreachable on the dashboard | Policy | P2 | `src/lib/services/EventService.ts:886-899` | High. |
| RULE-192 | Activity History shows all cached events, including deleted-book events with an "Unknown Book" title | Policy | P2 | `src/app/(app)/activity-history/page.tsx:105-109` | High. |
| RULE-193 | Review details in Activity History read the wrong field | Policy | P2 | `src/components/app/activity/ActivityDetail.tsx:169-176` | High. |
| RULE-194 | Every book update re-stamps updatedAt and strips only top-level undefined values | Policy | P0 | `src/lib/repositories/FirebaseBookRepository.ts:166-187` | High. |
| RULE-195 | Event envelope and append-only log | Policy | P0 | `src/lib/repositories/FirebaseEventRepository.ts:44-68` | High. |

## Calculation rules

### RULE-001: Book progress percentage
**Category:** Calculation
**Priority:** P0
**Source:** `src/lib/books/book-utils.ts:121-134`
**Plain English:** A book's progress % depends on its state. Finished books are always 100% and not-started books are always 0%. In-progress books show current page divided by total pages, rounded to a whole percent.
**Specification:**
  Given an in_progress book with currentPage=150 and totalPages=396
  When progress is calculated
  Then the result is Math.round(150/396*100) = 38
  (finished, any pages → 100; not_started, any pages → 0; in_progress with currentPage=0 or totalPages=0 → 0)
**Parameters:** multiplier 100, rounding Math.round (half up)
**Edge cases handled:** totalPages missing or 0 gives 0 (no divide by zero); currentPage 0 or missing gives 0; state wins over pages (a finished book at page 10/300 shows 100).
**Suspected defect:** There is no upper clamp. If currentPage > totalPages the text shows more than 100% (for example 110%). Only ProgressBar clamps the bar width (RULE-072). Normal paths block this with validation, but the formula itself does not.
**Confidence:** High — read directly. It is used by BookCard, BookListItem, BookDetailPage and the "progress" sort.

### RULE-002: Auto-finish when the current page reaches total pages
**Category:** Calculation
**Priority:** P0
**Source:** `src/lib/services/BookService.ts:319-326`
**Plain English:** After a progress update is saved, an in_progress book whose new page is at or past its total page count is moved to finished, and finishedAt is set to now.
**Specification:**
  Given an in_progress book with totalPages=300 and currentPage=280
  When the user updates progress to page 300
  Then a progress_update event (280→300) is logged, the state becomes finished, finishedAt=now, and a state_change event is logged
**Parameters:** threshold currentPage >= totalPages; requires totalPages > 0
**Edge cases handled:** totalPages 0 or missing means no auto-finish. Pages above totalPages are rejected earlier with "Current page cannot exceed total pages" (lines 280-287). A negative page is rejected (lines 243-248).
**Suspected defect:** The check uses `book.state`, which was read before the method's own auto-transition from not_started to in_progress (lines 266-277). So a not_started book updated straight to its last page (for example a 1-page book via "Start reading", which sets page 1) becomes in_progress, not finished.
**Confidence:** High — read directly.

### RULE-003: "Start reading" seeds progress at page 1
**Category:** Calculation
**Priority:** P1
**Source:** `src/components/app/book-detail/BookDetailPage.tsx:86-98`
**Plain English:** Starting a book moves it to in_progress and then records progress at page 1.
**Specification:**
  Given a not_started book at currentPage=0
  When the user clicks Start Reading
  Then the state becomes in_progress and updateBookProgress(…, 1) logs a progress_update event 0→1, which adds 1 page to the event-based pages total
**Parameters:** seeded page = 1
**Edge cases handled:** none
**Suspected defect:** Every started book adds a phantom 1 page to lifetime and monthly page totals (RULE-006, RULE-015).
**Confidence:** High.

### RULE-004: Reading streak
**Category:** Calculation
**Priority:** P1
**Source:** `src/lib/services/UserService.ts:558-589`
**Plain English:** The streak counts finished books, newest finish first, while each finish date is no more than 1 calendar day before the previous one. The count starts from today's local midnight.
**Specification:**
  Given today is 2026-10-15 and finished books have finishedAt 2026-10-15, 2026-10-14 and 2026-10-12
  When the streak is calculated
  Then streak = 2 (diff 0 → 1, diff 1 → 2, diff 2 → stop)
  And given only one book, finished 2026-10-14 → streak = 1; only 2026-10-13 → streak = 0
**Parameters:** day = 86,400,000 ms; continue while floor(diff/day) <= 1; dates normalized with setHours(0,0,0,0) in local time
**Edge cases handled:** no finished books gives 0; finished books without finishedAt are ignored; a streak may start yesterday.
**Suspected defect:** (1) It counts books, not days. Three books finished today give streak 3 "consecutive days". (2) Only finishing a book counts; daily progress updates never extend the streak. (3) Daylight saving: in Europe/Oslo, finishes on 2026-03-30 and 2026-03-28 are 47 hours apart, floor(1.96) = 1, so they count as consecutive even though 03-29 was skipped. (4) Books set to finished through the manual edit path have no finishedAt (only updateBookState sets it, BookService.ts:388-390), so they never count.
**Confidence:** High on the mechanics. SME question: should the streak be distinct calendar days with any reading activity?

### RULE-005: Total pages read (event-based, primary)
**Category:** Calculation
**Priority:** P0
**Source:** `src/lib/services/UserService.ts:443-447`
**Plain English:** Lifetime pages read is the sum, over all progress_update events, of (newPage − previousPage), with each negative difference counted as 0.
**Specification:**
  Given progress events 0→100, 100→50 and 50→120
  When lifetime pages are calculated
  Then total = 100 + 0 + 70 = 170
**Parameters:** missing newPage/previousPage treated as 0; per-event floor of 0
**Edge cases handled:** backward corrections never subtract; events for deleted books still count.
**Suspected defect:** (1) Moving backward and then forward double-counts: the example has 120 real pages but the total is 170. (2) Books finished via "Mark as finished" or manual edit log no progress event, so their pages are never counted. (3) Only the 1000 most recent events of any type are used (RULE-007). (4) The +1 seed from RULE-003 is included.
**Confidence:** High.

### RULE-006: Total pages read (books-based fallback)
**Category:** Calculation
**Priority:** P1
**Source:** `src/lib/services/UserService.ts:504-507`
**Plain English:** When the event fetch fails, and also in the one-shot getUserStats (identical code at lines 330-333), lifetime pages is the sum of totalPages over finished books.
**Specification:**
  Given finished books with totalPages 396, 0 and 250, plus an in_progress book at 120/300
  When the fallback runs
  Then total = 646 (in-progress pages are ignored)
**Parameters:** missing totalPages treated as 0
**Edge cases handled:** no finished books gives 0
**Suspected defect:** The same user gets different "Lifetime Pages" numbers depending on whether the event fetch succeeded, because RULE-005 and RULE-006 use different semantics.
**Confidence:** High. SME question: which definition is canonical?

### RULE-007: Stats recompute trigger and 1000-event cap
**Category:** Calculation
**Priority:** P1
**Source:** `src/lib/services/UserService.ts:408-425`
**Plain English:** Stats are recalculated only when the user's book collection changes. Each recalculation fetches the 1000 most recent events (newest first) and uses the event-based formula, or the books-based formula if the fetch throws.
**Specification:**
  Given a user with 1,500 events
  When any book changes
  Then stats use only the newest 1,000 events (of all types) for pages read
**Parameters:** event limit 1000
**Edge cases handled:** if the fetch reports a failure without throwing, events = [] and pages read = 0 (not the books fallback).
**Suspected defect:** (1) Heavy users' lifetime pages silently stop growing correctly once older progress events fall outside the 1000 window. (2) A non-throwing failure shows 0 lifetime pages instead of falling back. (3) Date-relative stats ("this month") do not roll over at midnight or month end until a book changes.
**Confidence:** High.

### RULE-008: Average rating
**Category:** Calculation
**Priority:** P1
**Source:** `src/lib/services/UserService.ts:450-455`
**Plain English:** The average rating is the arithmetic mean of ratings on finished books that have a rating, or 0 when none do.
**Specification:**
  Given finished books rated 5, 4 and unrated, plus an in_progress book rated 3
  When the average is calculated
  Then average = (5+4)/2 = 4.5 (displayed "4.5"); with no rated finished books → 0
**Parameters:** no rounding in the service; displays use toFixed(1)
**Edge cases handled:** null/undefined ratings excluded; non-finished books excluded
**Suspected defect:** A rating on a book moved back from finished by manual edit is silently dropped from the average.
**Confidence:** High.

### RULE-009: Books read this month
**Category:** Calculation
**Priority:** P1
**Source:** `src/lib/services/UserService.ts:464-471`
**Plain English:** Counts finished books whose finishedAt falls in the current local calendar month and year.
**Specification:**
  Given today is 2026-10-15 and finished books with finishedAt 2026-10-01, 2026-09-30 and 2025-10-10
  When the count is calculated
  Then booksReadThisMonth = 1
**Parameters:** local timezone month and year
**Edge cases handled:** finished books without finishedAt are excluded
**Suspected defect:** Books finished via manual edit have no finishedAt, so they never count here, although they do count in totalBooksRead.
**Confidence:** High.

### RULE-010: Books read this year
**Category:** Calculation
**Priority:** P1
**Source:** `src/lib/services/UserService.ts:473-477`
**Plain English:** Counts finished books whose finishedAt is in the current local calendar year.
**Specification:**
  Given today is 2026-10-15 and finishes on 2026-01-02, 2026-10-01 and 2025-12-31
  When the count is calculated
  Then booksReadThisYear = 2
**Parameters:** local year
**Edge cases handled:** missing finishedAt is excluded
**Suspected defect:** Same missing-finishedAt gap as RULE-009.
**Confidence:** High.

### RULE-011: Library state counts
**Category:** Calculation
**Priority:** P1
**Source:** `src/lib/services/UserService.ts:481-484`
**Plain English:** totalBooksRead is the number of finished books, currentlyReading is the number of in_progress books, and booksInLibrary is the number of all books.
**Specification:**
  Given 10 books: 4 finished, 2 in_progress, 4 not_started
  When stats are calculated
  Then totalBooksRead=4, currentlyReading=2, booksInLibrary=10
**Parameters:** none
**Edge cases handled:** wishlist (isOwned=false) books are included in every count
**Confidence:** High. SME question: should wishlist books count as "In Library"?

### RULE-012: Favorite genres (top 3 by count)
**Category:** Calculation
**Priority:** P2
**Source:** `src/lib/services/UserService.ts:594-608`
**Plain English:** Counts books per exact genre string across the whole library and returns the 3 genres with the most books. The statistics page shows the first one as "Top Genre".
**Specification:**
  Given books with genres Fantasy×3, History×2, Mathematics×2, Poetry×1
  When favorite genres are calculated
  Then the result is [Fantasy, History, Mathematics] if History was seen first (ties keep first-seen order, and books are ordered by addedAt descending)
**Parameters:** limit 3 (EVENT_CONFIG.FAVORITE_GENRES_LIMIT=5 is unused)
**Edge cases handled:** books with an empty or missing genre are skipped
**Suspected defect:** Genres are case-sensitive ("Fiction" and "fiction" are counted separately). Not-started and wishlist books count equally with books actually read. This also disagrees with the AI prompt's genre list (RULE-068).
**Confidence:** High.

### RULE-013: Stored profile counters (updateUserStats)
**Category:** Calculation
**Priority:** P1
**Source:** `src/lib/services/UserService.ts:288-294`
**Plain English:** updateUserStats writes totalBooksRead, currentlyReading and booksInLibrary into the stored user profile.
**Specification:**
  Given a user with 4 finished, 2 in_progress and 10 total books
  When updateUserStats runs
  Then the profile stores 4 / 2 / 10
**Parameters:** none
**Edge cases handled:** none
**Suspected defect:** No UI path calls updateUserStats. The UserProvider exposes it but nothing invokes it. Profiles are created with 0/0/0 (UserService.ts:191-193), so the profile dropdown (UserProfileDropdown.tsx:126-128) always shows "0 read · 0 reading · 0 total".
**Confidence:** Medium — no caller in src. SME question: does any backend process update these fields?

### RULE-014: 12-month pages-read-by-genre series
**Category:** Calculation
**Priority:** P1
**Source:** `src/app/(app)/statistics/page.tsx:29-94`
**Plain English:** For each of the last 12 calendar months, including the current one, it sums max(0, newPage − previousPage) over progress events, grouped by the book's current genre. Each month also gets a total.
**Specification:**
  Given today is 2026-10-15 and progress events on 2026-10-03 (Fantasy book, 10→60) and 2026-10-10 (deleted book, 0→30)
  When the series is built
  Then 12 rows run Nov 2025 … Oct 2026, and the Oct row = {Fantasy: 50, Unknown: 30, total: 80}; every other genre seen in any event gets 0
**Parameters:** window = eachMonthOfInterval(now−11 months, now); labels "MMM" and "MMM yyyy"
**Edge cases handled:** no events or no books gives an empty series; a deleted book or one with no genre maps to "Unknown"; negative deltas floor at 0
**Suspected defect:** monthEnd = `new Date(y, m+1, 0)`, which is local midnight at the start of the last day (lines 55-59). Events after 00:00 on the last day of each month are dropped. On 2026-10-31, today's reading is missing from the chart and from "This Month". Genre comes from the book's current genre, not its genre at reading time. The series is built from the 1000-event window.
**Confidence:** High.

### RULE-015: Genre distribution percentages (pie)
**Category:** Calculation
**Priority:** P2
**Source:** `src/app/(app)/statistics/page.tsx:97-119`
**Plain English:** Counts all books per genre ("Unknown" if blank), works out each genre's whole-number percentage of total books, sorts by count descending, and keeps the top 8.
**Specification:**
  Given 3 books: Fantasy, History, no genre
  When the distribution is calculated
  Then each slice = Math.round(1/3*100) = 33% (sum 99%)
**Parameters:** top 8 slices; legend shows 6 then "+N more genres" (lines 537-564)
**Edge cases handled:** no books gives []; blank genre becomes "Unknown"
**Suspected defect:** Rounded percentages may not sum to 100. Genres beyond the top 8 are dropped without an "Other" slice. Pie "Unknown" counts blank genres while favorite genres (RULE-012) skip them.
**Confidence:** High.

### RULE-016: Reading velocity (daily pace)
**Category:** Calculation
**Priority:** P1
**Source:** `src/app/(app)/statistics/page.tsx:122-146`
**Plain English:** Daily pace is all positive progress deltas divided by the fractional days between the oldest and newest progress event (at least 1 day), rounded.
**Specification:**
  Given progress events on Oct 1 (0→50) and Oct 11 (50→150)
  When velocity is calculated
  Then (50+100)/10 = 15 pages/day; two events 1 hour apart totalling 100 pages → 100/max(1, 0.04) = 100
**Parameters:** minimum 2 progress events, else 0; day = 86,400,000 ms; floor of 1 day; Math.round
**Edge cases handled:** fewer than 2 progress events gives 0; negative deltas floor at 0
**Suspected defect:** The span ends at the last event, not today. A user who read 300 pages over 2 days a year ago and nothing since still shows 150/day. It depends on events being newest first (repository order desc) and uses the 1000-event window.
**Confidence:** High on the mechanics. SME question: should the pace be measured up to today, or over a fixed window?

### RULE-017: Current month pages
**Category:** Calculation
**Priority:** P2
**Source:** `src/app/(app)/statistics/page.tsx:159-163`
**Plain English:** "This Month — pages read" is the total of the last (current-month) row of the 12-month series.
**Specification:**
  Given the Oct 2026 row total = 80
  When the stats page renders
  Then "This Month" shows "80" (toLocaleString)
**Parameters:** none
**Edge cases handled:** empty series gives 0; a non-numeric total gives 0
**Suspected defect:** Inherits the last-day-of-month exclusion from RULE-014.
**Confidence:** High.

### RULE-018: Activity chart tooltip and legend limits
**Category:** Calculation
**Priority:** P2
**Source:** `src/app/(app)/statistics/page.tsx:368-392`
**Plain English:** The tooltip shows the month's total and up to 5 genres with pages > 0, sorted by pages descending. The legend shows the first 6 genres alphabetically, then "+N more" (lines 443-456).
**Specification:**
  Given a month with 7 genres having pages 50, 40, 30, 20, 10, 5 and 0
  When hovering that month
  Then the tooltip lists the top 5 (50…10) under "155 pages total"
**Parameters:** tooltip top 5; legend 6
**Edge cases handled:** zero-page genres are hidden
**Confidence:** High.

### RULE-019: Statistics summary display values
**Category:** Calculation
**Priority:** P2
**Source:** `src/app/(app)/statistics/page.tsx:586-647`
**Plain English:** The summary shows lifetime pages (locale formatted), currently reading, in library, books this month, average rating to 1 decimal (or "—" when 0), and Top Genre = favoriteGenres[0].
**Specification:**
  Given averageRating=4.25 and favoriteGenres=[Fantasy, History]
  When the summary renders
  Then "Avg Rating 4.3 of 5" (toFixed) and "Top Genre Fantasy"; averageRating 0 shows "—"
**Parameters:** toFixed(1)
**Edge cases handled:** missing stats show 0 or "0"
**Confidence:** High.

### RULE-020: Annual reading goal progress (never populated)
**Category:** Calculation
**Priority:** P2
**Source:** `src/app/(app)/statistics/page.tsx:653-693`
**Plain English:** If userStats.readingGoalProgress exists, the page shows "percentage% of the way there", current/goal, and a bar capped at 100%.
**Specification:**
  Given readingGoalProgress {goal: 20, current: 25, percentage: 125}
  When rendered
  Then text says "125%" and the bar width is min(100,125) = 100%
**Parameters:** cap 100
**Edge cases handled:** bar capped at 100
**Suspected defect:** No code computes readingGoalProgress (it is only declared in services/types.ts:238), so this section never renders.
**Confidence:** High.

### RULE-021: Genre color assignment
**Category:** Calculation
**Priority:** P2
**Source:** `src/lib/utils/genre-colors.ts:42-58`
**Plain English:** Genres are sorted alphabetically and each gets palette[index mod 12]. "Unknown" always gets gray #929291.
**Specification:**
  Given genres [Mathematics, Fantasy, Unknown]
  When the mapping is created
  Then sorted [Fantasy, Mathematics, Unknown] → Fantasy #244633, Mathematics #789D72, Unknown #929291
**Parameters:** 12-color palette (#244633, #789D72, #5C82B5, #526D5E, #729D7E, #576F63, #8BA888, #6B8FA3, #3D5C4A, #9DB49A, #7A9BB0, #4A6B5A); Unknown #929291
**Edge cases handled:** more than 12 genres wrap around (colors repeat); "Unknown" still uses up a palette index
**Suspected defect:** The pie maps over all library genres (statistics page.tsx:107-108) while the area chart maps over genres seen in progress events (page.tsx:308-309). Example: library {Fantasy, History, Mathematics}, events only for Mathematics. The pie gives Mathematics #5C82B5; the area chart gives it #244633. This contradicts the module's stated goal of identical colors. Case-sensitive sorting puts lowercase genres after uppercase.
**Confidence:** High.

### RULE-022: Dashboard stats mapping
**Category:** Calculation
**Priority:** P1
**Source:** `src/app/(app)/dashboard/page.tsx:21-39`
**Plain English:** Dashboard stats map totalBooks to booksInLibrary, finishedBooks to booksReadThisYear, and pass totalPagesRead (lifetime), currentlyReading and readingStreak straight through. Everything is 0 when stats are not loaded.
**Specification:**
  Given userStats {booksInLibrary: 10, totalBooksRead: 7, booksReadThisYear: 3, totalPagesRead: 2400}
  When the dashboard builds stats
  Then {totalBooks: 10, finishedBooks: 3, totalPagesRead: 2400, …}
**Parameters:** none
**Edge cases handled:** null userStats gives all zeros
**Suspected defect:** These stats feed the AI message (RULE-066, RULE-068). The prompt line "Books finished: 3" and the fallback "Congratulations on finishing 3 books" use the this-year count, not the lifetime 7. The unused StatsGrid component (StatsGrid.tsx:114-120) labels lifetime totalPagesRead as "Pages This Month".
**Confidence:** High.

### RULE-023: Dashboard header stats ribbon
**Category:** Calculation
**Priority:** P2
**Source:** `src/components/app/dashboard/DashboardHeader.tsx:70-135`
**Plain English:** The ribbon shows In Library, Reading, This Year (booksReadThisYear), Day Streak, Pages Read (locale formatted) and Avg Rating to 1 decimal. Avg Rating appears only when it is above 0.
**Specification:**
  Given averageRating=0 and readingStreak=0
  When the header renders
  Then no Avg Rating item is shown and the flame icon uses the "light" weight; streak > 0 uses "fill"
**Parameters:** toFixed(1)
**Edge cases handled:** stats null hides the ribbon
**Confidence:** High.

### RULE-024: Greeting by time of day and display name
**Category:** Calculation
**Priority:** P2
**Source:** `src/components/app/dashboard/DashboardHeader.tsx:40-55`
**Plain English:** The greeting is based on the local hour: before 12 is "Good morning", before 17 is "Good afternoon", otherwise "Good evening". The name shown is the first space-separated token of displayName, or "Reader".
**Specification:**
  Given local time 16:59 and displayName "Anders Bekkevard"
  When the header renders
  Then "Good afternoon, Anders"; at 17:00 → "Good evening"
**Parameters:** hour thresholds 12 and 17
**Edge cases handled:** missing name gives "Reader"
**Confidence:** High.

### RULE-025: Dashboard recent-activity limit (5 vs 7)
**Category:** Calculation
**Priority:** P2
**Source:** `src/components/app/dashboard/RecentActivitySection.tsx:104-119`
**Plain English:** If there are 2 or fewer in_progress books, up to 5 activities are shown; otherwise up to 7. manually_updated and deleted items are excluded first.
**Specification:**
  Given 3 in_progress books and 6 fetched activities
  When the section renders
  Then the limit is 7, but at most 6 are shown
**Parameters:** short layout when currentlyReading <= 2; limits 5 and 7
**Edge cases handled:** an empty list shows "No recent activity"
**Suspected defect:** EventsProvider fetches only 6 events for activities (EventsProvider.tsx:104), and filtering and dropped deleted-book events shrink that further. The 7-item layout can never be filled, and the 5-item layout can show fewer than 5 even when more history exists.
**Confidence:** High.

### RULE-026: Activity items require the book to still exist
**Category:** Calculation
**Priority:** P1
**Source:** `src/lib/services/EventService.ts:733-764`
**Plain English:** Each event becomes a dashboard activity item only if its book can be loaded. Events for missing books are discarded.
**Specification:**
  Given a delete_book event for a deleted book "Dune"
  When activity items are built
  Then the event is dropped (null), so transformDeleteBookEvent ("Removed Dune", details "by Frank Herbert", lines 886-899) is never reached
**Parameters:** event types mapped: state_change, progress_update, rating_added, comment, manual_update, delete_book; others (e.g. review) give null
**Edge cases handled:** unknown event types are dropped
**Suspected defect:** All history for deleted books, including the deletion itself, vanishes from the dashboard feed. The "deleted" branch is unreachable. Review events never appear.
**Confidence:** High.

### RULE-027: State-change classification for activity feed
**Category:** Calculation
**Priority:** P2
**Source:** `src/lib/services/EventService.ts:769-804`
**Plain English:** newState finished maps to "finished". in_progress from not_started maps to "started". not_started with no previous state maps to "added". Anything else maps to "started".
**Specification:**
  Given a state_change event {previousState: finished, newState: in_progress} (manual edit)
  When classified
  Then type "started" ("Started <title>")
**Parameters:** none
**Edge cases handled:** fallback is "started"
**Suspected defect:** A manual revert (finished→not_started) shows as "Started …".
**Confidence:** High.

### RULE-028: Progress activity details string
**Category:** Calculation
**Priority:** P2
**Source:** `src/lib/services/EventService.ts:809-822`
**Plain English:** pagesRead = newPage − previousPage when newPage is truthy (else 0). Details = "<pagesRead> pages" when non-zero, otherwise undefined.
**Specification:**
  Given a progress event 40→65
  When transformed
  Then details "25 pages"; 65→40 → "-25 pages"; 50→0 → details undefined
**Parameters:** none
**Edge cases handled:** missing previousPage treated as 0
**Suspected defect:** A reset to page 0 (newPage=0 is falsy) produces no details, although the delta is −50.
**Confidence:** High.

### RULE-029: Progress activity sentence rendering
**Category:** Calculation
**Priority:** P2
**Source:** `src/components/app/dashboard/RecentActivitySection.tsx:67-80`
**Plain English:** The page count is parsed back out of details with /(-?\d+)\s*pages?/. A positive count renders "Read N pages in <title>"; zero or negative renders "Unread |N| pages in <title>". With no details, only the title is shown.
**Specification:**
  Given details "-25 pages"
  When rendered
  Then "Unread 25 pages in Dune"; details "25 pages" → "Read 25 pages in Dune"; no details → "Dune"
**Parameters:** regex /(-?\d+)\s*pages?/
**Edge cases handled:** no match gives 0, which renders "Unread 0 pages in"
**Suspected defect:** A number is formatted into a string and parsed back (fragile). With no details the item has no verb.
**Confidence:** High.

### RULE-030: Rating activity details
**Category:** Calculation
**Priority:** P2
**Source:** `src/lib/services/EventService.ts:827-839`
**Plain English:** A rating event's details are "<rating> stars", shown as "Rated <title> <details>".
**Specification:**
  Given a rating_added event with rating 1
  When rendered
  Then "Rated Dune 1 stars"
**Parameters:** none
**Edge cases handled:** missing rating gives no details
**Suspected defect:** No singular form ("1 stars"). The same happens in ActivityDetail's "Rated 1 stars" (RULE-035).
**Confidence:** High.

### RULE-031: Comment / manual-update details truncation
**Category:** Calculation
**Priority:** P2
**Source:** `src/lib/services/EventService.ts:844-860`
**Plain English:** Comment text longer than 50 characters is cut to the first 50, trimmed, and "..." is appended. Manual-update events use the same logic (lines 865-881).
**Specification:**
  Given a 60-character comment
  When transformed
  Then details = first 50 chars (trailing space trimmed) + "..."; a comment of exactly 50 chars is unchanged
**Parameters:** maxLength 50, suffix "..."
**Edge cases handled:** empty comment gives undefined
**Suspected defect:** The dashboard never renders details for "commented" items ("Commented on <title>" only) and filters out manually_updated items, so this truncation is not visible anywhere.
**Confidence:** High.

### RULE-032: Time-ago formatting (dashboard)
**Category:** Calculation
**Priority:** P2
**Source:** `src/components/app/dashboard/RecentActivitySection.tsx:18-35`
**Plain English:** Elapsed time uses floored units: up to 1 minute shows "just now", under 60 minutes "Nm ago", under 24 hours "Nh ago", under 7 days "Nd ago", otherwise "Nw ago".
**Specification:**
  Given activity ages of 90 s, 5 min, 3 h, 30 h, 7 d and 400 d
  When formatted
  Then "just now", "5m ago", "3h ago", "1d ago", "1w ago", "57w ago"
**Parameters:** MINUTE_MS 60,000; HOUR_MS 3,600,000; DAY_MS 86,400,000; WEEK_MS 604,800,000 (constants.ts:240-260)
**Edge cases handled:** future timestamps (negative diff) show "just now"
**Suspected defect:** No month or year unit ("57w ago"). The activity-history page instead uses date-fns formatDistanceToNow (ActivityDetail.tsx:262-264), so the two pages phrase times differently.
**Confidence:** High.

### RULE-033: Activity-history event title
**Category:** Calculation
**Priority:** P2
**Source:** `src/components/app/activity/ActivityDetail.tsx:89-121`
**Plain English:** The title is derived per event type. Progress shows "Read N pages" when newPage − previousPage > 0, else "Updated progress". Rating shows "Rated N stars". A state change to finished is "Finished Reading", not_started→in_progress is "Started Reading", any change to not_started is "Added to Library", and anything else is "Status Changed".
**Specification:**
  Given a progress event 65→40
  When titled
  Then "Updated progress"; 0→30 → "Read 30 pages"; a rating event without a rating → "Rated 0 stars"
**Parameters:** none
**Edge cases handled:** unknown type gives "Activity updated"
**Suspected defect:** A manual revert finished→not_started is titled "Added to Library".
**Confidence:** High.

### RULE-034: Activity-history detail rows
**Category:** Calculation
**Priority:** P2
**Source:** `src/components/app/activity/ActivityDetail.tsx:138-176`
**Plain English:** Progress shows "newPage / totalPages pages" ("?" when total is unknown) and a signed "Pages Read" row only when both previousPage and newPage are truthy and differ. Rating shows "N out of 5 stars". Comment, review and manual events show the text.
**Specification:**
  Given a progress event 0→30 on a 300-page book
  When details render
  Then "Progress: 30 / 300 pages" and no "Pages Read" row (previousPage 0 is falsy); 40→65 → "Pages Read: +25 pages"
**Parameters:** none
**Edge cases handled:** deleted book gives "?" for total pages
**Suspected defect:** (1) The first progress update from page 0 never shows a Pages Read row, although the title says "Read 30 pages". (2) The Review row reads `event.data.comment`, but review events store the text in `data.review` (EventService.ts:516-520), so review text is never shown.
**Confidence:** High.

### RULE-035: Activity-history filtering and date range
**Category:** Calculation
**Priority:** P2
**Source:** `src/app/(app)/activity-history/page.tsx:51-79`
**Plain English:** Events are filtered by type, by book, and by date range when both start and end are set (inclusive comparison), then sorted newest first.
**Specification:**
  Given a user in UTC-5 choosing startDate=endDate=2026-10-15
  When filtering
  Then both bounds parse as 2026-10-15T00:00Z, so only events at exactly that instant match and the result is empty
**Parameters:** URL params eventType, bookId, startDate, endDate (YYYY-MM-DD)
**Edge cases handled:** a range with only one bound is ignored
**Suspected defect:** `new Date("YYYY-MM-DD")` is UTC midnight, so the end date is effectively exclusive and both bounds are shifted for non-UTC users. A single-day range returns nothing. Only the 1000 most recent events are available.
**Confidence:** High.

### RULE-036: In-library search relevance ranking
**Category:** Calculation
**Priority:** P1
**Source:** `src/lib/services/BookService.ts:578-645`
**Plain English:** Books match when title, author, genre or description contains the lowercased query. They are ranked exact title, then exact author, then title prefix, then author prefix, then alphabetical by title (localeCompare), and capped at maxResults.
**Specification:**
  Given query "dune" and books "Children of Dune", "Dune Messiah", "Dune"
  When searching (header search passes max 8)
  Then the order is "Dune" (exact), "Dune Messiah" (prefix), "Children of Dune"
**Parameters:** default maxResults 10; header dropdown uses 8 (SearchDropdown.tsx:135)
**Edge cases handled:** a blank or whitespace query gives []; missing genre/description are skipped
**Suspected defect:** The query is lowercased but not trimmed inside the service, so a direct call with " dune" fails exact and prefix matching. The header trims first. Genre- and description-only matches rank alphabetically alongside title-substring matches.
**Confidence:** High.

### RULE-037: Header search fallback, debounce and caching
**Category:** Calculation
**Priority:** P2
**Source:** `src/components/app/layout/SearchDropdown.tsx:83-97`
**Plain English:** If the service search fails, a local substring filter runs over the same 4 fields with no ranking and no limit. Searches start 300 ms after typing (line 240-242) and results are cached per trimmed query.
**Specification:**
  Given the service search returns an error for "fan"
  When the fallback runs
  Then every book whose title, author, genre or description contains "fan" is returned, in library order (addedAt desc), unlimited
**Parameters:** debounce 300 ms (TIMING_CONFIG.SEARCH_DEBOUNCE_MS=500 unused); service limit 8
**Edge cases handled:** empty query resets to idle
**Suspected defect:** Fallback results are neither ranked nor limited, unlike the primary path. The cache is never invalidated, so a book added or renamed during the session is missing from repeat searches.
**Confidence:** High.

### RULE-038: Library filters (status, ownership, genre, search)
**Category:** Calculation
**Priority:** P1
**Source:** `src/lib/services/BookService.ts:659-693`
**Plain English:** Filters apply in order: substring search over 4 fields, status equality, ownership ("owned" means isOwned, anything else means not owned), and genre equality ignoring case. "all" or empty skips a filter.
**Specification:**
  Given filterOwnership="wishlist" and filterGenre="fantasy"
  When filtering
  Then books with isOwned=false and genre "Fantasy" or "FANTASY" are kept
**Parameters:** URL defaults: filter=all, ownership=all, genre=all (library/page.tsx:12-18)
**Edge cases handled:** books without a genre never match a specific genre filter
**Confidence:** High.

### RULE-039: Library sort keys
**Category:** Calculation
**Priority:** P1
**Source:** `src/lib/services/BookService.ts:696-733`
**Plain English:** Sort keys are title or author (lowercased, compared with < and >), pages (totalPages, else 0), dateAdded (addedAt seconds), rating (else 0) and progress (RULE-001). Unknown keys fall back to dateAdded. The direction is asc or desc.
**Specification:**
  Given sort=rating desc with books rated 5, unrated and 3
  When sorted
  Then 5, 3, unrated (unrated = 0 sorts last in desc and first in asc)
**Parameters:** UI default sort=title, direction=asc; clicking the active key toggles asc/desc (LibraryControls.tsx:181-188); dateAdded is not offered in the UI
**Edge cases handled:** ties keep repository order (addedAt desc, stable sort)
**Suspected defect:** Code-unit comparison instead of localeCompare: "Ágape" sorts after "zebra", unlike search (RULE-036). The progress sort ties every not-started book with in-progress books at 0%.
**Confidence:** High.

### RULE-040: Available genres list for filter
**Category:** Calculation
**Priority:** P2
**Source:** `src/lib/providers/BooksProvider.tsx:714-732`
**Plain English:** The genre filter list holds distinct, trimmed, non-empty genres, sorted alphabetically ignoring case (localeCompare, sensitivity base).
**Specification:**
  Given genres ["Fantasy ", "fantasy", "History", ""]
  When listed
  Then ["Fantasy", "fantasy", "History"] (case variants remain distinct entries)
**Parameters:** none
**Edge cases handled:** blank or missing genres are excluded
**Suspected defect:** Case variants appear as duplicate options, but the filter (RULE-038) matches case-insensitively, so both options return the same books.
**Confidence:** High.

### RULE-041: Dashboard book sections (limits and order)
**Category:** Calculation
**Priority:** P2
**Source:** `src/components/app/dashboard/BookSection.tsx:31-31`
**Plain English:** Each section shows the first N books matching its state, in repository order (addedAt desc). Currently Reading shows N=4 and Recently Read shows N=6 (constants.ts:54-59).
**Specification:**
  Given 8 finished books where the most recently finished was added first
  When the dashboard renders
  Then "Recently Read" shows the 6 most recently added finished books, regardless of finishedAt
**Parameters:** CURRENTLY_READING_LIMIT 4, RECENTLY_READ_LIMIT 6; order from FirebaseBookRepository.ts:214 (addedAt desc)
**Edge cases handled:** an empty section shows an empty-state message
**Suspected defect:** "Recently Read" is ordered by date added, not date finished.
**Confidence:** High.

### RULE-042: Pagination core math
**Category:** Calculation
**Priority:** P2
**Source:** `src/lib/utils/pagination-utils.ts:26-52`
**Plain English:** totalPages = ceil(totalItems/pageSize); startIndex = (page−1)×size; endIndex = min(start+size, total); hasNext = page < totalPages; hasPrev = page > 1.
**Specification:**
  Given 60 items, pageSize 25, page 3
  When calculated
  Then totalPages 3, startIndex 50, endIndex 60, hasNext false, hasPrev true
**Parameters:** maxVisiblePages default 7
**Edge cases handled:** 0 items gives totalPages 0
**Confidence:** High.

### RULE-043: Visible page numbers with ellipsis
**Category:** Calculation
**Priority:** P2
**Source:** `src/lib/utils/pagination-utils.ts:57-151`
**Plain English:** The pager returns page numbers to display, with −1 marking an ellipsis. There are special cases for max 1, 3 and 7 visible pages.
**Specification:**
  Given maxVisible=7
  When totalPages=20 and page=10 → [1,−1,9,10,11,−1,20]; page=2 → [1,2,3,4,5,−1,20]; page=18 → [1,−1,16,17,18,19,20]
  And totalPages=10, page=1 → [1..7]; page=2 → [1,2,3,4,5,−1,10]; page=5 or 10 → [1..10]; page=6 → [1,−1,5,6,7,−1,10]
**Parameters:** total ≤ max shows all; start window when page ≤ 4; end window when page ≥ total−3
**Edge cases handled:** 0 pages gives []; max=1 gives [1]
**Suspected defect:** The code hard-codes test cases (lines 81-100). For totalPages=10, page 1 hides the last page, while pages 5 and 10 show all 10 numbers (more than max 7). With max=3, the current page is never shown beyond page 1 ([1,−1,total]). With any other max (e.g. 5), only the first N pages are shown, so the current page can be invisible. Only activity-history uses this (with max 7).
**Confidence:** High.

### RULE-044: Item range display
**Category:** Calculation
**Priority:** P2
**Source:** `src/lib/utils/pagination-utils.ts:205-218`
**Plain English:** The range is start = (page−1)×size+1 and end = min(page×size, total), shown as "Showing start-end of total items".
**Specification:**
  Given page 2, size 25, total 60
  When calculated
  Then "Showing 26-50 of 60 items"; total 0 → {0,0,0} and "No items found"
**Parameters:** singular "item" when total = 1 (pagination-info.tsx:34)
**Edge cases handled:** zero total
**Suspected defect:** An out-of-range page (page 5 of 60 at size 25) gives start 101 and end 60. This is masked by the RULE-045 clamp effect.
**Confidence:** High.

### RULE-045: Safe page clamp
**Category:** Calculation
**Priority:** P2
**Source:** `src/lib/utils/pagination-utils.ts:223-227`
**Plain English:** The page is clamped into [1, max(1, totalPages)]. The hook re-clamps whenever totals change (usePagination.ts:77-82).
**Specification:**
  Given page 4 and totalPages 2
  When clamped
  Then 2; page 0 → 1; totalPages 0 → 1
**Parameters:** none
**Edge cases handled:** zero pages
**Confidence:** High.

### RULE-046: Page size validation
**Category:** Calculation
**Priority:** P2
**Source:** `src/lib/utils/pagination-utils.ts:156-168`
**Plain English:** Page size is clamped to [5, 500]. NaN becomes 5, and in-range values are floored.
**Specification:**
  Given inputs 3, 1000, 37.9 and NaN
  When validated
  Then 5, 500, 37, 5
**Parameters:** min 5, max 500; option list [10, 25, 50, 100]; default 25
**Edge cases handled:** NaN
**Confidence:** High.

### RULE-047: Page size persistence
**Category:** Calculation
**Priority:** P2
**Source:** `src/lib/utils/pagination-utils.ts:173-187`
**Plain English:** The stored page size is read from localStorage under a per-page key, parsed with parseInt and validated. Missing values or no window give the default.
**Specification:**
  Given localStorage["activity-history-page-size"] = "abc"
  When read
  Then 5 (NaN → min), not the default 25; "50" → 50; missing → 25; "1e3" → parseInt 1 → 5
**Parameters:** activity history key "activity-history-page-size", default 25 (activity-history page.tsx:82-89); generic key "pagination-page-size"
**Edge cases handled:** storage exceptions fall back to the default
**Suspected defect:** A corrupt stored value yields 5 rather than the default.
**Confidence:** High.

### RULE-048: Custom page size entry
**Category:** Calculation
**Priority:** P2
**Source:** `src/components/ui/page-size-selector.tsx:67-76`
**Plain English:** Custom input is parsed with parseInt. Non-numbers are ignored and leave the size unchanged; numbers are clamped by RULE-046. It applies on Enter or blur.
**Specification:**
  Given custom input "2"
  When submitted
  Then page size becomes 5
**Parameters:** HTML min 5, max 500
**Edge cases handled:** NaN means no change
**Confidence:** High.

### RULE-049: Page size change resets to page 1
**Category:** Calculation
**Priority:** P2
**Source:** `src/lib/hooks/usePagination.ts:111-120`
**Plain English:** Changing page size validates it, stores it, and resets the current page to 1. Activity-history filter changes also reset to page 1 (activity-history page.tsx:97-99).
**Specification:**
  Given the user is on page 4 at size 25
  When the size changes to 50
  Then page 1 at size 50, with "50" stored
**Parameters:** none
**Edge cases handled:** none
**Confidence:** High.

### RULE-050: Extract ISBN from barcode text
**Category:** Calculation
**Priority:** P1
**Source:** `src/lib/utils/isbn-utils.ts:26-68`
**Plain English:** Everything except digits and X is stripped and the result uppercased. The first match wins: 13 characters starting 978/979, then any 10 characters, then any 13 digits, then 12 digits with a leading 0 (leading 0 dropped). Otherwise null.
**Specification:**
  Given barcode "978-0-306-40615-7"
  When extracted
  Then "9780306406157"; "0-306-40615-2" → "0306406152"; "5781440898956" → unchanged; "012345678905" → "12345678905"; "123" → null
**Parameters:** prefixes 978/979; lengths 13, 10, 13, 12
**Edge cases handled:** null or non-string gives null
**Suspected defect:** (1) The UPC-A branch returns an 11-digit string, which is neither an ISBN-10 nor an ISBN-13, despite the comment saying it converts to ISBN-13. (2) X is accepted in any position, so "12X4567890" or "978123456789X" pass. (3) No checksum check.
**Confidence:** High.

### RULE-051: ISBN-13 → ISBN-10 for Google Books lookup (stripISBNPrefix)
**Category:** Calculation
**Priority:** P1
**Source:** `src/lib/utils/isbn-utils.ts:295-324`
**Plain English:** For a 13-character 978/979 value, it takes digits 4–12 as the core and recomputes an ISBN-10 check digit: (11 − Σ digit×(10−i) mod 11) mod 11, with 10 written as X. Other inputs are returned cleaned. The result is used as `isbn:<value>` in the Google query (google-books-api.ts:346-356).
**Specification:**
  Given "9780306406157"
  When converted
  Then core "030640615", Σ=130, 130 mod 11=9, check=2 → "0306406152"; "9791234567896" → "123456789X"; "0-306-40615-2" → "0306406152"
**Parameters:** weights 10…2; modulus 11
**Edge cases handled:** empty input is returned as is
**Suspected defect:** 979-prefixed ISBNs have no ISBN-10 equivalent. "979…" is converted to the ISBN-10 of the matching "978…" number, which is a different book, so the scanner/ISBN add can fetch the wrong book. Non-978/979 EAN-13s are passed through unchanged.
**Confidence:** High.

### RULE-052: ISBN-10 → ISBN-13 conversion (unused)
**Category:** Calculation
**Priority:** P2
**Source:** `src/lib/utils/isbn-utils.ts:255-279`
**Plain English:** The input is first validated (an ISBN-10 must satisfy Σ digit×(10−i) incl. check ≡ 0 mod 11, lines 117-139). Then "978" is prefixed to the first 9 digits and the EAN check digit (10 − Σ d×(1,3 alternating) mod 10) mod 10 is appended.
**Specification:**
  Given "0306406152"
  When converted
  Then "9780306406157"; "0306406153" (bad checksum) → null; a 13-digit input passes validation but returns null
**Parameters:** prefix 978; weights 1/3
**Edge cases handled:** invalid checksum or wrong length gives null
**Suspected defect:** No production caller (dead code). validateISBN13 (strict) and formatISBN (lines 218-241, which hyphenates at fixed positions 3-1-3-5-1 / 1-3-5-1, not real group ranges) are also unused.
**Confidence:** High.

### RULE-053: Google Books result-count clamp
**Category:** Calculation
**Priority:** P2
**Source:** `src/lib/api/google-books-api.ts:276-282`
**Plain English:** maxResults sent to Google = min(requested, else 10, 40). The query is trimmed, and an empty query returns [] without calling the API.
**Specification:**
  Given a request for 100 results
  When searching
  Then maxResults=40; requested 0 → 10 (falsy); the add-books hook defaults to 20 (constants.ts:170); barcode lookups request 5; ISBN add requests 1
**Parameters:** DEFAULT 10, MAX 40
**Edge cases handled:** empty query
**Confidence:** High.

### RULE-054: Format authors list
**Category:** Calculation
**Priority:** P1
**Source:** `src/lib/api/google-books-api.ts:485-492`
**Plain English:** Authors are joined as "A", "A and B", or "A, B and C". Missing or empty gives "Unknown Author". The result is stored as the book's author.
**Specification:**
  Given ["Neil Gaiman", "Terry Pratchett", "X"]
  When formatted
  Then "Neil Gaiman, Terry Pratchett and X"; [] → "Unknown Author"
**Parameters:** no Oxford comma
**Edge cases handled:** undefined or empty
**Confidence:** High.

### RULE-055: Best thumbnail selection
**Category:** Calculation
**Priority:** P2
**Source:** `src/lib/api/google-books-api.ts:451-462`
**Plain English:** The cover is the first present of medium, small, thumbnail, smallThumbnail. No imageLinks gives undefined.
**Specification:**
  Given imageLinks {thumbnail: t, large: L}
  When selected
  Then t (large/extraLarge are never chosen)
**Parameters:** priority medium > small > thumbnail > smallThumbnail
**Edge cases handled:** no imageLinks
**Suspected defect:** Higher-resolution large/extraLarge are ignored, and http URLs are stored unchanged.
**Confidence:** High.

### RULE-056: Best ISBN selection
**Category:** Calculation
**Priority:** P1
**Source:** `src/lib/api/google-books-api.ts:469-478`
**Plain English:** The ISBN_13 identifier is preferred, then ISBN_10. Otherwise undefined (ISSN/OTHER are ignored).
**Specification:**
  Given identifiers [ISBN_10 "0306406152", ISBN_13 "9780306406157"]
  When selected
  Then "9780306406157"
**Parameters:** none
**Edge cases handled:** no identifiers
**Confidence:** High.

### RULE-057: Google Books volume → Book defaults
**Category:** Calculation
**Priority:** P1
**Source:** `src/lib/books/book-utils.ts:25-53`
**Plain English:** A new book from Google gets state not_started, currentPage 0, totalPages = pageCount or 0, genre = first category or "", isOwned false, author via RULE-054, and timestamps now. ISBN (RULE-056), cover (RULE-055), publishedDate and description are set only when present.
**Specification:**
  Given a volume with no pageCount and no categories
  When converted
  Then progress {0, 0}, genre "", isOwned false
**Parameters:** isOwned default false (code TODO questions this)
**Edge cases handled:** optional fields omitted when absent; the Google id is stripped before saving (AddBooksPage.tsx:125)
**Suspected defect:** genre "" is stored (manual entry omits genre instead). Stats treat "" as "Unknown" in charts but skip it in favorites. Books added from search default to wishlist (not owned).
**Confidence:** High. SME question: should added books default to owned?

### RULE-058: Manual entry → Book conversion
**Category:** Calculation
**Priority:** P1
**Source:** `src/lib/books/book-utils.ts:84-119`
**Plain English:** totalPages = parseInt(pages), NaN becomes 0. Title and author are trimmed. isOwned = (ownership === "owned"). Genre and description are trimmed and set only if non-empty. publishedDate = "<year>-01-01". State is not_started at page 0.
**Specification:**
  Given pages "12.9", publishedYear "1997", ownership "wishlist"
  When converted
  Then totalPages 12, publishedDate "1997-01-01", isOwned false; pages "abc" → 0; pages "-5" → −5, which BookService then rejects as invalid progress
**Parameters:** date suffix "-01-01"
**Edge cases handled:** blank optional fields are omitted; the temporary id `manual-<ms>-<random>` is stripped before saving
**Suspected defect:** A year-only input becomes a full date. BookInfo shows the raw "1997-01-01" (BookInfo.tsx:39-44), suggesting a 1 January publication date that was never entered.
**Confidence:** High.

### RULE-059: Published year display from Google date
**Category:** Calculation
**Priority:** P2
**Source:** `src/components/app/books/BookSearchCard.tsx:92-97`
**Plain English:** The year shown on search and preview cards is `new Date(publishedDate).getFullYear()`. The same code is in BookPreviewPage.tsx:57-59 and BookPreviewDialog.tsx:124-126.
**Specification:**
  Given publishedDate "1997" and a viewer in America/New_York
  When rendered
  Then 1996 (parsed as 1997-01-01T00:00Z = Dec 31 1996 local)
**Parameters:** none
**Edge cases handled:** missing date hides the field
**Suspected defect:** Off-by-one year for "YYYY", "YYYY-01" and "YYYY-01-01" dates in negative-offset timezones.
**Confidence:** High.

### RULE-060: AI message freshness (same calendar day)
**Category:** Calculation
**Priority:** P2
**Source:** `src/lib/services/MessageService.ts:56-58`
**Plain English:** The latest stored message is reused when its timestamp is on the same local calendar day as now (year, month and date equal, utils.ts:27-33). Otherwise a new one is generated.
**Specification:**
  Given a message generated 2026-10-14 23:50
  When the dashboard loads at 2026-10-15 00:05
  Then a refresh is triggered; generated 00:05 and viewed 23:55 the same day → reused
**Parameters:** local calendar day (comments say "24 hours")
**Edge cases handled:** no message at all → generate; forceRefresh → generate
**Confidence:** High.

### RULE-061: AI message generation and fallback flow
**Category:** Calculation
**Priority:** P2
**Source:** `src/lib/services/MessageService.ts:200-281`
**Plain English:** If a refresh is needed, an AI message is generated and validated. If AI or validation fails and any earlier message exists, the earlier one is returned without saving. If none exists, the stats fallback (RULE-062) is saved and returned. Any outer error returns the fallback unsaved.
**Specification:**
  Given yesterday's message exists and Gemini throws
  When the dashboard loads
  Then yesterday's message is shown; nothing is saved, so generation is retried on every load
**Parameters:** model gemini-2.5-flash-lite
**Edge cases handled:** a save failure still returns the message
**Confidence:** High.

### RULE-062: Fallback message selection thresholds
**Category:** Calculation
**Priority:** P2
**Source:** `src/lib/services/MessageService.ts:173-194`
**Plain English:** The first matching rule wins. readingStreak > 7 gives the streak message. Otherwise currentlyReading > 0 gives "You're currently reading N book(s)". Otherwise finishedBooks > 0 gives "Congratulations on finishing N book(s)". Otherwise one of 5 canned messages is picked at random.
**Specification:**
  Given streak 7, currentlyReading 0, finishedBooks 3
  When the fallback is chosen
  Then "Congratulations on finishing 3 books!…"; streak 8 → "Amazing 8-day reading streak!…"
**Parameters:** streak threshold > 7 (strict); plural "s" when count > 1; 5 canned messages
**Edge cases handled:** all zero gives a random message
**Suspected defect:** finishedBooks is booksReadThisYear (RULE-022), so a lifetime reader with nothing finished this year gets a random message.
**Confidence:** High.

### RULE-063: AI message validity length
**Category:** Calculation
**Priority:** P2
**Source:** `src/lib/models/models.ts:401-407`
**Plain English:** A generated message is valid only if its trimmed length is 10–500 characters. Otherwise the fallback path in RULE-061 runs.
**Specification:**
  Given a Gemini reply of 620 characters
  When validated
  Then rejected, and the old message or the fallback is used
**Parameters:** min 10, max 500
**Edge cases handled:** non-string is invalid
**Confidence:** High.

### RULE-064: AI prompt computed inputs
**Category:** Calculation
**Priority:** P2
**Source:** `src/lib/services/MessageService.ts:63-157`
**Plain English:** If the profile was created today (same calendar day), a first-time welcome prompt is used. Otherwise the prompt includes the stats, each in-progress book's % (round(current/total×100)), the top 3 finished books by finishedAt desc with "rated N/5", the first 5 distinct genres in library order, and the first 3 recent activity types.
**Specification:**
  Given an in_progress book at 0/0 pages
  When the prompt is built
  Then the line reads "(NaN% complete)"; 50/0 → "(Infinity% complete)"
**Parameters:** 3 recent finishes, 5 genres, 3 activity types; 50–80 word target
**Edge cases handled:** empty sections get placeholder text
**Suspected defect:** (1) No divide-by-zero guard (unlike RULE-001). (2) The genre list is by first appearance, not frequency (contrast RULE-012). (3) The welcome prompt says the user "hasn't added any books yet", although a default sample book is created at signup (UserService.ts:41-69). (4) "Books finished" is the this-year count.
**Confidence:** High.

### RULE-065: Old AI message cleanup cutoff (unused)
**Category:** Calculation
**Priority:** P2
**Source:** `src/lib/services/MessageService.ts:313-334`
**Plain English:** Messages with timestamp earlier than now minus N days (default 30) would be batch-deleted.
**Specification:**
  Given today is 2026-10-15
  When cleanup runs with the default
  Then messages before 2026-09-15 (same clock time) are deleted
**Parameters:** olderThanDays 30
**Edge cases handled:** nothing to delete is still a success
**Suspected defect:** No caller, so message history grows without bound.
**Confidence:** High.

### RULE-066: Recently-added list size
**Category:** Calculation
**Priority:** P2
**Source:** `src/components/app/books/AddBooksPage.tsx:132-139`
**Plain English:** Each added book is prepended to the "Recently Added" list, keeping the previous first N items.
**Specification:**
  Given 6 books added in the session
  When the list renders
  Then 5 badges are shown (1 new + prev.slice(0, 4))
**Parameters:** RECENTLY_ADDED_BOOKS_LIMIT 4
**Edge cases handled:** none
**Suspected defect:** Off by one: the list holds up to 5, not 4. The same applies to the manual path (lines 201-208).
**Confidence:** High. SME question: is the intended maximum 4?

### RULE-067: Barcode scan duration logged
**Category:** Calculation
**Priority:** P2
**Source:** `src/components/app/books/AddBooksPage.tsx:142-155`
**Plain English:** When a scanned book is added, a manual_update event records "scan duration: round((now − scanStartTime)/1000)s".
**Specification:**
  Given scanStartTime 12.4 s before the add
  When logged
  Then "…scan duration: 12s)"
**Parameters:** ms→s, Math.round
**Edge cases handled:** logging failure is ignored
**Suspected defect:** scanStartTime is set when the barcode is captured (BarcodeScanner.tsx:63), so the "duration" measures lookup plus the user's confirmation time, not scanning.
**Confidence:** Medium — SME question: what should scan duration measure?

### RULE-068: Book card progress block guard
**Category:** Calculation
**Priority:** P2
**Source:** `src/components/app/books/BookCard.tsx:100-115`
**Plain English:** The pages/percent block shows only for in_progress books with truthy currentPage and totalPages.
**Specification:**
  Given an in_progress book at currentPage 0
  When the card renders
  Then a literal "0" appears (JSX `0 && …` renders 0) and no progress bar
**Parameters:** none
**Edge cases handled:** totalPages 0 hides the block
**Suspected defect:** A stray "0" is rendered. The list view (BookListItem.tsx:73-86) has no such guard and shows "0 / 0 pages 0%".
**Confidence:** High.

### RULE-069: Progress bar width clamp
**Category:** Calculation
**Priority:** P2
**Source:** `src/components/ui/progress-bar.tsx:47-47`
**Plain English:** The bar width is clamped to the range 0%–100%.
**Specification:**
  Given value 110
  When rendered
  Then width 100%; −5 → 0%
**Parameters:** bounds 0 and 100
**Edge cases handled:** out-of-range values
**Confidence:** High.

### RULE-070: Profile "Reader since" year
**Category:** Calculation
**Priority:** P2
**Source:** `src/components/app/layout/UserProfileDropdown.tsx:119-123`
**Plain English:** The member-since year comes from the profile createdAt year, else the auth creationTime year, else a hard-coded "2024". It is shown only when the user has no email.
**Specification:**
  Given no profile createdAt and no auth creationTime
  When rendered
  Then "Reader since 2024"
**Parameters:** fallback "2024"
**Edge cases handled:** missing data falls back
**Suspected defect:** The hard-coded fallback year is a fabricated value.
**Confidence:** High.

### RULE-071: Review "edited" detection
**Category:** Calculation
**Priority:** P2
**Source:** `src/components/app/book-detail/reviews/ReviewSection.tsx:119-122`
**Plain English:** "Last updated" is shown when review.updatedAt is strictly later than createdAt (in ms). The latest review event wins (EventsProvider.tsx:277).
**Specification:**
  Given createdAt 10:00:00.000 and updatedAt 10:00:00.000
  When rendered
  Then only "Written: …" is shown
**Parameters:** none
**Edge cases handled:** missing updatedAt
**Confidence:** High.

### RULE-072: Comment page label
**Category:** Calculation
**Priority:** P2
**Source:** `src/components/app/book-detail/comments/CommentItem.tsx:26-30`
**Plain English:** A comment's position label is "Before starting" (not_started), "After finishing" (finished), or "Page N".
**Specification:**
  Given a comment made in_progress at page 120
  When rendered
  Then "Page 120"
**Parameters:** none
**Edge cases handled:** none
**Confidence:** High.

### RULE-073: Comments collapsed view count
**Category:** Calculation
**Priority:** P2
**Source:** `src/components/app/book-detail/comments/CommentsSection.tsx:129-176`
**Plain English:** When collapsed, only the newest comment is shown, with a "Show N−1 more comment(s)" button.
**Specification:**
  Given 3 comments
  When collapsed
  Then 1 is shown plus "Show 2 more comments"; 2 comments → "Show 1 more comment"
**Parameters:** collapsed count 1
**Edge cases handled:** singular/plural
**Confidence:** High.

### RULE-074: Search "Add" suggestion truncation
**Category:** Calculation
**Priority:** P2
**Source:** `src/components/app/layout/SearchDropdown.tsx:438-440`
**Plain English:** The "Add "<query>"" suggestion truncates the query to 25 characters plus "...".
**Specification:**
  Given a 30-character query
  When the suggestion renders
  Then the first 25 characters + "..."
**Parameters:** 25 chars
**Edge cases handled:** queries of 25 characters or fewer are unchanged
**Confidence:** High.

### RULE-075: Published-date year window (edit validation)
**Category:** Calculation
**Priority:** P2
**Source:** `src/lib/books/book-validation.ts:259-264`
**Plain English:** On edit, the publication year must be between 1000 and the current year + 1. Month and day must be 1–12 and 1–31.
**Specification:**
  Given today is 2026-10-15
  When publishedDate "2028" is entered
  Then the error "Year must be between 1000 and" is shown; "2027" is accepted
**Parameters:** min 1000; max currentYear+1 (VALIDATION_CONFIG.MAX_PUBLICATION_YEAR = currentYear, fixed at module load, is not used here; manual entry input max = currentYear, ManualEntryForm.tsx:131)
**Edge cases handled:** formats YYYY, YYYY-MM, YYYY-MM-DD
**Suspected defect:** The error message is truncated (no upper year). Edit allows currentYear+1 while manual entry allows only currentYear. Day 31 is accepted for any month (e.g. 2020-02-31).
**Confidence:** High.


## Validation rules

### RULE-076: Reading progress must stay within the book's page bounds
**Category:** Validation
**Priority:** P0
**Source:** `src/lib/models/models.ts:202-207`
**Plain English:** A progress object is valid only if total pages is not negative and the current page is between 0 and total pages, inclusive.
**Specification:**
  Given a progress object `{currentPage: 150, totalPages: 200}`
  When  `validateProgress` is called
  Then  it returns `true`. For `{currentPage: 201, totalPages: 200}`, `{currentPage: -1, totalPages: 200}` or `{currentPage: 0, totalPages: -5}` it returns `false`
**Parameters:** lower bound for both fields = 0; upper bound for currentPage = totalPages
**Edge cases handled:** `{0, 0}` is valid. `{currentPage: 10, totalPages: 0}` is invalid, because 0 is treated as a real upper bound here (contrast RULE-088 and RULE-110).
**Suspected defect:** NaN is not checked. `{currentPage: NaN, totalPages: NaN}` passes because every comparison with NaN is false. The function also disagrees with `validateProgressData` (RULE-110), which treats totalPages = 0 as "no cap".
**Confidence:** High — read directly from the code.

### RULE-077: A rating must be a number from 1 to 5
**Category:** Validation
**Priority:** P0
**Source:** `src/lib/models/models.ts:226-231`
**Plain English:** A rating is valid only if it is a real number from 1 to 5, inclusive.
**Specification:**
  Given rating = 4
  When  `validateRating(4)` is called
  Then  it returns `true`. It returns `false` for 0, 6, NaN and non-number values
**Parameters:** min = 1, max = 5
**Edge cases handled:** non-number type; NaN
**Suspected defect:** Fractional ratings such as 3.5 pass here. The edit-form validator (RULE-111) rejects them with "Rating must be a whole number", so the service and the UI disagree.
**Confidence:** High — read directly from the code.

### RULE-078: A comment must be 1 to 2000 characters after trimming
**Category:** Validation
**Priority:** P1
**Source:** `src/lib/models/models.ts:305-311`
**Plain English:** A comment is valid if its trimmed text is between 1 and 2000 characters long.
**Specification:**
  Given the comment "   Great book   " (10 characters after trimming)
  When  `validateComment` is called
  Then  it returns `true`. It returns `false` for "   " (empty after trim), for 2001 trimmed characters, and for non-string values
**Parameters:** min = 1, max = 2000 (counted on trimmed length)
**Edge cases handled:** whitespace-only text; non-string input
**Confidence:** High — read directly from the code.

### RULE-079: A comment's page must be between 0 and the book's total pages
**Category:** Validation
**Priority:** P1
**Source:** `src/lib/models/models.ts:332-343`
**Plain English:** The page a comment is attached to must be a real number from 0 to the book's total pages.
**Specification:**
  Given page = 150 and totalPages = 200
  When  `validateCommentPage(150, 200)` is called
  Then  it returns `true`. It returns `false` for page = 201, page = -1, or when either value is NaN or not a number
**Parameters:** range is 0 to totalPages, inclusive
**Edge cases handled:** NaN or non-number page; NaN or non-number totalPages
**Suspected defect:** When totalPages = 0 (no page count known), only page 0 is allowed. RULE-088 lets such a book's currentPage go above 0, so comments on it then fail (see RULE-099).
**Confidence:** High — read directly from the code.

### RULE-080: A review must be 10 to 5000 characters after trimming
**Category:** Validation
**Priority:** P1
**Source:** `src/lib/models/models.ts:362-368`
**Plain English:** A review is valid if its trimmed text is between 10 and 5000 characters long.
**Specification:**
  Given the review "Loved it!!" (10 characters)
  When  `validateReview` is called
  Then  it returns `true`. It returns `false` for "Too short" (9 characters), for 5001 trimmed characters, and for non-string values
**Parameters:** min = 10, max = 5000 (counted on trimmed length)
**Edge cases handled:** padding whitespace is not counted; non-string input
**Confidence:** High — read directly from the code.

### RULE-081: AI-generated personalised messages must be 10 to 500 characters
**Category:** Validation
**Priority:** P1
**Source:** `src/lib/models/models.ts:401-407`
**Plain English:** A personalised message is valid if its trimmed content is between 10 and 500 characters.
**Specification:**
  Given generated content "Great job on your reading streak!" (33 characters)
  When  `validatePersonalizedMessage` is called
  Then  it returns `true`. It returns `false` for content under 10 or over 500 trimmed characters, and for non-string values
**Parameters:** min = 10, max = 500
**Edge cases handled:** whitespace trimming; non-string input
**Confidence:** High — read directly from the code.

### RULE-082: Invalid or failed AI messages fall back to the previous message or a canned one
**Category:** Validation
**Priority:** P2
**Source:** `src/lib/services/MessageService.ts:224-246`
**Plain English:** A new message is generated when there is no stored message, the stored one is from an earlier calendar day, or a refresh is forced. If generation fails or the result fails RULE-081, the app reuses the old message, or a canned message if there is no old one.
**Specification:**
  Given the latest stored message is from yesterday and Gemini returns 600 characters
  When  `getPersonalizedMessage` runs
  Then  it raises "Generated message failed validation" internally and returns the old message's content with `success: true`. If there is no old message, it uses the stats-based fallback (streak > 7, then currently reading > 0, then finished > 0, then a random entry from FALLBACK_MESSAGES) and saves it
**Parameters:** refresh test = `!isSameDay(message.timestamp, now)`
**Edge cases handled:** failure to save the new message is logged and the message is still returned; any other exception also returns a fallback with `success: true`
**Suspected defect:** The comments say "older than 24 hours", but the code compares calendar days, so a message created at 23:59 is replaced at 00:00. The prompt also inserts user-entered book titles and authors directly (lines 115-136), which makes prompt injection into Gemini possible.
**Confidence:** Medium — the code is clear. SME question: is the intended refresh a calendar day or a rolling 24 hours?

### RULE-083: Reading state must be one of three values
**Category:** Validation
**Priority:** P1
**Source:** `src/lib/models/models.ts:147-149`
**Plain English:** A reading state is valid only if it is "not_started", "in_progress" or "finished".
**Specification:**
  Given state = "reading"
  When  `isValidReadingState("reading")` is called
  Then  it returns `false`. It returns `true` for "not_started", "in_progress" and "finished"
**Parameters:** allowed values = not_started, in_progress, finished
**Edge cases handled:** the check is case-sensitive
**Confidence:** High — it is used by `validateEditedBook` (RULE-108).

### RULE-084: Reading state may only move forward one step
**Category:** Validation
**Priority:** P0
**Source:** `src/lib/models/models.ts:419-452`
**Plain English:** Through the normal flow, a book can only go from not started to in progress, and from in progress to finished. Finished is final.
**Specification:**
  Given currentState = "not_started"
  When  `canTransitionTo("not_started", "finished")` is called
  Then  it returns `false`. Only not_started→in_progress and in_progress→finished return `true`. Anything from "finished", and any same-state "transition", returns `false`
**Parameters:** READING_STATE_TRANSITIONS = {not_started: [in_progress], in_progress: [finished], finished: []}
**Edge cases handled:** an unknown current state returns `false`
**Confidence:** High — the manual edit path (`updateBookManual`, RULE-140) deliberately bypasses this rule.

### RULE-085: Book data checks on add and update
**Category:** Validation
**Priority:** P0
**Source:** `src/lib/services/BookService.ts:70-88`
**Plain English:** When a book is added or updated (including manual updates), title and author, if supplied, cannot be blank; progress must pass RULE-076; and rating, if supplied, must pass RULE-077.
**Specification:**
  Given `addBook` receives `{title: "   ", author: "Tolkien", ...}`
  When  validation runs
  Then  it fails with "Book title cannot be empty". The other failures are "Book author cannot be empty", "Invalid progress data" and "Rating must be between 1 and 5"
**Parameters:** none
**Edge cases handled:** fields that are not supplied (undefined) are skipped, so partial updates work. Checks run in order and only the first failure is returned.
**Suspected defect:** On `addBook`, a missing (undefined) title or author is not rejected. A Google volume with no title (`convertGoogleBookToBook` copies `volumeInfo.title` as is) would be saved without a title. There is no duplicate-book check.
**Confidence:** High — read directly from the code.

### RULE-086: Current page cannot be negative
**Category:** Validation
**Priority:** P0
**Source:** `src/lib/services/BookService.ts:243-248`
**Plain English:** A progress update with a negative page is rejected before the database is touched.
**Specification:**
  Given currentPage = -5
  When  `updateBookProgress(userId, bookId, -5)` is called
  Then  it fails with "Current page cannot be negative" and nothing is written
**Parameters:** min = 0
**Edge cases handled:** none beyond the sign check
**Suspected defect:** NaN passes this check. In the UI, the provider re-wraps the error so the user sees "An unexpected error occurred" (RULE-147).
**Confidence:** High — read directly from the code.

### RULE-087: A progress update needs an existing book
**Category:** Validation
**Priority:** P1
**Source:** `src/lib/services/BookService.ts:251-263`
**Plain English:** A progress update fails if the book cannot be loaded or does not exist.
**Specification:**
  Given bookId "abc" does not exist for the user
  When  `updateBookProgress` is called
  Then  it fails with "Book not found". A repository failure is mapped by RULE-093
**Parameters:** none
**Edge cases handled:** repository error versus a missing document
**Confidence:** High — read directly from the code.

### RULE-088: Current page cannot exceed total pages, when total pages is known
**Category:** Validation
**Priority:** P0
**Source:** `src/lib/services/BookService.ts:280-287`
**Plain English:** If the book has a non-zero page count, a progress update above it is rejected.
**Specification:**
  Given an in-progress book with totalPages = 300
  When  `updateBookProgress(..., 301)` is called
  Then  it fails with "Current page cannot exceed total pages". If totalPages = 0 or is missing, any non-negative page is accepted and saved with totalPages 0
**Parameters:** cap = book.progress.totalPages, applied only when it is truthy
**Edge cases handled:** totalPages 0 or undefined means no cap
**Suspected defect:** (1) The not_started→in_progress auto-transition (lines 266-277) runs before this check. A not-started book given page 301 of 300 is moved to "in_progress" and logged, and then the update is rejected. (2) With totalPages = 0, a page such as 500 is saved, which RULE-076 would reject on any later `updateBook`/`updateBookManual` that includes progress, and which makes RULE-099 reject every comment.
**Confidence:** High — read directly from the code.

### RULE-089: First progress on an unstarted book starts it; reaching the last page finishes it
**Category:** Validation
**Priority:** P1
**Source:** `src/lib/services/BookService.ts:320-326`
**Plain English:** After a progress update, an in-progress book whose page reaches or passes its total pages is moved to "finished" automatically.
**Specification:**
  Given an in-progress book with totalPages = 300
  When  `updateBookProgress(..., 300)` succeeds
  Then  the progress event is logged and `updateBookState(..., "finished", "in_progress")` is called, which sets finishedAt
**Parameters:** trigger = `currentPage >= totalPages && totalPages > 0 && state === "in_progress"`
**Edge cases handled:** totalPages 0 never auto-finishes. A failure of the finishing step is ignored and the update still returns success.
**Suspected defect:** The check reads the book's state from before the update. For a not-started book that is auto-started (lines 266-277) and given the last page in the same call, `book.state` is still "not_started", so it never auto-finishes. Related: "Start Reading" in BookDetailPage sets page 1 (`BookDetailPage.tsx:90-91`), so a 1-page book finishes the moment it is started.
**Confidence:** High — read directly from the code.

### RULE-090: State changes must follow the state machine and need a known current state
**Category:** Validation
**Priority:** P0
**Source:** `src/lib/services/BookService.ts:349-379`
**Plain English:** `updateBookState` loads the current state if the caller did not pass one, then rejects a missing book, an unknown state, or a transition RULE-084 does not allow.
**Specification:**
  Given a finished book
  When  `updateBookState(userId, bookId, "in_progress")` is called
  Then  it fails with "Cannot transition from finished to in_progress". A missing book fails with "Book not found", and an empty state fails with "Current state is undefined"
**Parameters:** RULE-084 transition table
**Edge cases handled:** current state supplied by the caller versus loaded from the database
**Suspected defect:** When the caller supplies `currentState`, it is trusted and not checked against the database. The UI passes `book.state` from possibly stale React state (`BookDetailPage.tsx:77,90`). Entering in_progress never sets `startedAt`.
**Confidence:** High — read directly from the code.

### RULE-091: Rating updates must be 1 to 5 (the service does not check whether the book is finished)
**Category:** Validation
**Priority:** P0
**Source:** `src/lib/services/BookService.ts:433-438`
**Plain English:** `updateBookRating` rejects ratings outside 1 to 5 before saving and logging a rating_added event.
**Specification:**
  Given rating = 0
  When  `updateBookRating(userId, bookId, 0)` is called
  Then  it fails with "Rating must be between 1 and 5". With rating 4, it saves and logs `{type: "rating_added", data: {rating: 4}}`
**Parameters:** RULE-077
**Edge cases handled:** NaN and non-number values
**Suspected defect:** The service does not check that the book is finished; only the UI does (RULE-133). The edit sheet also lets you rate a book in any state (RULE-140). The book's existence is not checked first, so a missing book shows up as a generic database error.
**Confidence:** High — read directly from the code.

### RULE-092: Book search inside the user's library ignores blank queries
**Category:** Validation
**Priority:** P2
**Source:** `src/lib/services/BookService.ts:584-586`
**Plain English:** A blank or whitespace-only library search returns no results without querying the database.
**Specification:**
  Given searchQuery = "   "
  When  `searchBooks(userId, "   ")` is called
  Then  it returns `{success: true, data: []}`
**Parameters:** default maxResults = 10
**Edge cases handled:** whitespace-only query
**Confidence:** High — read directly from the code.

### RULE-093: Book repository errors are turned into user-facing messages
**Category:** Validation
**Priority:** P0
**Source:** `src/lib/services/BookService.ts:43-65`
**Plain English:** BookService turns repository error strings into standard errors: access denied, network, not found, or a generic database error.
**Specification:**
  Given the repository returns "Access denied to book collection" (from Firestore `permission-denied`)
  When  any BookService method handles it
  Then  it returns an AUTHORIZATION error, severity HIGH, with the message "You don't have permission to access this book". "Network error…" gives the message "Please check your connection and try again". A string containing "not found" gives "Book not found". Anything else gives the message "An unexpected error occurred"
**Parameters:** matching is by substring: "Access denied", "Network error", "not found"
**Edge cases handled:** see RULE-152 for how the repository strings are produced
**Suspected defect:** The repository never produces "not found" (Firestore `not-found` becomes "Database error: <message>"), so the "Book not found" branch is effectively unreachable. The messages are also lost at the provider layer (RULE-147).
**Confidence:** Medium — SME question: should a Firestore `not-found` show "Book not found"?

### RULE-094: Adding a book by ISBN requires a non-blank ISBN
**Category:** Validation
**Priority:** P1
**Source:** `src/lib/services/BookService.ts:843-851`
**Plain English:** `addBookFromISBN` rejects a missing, non-string or blank ISBN.
**Specification:**
  Given isbn = "  "
  When  `addBookFromISBN(userId, "  ")` is called
  Then  it fails with internal message "ISBN is required" and user message "Please provide a valid ISBN"
**Parameters:** none
**Edge cases handled:** null, non-string and whitespace-only input
**Suspected defect:** No format or checksum check is applied (RULE-118 is not called). `addBookFromISBN` is not called anywhere in the UI.
**Confidence:** High — read directly from the code. Usage was checked by grep.

### RULE-095: ISBN lookup with no result tells the user to use Manual Entry
**Category:** Validation
**Priority:** P1
**Source:** `src/lib/services/BookService.ts:854-864`
**Plain English:** If the Google Books lookup fails or returns nothing, adding by ISBN fails with a pointer to manual entry.
**Specification:**
  Given Google Books returns 0 items for "9780000000000"
  When  `addBookFromISBN` runs
  Then  it fails with user message "Book not found in our database. You can add it manually using the 'Manual Entry' tab."
**Parameters:** lookup maxResults = 1
**Edge cases handled:** an empty result and a failed API call are treated the same
**Suspected defect:** `searchByISBN` returns `success:false` instead of throwing. A missing API key, HTTP 429 or 403, or a network failure is therefore all reported as "Book not found…", and the specific mappings at lines 882-916 (RULE-096) never run.
**Confidence:** High — read directly from the code.

### RULE-096: ISBN-add exceptions are mapped to rate-limit, network or service-unavailable errors
**Category:** Validation
**Priority:** P2
**Source:** `src/lib/services/BookService.ts:882-922`
**Plain English:** If an exception is thrown while adding by ISBN, its message is matched to choose a rate-limit, network or service-unavailable error.
**Specification:**
  Given an exception whose message contains "Rate limit" or "quota"
  When  it is caught
  Then  it returns a NETWORK error with message "Search limit reached. Please try again in a few minutes.". "Network" or "connection" gives "Network error. Please check your internet connection and try again.", "API key" gives a SYSTEM error "Book search service unavailable. Please try manual entry.", and anything else gives "Failed to add book from ISBN"
**Parameters:** substring matches as listed
**Edge cases handled:** non-Error exceptions fall through to the generic case
**Suspected defect:** These are effectively dead (see RULE-095). Even when reached, the descriptive text goes into the internal `message`. `createNetworkError` and `createSystemError` set the user message to "Please check your connection and try again" or "An unexpected error occurred" (RULE-153), so users never see the specific text.
**Confidence:** High — read directly from the code.

### RULE-097: Event operations require a user ID and a book ID
**Category:** Validation
**Priority:** P1
**Source:** `src/lib/services/EventService.ts:319-331`
**Plain English:** Every EventService method (addComment shown here; the same pattern appears in getRecentEvents, getRecentActivityItems, logEvent, getBookEvents, getBookComments, addReview, updateReview and getBookReview) rejects a missing userId or bookId.
**Specification:**
  Given userId = ""
  When  `addComment("", "b1", "Nice", "in_progress", 10)` is called
  Then  it fails with "User ID is required". A missing bookId fails with "Book ID is required"
**Parameters:** none
**Edge cases handled:** userId is checked before bookId
**Confidence:** High — the same pattern is repeated at lines 129-134, 167-172, 227-239, 270-282, 403-415, 459-471, 559-571 and 637-649.

### RULE-098: The service rejects comments outside 1 to 2000 characters
**Category:** Validation
**Priority:** P1
**Source:** `src/lib/services/EventService.ts:333-340`
**Plain English:** `addComment` applies RULE-078 on the server side and stores the trimmed text.
**Specification:**
  Given comment = "   "
  When  `addComment` is called
  Then  it fails with "Comment must be between 1 and 2000 characters". A valid comment is stored trimmed with commentState and commentPage
**Parameters:** 1 to 2000 trimmed characters
**Edge cases handled:** trimming before storage
**Suspected defect:** `readingState` is not validated (RULE-083 is not applied). Comments are allowed in every reading state.
**Confidence:** High — read directly from the code.

### RULE-099: A comment needs an existing book and a valid page
**Category:** Validation
**Priority:** P1
**Source:** `src/lib/services/EventService.ts:343-357`
**Plain English:** The book must load, and the comment's page must pass RULE-079 against the book's total pages.
**Specification:**
  Given book "b1" has totalPages = 200
  When  `addComment(..., currentPage = 250)` is called
  Then  it fails with "Invalid page number". If the book is missing, or the repository fails, it fails with "Book not found"
**Parameters:** page range 0 to totalPages
**Edge cases handled:** a repository failure is reported as "Book not found"
**Suspected defect:** The UI always sends `book.progress.currentPage` (`CommentsSection.tsx:46-52`), but CommentForm shows "Page {totalPages}" for finished books (`CommentForm.tsx:66-67`), so the label and the stored page can differ. Books with totalPages 0 and currentPage > 0 (allowed by RULE-088) cannot be commented on at all.
**Confidence:** High — read directly from the code.

### RULE-100: The service rejects reviews outside 10 to 5000 characters
**Category:** Validation
**Priority:** P1
**Source:** `src/lib/services/EventService.ts:473-480`
**Plain English:** `addReview` applies RULE-080. `updateReview` repeats the same check at lines 573-580.
**Specification:**
  Given reviewText = "Too short"
  When  `addReview` or `updateReview` is called
  Then  it fails with "Review must be between 10 and 5000 characters"
**Parameters:** 10 to 5000 trimmed characters
**Edge cases handled:** text is stored trimmed
**Confidence:** High — read directly from the code.

### RULE-101: A review needs an existing book
**Category:** Validation
**Priority:** P1
**Source:** `src/lib/services/EventService.ts:483-489`
**Plain English:** `addReview` fails if the book cannot be loaded.
**Specification:**
  Given bookId "missing"
  When  `addReview` is called with valid text
  Then  it fails with "Book not found"
**Parameters:** none
**Edge cases handled:** a repository error is reported as "Book not found"
**Confidence:** High — read directly from the code.

### RULE-102: Only finished books can be reviewed
**Category:** Validation
**Priority:** P0
**Source:** `src/lib/services/EventService.ts:492-499`
**Plain English:** A new review can only be added to a book in the "finished" state.
**Specification:**
  Given book "b1" has state "in_progress"
  When  `addReview(userId, "b1", "A wonderful read overall")` is called
  Then  it fails with "Reviews can only be added to finished books"
**Parameters:** required state = finished
**Edge cases handled:** none
**Suspected defect:** `updateReview` does not re-check the state. After a manual edit back to in_progress, the review can still be edited.
**Confidence:** High — read directly from the code.

### RULE-103: Only one review per book
**Category:** Validation
**Priority:** P0
**Source:** `src/lib/services/EventService.ts:502-510`
**Plain English:** If a review already exists for the book, `addReview` is rejected and the caller must use `updateReview`.
**Specification:**
  Given book "b1" already has a review event
  When  `addReview` is called
  Then  it fails with "A review already exists for this book. Use updateReview to modify it."
**Parameters:** maximum 1 active review per book
**Edge cases handled:** "existing" means the latest event of type review
**Suspected defect:** The check lets the add go through when it cannot run. If `getBookReview` itself fails (`success:false`), the add proceeds and can create a second review. The check-then-write is not atomic.
**Confidence:** High — read directly from the code.

### RULE-104: Updating a review requires an existing review
**Category:** Validation
**Priority:** P1
**Source:** `src/lib/services/EventService.ts:583-589`
**Plain English:** `updateReview` fails if there is no current review. On success it adds a new review event that keeps the original createdAt.
**Specification:**
  Given book "b1" has no review
  When  `updateReview(userId, "b1", "Updated thoughts here")` is called
  Then  it fails with "No existing review found to update". Otherwise a new review event is logged with reviewCreatedAt = the original createdAt and reviewUpdatedAt = now
**Parameters:** none
**Edge cases handled:** a lookup failure is treated as "no review"
**Confidence:** High — read directly from the code.

### RULE-105: User profile fields cannot be blank or negative
**Category:** Validation
**Priority:** P1
**Source:** `src/lib/services/UserService.ts:103-135`
**Plain English:** When a profile is created or updated, display name and email (if supplied) cannot be blank, and the three book counters (if supplied) cannot be negative.
**Specification:**
  Given `updateProfile(uid, {totalBooksRead: -1})`
  When  validation runs
  Then  it fails with "Total books read cannot be negative". The other messages are "Display name cannot be empty", "Email cannot be empty", "Currently reading count cannot be negative" and "Books in library count cannot be negative"
**Parameters:** counters ≥ 0
**Edge cases handled:** fields that are not supplied are skipped; only the first failure is returned
**Confidence:** High — read directly from the code.

### RULE-106: Default values for a new user profile
**Category:** Validation
**Priority:** P1
**Source:** `src/lib/services/UserService.ts:183-199`
**Plain English:** A new profile uses "Anonymous User" if Google gives no display name and "" if it gives no email, starts all counters at 0, and must then pass RULE-105.
**Specification:**
  Given a first sign-in where Google returns `displayName: null, email: null`
  When  `createProfileFromFirebaseUser` runs
  Then  displayName becomes "Anonymous User". email becomes "", which fails "Email cannot be empty"; the error is thrown and re-wrapped as "Failed to create user profile" (user message "An unexpected error occurred")
**Parameters:** default displayName "Anonymous User"; counters 0
**Edge cases handled:** an existing profile is updated rather than recreated (lines 167-180)
**Suspected defect:** A Google account without an email can never get a profile, because the default "" always fails validation. Wrapping the validation error in a system error also hides the cause.
**Confidence:** Medium — SME question: can Google sign-in ever return a null email in this app's configuration?

### RULE-107: User repository errors are turned into user-facing messages
**Category:** Validation
**Priority:** P1
**Source:** `src/lib/services/UserService.ts:74-98`
**Plain English:** Profile repository errors are turned into access-denied, network, not-found or generic database errors.
**Specification:**
  Given the repository returns "Access denied to …"
  When  UserService handles it
  Then  it returns an AUTHORIZATION error with message "You don't have permission to access this user profile". "Network error" gives the message "Please check your connection and try again", "not found" gives "User profile not found", and anything else gives "An unexpected error occurred"
**Parameters:** substring matching
**Edge cases handled:** same as RULE-093
**Confidence:** High — read directly from the code.

### RULE-108: The edit form requires a title and an author
**Category:** Validation
**Priority:** P0
**Source:** `src/lib/books/book-validation.ts:34-48`
**Plain English:** When the edit form is submitted, title and author must be non-empty strings after trimming.
**Specification:**
  Given the edit form has title = "  "
  When  `validateEditedBook` runs
  Then  it adds the error "Title is required and cannot be empty". A blank author adds "Author is required and cannot be empty". All errors are collected, not just the first
**Parameters:** none
**Edge cases handled:** missing, non-string and whitespace-only values
**Confidence:** High — read directly from the code.

### RULE-109: The edit form rejects unknown reading states and non-boolean ownership
**Category:** Validation
**Priority:** P1
**Source:** `src/lib/books/book-validation.ts:51-98`
**Plain English:** The edit form accepts any of the three states, ignoring the state machine, but rejects unknown states. Ownership must be true or false.
**Specification:**
  Given formData.state = "paused"
  When  `validateEditedBook` runs
  Then  it adds "Invalid reading state". `isOwned = "yes"` adds "Ownership status must be true or false". Progress, rating, ISBN, cover URL and published date are passed to RULE-110, V36, V37, V38 and V39, but only when they are non-empty
**Parameters:** RULE-083 values
**Edge cases handled:** an empty ISBN, cover image or published date skips that check
**Confidence:** High — the range spans the whole aggregate function because it is one rule set.

### RULE-110: Edit-form progress must be numeric, non-negative and not above total pages
**Category:** Validation
**Priority:** P0
**Source:** `src/lib/books/book-validation.ts:115-141`
**Plain English:** Total pages and current page must be numbers that are not negative, and current page cannot exceed a non-zero total.
**Specification:**
  Given `{currentPage: 350, totalPages: 300}`
  When  `validateProgressData` runs
  Then  it adds "Current page cannot exceed total pages". Other errors are "Total pages must be a valid number", "Total pages cannot be negative", "Current page must be a valid number" and "Current page cannot be negative"
**Parameters:** min 0; cap = totalPages, only when totalPages is non-zero
**Edge cases handled:** NaN; totalPages 0 means no cap
**Suspected defect:** This disagrees with RULE-076. `{currentPage: 50, totalPages: 0}` passes here, but `updateBookManual`'s `validateBookData` rejects it with "Invalid progress data". The user then sees "An unexpected error occurred" (RULE-147) and the sheet closes anyway (RULE-140).
**Confidence:** High — read directly from the code.

### RULE-111: Edit-form rating must be a whole number from 1 to 5
**Category:** Validation
**Priority:** P1
**Source:** `src/lib/books/book-validation.ts:152-167`
**Plain English:** The edit form accepts only integer ratings from 1 to 5.
**Specification:**
  Given rating = 3.5
  When  `validateRating` (edit version) runs
  Then  it adds "Rating must be a whole number". Rating 0 or 6 adds "Rating must be between 1 and 5 stars", and NaN adds "Rating must be a valid number"
**Parameters:** min 1, max 5, integer only
**Edge cases handled:** NaN or non-number; fractions
**Confidence:** High — read directly from the code.

### RULE-112: Edit-form ISBN must be a well-formed ISBN-10 or ISBN-13 (no checksum)
**Category:** Validation
**Priority:** P1
**Source:** `src/lib/books/book-validation.ts:178-200`
**Plain English:** After hyphens and spaces are removed, an ISBN must be 9 digits plus a digit or X (ISBN-10), or 13 digits (ISBN-13).
**Specification:**
  Given isbn = "978-0-306-40615-7"
  When  `validateISBN` (format version) runs
  Then  it passes (13 digits). "123456789x" fails "Invalid ISBN-10 format" (lowercase x), "97803064061A" fails "ISBN must be 10 or 13 digits long", and a 13-character value with a letter fails "Invalid ISBN-13 format"
**Parameters:** lengths 10 or 13; X allowed only as the 10th character, uppercase
**Edge cases handled:** hyphens and whitespace are stripped
**Suspected defect:** No checksum is applied (unlike RULE-119), and lowercase "x" is rejected although `isbn-utils` accepts it. The message "10 or 13 digits" is shown even for 10-character input that contains letters elsewhere.
**Confidence:** High — read directly from the code.

### RULE-113: Cover image URL must parse and look like an image or come from Google Books
**Category:** Validation
**Priority:** P1
**Source:** `src/lib/books/book-validation.ts:211-233`
**Plain English:** A cover URL must be a parseable URL, and must either end in .jpg/.jpeg/.png/.gif/.webp or contain "books.google.com".
**Specification:**
  Given coverImage = "https://example.com/cover.png"
  When  `validateURL` runs
  Then  it passes. "not a url" fails "Invalid URL format", and "https://example.com/cover.png?w=300" fails "URL should point to an image file or be from a trusted source"
**Parameters:** extensions jpg|jpeg|png|gif|webp (case-insensitive, end of string); trusted substring "books.google.com"
**Edge cases handled:** case-insensitive extension check
**Suspected defect:** (1) The "trusted source" test is a plain substring match, so "https://evil.example/?books.google.com" passes. (2) The scheme is not restricted, so "javascript:x//a.png" passes. (3) URLs with query strings are rejected. (4) `next.config.ts` lets `next/image` load only books.google.com, books.googleusercontent.com and lh3.googleusercontent.com. Any other host that passes here would make `<Image>` in BookCover fail to render at runtime.
**Confidence:** Medium — SME question: which image hosts should be allowed for user-supplied covers?

### RULE-114: Published date must be YYYY, YYYY-MM or YYYY-MM-DD with a plausible year
**Category:** Validation
**Priority:** P1
**Source:** `src/lib/books/book-validation.ts:244-287`
**Plain English:** A published date must match one of three formats, with a year from 1000 to next year, a month from 1 to 12 and a day from 1 to 31.
**Specification:**
  Given publishedDate = "2024-13"
  When  `validatePublishedDate` runs
  Then  it adds "Date must be in format YYYY, YYYY-MM, or YYYY-MM-DD". "0999" adds "Year must be between 1000 and", and "March 2020" adds the format message
**Parameters:** year 1000 to (current year + 1); month 1 to 12; day 1 to 31
**Edge cases handled:** month and day are checked only when present
**Suspected defect:** The year error message is cut off ("Year must be between 1000 and", with no upper bound). Impossible dates such as "2023-02-31" are accepted. The upper bound (current year + 1) disagrees with `VALIDATION_CONFIG.NUMERIC.MAX_PUBLICATION_YEAR` (current year, unused) and with the ManualEntryForm max (current year). Google Books dates in other formats (for example with a time part) block saving the edit form until the date is cleared.
**Confidence:** High — read directly from the code.

### RULE-115: Text fields have a 500-character limit and required fields cannot be blank (live hint)
**Category:** Validation
**Priority:** P2
**Source:** `src/lib/books/book-validation.ts:308-330`
**Plain English:** A text field marked required cannot be blank, and any text field over 500 trimmed characters is flagged.
**Specification:**
  Given a description of 501 characters
  When  `validateStringField(desc, "Description", false)` runs
  Then  it returns "Description cannot exceed 500 characters". A blank required Title returns "Title is required"
**Parameters:** DESCRIPTION_MAX_LENGTH = 500 (applied to every field that uses this function)
**Edge cases handled:** optional blank fields pass
**Suspected defect:** The 500 limit is used for title, author, ISBN, genre, date and cover URL as well as description. In EditBookSheet it only shows a hint and never blocks saving (RULE-142). Google Books descriptions often exceed 500 characters.
**Confidence:** Medium — SME question: should 500 characters be an enforced limit for description, and should other fields have their own limits?

### RULE-116: Numeric fields have min/max checks (live hint)
**Category:** Validation
**Priority:** P2
**Source:** `src/lib/books/book-validation.ts:343-369`
**Plain English:** An optional numeric field must parse as a number and fall within the given min and max.
**Specification:**
  Given value = 0 with fieldName "Total pages" and min 1
  When  `validateNumericField` runs
  Then  it returns "Total pages cannot be less than 1". "abc" returns "<field> must be a valid number", and a value above max returns "<field> cannot exceed <max>"
**Parameters:** default min = MIN_PAGE = 0
**Edge cases handled:** undefined or "" counts as valid (optional)
**Confidence:** High — read directly from the code.

### RULE-117: ISBN checksum validation, lenient for 13 digits
**Category:** Validation
**Priority:** P1
**Source:** `src/lib/utils/isbn-utils.ts:87-105`
**Plain English:** After removing everything except digits and X, a 10-character ISBN must pass the ISBN-10 checksum, and any 13-digit numeric code is accepted without a checksum.
**Specification:**
  Given isbn = "0-306-40615-2"
  When  `validateISBN` (utils version) runs
  Then  it returns `true`. "0306406153" returns `false` (bad checksum), "5781440898956" returns `true` (any 13 digits), and 12-digit input returns `false`
**Parameters:** lengths 10 or 13
**Edge cases handled:** lowercase x is uppercased; separators are stripped
**Suspected defect:** It is not called by any UI or service (only internally by `convertISBN10to13`), so scanned and typed ISBNs are never checksum-validated.
**Confidence:** High — usage was checked by grep.

### RULE-118: ISBN-10 checksum
**Category:** Validation
**Priority:** P1
**Source:** `src/lib/utils/isbn-utils.ts:117-139`
**Plain English:** An ISBN-10 is valid when the weighted sum (weights 10 down to 1, with X = 10 in the last position) is divisible by 11.
**Specification:**
  Given "080442957X"
  When  `validateISBN10` runs
  Then  it returns `true`. "0804429570" returns `false`
**Parameters:** modulus 11; weights 10…1
**Edge cases handled:** a non-digit in positions 1 to 9 returns false; X is allowed only in the last position
**Confidence:** High — read directly from the code.

### RULE-119: Strict ISBN-13 checksum (not used)
**Category:** Validation
**Priority:** P2
**Source:** `src/lib/utils/isbn-utils.ts:178-203`
**Plain English:** An ISBN-13 is valid when its check digit equals (10 − (alternating 1/3 weighted sum of the first 12 digits mod 10)) mod 10.
**Specification:**
  Given "9780306406157"
  When  `validateISBN13` runs
  Then  it returns `true`. "9780306406158" returns `false`
**Parameters:** weights 1,3 alternating; modulus 10
**Edge cases handled:** a non-digit returns false
**Suspected defect:** It is exported but never called anywhere.
**Confidence:** High — checked by grep.

### RULE-120: A barcode must contain something that looks like an ISBN
**Category:** Validation
**Priority:** P1
**Source:** `src/lib/utils/isbn-utils.ts:26-68`
**Plain English:** Scanned text is reduced to digits and X. A 13-character value starting 978/979 comes first, then any 10-character value, then any 13-digit EAN, then a 12-digit UPC-A starting with 0 (leading 0 dropped). Anything else is rejected.
**Specification:**
  Given raw barcode "ISBN 978-0-306-40615-7"
  When  `extractISBN` runs
  Then  it returns "9780306406157". "12345" returns `null`, which makes the scanner show "No valid ISBN found in barcode. Please try again or enter the book manually." (`BarcodeScanner.tsx:69-77`)
**Parameters:** accepted lengths 13, 10, 12 (UPC-A starting with 0)
**Edge cases handled:** lowercase x; separators; non-book EAN-13 is passed on so Google decides
**Suspected defect:** The UPC-A branch returns an 11-digit string, which is not a valid ISBN length anywhere downstream. Any 10 characters with X in any position (for example "12X4567890") are returned as an ISBN.
**Confidence:** High — read directly from the code.

### RULE-121: 979-prefixed ISBNs are wrongly converted to ISBN-10 for lookup
**Category:** Validation
**Priority:** P1
**Source:** `src/lib/utils/isbn-utils.ts:295-324`
**Plain English:** Before an ISBN lookup, a 13-digit 978/979 ISBN is converted into a 10-character ISBN-10 with a recalculated check digit.
**Specification:**
  Given isbn "9780306406157"
  When  `searchByISBN` calls `stripISBNPrefix`
  Then  the query becomes "isbn:0306406152". A 979 ISBN such as "9791032300824" is also turned into a 10-character value
**Parameters:** prefixes 978 and 979
**Edge cases handled:** non-prefixed values are returned cleaned
**Suspected defect:** 979-prefixed ISBNs have no ISBN-10 equivalent, so the converted value matches a different or nonexistent book and lookups for 979 books fail ("Book not found in Google Books…").
**Confidence:** Medium — SME question: have 979 books been reported as unfindable by scan?

### RULE-122: What the scanner does with each search result
**Category:** Validation
**Priority:** P1
**Source:** `src/components/app/books/scanning/BarcodeScanner.tsx:97-114`
**Plain English:** After an ISBN search, the first result becomes the found book. An API error and an empty result each show their own message.
**Specification:**
  Given a scanned ISBN whose search returns 0 items with no error
  When  the search finishes
  Then  the scanner shows "Book not found in Google Books. You can add it manually instead.". An API error shows "Failed to search for book. Please try again or check your internet connection.", and a thrown search shows "Failed to search for book. Please check your internet connection and try again." (lines 86-91)
**Parameters:** search maxResults = 5
**Edge cases handled:** only the first result is used
**Confidence:** High — read directly from the code.

### RULE-123: Uploaded barcode images must be JPEG, PNG or WebP and at most 10 MB
**Category:** Validation
**Priority:** P1
**Source:** `src/components/app/books/scanning/ImageUploader.tsx:54-67`
**Plain English:** A file picked or dropped for barcode scanning must have a supported image MIME type and be at most 10 MB.
**Specification:**
  Given a 12 MB "image/png" file
  When  it is selected or dropped
  Then  the uploader reports "Image size must be less than 10MB". A "image/gif" file reports "Please select a valid image file (JPEG, PNG, or WebP)"
**Parameters:** SUPPORTED_FORMATS = image/jpeg, image/jpg, image/png, image/webp; MAX_FILE_SIZE = 10 × 1024 × 1024 = 10,485,760 bytes
**Edge cases handled:** exactly 10,485,760 bytes is accepted; only the first dropped file is checked
**Confidence:** High — read directly from the code.

### RULE-124: Image scanning needs browser BarcodeDetector support and a detectable barcode
**Category:** Validation
**Priority:** P2
**Source:** `src/components/app/books/scanning/ImageUploader.tsx:78-163`
**Plain English:** Image scanning fails if the browser has no BarcodeDetector, and reports an error if no EAN-13, UPC-A or Code-128 barcode is found.
**Specification:**
  Given a browser without `window.BarcodeDetector`
  When  an image is processed
  Then  after a 2-second delay it shows "Barcode detection is not supported in this browser. Please use a modern browser or try camera scanning instead.". With no barcode found it shows "No barcode detected in this image. You can try cropping the image to focus on the barcode area.", and other errors show "Failed to load image", "Failed to get canvas context" or "Failed to process image. Please try again."
**Parameters:** formats EAN_13, UPC_A, CODE_128; artificial delay 2000 ms
**Edge cases handled:** the cropped image is re-processed as image/jpeg
**Confidence:** High — read directly from the code.

### RULE-125: Camera scanning needs camera support and permission
**Category:** Validation
**Priority:** P2
**Source:** `src/components/app/books/scanning/CameraScanner.tsx:45-72`
**Plain English:** Camera scanning starts only if `getUserMedia` exists and the user allows camera access.
**Specification:**
  Given the user denies camera permission
  When  the camera scanner becomes active
  Then  it reports "Camera access denied. Please allow camera permissions and refresh the page.". Without mediaDevices it reports "Camera not supported. Please use HTTPS or try a different browser.", and a denied retry (lines 129-133) reports "Camera access is required for barcode scanning. Please allow camera permissions in your browser settings."
**Parameters:** facingMode "environment"
**Edge cases handled:** torch support is detected; the test stream is stopped
**Suspected defect:** The detailed error mapper `src/lib/utils/scanning-errors.ts` is not imported anywhere, so its messages and suggestions are never shown.
**Confidence:** High — usage was checked by grep.

### RULE-126: Duplicate camera scans are ignored, with a 1.5-second cooldown
**Category:** Validation
**Priority:** P2
**Source:** `src/components/app/books/scanning/CameraScanner.tsx:89-110`
**Plain English:** A detected code is ignored if the scanner is inactive, inside the cooldown, or identical to the last code scanned.
**Specification:**
  Given code "9780306406157" was just scanned
  When  the same code is detected again
  Then  it is ignored. A different code within 1500 ms is also ignored
**Parameters:** cooldown 1500 ms
**Edge cases handled:** an empty detection array
**Suspected defect:** `lastScannedCode` is never reset, so the same book cannot be re-scanned in that session without remounting the scanner.
**Confidence:** Medium — SME question: should re-scanning the same code after an error be allowed?

### RULE-127: Google Books calls require an API key
**Category:** Validation
**Priority:** P1
**Source:** `src/lib/api/google-books-api.ts:156-169`
**Plain English:** Searches and detail lookups fail immediately if NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY is not set.
**Specification:**
  Given NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY is empty
  When  any search or `getBookDetails` is called
  Then  it returns a SYSTEM error with internal message "Google Books API key not found. Please set NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY in your environment variables." and user message "An unexpected error occurred"
**Parameters:** env var NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY
**Edge cases handled:** none
**Suspected defect:** The key is a NEXT_PUBLIC_ variable, so it is shipped to the browser. Users only see the generic message.
**Confidence:** High — read directly from the code.

### RULE-128: Google Books HTTP errors are mapped to user messages
**Category:** Validation
**Priority:** P1
**Source:** `src/lib/api/google-books-api.ts:192-229`
**Plain English:** Non-2xx responses are mapped by status code to rate-limit, auth/quota, bad-query or temporarily-unavailable errors.
**Specification:**
  Given Google Books responds 429
  When  `makeRequest` handles it
  Then  it returns a NETWORK error "Rate limit exceeded. Please try again later.". 403 gives an AUTHORIZATION error (HIGH) "API key invalid or quota exceeded.", 400 gives a VALIDATION error "Invalid search query", and any other status gives a NETWORK error "Google Books API is temporarily unavailable. Please try again later."
**Parameters:** statuses 429, 403, 400, other
**Edge cases handled:** these messages are shown via ErrorAlert on AddBooksPage
**Suspected defect:** The 429 and 5xx errors are not marked `retryable()`.
**Confidence:** High — read directly from the code.

### RULE-129: Network failures on Google Books requests become network errors
**Category:** Validation
**Priority:** P2
**Source:** `src/lib/api/google-books-api.ts:237-250`
**Plain English:** If fetch throws, the request returns a retryable network error.
**Specification:**
  Given fetch throws TypeError("Failed to fetch")
  When  `makeRequest` catches it
  Then  it returns a NETWORK error with message "Failed to fetch" and user message "Please check your connection and try again"
**Parameters:** none
**Edge cases handled:** non-Error values thrown
**Confidence:** High — read directly from the code.

### RULE-130: Blank Google searches return nothing, and result count is capped at 40
**Category:** Validation
**Priority:** P2
**Source:** `src/lib/api/google-books-api.ts:269-282`
**Plain English:** A blank query returns an empty list without calling the API, and maxResults is capped at 40.
**Specification:**
  Given query "  "
  When  `searchBooks` is called
  Then  it returns `{success: true, data: []}`. `maxResults: 100` is sent as 40
**Parameters:** DEFAULT_SEARCH_RESULTS = 10; MAX_SEARCH_RESULTS = 40
**Edge cases handled:** the API-key check runs before the blank-query check; `useBookSearch` has the same blank guard (`useBookSearch.ts:44-47`)
**Confidence:** High — read directly from the code.

### RULE-131: Advanced search needs at least one criterion (not used)
**Category:** Validation
**Priority:** P2
**Source:** `src/lib/api/google-books-api.ts:409-416`
**Plain English:** Advanced search fails if no title, author, ISBN, category or publisher is given.
**Specification:**
  Given `advancedSearch({})`
  When  it is called
  Then  it fails with "At least one search parameter is required"
**Parameters:** none
**Edge cases handled:** none
**Suspected defect:** It is never called from the app.
**Confidence:** High — checked by grep.

### RULE-132: Only finished books can be rated in the UI
**Category:** Validation
**Priority:** P1
**Source:** `src/components/app/book-detail/BookDetailPage.tsx:63-71`
**Plain English:** The detail page ignores rating changes unless the user is signed in and the book is finished. The star control is only shown for finished books (`BookCover.tsx:106-131`).
**Specification:**
  Given an in-progress book
  When  a rating change is triggered
  Then  nothing is sent. For a finished book, `updateBookRating(bookId, n)` is called
**Parameters:** required state = finished
**Edge cases handled:** no signed-in user means no action
**Suspected defect:** This is enforced only in the UI. The service (RULE-091) and EditBookSheet allow rating in any state.
**Confidence:** High — read directly from the code.

### RULE-133: The "Add Review" button is shown only for finished books with no review
**Category:** Validation
**Priority:** P2
**Source:** `src/components/app/book-detail/BookCover.tsx:157-166`
**Plain English:** "Add Review" appears only when the book is finished, has no review yet, and a handler is provided. "Start Reading" appears only for not_started books and "Mark as Finished" only for in_progress books (lines 135-155).
**Specification:**
  Given a finished book with an existing review
  When  BookCover renders
  Then  "Add Review" is not shown
**Parameters:** none
**Edge cases handled:** buttons are disabled while an update is in progress
**Confidence:** High — read directly from the code.

### RULE-134: The progress form is shown only for in-progress books, and blank input means page 0
**Category:** Validation
**Priority:** P2
**Source:** `src/components/app/book-detail/ProgressTracker.tsx:31-39`
**Plain English:** The Update Progress card is hidden unless the book is in progress, and a non-numeric entry is sent as page 0.
**Specification:**
  Given an in-progress book and the input "" or "abc"
  When  the user clicks Update
  Then  `onUpdateProgress(0)` is called. The HTML input has min 0 and max = totalPages (lines 53-61), which the browser does not enforce on click
**Parameters:** min 0; max totalPages
**Edge cases handled:** totalPages 0 means no max attribute
**Suspected defect:** Clearing the field silently resets progress to page 0.
**Confidence:** High — read directly from the code.

### RULE-135: The review dialog checks length before saving
**Category:** Validation
**Priority:** P1
**Source:** `src/components/app/book-detail/reviews/ReviewDialog.tsx:38-70`
**Plain English:** The review dialog shows a live trimmed character count, disables Save until the text passes RULE-080, and reports success or failure.
**Specification:**
  Given review text "Great" (5 characters)
  When  the dialog renders
  Then  it shows "5/5000 characters (5 more needed)" and Save is disabled. Forcing a submit shows "Review must be between 10 and 5000 characters". On success it shows "Review added successfully!" or "Review updated successfully!" and closes after 1000 ms. On a thrown error it shows "Failed to save review. Please try again."
**Parameters:** 10 to 5000; auto-close delay 1000 ms
**Edge cases handled:** counter colour is a warning below 10 and an error above 5000
**Suspected defect:** The EventsProvider `addReview`/`updateReview` never throw on a service failure (`EventsProvider.tsx:216-223`), so the dialog shows "Review added successfully!" even when the service rejected the review (for example, book not finished).
**Confidence:** High — read directly from the code.

### RULE-136: The comment form checks length before saving
**Category:** Validation
**Priority:** P1
**Source:** `src/components/app/book-detail/comments/CommentForm.tsx:35-55`
**Plain English:** The comment form limits input to 2000 characters, disables submit until RULE-078 passes, and sends the trimmed text.
**Specification:**
  Given comment "   "
  When  the form renders
  Then  submit is disabled. Forcing a submit shows "Comment must be between 1 and 2000 characters". A thrown error shows "Failed to add comment. Please try again."
**Parameters:** maxLength 2000; counter warning above 1800 characters (90%)
**Edge cases handled:** the textarea maxLength counts raw length, while validation counts trimmed length
**Suspected defect:** The provider does not throw on service failure (`EventsProvider.tsx:158-165`), so the form clears and closes even when the comment was rejected.
**Confidence:** High — read directly from the code.

### RULE-137: Manual entry requires title and author
**Category:** Validation
**Priority:** P1
**Source:** `src/components/app/books/ManualEntryForm.tsx:80-133`
**Plain English:** The manual-entry form marks Title and Author as HTML-required, offers an optional numeric Pages field, and limits Published Year to 1000 through the current year in the browser.
**Specification:**
  Given Title is empty
  When  the user submits
  Then  the browser blocks submission. A Title of "   " passes the browser check but is rejected by the service with "Book title cannot be empty" (RULE-085)
**Parameters:** publishedYear min 1000, max = current year
**Edge cases handled:** ownership defaults to "wishlist"
**Suspected defect:** Pages has no min, so a negative page count reaches the service as "Invalid progress data". The form is cleared after submit even if the add failed (lines 37-49).
**Confidence:** High — read directly from the code.

### RULE-138: How a manual entry is turned into a book record
**Category:** Validation
**Priority:** P1
**Source:** `src/lib/books/book-utils.ts:92-119`
**Plain English:** A manual entry trims title and author, starts as not_started at page 0, stores a non-numeric page count as 0, and stores a year as "YYYY-01-01".
**Specification:**
  Given `{title: " Dune ", author: "Herbert", pages: "abc", publishedYear: "1965", ownership: "owned"}`
  When  `convertManualEntryToBook` runs
  Then  it produces `{title: "Dune", state: "not_started", progress: {currentPage: 0, totalPages: 0}, isOwned: true, publishedDate: "1965-01-01"}`
**Parameters:** default page count 0
**Edge cases handled:** blank genre or description is left out
**Suspected defect:** A year-only entry gets an invented 1 January date. `parseInt("12.7")` stores 12.
**Confidence:** High — read directly from the code.

### RULE-139: The edit sheet blocks saving only on full-form validation
**Category:** Validation
**Priority:** P0
**Source:** `src/components/app/books/EditBookSheet.tsx:233-258`
**Plain English:** On Save, the edit sheet runs RULE-108 to V39 and shows every error. If they pass, it saves through `updateBookManual`, which bypasses the state machine, and closes.
**Specification:**
  Given the edit form has an empty title and rating 3.5
  When  the user clicks Save
  Then  it lists "Title is required and cannot be empty" and "Rating must be a whole number" and does not save
**Parameters:** none
**Edge cases handled:** undefined values are removed before saving
**Suspected defect:** `updateBookManual` returns a result instead of throwing, so the sheet closes (`onOpenChange(false)`) even when the service rejected the update. Manual state changes do not set `startedAt`/`finishedAt`.
**Confidence:** High — read directly from the code.

### RULE-140: The edit sheet cannot clear a rating
**Category:** Validation
**Priority:** P1
**Source:** `src/components/app/books/EditBookSheet.tsx:218-228`
**Plain English:** Before saving, the edit sheet drops every undefined field. Clearing the rating (which sets it to undefined, lines 489-497) therefore never removes it from the database.
**Specification:**
  Given a book rated 4
  When  the user clicks "Clear" on the rating and saves
  Then  the saved data has no `rating` key, so Firestore keeps rating 4
**Parameters:** none
**Edge cases handled:** none
**Suspected defect:** As described. The sheet also lets a book in any state be rated.
**Confidence:** High — read directly from the code.

### RULE-141: Live page-number checks in the edit sheet (total pages at least 1)
**Category:** Validation
**Priority:** P2
**Source:** `src/components/app/books/EditBookSheet.tsx:107-134`
**Plain English:** As the user types, current page is checked against 0 to total pages and total pages against a minimum of 1. Non-numeric input becomes 0.
**Specification:**
  Given the user sets Total Pages to 0
  When  the field changes
  Then  it shows "Total pages cannot be less than 1". A current page of 350 against 300 total shows "Current page cannot exceed 300"
**Parameters:** currentPage min 0, max totalPages; totalPages min 1 (input `min="1"`, line 460)
**Edge cases handled:** `parseInt(...) || 0`
**Suspected defect:** These are hints only. Save still succeeds with totalPages 0 because RULE-110 allows it. Changing total pages does not re-check current page.
**Confidence:** High — read directly from the code.

### RULE-142: Live text-field checks in the edit sheet (500-character limit)
**Category:** Validation
**Priority:** P2
**Source:** `src/components/app/books/EditBookSheet.tsx:139-182`
**Plain English:** As the user types, title and author must be non-blank, and title, author, description, ISBN, genre, published date and cover URL are each flagged above 500 characters.
**Specification:**
  Given Description has 600 characters
  When  the field changes
  Then  it shows "Description cannot exceed 500 characters" under the field
**Parameters:** 500-character limit
**Edge cases handled:** the old error is cleared on every change
**Suspected defect:** Field errors never block Save (the Save button is disabled only by `isSubmitting || isDeleting`, line 642), so a 600-character description is saved. ISBN, date and URL format are only checked on Save.
**Confidence:** Medium — SME question: should the 500-character limit block saving?

### RULE-143: Signed-out users are sent from the dashboard to the landing page
**Category:** Validation
**Priority:** P0
**Source:** `src/app/(app)/dashboard/page.tsx:43-65`
**Plain English:** Once auth has finished loading, a signed-out user on /dashboard is redirected to "/" and nothing is rendered.
**Specification:**
  Given auth loading = false and isAuthenticated = false
  When  /dashboard renders
  Then  `router.push("/")` is called and the page renders null. While loading, it shows "Loading..."
**Parameters:** redirect target "/"
**Edge cases handled:** waits for auth, books and stats to finish loading
**Suspected defect:** Only the dashboard has this guard. There is no middleware, and /library, /add-books, /progress, /statistics, /wishlist, /activity-history and /shared have no redirect. /books/[id] shows "Book not found" when signed out. Protection is client-side only, and no Firestore security rules are in the repo.
**Confidence:** Medium — SME question: are the deployed Firestore rules the real access control?

### RULE-144: Signed-in users are sent from the landing page to the dashboard
**Category:** Validation
**Priority:** P1
**Source:** `src/app/(landing)/page.tsx:20-30`
**Plain English:** A signed-in visitor on the landing page is redirected to /dashboard.
**Specification:**
  Given loading = false and isAuthenticated = true
  When  "/" renders
  Then  `router.push("/dashboard")` is called and the page renders null
**Parameters:** redirect target "/dashboard"
**Edge cases handled:** nothing happens while auth is loading
**Confidence:** High — read directly from the code.

### RULE-145: The book detail page shows "Book not found" for missing or inaccessible books
**Category:** Validation
**Priority:** P1
**Source:** `src/app/(app)/books/[id]/page.tsx:23-65`
**Plain English:** The detail route looks for the book in the loaded library first, then fetches it directly. If neither finds it, it shows a not-found view.
**Specification:**
  Given bookId "xyz" is not in the library and the direct fetch returns null
  When  /books/xyz loads
  Then  it shows the heading "Book not found" and "The book you're looking for doesn't exist or you don't have access to it." with a "Go Back" button. A thrown fetch shows "Failed to load book"
**Parameters:** none
**Edge cases handled:** waits for the books provider to finish loading; a signed-out user stops loading and lands on the not-found view
**Confidence:** High — read directly from the code.

### RULE-146: Provider actions need a signed-in user
**Category:** Validation
**Priority:** P0
**Source:** `src/lib/providers/BooksProvider.tsx:126-130`
**Plain English:** Every BooksProvider and UserProvider action fails with an auth error when no user is signed in. EventsProvider comment and review actions throw "User not authenticated" instead.
**Specification:**
  Given no signed-in user
  When  `addBook` is called
  Then  it returns an AUTHORIZATION error with message "User not authenticated" and user message "Authentication failed"
**Parameters:** none
**Edge cases handled:** the same guard appears at BooksProvider lines 184, 242, 304, 367, 432, 490, 539, 593 and 630; at UserProvider lines 85, 145, 200, 252 and 350; and EventsProvider throws at lines 142-144, 202-204 and 235-237
**Confidence:** High — read directly from the code.

### RULE-147: Book validation messages are replaced by a generic error in the UI
**Category:** Validation
**Priority:** P0
**Source:** `src/lib/providers/BooksProvider.tsx:343-347`
**Plain English:** When a BookService call fails, BooksProvider re-wraps the error as a system error using only its internal message, so the user-facing message becomes generic.
**Specification:**
  Given the service returns "Current page cannot exceed total pages"
  When  BooksProvider handles it
  Then  it stores `createSystemError("Current page cannot exceed total pages")`, whose userMessage is "An unexpected error occurred", and BookDetailPage and EditBookSheet show that generic text
**Parameters:** none
**Edge cases handled:** none
**Suspected defect:** Every validation message in RULE-085 to V16 and V18 is replaced by "An unexpected error occurred" in the UI. The same pattern is at lines 161-163, 219-221, 281-283, 607-608 and 648-649.
**Confidence:** High — read directly from the code.

### RULE-148: Comment and review validation messages are replaced by generic text in the UI
**Category:** Validation
**Priority:** P1
**Source:** `src/lib/providers/EventsProvider.tsx:158-165`
**Plain English:** EventsProvider shows the service error only if it is a string. The service returns error objects, so users see generic text.
**Specification:**
  Given `eventService.addComment` fails with "Invalid page number"
  When  EventsProvider handles it
  Then  the error shown is "Failed to add comment". The same applies to "Failed to add review" (lines 216-223) and "Failed to update review" (lines 249-256), and the method returns without throwing
**Parameters:** none
**Edge cases handled:** a thrown exception shows "An unexpected error occurred while adding comment", "…adding review" or "…updating review"
**Suspected defect:** Messages such as "Reviews can only be added to finished books" and "A review already exists…" never reach the user. Because nothing is thrown, the callers show success (RULE-135 and V61).
**Confidence:** High — read directly from the code.

### RULE-149: Firebase sign-in error codes are mapped to friendly messages
**Category:** Validation
**Priority:** P1
**Source:** `src/lib/errors/error-handling.ts:177-224`
**Plain English:** Google sign-in errors are turned into user messages by Firebase error code.
**Specification:**
  Given sign-in fails with "auth/popup-blocked"
  When  AuthService handles it
  Then  the message is "Popup was blocked by your browser. Please allow popups and try again." (retryable). "auth/popup-closed-by-user" gives "Sign-in was cancelled. Please try again." (LOW, retryable), "auth/network-request-failed" gives "Network error. Please check your connection and try again." (NETWORK, retryable), "auth/too-many-requests" gives "Too many failed attempts. Please try again later." (HIGH, not retryable), and any other code gives "Authentication failed. Please try again."
**Parameters:** four mapped codes plus a default
**Edge cases handled:** the error type is set to the Firebase code
**Suspected defect:** The landing hero ignores the returned result (RULE-150), so these messages are never shown.
**Confidence:** High — read directly from the code.

### RULE-150: Failed sign-in still shows success and redirects
**Category:** Validation
**Priority:** P1
**Source:** `src/components/landing/sections/hero.tsx:21-40`
**Plain English:** "Get Started" sends signed-in users to /dashboard. Otherwise it calls sign-in, then always shows success and redirects after 1 second.
**Specification:**
  Given the user closes the Google popup
  When  `signInWithGoogle()` resolves with `{success:false}`
  Then  the hero still shows the success state and pushes "/dashboard" after 1000 ms. The dashboard then redirects back to "/" (RULE-143). "Failed to sign in" appears only if the call throws
**Parameters:** redirect delay 1000 ms
**Edge cases handled:** an already signed-in user is redirected immediately
**Suspected defect:** As described. AuthProvider's `error` is not displayed by any component.
**Confidence:** High — read directly from the code.

### RULE-151: Firestore error codes have a friendly-message map that is never used
**Category:** Validation
**Priority:** P2
**Source:** `src/lib/errors/error-handling.ts:229-274`
**Plain English:** A mapping exists from Firestore error codes to user messages, but nothing calls it.
**Specification:**
  Given a FirestoreError with code "permission-denied"
  When  `handleFirestoreError` is called
  Then  it returns AUTHORIZATION/HIGH, not recoverable, with "You don't have permission to access this data.". "unavailable" or "deadline-exceeded" gives NETWORK, retryable, "Service temporarily unavailable. Please try again."; "not-found" gives "The requested data could not be found."; "already-exists" gives VALIDATION "This item already exists."; and anything else gives "A database error occurred. Please try again."
**Parameters:** codes as listed
**Edge cases handled:** none
**Suspected defect:** It is dead code. The live path is RULE-152 followed by RULE-093 or V32.
**Confidence:** High — checked by grep.

### RULE-152: Repository layer error classification
**Category:** Validation
**Priority:** P0
**Source:** `src/lib/repositories/firebase-repository-utils.ts:36-70`
**Plain English:** Firestore exceptions are classified as permission denied, network, or unknown, and passed up as message strings.
**Specification:**
  Given a Firestore error with code "permission-denied" in the book repository
  When  `handleFirebaseError(error, "book collection")` runs
  Then  it returns PERMISSION_DENIED "Access denied to book collection". "unavailable" or "deadline-exceeded" gives NETWORK_ERROR "Network error accessing book collection", and anything else (including "not-found") gives UNKNOWN_ERROR "Database error: <message>"
**Parameters:** codes permission-denied, unavailable, deadline-exceeded
**Edge cases handled:** null or string errors become "Database error: Unknown error" or "Database error: <string>"
**Confidence:** High — read directly from the code.

### RULE-153: Default user messages for each error type
**Category:** Validation
**Priority:** P1
**Source:** `src/lib/errors/error-handling.ts:340-375`
**Plain English:** A validation error shows its own message to the user. Network, auth and system errors show fixed generic messages unless a user message is passed explicitly.
**Specification:**
  Given `createNetworkError("Search limit reached…")` with no user message
  When  the error is built
  Then  userMessage = "Please check your connection and try again". `createAuthError` defaults to "Authentication failed", `createSystemError` always uses "An unexpected error occurred", and `createValidationError(msg)` uses msg
**Parameters:** severities: validation MEDIUM, network MEDIUM (retryable), auth HIGH, system HIGH
**Edge cases handled:** none
**Suspected defect:** This is the root cause of the hidden messages in RULE-096, V31, V52 and V72.
**Confidence:** High — read directly from the code.

### RULE-154: Bulk import fails only when every book fails
**Category:** Validation
**Priority:** P2
**Source:** `src/lib/services/BookService.ts:534-573`
**Plain English:** Each imported book goes through `addBook` validation. The import fails only if every book fails; otherwise it succeeds with the IDs of the books that were added.
**Specification:**
  Given 3 books where 1 has a blank title
  When  `importBooks` runs
  Then  it returns success with 2 IDs and the failure for the third book is silently dropped. If all 3 fail, it returns a SYSTEM error "Failed to import books: Failed to import \"<title>\": <userMessage>, …"
**Parameters:** none
**Edge cases handled:** per-book error messages are collected
**Suspected defect:** Partial failures are not reported. The method is not called from the UI.
**Confidence:** High — checked by grep.


## Lifecycle rules

### RULE-155: Reading state machine allows only forward transitions
**Category:** Lifecycle
**Priority:** P0
**Source:** `src/lib/models/models.ts:419-452`
**Plain English:** A book's reading state can only move not_started → in_progress → finished. "finished" is terminal, and no state can move to itself or backwards.
**Specification:**
  Given READING_STATE_TRANSITIONS = { not_started: [in_progress], in_progress: [finished], finished: [] }
  When  canTransitionTo(current, next) is evaluated
  Then  it returns true only for (not_started→in_progress) and (in_progress→finished). Every other pair returns false, including not_started→finished, finished→in_progress, X→X, and an unknown current state.
**Parameters:** States = "not_started" | "in_progress" | "finished"
**Edge cases handled:** An unknown currentState key returns false.
**Suspected defect:** There is no way to re-read a book through the machine. Only the manual-edit bypass (RULE-163) can revert a state.
**Confidence:** High. Pure function, verified.

### RULE-156: State change writes state, updatedAt and finishedAt, then appends a state_change event
**Category:** Lifecycle
**Priority:** P0
**Source:** `src/lib/services/BookService.ts:341-421`
**Plain English:** A validated state change updates the book document and then logs one state_change event.
**Specification:**
  Given book B in users/{uid}/books/{B} with state "in_progress" (read from Firestore if the caller passes no currentState)
  When  updateBookState(uid, B, "finished", currentState?) is called
  Then  (1) updateDoc users/{uid}/books/{B} with {state:"finished", updatedAt: now, finishedAt: now}. The repository re-stamps updatedAt (RULE-193).
        (2) addDoc users/{uid}/events with {type:"state_change", bookId:B, data:{previousState:"in_progress", newState:"finished"}, userId:uid, timestamp: now}.
        For newState "in_progress" the write is only {state, updatedAt}.
**Parameters:** none
**Edge cases handled:** Book not found → "Book not found". Undefined current state → error. Invalid transition → "Cannot transition from X to Y" with no write and no event.
**Suspected defect:** (a) A caller-supplied currentState is trusted without re-reading the book. The UI passes the possibly stale `book.state`, so the transition check can pass against a stale state. (b) The logEvent result is not checked, so the book write can succeed with no event recorded. (c) The book write and the event append are two separate writes, not one batch or transaction.
**Confidence:** High.

### RULE-157: startedAt is never set by any code path
**Category:** Lifecycle
**Priority:** P1
**Source:** `src/lib/services/BookService.ts:381-390`
**Plain English:** Moving to in_progress writes no start timestamp, so `startedAt` never exists on any book.
**Specification:**
  Given book B with state "not_started"
  When  B moves to "in_progress" by any path: updateBookState, auto-start in updateBookProgress, Start Reading, or manual edit
  Then  only {state, updatedAt} is written. `startedAt` is never written. The default book explicitly passes `startedAt: undefined`, which is filtered out.
**Parameters:** none
**Edge cases handled:** none
**Suspected defect:** The model declares `startedAt` (models.ts:66) and ReadingTimeline shows a "Started reading" row only when it exists (ReadingTimeline.tsx:30-41). That row never renders. On a manual revert, finishedAt is also never cleared.
**Confidence:** High. Grep shows no writer of startedAt.

### RULE-158: Progress update auto-starts a not_started book before validating the page
**Category:** Lifecycle
**Priority:** P0
**Source:** `src/lib/services/BookService.ts:241-287`
**Plain English:** Recording progress on a not_started book first moves it to in_progress, and only then checks the page against the total.
**Specification:**
  Given book B {state:"not_started", progress:{currentPage:0, totalPages:300}}
  When  updateBookProgress(uid, B, 350) is called
  Then  (1) updateBookState(B, "in_progress", "not_started") runs: it writes {state:"in_progress", updatedAt} and appends a state_change event {previousState:"not_started", newState:"in_progress"}.
        (2) The call then returns validation error "Current page cannot exceed total pages". No progress is written.
  Given currentPage < 0 → returns "Current page cannot negative" with no reads or writes.
**Parameters:** Page bounds: 0 ≤ currentPage ≤ totalPages. The upper bound applies only when totalPages is truthy.
**Edge cases handled:** Book not found → error. totalPages 0 or missing → no upper bound. A failed auto-start aborts the call.
**Suspected defect:** An invalid page still leaves the book in_progress with a state_change event logged. The total-pages validation should run before the auto-start.
**Confidence:** High.

### RULE-159: Progress write includes an undeclared lastUpdated field and appends a progress_update event
**Category:** Lifecycle
**Priority:** P0
**Source:** `src/lib/services/BookService.ts:289-317`
**Plain English:** A valid progress update replaces the whole `progress` map, which carries an extra `lastUpdated` timestamp, and then logs a progress_update event.
**Specification:**
  Given book snapshot S {progress:{currentPage:40, totalPages:300}}, read at the start of the call
  When  updateBookProgress(uid, B, 120) passes validation
  Then  (1) updateDoc users/{uid}/books/{B} with {progress:{currentPage:120, totalPages:300, lastUpdated: now}, updatedAt: now}. updatedAt is added by the repository.
        (2) addDoc users/{uid}/events with {type:"progress_update", bookId:B, data:{previousPage:40, newPage:120}, userId, timestamp}.
**Parameters:** totalPages falls back to 0 when missing. previousPage falls back to 0.
**Edge cases handled:** Lowering the page is allowed and logs a negative delta (previousPage > newPage).
**Suspected defect:** `progress.lastUpdated` is not in the Book model. Manual edits later overwrite `progress` and drop it (RULE-163). The event write result is ignored.
**Confidence:** High.

### RULE-160: Auto-finish checks the stale pre-update snapshot
**Category:** Lifecycle
**Priority:** P0
**Source:** `src/lib/services/BookService.ts:319-326`
**Plain English:** Reaching the last page finishes the book only if the snapshot read at the start of the call was already in_progress.
**Specification:**
  Given snapshot S {state:"in_progress", totalPages:300}
  When  updateBookProgress(uid, B, 300) succeeds (or any page ≥ 300)
  Then  after the progress write and progress_update event, updateBookState(B, "finished", "in_progress") runs. It writes {state:"finished", finishedAt, updatedAt} and appends state_change {in_progress→finished}.
        Event order: progress_update, then state_change.
  Given S {state:"not_started", totalPages:300} and page 300
  Then  events are state_change(not_started→in_progress) and progress_update. No finish happens, and the book stays in_progress at 300/300.
**Parameters:** Condition: S.progress.totalPages truthy AND currentPage ≥ totalPages AND S.state === "in_progress"
**Edge cases handled:** totalPages 0 → never auto-finishes. The auto-finish result is ignored.
**Suspected defect:** Because the check uses the stale snapshot, a jump straight from not_started to the last page does not finish the book. Also, if the auto-finish fails, the call still returns success.
**Confidence:** High.

### RULE-161: Rating update writes rating and appends rating_added on every change
**Category:** Lifecycle
**Priority:** P1
**Source:** `src/lib/services/BookService.ts:426-474`
**Plain English:** Setting a 1–5 rating saves it on the book and logs a rating_added event, including when an existing rating is changed.
**Specification:**
  Given book B
  When  updateBookRating(uid, B, 4) is called
  Then  (1) updateDoc users/{uid}/books/{B} with {rating:4, updatedAt}.
        (2) addDoc users/{uid}/events with {type:"rating_added", bookId:B, data:{rating:4}, userId, timestamp}.
**Parameters:** validateRating: a number from 1 to 5 inclusive, not NaN.
**Edge cases handled:** Out of range or NaN → error with no writes. The service does not check that the book exists (updateDoc on a missing doc fails at the repository).
**Suspected defect:** The service does not require the book to be finished. Only the UI enforces that (RULE-175). Non-integer ratings such as 3.5 are accepted here, but the edit form rejects them (book-validation.ts:159).
**Confidence:** High.

### RULE-162: Adding a book stamps addedAt/updatedAt, strips undefined fields, and logs no event
**Category:** Lifecycle
**Priority:** P0
**Source:** `src/lib/repositories/FirebaseBookRepository.ts:140-161`
**Plain English:** A new book becomes one document with server-side addedAt and updatedAt. Top-level undefined fields are dropped, and no BookEvent is created.
**Specification:**
  Given a book payload that passes BookService.validateBookData: non-blank title and author, valid progress, rating 1–5 if present
  When  addBook(uid, book) is called
  Then  addDoc users/{uid}/books with {...book, addedAt: now, updatedAt: now}, with top-level undefined keys removed. It returns the new doc id. No event is appended.
**Parameters:** filterUndefinedValues is shallow (firebase-repository-utils.ts:315-331).
**Edge cases handled:** Caller-supplied addedAt/updatedAt are overridden. The Google converter supplies them, and the spread order lets the repository win.
**Suspected defect:** No "added" state_change event is ever written. The activity type "added" (RULE-189) and the history label "Added to Library" can never appear for new books. Unused paths: BookService.importBooks, addBookFromISBN and repository importBooks/batchUpdateBooks have no callers.
**Confidence:** High.

### RULE-163: Manual edit bypasses the state machine and logs "Manual update: <keys>"
**Category:** Lifecycle
**Priority:** P0
**Source:** `src/lib/services/BookService.ts:741-796`
**Plain English:** The Edit Book sheet writes any field values, including any state, and logs a manual_update event that lists every submitted key.
**Specification:**
  Given book B {state:"in_progress", progress:{currentPage:50,…}}
  When  updateBookManual(uid, B, updates) is called. From EditBookSheet the keys are always title, author, description, state, progress, isbn, genre, publishedDate, coverImage, isOwned, plus rating when set.
  Then  (1) getBook reads previousState.
        (2) updateDoc users/{uid}/books/{B} with {...updates, updatedAt}.
        (3) getBook re-reads the updated book.
        (4) addDoc events with {type:"manual_update", bookId:B, data:{comment:"Manual update: title, author, description, state, progress, isbn, genre, publishedDate, coverImage, isOwned", commentState: updated.state, commentPage: updated.progress.currentPage}, userId, timestamp}.
**Parameters:** Comment format = "Manual update: " + Object.keys(updates).join(", ")
**Edge cases handled:** validateBookData runs first. If the re-read fails, no events are logged at all, but the call still succeeds.
**Suspected defect:** (a) The key list shows every submitted key, not the keys that changed. (b) No canTransitionTo check, and no finishedAt set or clear. A book manually set to finished has no finishedAt, so it is excluded from streak and this-month/this-year stats. (c) Blank optional fields are written as "" (isbn:"", genre:""). (d) `progress` is replaced and progress.lastUpdated is dropped. (e) A manual page change logs no progress_update, so it never counts toward totalPagesRead (RULE-187).
**Confidence:** High.

### RULE-164: Manual edit adds a state_change event after manual_update only when the state actually changed
**Category:** Lifecycle
**Priority:** P1
**Source:** `src/lib/services/BookService.ts:798-808`
**Plain English:** If a manual edit changed the reading state, a second event recording that change is appended after the manual_update event.
**Specification:**
  Given previousState "finished" (read before the write) and updates.state "in_progress"
  When  updateBookManual completes its write and re-read
  Then  events are appended in this order: manual_update (RULE-163), then {type:"state_change", bookId, data:{previousState:"finished", newState:"in_progress"}}.
**Parameters:** Condition: updates.state truthy AND previousState defined AND updates.state !== previousState
**Edge cases handled:** No event for the same state. No event if the first getBook failed (previousState undefined). Illegal transitions such as finished→not_started are logged without validation.
**Suspected defect:** A state_change to not_started with a previousState is displayed as "started" (RULE-190).
**Confidence:** High.

### RULE-165: Clearing a rating in the edit sheet is silently not persisted
**Category:** Lifecycle
**Priority:** P1
**Source:** `src/components/app/books/EditBookSheet.tsx:215-258`
**Plain English:** The edit sheet drops undefined values before saving, so "Clear" rating (which sets it to undefined) leaves the stored rating unchanged.
**Specification:**
  Given book B {rating:4}
  When  the user clicks Clear (formData.rating = undefined, line 493) and Save
  Then  filteredData omits `rating`, and updateBookManual writes the other fields. Firestore keeps rating:4. The manual_update comment does not list "rating".
**Parameters:** none
**Edge cases handled:** Client-side validateEditedBook runs before submit.
**Suspected defect:** No deleteField() is used, so a rating can never be removed. The same applies to any field the user tries to unset by making it undefined.
**Confidence:** High. Note: the file is `EditBookSheet.tsx`; the path above should read `src/components/app/books/EditBookSheet.tsx:215-258`.

### RULE-166: Deleting a book removes only the book document and appends a delete_book event with fallback names
**Category:** Lifecycle
**Priority:** P0
**Source:** `src/lib/services/BookService.ts:479-519`
**Plain English:** Deleting captures the title and author, deletes the book doc, and logs delete_book. The book's past events are kept.
**Specification:**
  Given book B {title:"Dune", author:"Frank Herbert"}
  When  deleteBook(uid, B) is called
  Then  (1) getBook(B).
        (2) deleteDoc users/{uid}/books/{B}.
        (3) addDoc events with {type:"delete_book", bookId:B, data:{deletedBookTitle:"Dune", deletedBookAuthor:"Frank Herbert"}, userId, timestamp}.
        All earlier events with bookId B stay in users/{uid}/events.
  Given B does not exist or the read failed
  Then  deleteDoc still runs (a no-op) and the event carries "Unknown Book" / "Unknown Author".
**Parameters:** Fallbacks "Unknown Book", "Unknown Author"
**Edge cases handled:** Delete failure → error, and no event is logged.
**Suspected defect:** FirebaseEventRepository.deleteBookEvents (FirebaseEventRepository.ts:175-202) exists but is never called, so there is no cascade. The confirmation dialog says "All reading progress, notes, and ratings will be permanently lost" (EditBookSheet.tsx:658), which is false. Orphan events still feed stats (RULE-187) and Activity History (RULE-194). Deleting a non-existent id logs a bogus "Unknown Book" event.
**Confidence:** High.

### RULE-167: New-book initial lifecycle defaults
**Category:** Policy
**Priority:** P1
**Source:** `src/lib/books/book-utils.ts:25-119`
**Plain English:** Every newly added book starts not_started at page 0. Google-sourced books default to wishlist; manual entries follow the ownership choice in the form.
**Specification:**
  Given a Google Books volume
  When  convertGoogleBookToBook runs
  Then  the book is {title, author: formatted authors, state:"not_started", progress:{currentPage:0, totalPages: pageCount||0}, genre: categories[0]||"", isOwned:false}. isbn, coverImage, publishedDate and description are added only when present.
  Given a manual form entry
  Then  the book is {state:"not_started", progress:{0, parseInt(pages)||0}, isOwned: ownership==="owned"}. Optional genre and description are trimmed. publishedDate = "<year>-01-01".
**Parameters:** isOwned default false for Google books (marked TODO at line 38)
**Edge cases handled:** NaN pages → 0.
**Suspected defect:** genre "" is persisted for Google books without categories. totalPages 0 disables both the page bound and auto-finish.
**Confidence:** High.

### RULE-168: First sign-in creates a profile only when none is found
**Category:** Lifecycle
**Priority:** P0
**Source:** `src/lib/providers/UserProvider.tsx:299-346`
**Plain English:** When the authenticated user changes, the app loads the profile. If it does not get one back, it creates the profile and the default book.
**Specification:**
  Given an authenticated Firebase user U with no doc at users/{U}/profile/main
  When  UserProvider's effect runs on a [user] change
  Then  userService.createProfileFromFirebaseUser(U) runs (RULE-169, L16).
  Given the profile exists
  Then  it is used as-is, with no write.
**Parameters:** none
**Edge cases handled:** User null → state cleared.
**Suspected defect:** Creation also runs when getProfile *fails* (success:false) as well as when it returns null. If the retry in createProfileFromFirebaseUser also fails (UserService.ts:167-168), the code proceeds to setDoc. That overwrites an existing profile (resetting createdAt) and adds a duplicate default book.
**Confidence:** Medium. The code path is clear. SME question: is a transient read failure followed by a successful write realistic here, and should creation require a confirmed "not found"?

### RULE-169: New profile document fields
**Category:** Lifecycle
**Priority:** P0
**Source:** `src/lib/services/UserService.ts:182-214`
**Plain English:** A new profile is written with Google identity data, zero counters and timestamps, followed by the default book.
**Specification:**
  Given Firebase user U {uid, displayName:null, email:"a@b.c", photoURL:null, emailVerified:true, metadata.lastSignInTime:"…"}
  When  createProfileFromFirebaseUser creates a profile
  Then  (1) setDoc users/{U}/profile/main with {displayName:"Anonymous User", email:"a@b.c", createdAt: now, updatedAt: now, emailVerified:true, lastSignInTime:"…", totalBooksRead:0, currentlyReading:0, booksInLibrary:0, id:U}. photoURL is omitted because undefined is filtered; the repository re-stamps createdAt and updatedAt (FirebaseUserRepository.ts:74-84).
        (2) The default book is created (RULE-170).
**Parameters:** Fallbacks: displayName "Anonymous User", email "", lastSignInTime ""
**Edge cases handled:** Validation (non-blank displayName and email, counters ≥ 0) fails for email "", and the whole creation throws and returns an error.
**Suspected defect:** A user with no email can never get a profile, because validateUserProfileData rejects "" after the fallback. The stored `id` field matters: getProfile spreads data over `id: "main"` (FirebaseUserRepository.ts:49-52), and only the stored `id` makes profile.id the uid.
**Confidence:** High.

### RULE-170: Default sample book "Fermat's Last Theorem" for new users
**Category:** Lifecycle
**Priority:** P1
**Source:** `src/lib/services/UserService.ts:41-69`
**Plain English:** Every new user gets one sample wishlist book, and a failure to add it never blocks sign-up.
**Specification:**
  Given a profile was just created for uid U
  When  createDefaultBook(U) runs
  Then  addDoc users/{U}/books with {title:"Fermat's Last Theorem", author:"Simon Singh", genre:"Mathematics", state:"not_started", progress:{currentPage:0, totalPages:396}, isOwned:false, description:"In 1963 a schoolboy browsing in his local library stumbled across a great mathematical problem: Fermat's Last Theorem, a puzzle that every child can now understand, but which has baffled mathematicians for over 300 years. Aged just ten, Andrew Wiles dreamed he would crack it.", publishedDate:"1997", coverImage:"http://books.google.com/books/content?id=wvAZAQAAIAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api", notes:"Welcome to your personal library! This is a sample book to get you started. Feel free to update your reading progress or add your own books.", addedAt, updatedAt}.
        isbn, rating, startedAt, finishedAt and tags are undefined and stripped. No event is logged.
**Parameters:** as listed
**Edge cases handled:** addBook returns an error result rather than throwing, so failures are silently ignored.
**Suspected defect:** `notes` (and `tags`) are not Book model fields, but `notes` is persisted and never shown or edited. isOwned:false puts the sample book on the wishlist. coverImage uses http:// (mixed content).
**Confidence:** High.

### RULE-171: Returning sign-ins never refresh profile auth metadata
**Category:** Lifecycle
**Priority:** P2
**Source:** `src/lib/services/UserService.ts:166-180`
**Plain English:** Code exists to refresh displayName, email, photoURL, emailVerified and lastSignInTime on sign-in, but in the normal flow it never runs.
**Specification:**
  Given an existing profile
  When  createProfileFromFirebaseUser is called
  Then  updateDoc profile/main with {displayName: U.displayName||old, email: U.email||old, photoURL: U.photoURL||old (dropped if undefined), emailVerified, lastSignInTime: U.metadata.lastSignInTime||"", updatedAt}.
  However, UserProvider calls this only when no profile was returned (RULE-168), so an existing user's lastSignInTime stays at its first value.
**Parameters:** none
**Edge cases handled:** none
**Suspected defect:** lastSignInTime and the profile photo or name go stale forever.
**Confidence:** High.

### RULE-172: Profile counters are written once and never maintained
**Category:** Lifecycle
**Priority:** P2
**Source:** `src/lib/services/UserService.ts:279-310`
**Plain English:** The stored totalBooksRead, currentlyReading and booksInLibrary stay at 0, because the method that recomputes them has no callers.
**Specification:**
  Given a profile created with counters 0
  When  books are added, finished or deleted
  Then  profile/main is not updated. updateUserStats, which would write {totalBooksRead, currentlyReading, booksInLibrary, updatedAt}, is exposed by UserProvider but never invoked.
**Parameters:** none
**Edge cases handled:** none
**Suspected defect:** The persisted counters are always stale (0). The UI uses computed stats instead (RULE-186).
**Confidence:** High. Grep shows no caller.

### RULE-173: "Start Reading" performs a state change, then sets progress to page 1
**Category:** Lifecycle
**Priority:** P0
**Source:** `src/components/app/book-detail/BookDetailPage.tsx:86-98`
**Plain English:** The Start Reading button, shown only for not_started books, moves the book to in_progress and records page 1.
**Specification:**
  Given book B {state:"not_started", progress:{currentPage:0, totalPages:300}}
  When  the user clicks "Start Reading" (BookCover.tsx:135-144)
  Then  (1) updateBookState(B, "in_progress", "not_started") writes {state, updatedAt} and appends state_change {not_started→in_progress}.
        (2) updateBookProgress(B, 1) re-reads B (now in_progress), writes {progress:{currentPage:1, totalPages:300, lastUpdated}, updatedAt}, and appends progress_update {previousPage:0, newPage:1}.
        Event order: state_change, then progress_update.
**Parameters:** Start page = 1
**Edge cases handled:** totalPages 1 → the progress call auto-finishes, adding state_change in_progress→finished.
**Suspected defect:** The provider returns error results instead of throwing, so step 2 runs even if step 1 failed. Step 2 then auto-starts on its own (RULE-158). A not_started book with a stored currentPage > 1 is reset to 1.
**Confidence:** High.

### RULE-174: "Mark as finished" changes state only and leaves currentPage as is
**Category:** Lifecycle
**Priority:** P0
**Source:** `src/components/app/book-detail/BookDetailPage.tsx:73-84`
**Plain English:** The Mark as Finished button, shown only for in_progress books, finishes the book without moving the page to the total.
**Specification:**
  Given B {state:"in_progress", progress:{currentPage:120, totalPages:300}}
  When  the user clicks "Mark as Finished" (BookCover.tsx:146-155)
  Then  updateBookState(B, "finished", "in_progress") writes {state:"finished", finishedAt, updatedAt} and appends state_change {in_progress→finished}. progress stays 120/300.
**Parameters:** none
**Edge cases handled:** Progress display shows 100% for any finished book (book-utils.ts:121-124).
**Suspected defect:** The remaining 180 pages are never counted in totalPagesRead (RULE-187), and commentPage stays 120.
**Confidence:** High.

### RULE-175: Ratings can be set from the detail page only for finished books
**Category:** Policy
**Priority:** P1
**Source:** `src/components/app/book-detail/BookDetailPage.tsx:63-71`
**Plain English:** The detail page shows stars and accepts a rating only when the book is finished.
**Specification:**
  Given B.state ≠ "finished"
  When  a rating click reaches handleRatingChange
  Then  nothing is written.
  Given B.state = "finished"
  Then  updateBookRating runs (RULE-161).
**Parameters:** none
**Edge cases handled:** Stars render only for finished books (BookCover.tsx:106-131).
**Suspected defect:** The edit sheet allows setting a rating on any state through updateBookManual. That path logs no rating_added event.
**Confidence:** High.

### RULE-176: Adding a comment appends a comment event with a reading-context snapshot
**Category:** Lifecycle
**Priority:** P1
**Source:** `src/lib/services/EventService.ts:310-393`
**Plain English:** A comment is stored only as an event, carrying the trimmed text plus the book's state and current page at that moment.
**Specification:**
  Given B {state:"in_progress", progress:{currentPage:87, totalPages:300}}
  When  the user posts "  Great twist  ". CommentsSection.tsx:46-54 passes book.state and book.progress.currentPage.
  Then  addDoc users/{uid}/events with {type:"comment", bookId:B, data:{comment:"Great twist", commentState:"in_progress", commentPage:87}, userId, timestamp}. The book doc is not written.
        EventsProvider then refetches events (1000) and activities (6) (EventsProvider.tsx:566-567).
**Parameters:** Trimmed length 1–2000. Page must satisfy 0 ≤ page ≤ book.progress.totalPages.
**Edge cases handled:** Missing uid or bookId, invalid text, book not found, or invalid page → error with no write.
**Suspected defect:** For finished books, CommentForm shows "Page {totalPages}" (CommentForm.tsx:66-67) but stores currentPage. Comments are read from the cached 1000 most recent events, so older comments disappear from the book page.
**Confidence:** High.

### RULE-177: A review can be added only to a finished book that has no review yet
**Category:** Lifecycle
**Priority:** P1
**Source:** `src/lib/services/EventService.ts:452-547`
**Plain English:** The first review is a review event whose created and updated times are equal.
**Specification:**
  Given B.state "finished" and no review events for B
  When  addReview(uid, B, text) is called with trimmed length 10–5000
  Then  addDoc events with {type:"review", bookId:B, data:{review: trimmed, reviewCreatedAt: T, reviewUpdatedAt: T}, userId, timestamp: now}. T comes from its own Timestamp.now() call, so it can differ slightly from the event timestamp.
        The provider then refetches events and activities.
**Parameters:** Review length 10–5000
**Edge cases handled:** Not finished → "Reviews can only be added to finished books". Existing review → "A review already exists…".
**Suspected defect:** A review event is never shown in the dashboard activity feed (RULE-189).
**Confidence:** High.

### RULE-178: Updating a review appends a new review event that keeps the original creation time
**Category:** Lifecycle
**Priority:** P1
**Source:** `src/lib/services/EventService.ts:552-627`
**Plain English:** Events are never edited in place. A review edit adds another review event that copies reviewCreatedAt from the current latest review.
**Specification:**
  Given the latest review event for B has reviewCreatedAt C
  When  updateReview(uid, B, newText) is called
  Then  addDoc events with {type:"review", bookId:B, data:{review: trimmed newText, reviewCreatedAt: C, reviewUpdatedAt: now}, userId, timestamp}. Earlier review events stay.
**Parameters:** Length 10–5000
**Edge cases handled:** No existing review → "No existing review found to update".
**Suspected defect:** There is no finished-state check on update. After a manual revert, reviews can still be edited.
**Confidence:** High.

### RULE-179: The latest review event wins
**Category:** Policy
**Priority:** P1
**Source:** `src/lib/services/EventService.ts:662-684`
**Plain English:** A book's current review is the review event with the newest timestamp.
**Specification:**
  Given review events E1 (t1) and E2 (t2 > t1) for B
  When  the review is read (EventService.getBookReview, or EventsProvider.getBookReview at EventsProvider.tsx:666-690)
  Then  E2 is returned as {text: data.review, createdAt: data.reviewCreatedAt||timestamp, updatedAt: data.reviewUpdatedAt||timestamp}.
**Parameters:** none
**Edge cases handled:** Latest event with empty review → null. It does not fall back to an older event.
**Suspected defect:** none
**Confidence:** High.

### RULE-180: A barcode-scan add appends an extra manual_update audit event
**Category:** Lifecycle
**Priority:** P2
**Source:** `src/components/app/books/AddBooksPage.tsx:141-164`
**Plain English:** A book added from a barcode scan also gets a manual_update event that describes how it was scanned.
**Specification:**
  Given a scan via camera of ISBN 9780441013593, captured at time S, and the add succeeds with new id N
  When  handleAddGoogleBook(volume, {scanMethod:"camera", isbn, scanStartTime:S}) runs
  Then  after addDoc of the book (RULE-162), addDoc events with {type:"manual_update", bookId:N, data:{comment:"Book added via barcode scanning (camera, ISBN: 9780441013593, scan duration: 12s)", commentState:"not_started", commentPage:0}, userId, timestamp}.
**Parameters:** Format: `Book added via barcode scanning (${"camera"|"image upload"}, ISBN: ${isbn}, scan duration: ${round(ms/1000)}s)`
**Edge cases handled:** Logging failure is caught and only warned. The add is still a success.
**Suspected defect:** The "scan duration" runs from barcode capture (BarcodeScanner.tsx:63) to the Add click, so it includes the user's decision time. Search and manual adds log no event.
**Confidence:** High.

### RULE-181: The AI message is regenerated only when the latest one is not from today, or when forced
**Category:** Lifecycle
**Priority:** P1
**Source:** `src/lib/services/MessageService.ts:200-264`
**Plain English:** One personalized message per local calendar day is cached in users/{uid}/messages, and a new one is generated on the first request of a new day.
**Specification:**
  Given the latest message (orderBy timestamp desc, limit 1) was stored yesterday at 23:50 local time
  When  getPersonalizedMessage(data, forceRefresh=false) runs today
  Then  generate via Gemini "gemini-2.5-flash-lite", validate it is 10–500 trimmed chars, then addDoc users/{uid}/messages with {userId, content, timestamp: now}, and return the content.
  Given the latest message is from today and forceRefresh is false
  Then  return the stored content with no write.
**Parameters:** Refresh check = !isSameDay(local Y/M/D). It is not a 24-hour window, despite the comments.
**Edge cases handled:** getLatestMessage failure → error result. Save failure → logged, and the content is still returned.
**Suspected defect:** The provider shows text only through the Firestore listener (RULE-184), so a message whose save failed is never displayed.
**Confidence:** High.

### RULE-182: AI failure keeps the old message, otherwise uses a stats-based fallback that is saved
**Category:** Policy
**Priority:** P1
**Source:** `src/lib/services/MessageService.ts:234-246`
**Plain English:** If generation fails or produces invalid text, any existing message is reused without a write. With no message at all, a rule-based fallback is generated and saved.
**Specification:**
  Given the AI throws and an old message "X" exists
  Then  return "X". Nothing is written.
  Given the AI throws and no message exists, with stats {readingStreak:9}
  Then  content = "Amazing 9-day reading streak! Your dedication to reading is truly inspiring. Keep up this fantastic momentum!", saved as a new message doc.
  Fallback order (MessageService.ts:173-194): streak > 7; else currentlyReading > 0 ("You're currently reading N book(s)! …"); else finishedBooks > 0 ("Congratulations on finishing N book(s)! …"); else a random pick from 5 FALLBACK_MESSAGES.
  An unexpected exception anywhere returns a fallback without saving it (lines 271-280).
**Parameters:** Streak threshold 7. 5 canned messages.
**Edge cases handled:** as above
**Suspected defect:** stats.finishedBooks is actually booksReadThisYear (dashboard/page.tsx:34). On forced refresh with an AI failure, the old message is returned silently.
**Confidence:** High.

### RULE-183: First-day welcome prompt versus personalized prompt
**Category:** Policy
**Priority:** P2
**Source:** `src/lib/services/MessageService.ts:83-98`
**Plain English:** On the calendar day the profile was created, the AI is asked for a first-time welcome message. Afterwards it is asked for a data-driven one.
**Specification:**
  Given profile.createdAt is on today's local date
  When  a message is generated
  Then  the welcome prompt (50–80 words, encourage adding a first book) is used, even if the user has already added books.
  Otherwise the personalized prompt includes stats, currently-reading books with %, the 3 most recently finished (by finishedAt), up to 5 genres, and the types of the first 3 activities.
**Parameters:** 50–80 words, top 3 finished, 5 genres, 3 activities
**Edge cases handled:** Empty lists get placeholder text.
**Suspected defect:** Progress % divides by totalPages, which can be 0 and gives "NaN%" or "Infinity%" (line 120).
**Confidence:** High.

### RULE-184: Message generation is re-checked whenever dashboard inputs change, and force refresh is never used
**Category:** Lifecycle
**Priority:** P2
**Source:** `src/components/app/dashboard/PersonalizedMessageSection.tsx:30-55`
**Plain English:** The dashboard asks for a message on mount and again whenever books, stats or activities change. The displayed text comes from a live listener on the latest message doc.
**Specification:**
  Given a dashboard mount with userProfile.id
  When  books, stats or recentActivity references change
  Then  generateMessage(data) runs, which calls getPersonalizedMessage(data, false) (MessageProvider.tsx:111-139). The UI text is updated by subscribeToLatestMessage (MessageProvider.tsx:78-106).
**Parameters:** none
**Edge cases handled:** No profile id → skipped.
**Suspected defect:** refreshMessage (force=true, MessageProvider.tsx:144-169) has no caller. Several effect runs during the first load of a day can race (each reads "stale", then each saves), which can create duplicate message docs and duplicate AI calls. cleanupOldMessages is never called, so message docs accumulate without limit.
**Confidence:** Medium. SME question: is the duplicate-generation race observed in practice?

### RULE-185: Events and activities are refetched only on sign-in and after comment or review actions
**Category:** Lifecycle
**Priority:** P1
**Source:** `src/lib/providers/EventsProvider.tsx:692-702`
**Plain English:** The cached events (latest 1000) and dashboard activities (latest 6) load when the user id changes. Only addComment, addReview and updateReview reload them.
**Specification:**
  Given a user signs in
  When  the [user.uid] effect runs
  Then  refreshEvents → getRecentEvents(uid, 1000), and refreshActivities → getRecentActivityItems(uid, 6).
  After a successful addComment, addReview or updateReview, both are refetched (lines 567, 625, 658).
**Parameters:** Events limit 1000 (line 475). Activity limit 6 (line 503).
**Edge cases handled:** No user → lists cleared.
**Suspected defect:** Service errors are StandardError objects, so the typeof === "string" check always shows the generic "Failed to load …" text.
**Confidence:** High.

### RULE-186: Book mutations do not refresh the event or activity caches
**Category:** Lifecycle
**Priority:** P1
**Source:** `src/lib/providers/BooksProvider.tsx:144-159`
**Plain English:** Adding, progressing, state-changing, rating, manually editing or deleting a book leaves Recent Activity, Activity History and the event-based comment and review views stale until a full reload.
**Specification:**
  Given the dashboard is open
  When  the user updates progress, marks finished, rates, edits, deletes or adds a book (every BooksProvider mutation only relies on the books onSnapshot listener)
  Then  the books list updates in real time and the stats recompute (RULE-186 below), but EventsProvider.events and activities are not refetched. EventsProvider is mounted in the (app) layout and persists across client navigation.
**Parameters:** none
**Edge cases handled:** none
**Suspected defect:** The new state_change, progress_update, rating_added, manual_update and delete_book events don't appear until reload. The barcode manual_update event also doesn't appear.
**Confidence:** High. Grep shows no other callers of refreshEvents or refreshActivities.

### RULE-187: User stats recompute on every books snapshot using up to 1000 events
**Category:** Lifecycle
**Priority:** P1
**Source:** `src/lib/services/UserService.ts:401-433`
**Plain English:** Every change to the books collection triggers a refetch of the latest 1000 events and a full stats recalculation.
**Specification:**
  Given UserProvider subscribes (UserProvider.tsx:348-373)
  When  users/{uid}/books emits a snapshot
  Then  getRecentEvents(uid, 1000) runs, then stats are computed: totalBooksRead = count finished; currentlyReading = count in_progress; booksInLibrary = count all; totalPagesRead = Σ max(0, newPage − previousPage) over progress_update events (lines 442-447); averageRating over finished books with a rating; readingStreak, booksReadThisMonth and booksReadThisYear from finishedAt; top 3 genres.
**Parameters:** Event cap 1000
**Edge cases handled:** A thrown exception falls back to a books-only calculation (totalPagesRead = Σ totalPages of finished books).
**Suspected defect:** getRecentEvents returns {success:false} rather than throwing, so a failed fetch gives events=[] and totalPagesRead=0 instead of the fallback. totalPagesRead counts orphan events of deleted books, ignores manual page edits and Mark-as-finished jumps, and undercounts beyond the 1000-event window. Manually finished books (no finishedAt) are missing from streak and month/year counts.
**Confidence:** High.

### RULE-188: Activity feed fetch drops events whose book no longer exists
**Category:** Policy
**Priority:** P1
**Source:** `src/lib/services/EventService.ts:162-217`
**Plain English:** The dashboard feed takes the N most recent events, looks up each distinct book, and maps only events whose book still exists.
**Specification:**
  Given the latest 6 events, 2 of them for a deleted book D
  When  getRecentActivityItems(uid, 6) runs
  Then  getBook is called once per distinct bookId. Events for D map to null (EventService.ts:737-739) and are removed, so the feed shows at most 4 items.
**Parameters:** Default limit USER_ACTIVITY_LIMIT = 5. The provider passes 6.
**Edge cases handled:** A failed book lookup is treated as missing.
**Suspected defect:** The filter runs after the limit, so the feed can show fewer than 6 or zero items. Lookups are N+1 reads.
**Confidence:** High.

### RULE-189: Activity type mapping per event type
**Category:** Policy
**Priority:** P2
**Source:** `src/lib/services/EventService.ts:733-764`
**Plain English:** Each event type maps to one UI activity type, and review events are not shown.
**Specification:**
  Given event E with an existing book
  When  it is transformed
  Then  state_change → RULE-190.
        progress_update → "progress", colour status-info, details "<newPage−previousPage> pages" when non-zero (lines 809-822).
        rating_added → "rated", status-warning, "<n> stars".
        comment → "commented", brand-secondary, text truncated to 50 chars + "...".
        manual_update → "manually_updated", status-warning, comment truncated to 50 + "..." (lines 844-881).
        delete_book → RULE-191.
        review and any other type → null (dropped).
**Parameters:** Truncation 50 characters
**Edge cases handled:** A newPage of 0 or undefined gives no details.
**Suspected defect:** A page decrease shows a negative "-20 pages". Review activity never appears on the dashboard.
**Confidence:** High.

### RULE-190: state_change to activity mapping (finished, started, added)
**Category:** Policy
**Priority:** P2
**Source:** `src/lib/services/EventService.ts:769-804`
**Plain English:** A state change shows as "finished", "started" or "added", and every other combination falls through to "started".
**Specification:**
  Given state_change data {previousState, newState}
  Then  newState "finished" → "finished" (status-success).
        in_progress with previous not_started → "started" (brand-primary).
        newState "not_started" with no previousState → "added" (brand-accent).
        Otherwise → "started" (brand-primary).
**Parameters:** none
**Edge cases handled:** none
**Suspected defect:** "added" is unreachable, since no code writes a state_change without previousState (RULE-162). A manual revert finished→in_progress or →not_started displays as "started". ActivityDetail labels any →not_started as "Added to Library" (ActivityDetail.tsx:100-101).
**Confidence:** High.

### RULE-191: delete_book activity mapping is unreachable on the dashboard
**Category:** Policy
**Priority:** P2
**Source:** `src/lib/services/EventService.ts:886-899`
**Plain English:** A mapping exists to show deleted books by their saved title and author, but those events are filtered out first.
**Specification:**
  Given a delete_book event {deletedBookTitle:"Dune", deletedBookAuthor:"Frank Herbert"}
  When  it is transformed
  Then  the intended item is {type:"deleted", bookTitle:"Dune", details:"by Frank Herbert", colour status-error}. In practice, the book lookup returns null for a deleted book, so the event is dropped (RULE-188) and this code never runs.
**Parameters:** none
**Edge cases handled:** Title falls back to the book title.
**Suspected defect:** Deletions never appear in Recent Activity.
**Confidence:** High.

### RULE-192: Activity History shows all cached events, including deleted-book events with an "Unknown Book" title
**Category:** Policy
**Priority:** P2
**Source:** `src/app/(app)/activity-history/page.tsx:105-109`
**Plain English:** The history page lists every cached event without the existence filter, resolving titles from the current books list.
**Specification:**
  Given events for a deleted book D
  When  Activity History renders
  Then  they are listed, and the title resolves to "Unknown Book". delete_book details show deletedBookTitle and deletedBookAuthor (ActivityDetail.tsx:185-198).
**Parameters:** Page size default 25
**Edge cases handled:** Filters for type, date range and bookId.
**Suspected defect:** Inconsistent with the dashboard filter (RULE-188). The data is stale until reload (RULE-186).
**Confidence:** High.

### RULE-193: Review details in Activity History read the wrong field
**Category:** Policy
**Priority:** P2
**Source:** `src/components/app/activity/ActivityDetail.tsx:169-176`
**Plain English:** The detail view for a review event looks for `data.comment`, which review events never contain.
**Specification:**
  Given a review event {data:{review:"…"}}
  When  it is rendered in Activity History
  Then  no "Review" detail is shown, and the label is "Added a review" even for updates.
**Parameters:** none
**Edge cases handled:** none
**Suspected defect:** It should read data.review.
**Confidence:** High.

### RULE-194: Every book update re-stamps updatedAt and strips only top-level undefined values
**Category:** Policy
**Priority:** P0
**Source:** `src/lib/repositories/FirebaseBookRepository.ts:166-187`
**Plain English:** All book updates are partial updateDoc calls that always set updatedAt to now. Nested maps such as progress are replaced whole.
**Specification:**
  Given any update U
  When  repository.updateBook(uid, B, U) runs
  Then  updateDoc users/{uid}/books/{B} with {...U, updatedAt: now}, minus top-level undefined keys. A `progress` key overwrites the whole map.
**Parameters:** none
**Edge cases handled:** A missing doc makes updateDoc throw, which maps to "Database error…".
**Suspected defect:** Fields cannot be removed (RULE-165). Nested undefined values are not stripped.
**Confidence:** High.

### RULE-195: Event envelope and append-only log
**Category:** Policy
**Priority:** P0
**Source:** `src/lib/repositories/FirebaseEventRepository.ts:44-68`
**Plain English:** Every event is a new auto-id document stamped with the userId and a client-side timestamp. Events are never updated.
**Specification:**
  Given an event {type, bookId, data}
  When  logEvent(uid, event) is called
  Then  addDoc users/{uid}/events with {type, bookId, data, userId:uid, timestamp: Timestamp.now()}, minus top-level undefined keys.
**Parameters:** none
**Edge cases handled:** Errors are returned as a result, not thrown.
**Suspected defect:** Most callers in BookService ignore the result, so book writes can succeed with no audit event. The timestamp is client-generated, not serverTimestamp().
**Confidence:** High.

## Rules requiring SME confirmation

- **RULE-013** Stored profile counters (updateUserStats): Medium — no caller in src. SME question: does any backend process update these fields?
- **RULE-067** Barcode scan duration logged: Medium — SME question: what should scan duration measure?
- **RULE-082** Invalid or failed AI messages fall back to the previous message or a canned one: Medium — the code is clear. SME question: is the intended refresh a calendar day or a rolling 24 hours?
- **RULE-093** Book repository errors are turned into user-facing messages: Medium — SME question: should a Firestore `not-found` show "Book not found"?
- **RULE-106** Default values for a new user profile: Medium — SME question: can Google sign-in ever return a null email in this app's configuration?
- **RULE-113** Cover image URL must parse and look like an image or come from Google Books: Medium — SME question: which image hosts should be allowed for user-supplied covers?
- **RULE-115** Text fields have a 500-character limit and required fields cannot be blank (live hint): Medium — SME question: should 500 characters be an enforced limit for description, and should other fields have their own limits?
- **RULE-121** 979-prefixed ISBNs are wrongly converted to ISBN-10 for lookup: Medium — SME question: have 979 books been reported as unfindable by scan?
- **RULE-126** Duplicate camera scans are ignored, with a 1.5-second cooldown: Medium — SME question: should re-scanning the same code after an error be allowed?
- **RULE-142** Live text-field checks in the edit sheet (500-character limit): Medium — SME question: should the 500-character limit block saving?
- **RULE-143** Signed-out users are sent from the dashboard to the landing page: Medium — SME question: are the deployed Firestore rules the real access control?

## Instruction-shaped content found in the legacy tree

All of it was treated as data and none was followed:

- `.cursor/rules/*.mdc` (`web.mdc:4`, `workflow.mdc:9`, `generate.mdc:9`, `shadcn-mcp.mdc:7,10`, plus `architecture.mdc` and `project-details.mdc`) are instruction files for AI coding tools ("You are a Senior Front-End Developer…"). They describe the legacy layered architecture and have been rewritten for the new codebase.
- `src/lib/services/MessageService.ts:85-155` is the product's own Gemini prompt ("You are Librarium's AI reading companion…"). It is aimed at the app's runtime model, not at coding tools. User-entered names, titles and authors are interpolated into it, which is a prompt-injection surface (RULE-082); the rewrite keeps the behaviour and the risk is noted in TRANSFORMATION_NOTES.md.
- Nothing in `src/` is aimed at coding assistants.
