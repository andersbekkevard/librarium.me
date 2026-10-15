import { defineConfig, devices } from "@playwright/test";

const PORT = 3100;
export const firebaseEnv = {
  NEXT_PUBLIC_FIREBASE_API_KEY: "demo-key",
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: "demo-librarium.firebaseapp.com",
  NEXT_PUBLIC_FIREBASE_PROJECT_ID: "demo-librarium",
  NEXT_PUBLIC_FIREBASE_APP_ID: "1:000000000000:web:demo",
  NEXT_PUBLIC_FIREBASE_EMULATORS: "true",
  NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY: "demo-books-key",
  NEXT_TELEMETRY_DISABLED: "1",
};

/** End-to-end: a production build of the app against the Firebase emulators; Google APIs are stubbed per test. */
export default defineConfig({
  testDir: "tests/e2e",
  timeout: 60_000,
  expect: { timeout: 10_000 },
  fullyParallel: true,
  workers: process.env.CI ? 2 : 3,
  retries: process.env.CI ? 1 : 0,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: `http://127.0.0.1:${PORT}`,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    launchOptions: process.env.PLAYWRIGHT_CHROMIUM ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM } : {},
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 960 } }, grepInvert: /@mobile/ },
    { name: "mobile", use: { ...devices["Pixel 7"] }, grep: /@mobile/ },
  ],
  webServer: [
    {
      command: "npx firebase emulators:start --only auth,firestore --project demo-librarium",
      url: "http://127.0.0.1:8080",
      reuseExistingServer: !process.env.CI,
      timeout: 120_000,
    },
    {
      command: `npx next build && npx next start -p ${PORT}`,
      url: `http://127.0.0.1:${PORT}`,
      env: firebaseEnv,
      reuseExistingServer: !process.env.CI,
      timeout: 300_000,
    },
  ],
});
