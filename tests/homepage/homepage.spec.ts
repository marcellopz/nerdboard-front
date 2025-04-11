import { test, expect } from "@playwright/test";

test.describe("Homepage Test", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to homepage and clear storage/cookies
    await page.goto("/");
    await page.context().clearCookies();
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
  });

  test("should display the navbar", async ({ page }) => {
    const logo = page.locator("#nav-logo");
    await expect(logo).toContainText("NerdBoard");
  });

  test("should show the banner", async ({ page }) => {
    const banner = page.locator('[data-testid="banner"]');
    await expect(banner).toBeVisible();
  });

  test("should show chat, tic-tac-toe, and poker icons", async ({ page }) => {
    await expect(page.locator('[data-testid="chat-icon"]')).toBeVisible();
    await expect(
      page.locator('[data-testid="tic-tac-toe-icon"]')
    ).toBeVisible();
    await expect(page.locator('[data-testid="poker-icon"]')).toBeVisible();
  });

  test("should navigate to chat page when chat icon is clicked", async ({
    page,
  }) => {
    await page.locator('[data-testid="chat-icon"]').click();
    await expect(page).toHaveURL(/\/chat/);
  });
});
