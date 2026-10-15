import type { Page } from "@playwright/test";
import { expect, seed, signIn, test } from "./fixtures";

const at = (daysAgo: number, hour = 12) => {
  const d = new Date(Date.now() - daysAgo * 86_400_000);
  d.setHours(hour, 0, 0, 0);
  return d;
};

/** A library exactly as the legacy app wrote it: every quirk of its document shapes included. */
async function seedLegacyLibrary(uid: string) {
  const event = (id: string, bookId: string, type: string, timestamp: Date, data: Record<string, unknown>) =>
    seed(uid, `events/${id}`, { bookId, type, timestamp, data: data as never, userId: uid });
  await seed(uid, "books/dune", {
    title: "Dune", author: "Frank Herbert", state: "in_progress", isOwned: false, genre: "Fiction", isbn: "9780441013593", publishedDate: "2005-08-02",
    description: "<p>Set on the desert planet <b>Arrakis</b>.</p>", coverImage: "http://books.google.com/books/content?id=B1hSG45JCX4C&img=1&zoom=1",
    progress: { currentPage: 200, totalPages: 528, lastUpdated: at(2) }, addedAt: at(70), updatedAt: at(2),
  });
  await seed(uid, "books/omens", {
    title: "Good Omens", author: "Terry Pratchett and Neil Gaiman", state: "finished", isOwned: true, genre: "Fantasy", rating: 4,
    progress: { currentPage: 412, totalPages: 412, lastUpdated: at(0, 9) }, finishedAt: at(0, 9), addedAt: at(40), updatedAt: at(0, 9),
  });
  await seed(uid, "books/sense", {
    title: "Common Sense", author: "Thomas Paine", state: "finished", isOwned: false, genre: "Politics", rating: 2,
    progress: { currentPage: 48, totalPages: 48 }, finishedAt: at(1), addedAt: at(30), updatedAt: at(1),
  });
  await seed(uid, "books/rose", { title: "The Name of the Rose", author: "Umberto Eco", state: "not_started", isOwned: false, genre: "", progress: { currentPage: 0, totalPages: 536 }, addedAt: at(20), updatedAt: at(20) });
  await seed(uid, "books/ulysses", {
    title: "Ulysses (Annotated)", author: "James Joyce", state: "finished", isOwned: false, genre: "", description: "", isbn: "", coverImage: "", publishedDate: "1922",
    progress: { currentPage: 730, totalPages: 730 }, addedAt: at(15), updatedAt: at(15),
  });
  await event("e01", "dune", "state_change", at(60), { previousState: "not_started", newState: "in_progress" });
  await event("e02", "dune", "progress_update", at(60), { previousPage: 0, newPage: 1 });
  await event("e03", "dune", "progress_update", at(35), { previousPage: 1, newPage: 120 });
  await event("e04", "dune", "progress_update", at(2), { previousPage: 120, newPage: 200 });
  await event("e05", "dune", "comment", at(2, 13), { comment: "The spice must flow.", commentState: "in_progress", commentPage: 200 });
  await event("e06", "omens", "progress_update", at(0, 8), { previousPage: 0, newPage: 412 });
  await event("e07", "omens", "state_change", at(0, 9), { previousState: "in_progress", newState: "finished" });
  await event("e08", "omens", "rating_added", at(0, 10), { rating: 4 });
  await event("e09", "omens", "review", at(0, 10), { review: "Funny and humane.", reviewCreatedAt: at(0, 10), reviewUpdatedAt: at(0, 10) });
  await event("e10", "omens", "review", at(0, 11), { review: "Funny, humane and wise about the end of the world.", reviewCreatedAt: at(0, 10), reviewUpdatedAt: at(0, 11) });
  await event("e11", "ulysses", "manual_update", at(15), { comment: "Manual update: title, author, state", commentState: "finished", commentPage: 730 });
  await event("e12", "ulysses", "state_change", at(15), { previousState: "not_started", newState: "finished" });
  await event("e13", "gone", "comment", at(25), { comment: "Last night I dreamt I went to Manderley again.", commentState: "not_started", commentPage: 0 });
  await event("e14", "gone", "delete_book", at(24), { deletedBookTitle: "Rebecca", deletedBookAuthor: "Daphne du Maurier" });
  for (let i = 0; i < 16; i++) await event(`f${String(i).padStart(2, "0")}`, "sense", "rating_added", at(5 + i), { rating: (i % 5) + 1 });
}

const ribbon = (page: Page, label: string) => page.getByRole("group", { name: "Reading stats" }).getByText(label, { exact: true }).locator("..");

test("a library written by the legacy app renders correctly everywhere", async ({ page }) => {
  const reader = await signIn(page);
  await seedLegacyLibrary(reader.uid);

  // Dashboard: live stats computed from the legacy documents.
  await expect(ribbon(page, "In library")).toContainText("6");
  await expect(ribbon(page, "Reading")).toContainText("1");
  await expect(ribbon(page, "This year")).toContainText("2");
  await expect(ribbon(page, "Day streak")).toContainText("2");
  await expect(ribbon(page, "Pages read")).toContainText("612");
  await expect(ribbon(page, "Avg rating")).toContainText("3.0");
  const reading = page.getByRole("region", { name: "Currently Reading" });
  await expect(reading).toContainText("200 / 528 pages");
  const recent = page.getByRole("region", { name: "Recently Read" });
  expect(await recent.getByRole("heading", { level: 3 }).allInnerTexts()).toEqual(["Good Omens", "Common Sense", "Ulysses (Annotated)"]);
  const activity = page.getByRole("region", { name: "Recent Activity" });
  await expect(activity.getByRole("listitem").first()).toContainText("Rated Good Omens 4 stars");
  await expect(activity).toContainText("Finished Good Omens");
  await expect(activity).not.toContainText("Rebecca");

  // Statistics.
  await page.getByRole("link", { name: "Statistics" }).click();
  const metric = (label: string) => page.getByText(label, { exact: true }).locator("..");
  await expect(metric("Books finished")).toContainText("3");
  await expect(metric("Books finished")).toContainText("2 this year");
  await expect(metric("Reading streak")).toContainText("2");
  await expect(page.getByText("Lifetime pages").locator("..")).toContainText("612");
  await expect(page.getByText("Top genre").locator("..")).toContainText("Mathematics"); // all tie at one book; newest wins, as in legacy
  await expect(page.locator(".recharts-area").first()).toBeVisible();
  await expect(page.getByText("Unknown").first()).toBeVisible();

  // Activity history: every event, including those of the deleted book, with filters and pages.
  await page.getByRole("link", { name: "Activity" }).click();
  await expect(page.getByText("Showing 30 events")).toBeVisible();
  await expect(page.getByText("1–25 of 30")).toBeVisible();
  await page.getByRole("button", { name: "Next page" }).click();
  await expect(page.getByText("26–30 of 30")).toBeVisible();
  await page.getByLabel("Filter by event type").selectOption("review");
  await expect(page.getByText("Updated a review")).toBeVisible();
  await expect(page.getByText("Funny, humane and wise about the end of the world.")).toBeVisible();
  await page.getByLabel("Filter by event type").selectOption("delete_book");
  await expect(page.getByRole("main")).toContainText("Deleted book from library");
  await expect(page.getByRole("main")).toContainText("Daphne du Maurier");
  await page.getByRole("button", { name: "Clear" }).click();
  await page.getByLabel("Filter by book").selectOption({ label: "Dune" });
  await expect(page.getByText("Showing 5 events")).toBeVisible();
  const day = at(2).toLocaleDateString("en-CA");
  await page.getByLabel("From", { exact: true }).fill(day);
  await page.getByLabel("To", { exact: true }).fill(day);
  await expect(page.getByText("Showing 2 events")).toBeVisible();

  // Book pages: legacy review updates, comments and HTML descriptions.
  await page.goto(`/books/omens`);
  await expect(page.getByText("Funny, humane and wise about the end of the world.")).toBeVisible();
  await expect(page.getByText(/Updated/)).toBeVisible();
  await page.goto(`/books/dune`);
  await expect(page.getByText("Set on the desert planet Arrakis.")).toBeVisible();
  await expect(page.getByRole("listitem").getByText("The spice must flow.")).toBeVisible();
  await page.goto(`/books/rose`);
  await expect(page.getByText("Unknown")).toHaveCount(0);
});
