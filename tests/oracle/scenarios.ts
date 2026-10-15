import { bare, dune, goodOmens } from "../fixtures/volumes";
import type { Driver, ManualForm, PlainBook } from "./driver";

export type AiBehavior = { reply: string } | { fail: string };

export interface Context {
  d: Driver;
  /** Runs one user action; a returned book id is registered under `label`. */
  step(name: string, run: () => Promise<unknown>, label?: string): Promise<void>;
  /** The id registered under a label. */
  id(label: string): string;
  ai(behavior: AiBehavior): void;
}

export interface Scenario {
  id: string;
  title: string;
  run(c: Context): Promise<void>;
  /** Rule ids (analysis/librarium/BUSINESS_RULES.md) this scenario pins. */
  rules: string[];
}

const manual = (over: Partial<ManualForm>): ManualForm => ({
  title: "", author: "", genre: "", pages: "", publishedYear: "", ownership: "wishlist", description: "", ...over,
});
const plain = (title: string, totalPages: number, over: Partial<PlainBook> = {}): PlainBook => ({
  title, author: "Test Author", state: "not_started", progress: { currentPage: 0, totalPages }, isOwned: true, ...over,
});
const longReview = "A thoughtful, sweeping novel about power and ecology.";

export const scenarios: Scenario[] = [
  {
    id: "S01",
    title: "First sign-in creates the profile and the welcome book; a second sign-in changes nothing",
    rules: ["profile-creation", "welcome-book"],
    async run({ d, step }) {
      await step("sign in", () => d.signIn());
      await step("sign in again", () => d.signIn());
    },
  },
  {
    id: "S02",
    title: "Adding books from Google Books: full, multi-author and sparse records",
    rules: ["google-conversion", "format-authors", "best-thumbnail", "best-isbn"],
    async run({ d, step }) {
      await step("sign in", () => d.signIn());
      await step("add Dune", () => d.addGoogleBook(dune), "dune");
      await step("add Good Omens", () => d.addGoogleBook(goodOmens), "omens");
      await step("add sparse record", () => d.addGoogleBook(bare), "bare");
    },
  },
  {
    id: "S03",
    title: "Manual entry: complete, minimal and malformed forms",
    rules: ["manual-conversion", "book-validation"],
    async run({ d, step }) {
      await step("sign in", () => d.signIn());
      await step("add complete", () => d.addManualBook(manual({
        title: "  The Name of the Rose ", author: " Umberto Eco ", genre: " Mystery ", pages: "536",
        publishedYear: "1980", ownership: "owned", description: " A murder in a medieval abbey. ",
      })), "rose");
      await step("add minimal", () => d.addManualBook(manual({ title: "Notes", author: "Me", pages: "abc" })), "notes");
      await step("add whitespace title", () => d.addManualBook(manual({ title: "   ", author: "Nobody" })), "blank");
      await step("add whitespace author", () => d.addManualBook(manual({ title: "Orphan", author: "  " })), "orphan");
    },
  },
  {
    id: "S04",
    title: "Reading lifecycle: start, progress forwards and backwards, auto-finish, rating",
    rules: ["state-machine", "progress-update", "auto-finish", "rating"],
    async run({ d, step, id }) {
      await step("sign in", () => d.signIn());
      await step("add", () => d.addBook(plain("Middlemarch", 300, { genre: "Classics" })), "mm");
      await step("start reading", () => d.startReading(id("mm")));
      await step("page 120", () => d.updateProgress(id("mm"), 120));
      await step("page 80", () => d.updateProgress(id("mm"), 80));
      await step("page 300", () => d.updateProgress(id("mm"), 300));
      await step("rate 4", () => d.rate(id("mm"), 4));
      await step("rate 5", () => d.rate(id("mm"), 5));
    },
  },
  {
    id: "S05",
    title: "Guards: invalid pages, transitions, ratings and book payloads are rejected with the same messages",
    rules: ["progress-guards", "transition-guard", "rating-guard", "book-validation"],
    async run({ d, step, id }) {
      await step("sign in", () => d.signIn());
      await step("add", () => d.addBook(plain("Emma", 400)), "emma");
      await step("start reading", () => d.startReading(id("emma")));
      await step("negative page", () => d.updateProgress(id("emma"), -1));
      await step("beyond last page", () => d.updateProgress(id("emma"), 401));
      await step("skip back to not_started", () => d.changeState(id("emma"), "not_started"));
      await step("rate 0", () => d.rate(id("emma"), 0));
      await step("rate 6", () => d.rate(id("emma"), 6));
      await step("finish", () => d.finish(id("emma")));
      await step("reopen finished", () => d.changeState(id("emma"), "in_progress"));
      await step("finish twice", () => d.changeState(id("emma"), "finished"));
      await step("progress on missing book", () => d.updateProgress("does-not-exist", 3));
      await step("state on missing book", () => d.changeState("does-not-exist", "in_progress"));
      await step("empty title", () => d.addBook(plain("", 10)));
      await step("page beyond total", () => d.addBook(plain("Overflow", 10, { progress: { currentPage: 11, totalPages: 10 } })));
      await step("negative pages", () => d.addBook(plain("Negative", -5)));
      await step("bad rating", () => d.addBook(plain("Rated", 10, { rating: 7 })));
      await step("zero pages, progress", () => d.addBook(plain("Pamphlet", 0)), "pamphlet");
      await step("start pamphlet", () => d.startReading(id("pamphlet")));
      await step("pamphlet page 50", () => d.updateProgress(id("pamphlet"), 50));
    },
  },
  {
    id: "S06",
    title: "Comments capture the reading state and page at the time they are written",
    rules: ["comment-validation", "comment-context", "comment-ordering"],
    async run({ d, step, id }) {
      await step("sign in", () => d.signIn());
      await step("add", () => d.addBook(plain("Beloved", 324)), "beloved");
      await step("comment before starting", () => d.comment(id("beloved"), "  Looking forward to this one.  "));
      await step("empty comment", () => d.comment(id("beloved"), "   "));
      await step("too long comment", () => d.comment(id("beloved"), "x".repeat(2001)));
      await step("max length comment", () => d.comment(id("beloved"), "y".repeat(2000)));
      await step("start", () => d.startReading(id("beloved")));
      await step("page 100", () => d.updateProgress(id("beloved"), 100));
      await step("comment on page 100", () => d.comment(id("beloved"), "Sethe's story is devastating."));
      await step("finish", () => d.finish(id("beloved")));
      await step("comment after finishing", () => d.comment(id("beloved"), "Stayed with me for days."));
    },
  },
  {
    id: "S07",
    title: "Reviews: only for finished books, one per book, updates keep the original creation time",
    rules: ["review-validation", "review-single", "review-update"],
    async run({ d, step, id }) {
      await step("sign in", () => d.signIn());
      await step("add", () => d.addGoogleBook(dune), "dune");
      await step("review unfinished", () => d.addReview(id("dune"), longReview));
      await step("start", () => d.startReading(id("dune")));
      await step("finish", () => d.finish(id("dune")));
      await step("short review", () => d.addReview(id("dune"), "too short"));
      await step("update before any review", () => d.updateReview(id("dune"), longReview));
      await step("review", () => d.addReview(id("dune"), `  ${longReview}  `));
      await step("second review", () => d.addReview(id("dune"), longReview));
      await step("update review", () => d.updateReview(id("dune"), "On reflection, even better the second time."));
      await step("update too short", () => d.updateReview(id("dune"), "meh"));
      await step("review missing book", () => d.addReview("does-not-exist", longReview));
    },
  },
  {
    id: "S08",
    title: "Manual edits bypass the state machine and are audited",
    rules: ["manual-update", "manual-update-audit"],
    async run({ d, step, id }) {
      await step("sign in", () => d.signIn());
      await step("add", () => d.addBook(plain("Ulysses", 730, { genre: "Modernism" })), "ulysses");
      const form = {
        title: "Ulysses (Annotated)", author: "James Joyce", description: "", state: "finished",
        progress: { currentPage: 730, totalPages: 730 }, rating: 3, isbn: "", genre: "",
        publishedDate: "1922", coverImage: "", isOwned: false,
      };
      await step("edit everything, jump to finished", () => d.edit(id("ulysses"), form));
      await step("edit without state change", () => d.edit(id("ulysses"), { ...form, title: "Ulysses", rating: undefined }));
      await step("edit back to in_progress", () => d.edit(id("ulysses"), { ...form, state: "in_progress", progress: { currentPage: 12, totalPages: 730 } }));
      await step("edit with empty author", () => d.edit(id("ulysses"), { ...form, author: " " }));
      await step("edit with bad progress", () => d.edit(id("ulysses"), { ...form, progress: { currentPage: 800, totalPages: 730 } }));
    },
  },
  {
    id: "S09",
    title: "Deleting books logs a tombstone event and keeps the history",
    rules: ["delete-book"],
    async run({ d, step, id }) {
      await step("sign in", () => d.signIn());
      await step("add", () => d.addBook(plain("Rebecca", 380)), "rebecca");
      await step("comment", () => d.comment(id("rebecca"), "Last night I dreamt I went to Manderley again."));
      await step("delete", () => d.deleteBook(id("rebecca")));
      await step("delete unknown id", () => d.deleteBook("ghost-book"));
    },
  },
  {
    id: "S10",
    title: "Books added by barcode scan carry an audit event",
    rules: ["scan-audit"],
    async run({ d, step }) {
      await step("sign in", () => d.signIn());
      await step("scan with camera", () => d.addScannedBook(dune, { scanMethod: "camera", isbn: "9780441013593", durationSec: 3 }), "dune");
      await step("scan from upload", () => d.addScannedBook(goodOmens, { scanMethod: "upload", isbn: "0060853980", durationSec: 0 }), "omens");
    },
  },
  {
    id: "S11",
    title: "Daily AI message: generated once per day, cached, refreshed on demand, with fallbacks",
    rules: ["message-cache", "message-fallback", "message-validation"],
    async run({ d, step, ai }) {
      await step("sign in", () => d.signIn());
      ai({ fail: "AI unavailable" });
      await step("first message without AI", () => d.dailyMessage());
      ai({ reply: "  Welcome to Librarium, Ada! Your first book is waiting on the shelf.  " });
      await step("same day uses cache", () => d.dailyMessage());
      await step("forced refresh", () => d.dailyMessage(true));
      ai({ reply: "Too short" });
      await step("forced refresh with invalid AI text keeps old", () => d.dailyMessage(true));
      ai({ fail: "quota" });
      await step("forced refresh with failing AI keeps old", () => d.dailyMessage(true));
    },
  },
  {
    id: "S12",
    title: "A rich library: derived statistics, activity, search and library views",
    rules: ["stats", "activity", "library-query", "search-ranking"],
    async run({ d, step, id }) {
      await step("sign in", () => d.signIn());
      await step("add Dune", () => d.addGoogleBook(dune), "dune");
      await step("add Good Omens", () => d.addGoogleBook(goodOmens), "omens");
      await step("add Rose", () => d.addManualBook(manual({ title: "The Name of the Rose", author: "Umberto Eco", genre: "Fiction", pages: "536", ownership: "owned" })), "rose");
      await step("add Pamphlet", () => d.addBook(plain("Common Sense", 48, { genre: "Politics", isOwned: false })), "sense");
      await step("start Dune", () => d.startReading(id("dune")));
      await step("Dune page 200", () => d.updateProgress(id("dune"), 200));
      await step("start Omens", () => d.startReading(id("omens")));
      await step("Omens page 412", () => d.updateProgress(id("omens"), 412));
      await step("rate Omens", () => d.rate(id("omens"), 4));
      await step("start Sense", () => d.startReading(id("sense")));
      await step("finish Sense", () => d.finish(id("sense")));
      await step("rate Sense", () => d.rate(id("sense"), 2));
      await step("comment Rose", () => d.comment(id("rose"), "On the to-read pile."));
      await step("edit Rose", () => d.edit(id("rose"), { title: "The Name of the Rose", author: "Umberto Eco", isOwned: false }));
    },
  },
  {
    id: "S13",
    title: "Known legacy defects that the rewrite corrects (approved deviations D1–D3)",
    rules: ["progress-guards", "auto-finish", "started-at"],
    async run({ d, step, id }) {
      await step("sign in", () => d.signIn());
      await step("add", () => d.addBook(plain("Persuasion", 250)), "persuasion");
      await step("overshoot while not started", () => d.updateProgress(id("persuasion"), 999));
      await step("add second", () => d.addBook(plain("Sanditon", 120)), "sanditon");
      await step("jump straight to the last page", () => d.updateProgress(id("sanditon"), 120));
    },
  },
];
