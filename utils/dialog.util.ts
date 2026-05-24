import { Page } from "@playwright/test";

export async function acceptDialog(page: Page) {
  page.on("dialog", async (dialog) => {
    await dialog.accept();
  });
}

export async function dismissDialog(page: Page) {
  page.on("dialog", async (dialog) => {
    await dialog.dismiss();
  });
}
