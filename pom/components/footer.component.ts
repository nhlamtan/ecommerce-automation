import { Page, Locator } from "@playwright/test";

export class FooterComponent {
  readonly page: Page;

  readonly subscribeHeading: Locator;
  readonly subscribeEmailInput: Locator;
  readonly subscribeEmailButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.subscribeHeading = page.getByRole("heading", { name: "Subscription" });
    this.subscribeEmailInput = page.locator("#susbscribe_email");
    this.subscribeEmailButton = page.locator("#subscribe");
  }

  async subscribeForm(email: string) {
    await this.subscribeEmailInput.fill(email);
    await this.subscribeEmailButton.click();
  }
}
