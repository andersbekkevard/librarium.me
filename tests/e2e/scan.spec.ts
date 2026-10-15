import type { Page } from "@playwright/test";
import { expect, read, signIn, test } from "./fixtures";

/** Renders a real EAN-13 barcode to PNG in the browser, for the decoder to read back. */
async function ean13(page: Page, digits: string): Promise<Buffer> {
  const dataUrl = await page.evaluate((code) => {
    const L = ["0001101", "0011001", "0010011", "0111101", "0100011", "0110001", "0101111", "0111011", "0110111", "0001011"];
    const G = ["0100111", "0110011", "0011011", "0100001", "0011101", "0111001", "0000101", "0010001", "0001001", "0010111"];
    const R = L.map((p) => [...p].map((b) => (b === "0" ? "1" : "0")).join(""));
    const parity = ["LLLLLL", "LLGLGG", "LLGGLG", "LLGGGL", "LGLLGG", "LGGLLG", "LGGGLL", "LGLGLG", "LGLGGL", "LGGLGL"][+code[0]];
    const left = [...code.slice(1, 7)].map((d, i) => (parity[i] === "L" ? L : G)[+d]).join("");
    const right = [...code.slice(7)].map((d) => R[+d]).join("");
    const bits = `101${left}01010${right}101`;
    const unit = 4, quiet = 12 * unit;
    const canvas = document.createElement("canvas");
    canvas.width = bits.length * unit + 2 * quiet;
    canvas.height = 220;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#000";
    [...bits].forEach((b, i) => b === "1" && ctx.fillRect(quiet + i * unit, 20, unit, 180));
    return canvas.toDataURL("image/png");
  }, digits);
  return Buffer.from(dataUrl.split(",")[1], "base64");
}

test("a photographed ISBN barcode is decoded, looked up and added with a scan audit event", async ({ page }) => {
  const reader = await signIn(page);
  await page.goto("/add-books?tab=scan");
  await page.getByRole("tab", { name: "Photo" }).click();
  await page.locator('input[type="file"]').setInputFiles({ name: "dune-barcode.png", mimeType: "image/png", buffer: await ean13(page, "9780441013593") });
  await expect(page.getByRole("heading", { name: "Dune" })).toBeVisible({ timeout: 20_000 });
  await page.getByRole("button", { name: "Add to library" }).click();
  await expect(page.getByText("Added “Dune” to your library")).toBeVisible();

  const dune = (await read(reader.uid, "books")).find((b) => b.title === "Dune");
  expect(dune).toMatchObject({ isbn: "9780441013593", state: "not_started", isOwned: false });
  const [audit] = (await read(reader.uid, "events")).filter((e) => e.type === "manual_update");
  expect(audit).toMatchObject({ bookId: dune!.id, data: { commentState: "not_started", commentPage: 0 } });
  expect((audit.data as { comment: string }).comment).toMatch(/^Book added via barcode scanning \(image upload, ISBN: 9780441013593, scan duration: \d+s\)$/);
});

test("photos without a barcode, unknown ISBNs and denied cameras are explained", async ({ page }) => {
  await page.addInitScript(() => {
    navigator.mediaDevices.getUserMedia = () => Promise.reject(new DOMException("Permission denied", "NotAllowedError"));
  });
  await signIn(page);
  await page.goto("/add-books?tab=scan");
  await expect(page.getByText("Camera access denied. Please allow camera permissions to scan barcodes.")).toBeVisible();

  await page.getByRole("tab", { name: "Photo" }).click();
  const blank = Buffer.from(await page.evaluate(() => {
    const c = Object.assign(document.createElement("canvas"), { width: 300, height: 200 });
    c.getContext("2d")!.fillRect(0, 0, 10, 10);
    return c.toDataURL("image/png").split(",")[1];
  }), "base64");
  await page.locator('input[type="file"]').setInputFiles({ name: "blank.png", mimeType: "image/png", buffer: blank });
  await expect(page.getByText("No barcode detected in this image. Try cropping it to just the barcode.")).toBeVisible({ timeout: 20_000 });
  await expect(page.getByRole("button", { name: "Crop to barcode" })).toBeVisible();

  await page.getByRole("button", { name: "Choose another photo" }).click();
  await page.locator('input[type="file"]').setInputFiles({ name: "unknown.png", mimeType: "image/png", buffer: await ean13(page, "9781234567897") });
  await expect(page.getByRole("alert").filter({ hasText: "Book not found in Google Books. You can add it manually instead." })).toBeVisible({ timeout: 20_000 });
  await page.getByRole("link", { name: "Add manually" }).click();
  await expect(page.getByLabel("Title *")).toBeVisible();
});
