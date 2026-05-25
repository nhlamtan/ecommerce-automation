import { Page, Locator } from "@playwright/test";

export class FooterComponent {
  readonly page: Page;

  readonly subscribeHeading: Locator;
  readonly subscribeEmailInput: Locator;
  readonly subscribeEmailButton: Locator;
  readonly subscribeSuccessMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    this.subscribeHeading = page.getByRole("heading", { name: "Subscription" });
    this.subscribeEmailInput = page.locator("#susbscribe_email");
    this.subscribeEmailButton = page.locator("#subscribe");
    this.subscribeSuccessMessage = page.locator("#success-subscribe");
  }

  async subscribeForm(email: string) {
    await this.subscribeEmailInput.fill(email);
    await this.subscribeEmailButton.click();
  }

  async subscribeFromPage(email: string) {
    await this.subscribeHeading.scrollIntoViewIfNeeded();
    await this.subscribeForm(email);
  }
}
