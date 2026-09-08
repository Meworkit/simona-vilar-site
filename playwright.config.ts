import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 30_000,
  use: {
    baseURL: "http://localhost:3000",
    browserName: "chromium",
    channel: "chrome",
    headless: true,
  },
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000/uk",
    reuseExistingServer: true,
    timeout: 120_000,
  },
});
