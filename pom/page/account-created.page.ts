import { Page, Locator, expect } from "@playwright/test";
import { AuthPage } from "./auth.page";

export class AccountCreatedPage extends AuthPage {
  readonly successHeading: Locator;
  readonly continueButton: Locator;

  constructor(page: Page) {
    super(page);

    this.successHeading = page.getByRole("heading", {
      name: "Account Created!",
    });
    this.continueButton = page.getByRole("link", { name: "Continue" });
  }

  async clickContinue() {
    await this.continueButton.click();
  }
}
