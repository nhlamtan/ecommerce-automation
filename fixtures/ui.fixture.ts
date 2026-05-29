import { test as base } from "@playwright/test";

export const test = base.extend({
  page: async ({ page }, use) => {
    // Block tất cả google ads
    await page.route("**/*", (route) => {
      route.request().url().startsWith("https://googleads.")
        ? route.abort()
        : route.continue();
      return;
    });

    await page.goto("/");
    await use(page);
  },
});

export { expect } from "@playwright/test";
