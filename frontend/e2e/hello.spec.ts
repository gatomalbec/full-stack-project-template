import { expect, test } from "@playwright/test";

test("shows hello message from backend", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "Fullstack Template" }),
  ).toBeVisible();
  await expect(page.getByText("Hello from FastAPI")).toBeVisible();
});
