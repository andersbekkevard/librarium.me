import { AI_REPLY, expect, read, signIn, test } from "./fixtures";

test("the landing page presents every section and answers FAQs", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(/Track your\s*reading\s*journey/);
  for (const heading of ["Essential Reading Tools", "Start Your Reading Journey", "Current & Planned Integrations", "Early Access Preview", "Frequently Asked Questions"])
    await expect(page.getByRole("heading", { name: heading })).toBeAttached();
  await page.getByText("Is Librarium free to use?").click();
  await expect(page.getByText(/completely free to use/)).toBeVisible();
  await page.getByRole("link", { name: "Explore features" }).click();
  await expect(page).toHaveURL(/#features$/);
});

test("first sign-in creates the profile, the welcome book and today's companion message", async ({ page, stubs }) => {
  const reader = await signIn(page);
  await expect(page.getByText(AI_REPLY)).toBeVisible();
  await expect(page.getByRole("group", { name: "Reading stats" }).getByText("In library").locator("..")).toContainText("1");

  const [profile] = await read(reader.uid, "profile");
  expect(profile).toMatchObject({
    id: reader.uid, displayName: "Ada Lovelace", email: reader.email, photoURL: "https://lh3.googleusercontent.com/a/reader",
    emailVerified: true, totalBooksRead: 0, currentlyReading: 0, booksInLibrary: 0,
  });
  const books = await read(reader.uid, "books");
  expect(books).toEqual([
    expect.objectContaining({
      title: "Fermat's Last Theorem", author: "Simon Singh", genre: "Mathematics", state: "not_started", isOwned: false,
      progress: { currentPage: 0, totalPages: 396 }, publishedDate: "1997", notes: expect.stringContaining("Welcome to your personal library"),
    }),
  ]);
  expect(await read(reader.uid, "messages")).toEqual([expect.objectContaining({ userId: reader.uid, content: AI_REPLY })]);

  // The message is generated once per day: a reload reuses it.
  await page.reload();
  await expect(page.getByText(AI_REPLY)).toBeVisible();
  expect(stubs.aiCalls).toBe(1);
  expect(await read(reader.uid, "messages")).toHaveLength(1);
});

test("signed-out visitors are sent to the landing page from any app route", async ({ page }) => {
  for (const route of ["/dashboard", "/library", "/statistics", "/books/anything"]) {
    await page.goto(route);
    await expect(page).toHaveURL(/\/$/);
  }
});

test("signing out returns to the landing page and re-locks the app", async ({ page }) => {
  await signIn(page);
  await page.getByRole("button", { name: /account menu/i }).click();
  await expect(page.getByRole("menu")).toContainText("0 read · 0 reading · 1 total");
  await page.getByRole("menuitem", { name: "Sign out" }).click();
  await expect(page).toHaveURL(/\/$/);
  await page.goto("/dashboard");
  await expect(page).toHaveURL(/\/$/);
});

test("the theme toggle switches between light and dark", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/");
  const html = page.locator("html");
  await expect(html).not.toHaveClass(/dark/);
  await page.getByRole("button", { name: "Toggle theme" }).click();
  await expect(html).toHaveClass(/dark/);
});

test("mobile: the navigation drawer and collapsible companion work @mobile", async ({ page }) => {
  await signIn(page);
  await page.getByRole("button", { name: /Tap to read/ }).click();
  await expect(page.getByText(AI_REPLY)).toBeVisible();
  await page.getByRole("button", { name: "Open menu" }).click();
  await page.getByRole("dialog", { name: "Navigation" }).getByRole("link", { name: "Statistics" }).click();
  await expect(page.getByRole("heading", { name: "Reading Analytics" })).toBeVisible();
});
