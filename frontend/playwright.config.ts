import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  timeout: 30_000,
  use: {
    baseURL: "http://127.0.0.1:5173",
    trace: "on-first-retry",
  },
  webServer: [
    {
      command:
        "cd ../backend && uv run uvicorn app.main:app --host 127.0.0.1 --port 8000",
      port: 8000,
      reuseExistingServer: true,
      timeout: 60_000,
    },
    {
      command: "pnpm dev --host 127.0.0.1 --port 5173",
      port: 5173,
      reuseExistingServer: true,
      timeout: 60_000,
    },
  ],
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
