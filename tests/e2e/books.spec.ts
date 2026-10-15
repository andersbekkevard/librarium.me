import { expect, read, seed, signIn, test } from "./fixtures";

test("search Google Books, preview a result and add it to the wishlist", async ({ page }) => {
  const reader = await signIn(page);
  await page.getByRole("link", { name: "Add Book" }).click();
  const query = page.waitForRequest((r) => r.url().includes("/books/v1/volumes") && new URL(r.url()).searchParams.get("q") === 'intitle:"dune"');
  await page.getByLabel("Search Google Books").fill("dune");
  await query;
  await page.getByRole("article").filter({ hasText: "Frank Herbert" }).click();
  const preview = page.getByRole("dialog");
  await expect(preview).toContainText("Set on the desert planet Arrakis, Dune is the story of Paul Atreides.");
  await expect(preview).not.toContainText("<b>");
  await preview.getByRole("button", { name: "Add to library" }).click();
  await expect(page.getByText("Added “Dune” to your library")).toBeVisible();
  await expect(preview.getByRole("button", { name: "Added" })).toBeDisabled();
  await page.keyboard.press("Escape");
  await expect(page.getByText("Recently added")).toBeVisible();

  const dune = (await read(reader.uid, "books")).find((b) => b.title === "Dune");
  expect(dune).toMatchObject({
    author: "Frank Herbert", isbn: "9780441013593", genre: "Fiction", isOwned: false, state: "not_started", publishedDate: "2005-08-02",
    progress: { currentPage: 0, totalPages: 528 }, coverImage: expect.stringContaining("zoom=1"), description: expect.stringContaining("<b>Arrakis</b>"),
  });
});

test("author searches, empty results and API failures are explained", async ({ page }) => {
  await signIn(page);
  await page.goto("/add-books?type=author");
  const query = page.waitForRequest((r) => new URL(r.url()).searchParams.get("q") === 'inauthor:"pratchett"');
  await page.getByLabel("Search Google Books").fill("pratchett");
  await query;
  await expect(page.getByRole("heading", { name: "Good Omens" })).toBeVisible();
  await expect(page.getByText("Terry Pratchett, Neil Gaiman and A. N. Other")).toBeVisible();
  await page.getByLabel("Search Google Books").fill("zzzz nothing");
  await expect(page.getByText("No books found")).toBeVisible();
  await page.getByLabel("Search Google Books").fill("rate-limit");
  await expect(page.getByRole("alert").filter({ hasText: "Rate limit exceeded. Please try again later." })).toBeVisible();
});

test("manual entry adds an owned book with the entered details", async ({ page }) => {
  const reader = await signIn(page);
  await page.goto("/add-books?tab=manual");
  await page.getByLabel("Title *").fill("The Name of the Rose");
  await page.getByLabel("Author *").fill("Umberto Eco");
  await page.getByLabel("Genre").fill("Mystery");
  await page.getByLabel("Pages").fill("536");
  await page.getByLabel("Published year").fill("1980");
  await page.getByLabel("Ownership").selectOption("owned");
  await page.getByLabel("Description").fill("A murder in a medieval abbey.");
  await page.getByRole("button", { name: "Add to library" }).click();
  await expect(page.getByText("Added “The Name of the Rose” to your library")).toBeVisible();
  await expect(page.getByLabel("Title *")).toHaveValue("");
  expect((await read(reader.uid, "books")).find((b) => b.title === "The Name of the Rose")).toMatchObject({
    author: "Umberto Eco", genre: "Mystery", isOwned: true, publishedDate: "1980-01-01", description: "A murder in a medieval abbey.",
    progress: { currentPage: 0, totalPages: 536 }, state: "not_started",
  });
});

test("the reading lifecycle: start, progress, comment, finish, rate, review, edit and delete", async ({ page }) => {
  const reader = await signIn(page);
  await page.getByRole("link", { name: "My Library" }).click();
  await page.getByRole("link", { name: /View details for Fermat's Last Theorem/ }).click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Fermat's Last Theorem");

  await page.getByRole("button", { name: "Start reading" }).click();
  await expect(page.getByText("Happy reading!")).toBeVisible();
  await expect(page.getByText("Started reading")).toBeVisible();
  await expect(page.getByLabel("Current page")).toHaveValue("1");

  await page.getByLabel("Current page").fill("198");
  await page.getByRole("button", { name: "Update" }).click();
  await expect(page.getByText("50% complete")).toBeVisible();

  await page.getByRole("button", { name: "Add first comment" }).click();
  await page.getByLabel("Comment text").fill("Wiles's proof is breathtaking.");
  await page.getByRole("button", { name: "Add comment" }).click();
  await expect(page.getByRole("listitem").getByText("Wiles's proof is breathtaking.")).toBeVisible();
  await expect(page.getByText(/Page 198/).first()).toBeVisible();

  await page.getByRole("button", { name: "Mark as finished" }).click();
  await expect(page.getByText("Finished reading")).toBeVisible();
  await page.getByRole("radio", { name: "4 stars" }).click();
  await expect(page.getByText("Rated 4 stars")).toBeVisible();

  await page.getByRole("button", { name: "Add review" }).click();
  await page.getByLabel("Your review").fill("A detective story about numbers, told with real warmth.");
  await page.getByRole("button", { name: "Save review" }).click();
  await expect(page.getByText("A detective story about numbers, told with real warmth.")).toBeVisible();
  await page.getByRole("button", { name: "Edit", exact: true }).click();
  await page.getByLabel("Your review").fill("A detective story about numbers. Even better on a second read.");
  await page.getByRole("button", { name: "Update review" }).click();
  await expect(page.getByText("Even better on a second read.")).toBeVisible();

  await page.getByRole("button", { name: "Edit book" }).click();
  const edit = page.getByRole("dialog", { name: "Edit book" });
  await edit.getByLabel("Genre").fill("Number Theory");
  await edit.getByRole("tab", { name: "Owned" }).click();
  await edit.getByRole("button", { name: "Save changes" }).click();
  await expect(page.getByText("Changes saved")).toBeVisible();
  await expect(page.getByText("Number Theory")).toBeVisible();
  await expect(page.getByText("Owned", { exact: true })).toBeVisible();

  const [book] = await read(reader.uid, "books");
  expect(book).toMatchObject({ state: "finished", rating: 4, genre: "Number Theory", isOwned: true, progress: { currentPage: 198, totalPages: 396 } });
  expect(book.startedAt).toBeDefined();
  expect(book.finishedAt).toBeDefined();
  const events = (await read(reader.uid, "events")).sort((a, b) => String(a.timestamp).localeCompare(String(b.timestamp)));
  expect(events.map((e) => e.type)).toEqual(["state_change", "progress_update", "progress_update", "comment", "state_change", "rating_added", "review", "review", "manual_update"]);
  expect(events[3].data).toEqual({ comment: "Wiles's proof is breathtaking.", commentState: "in_progress", commentPage: 198 });
  expect((events[7].data as { reviewCreatedAt: string }).reviewCreatedAt).toBe((events[6].data as { reviewCreatedAt: string }).reviewCreatedAt);
  expect((events[8].data as { comment: string }).comment).toBe("Manual update: title, author, description, state, progress, rating, isbn, genre, publishedDate, coverImage, isOwned");

  await page.getByRole("button", { name: "Edit book" }).click();
  await page.getByRole("button", { name: "Delete book" }).click();
  await page.getByRole("dialog", { name: "Delete this book?" }).getByRole("button", { name: "Delete book" }).click();
  await expect(page).toHaveURL(/\/library$/);
  await expect(page.getByText("Your library is empty")).toBeVisible();
  expect(await read(reader.uid, "books")).toEqual([]);
  expect((await read(reader.uid, "events")).find((e) => e.type === "delete_book")?.data).toEqual({ deletedBookTitle: "Fermat's Last Theorem", deletedBookAuthor: "Simon Singh" });
});

test("guards surface the reason instead of a generic error", async ({ page }) => {
  await signIn(page);
  await page.getByRole("link", { name: "My Library" }).click();
  await page.getByRole("link", { name: /Fermat's Last Theorem/ }).click();
  await page.getByRole("button", { name: "Start reading" }).click();
  await expect(page.getByLabel("Current page")).toHaveValue("1");
  await page.getByLabel("Current page").fill("500");
  await page.getByRole("button", { name: "Update" }).click();
  expect(await page.getByLabel("Current page").evaluate((el: HTMLInputElement) => el.validity.rangeOverflow)).toBe(true);
  await expect(page.getByText("1 / 396 pages")).toBeVisible();
  await page.getByRole("button", { name: "Edit book" }).click();
  const edit = page.getByRole("dialog", { name: "Edit book" });
  await edit.getByLabel("ISBN").fill("12345");
  await edit.getByLabel("Published").fill("1997-13");
  await edit.getByRole("button", { name: "Save changes" }).click();
  await expect(edit.getByRole("alert")).toContainText("ISBN must be 10 or 13 digits long");
  await expect(edit.getByRole("alert")).toContainText("Date must be in format YYYY, YYYY-MM, or YYYY-MM-DD");
});

const ts = (daysAgo: number) => new Date(Date.now() - daysAgo * 86_400_000);
const book = (title: string, over: Record<string, unknown> = {}) => ({
  title, author: "Test Author", state: "not_started", progress: { currentPage: 0, totalPages: 200 }, isOwned: true, genre: "Fiction", addedAt: ts(30), updatedAt: ts(30), ...over,
});

test("the library filters, sorts, searches and switches views through the URL", async ({ page }) => {
  const reader = await signIn(page);
  await seed(reader.uid, "books/b1", book("Anna Karenina", { author: "Leo Tolstoy", progress: { currentPage: 0, totalPages: 864 }, addedAt: ts(5) }));
  await seed(reader.uid, "books/b2", book("Beloved", { author: "Toni Morrison", state: "in_progress", progress: { currentPage: 81, totalPages: 324 }, isOwned: false, addedAt: ts(4) }));
  await seed(reader.uid, "books/b3", book("Candide", { author: "Voltaire", state: "finished", rating: 5, genre: "Satire", progress: { currentPage: 129, totalPages: 129 }, finishedAt: ts(1), addedAt: ts(3) }));
  await page.getByRole("link", { name: "My Library" }).click();
  const titles = () => page.getByRole("main").getByRole("heading", { level: 3 }).allInnerTexts();
  await expect(page.getByText("Showing 4 of 4 books")).toBeVisible();
  expect(await titles()).toEqual(["Anna Karenina", "Beloved", "Candide", "Fermat's Last Theorem"]);

  await page.getByRole("button", { name: "Pages" }).click();
  await expect(page).toHaveURL(/sort=pages/);
  expect(await titles()).toEqual(["Candide", "Beloved", "Fermat's Last Theorem", "Anna Karenina"]);
  await page.getByRole("button", { name: "Pages" }).click();
  await expect(page).toHaveURL(/direction=desc/);
  expect((await titles())[0]).toBe("Anna Karenina");

  await page.getByLabel("Filter by reading status").selectOption("in_progress");
  await expect(page.getByText("Showing 1 of 4 books")).toBeVisible();
  await expect(page.getByText("81 / 324 pages")).toBeVisible();
  await page.getByLabel("Filter by reading status").selectOption("all");
  await page.getByLabel("Filter by ownership status").selectOption("wishlist");
  expect(await titles()).toEqual(["Fermat's Last Theorem", "Beloved"]);
  await page.getByLabel("Filter by genre").selectOption("Satire");
  await expect(page.getByText("No books found")).toBeVisible();
  await page.getByRole("button", { name: "Clear all filters" }).click();
  await page.getByLabel("Filter books").fill("tolstoy");
  expect(await titles()).toEqual(["Anna Karenina"]);
  await page.getByLabel("Filter books").fill("");

  await page.getByRole("tab", { name: "List" }).click();
  await expect(page).toHaveURL(/view=list/);
  await expect(page.getByText("864 pages")).toBeVisible();
  await page.reload();
  await expect(page.getByRole("tab", { name: "List" })).toHaveAttribute("aria-selected", "true");
});

test("quick search jumps to a book or hands the query to Add Books", async ({ page }) => {
  await signIn(page);
  await page.keyboard.press("Control+k");
  await page.keyboard.type("ferm");
  await expect(page.getByRole("option", { name: /Fermat's Last Theorem/ })).toBeVisible();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Fermat's Last Theorem");
  const search = page.getByRole("combobox", { name: "Search your library" });
  await search.fill("dune");
  await expect(page.getByText("No books found in your library.")).toBeVisible();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/add-books\?q=dune/);
  await expect(page.getByLabel("Search Google Books")).toHaveValue("dune");
  await expect(page.getByRole("heading", { name: "Dune" })).toBeVisible();
});
