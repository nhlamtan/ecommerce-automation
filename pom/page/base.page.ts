import { Page, Locator } from "@playwright/test";
import { HeaderComponent } from "../components/header.component";
import { FooterComponent } from "../components/footer.component";

export class BasePage {
  readonly page: Page;
  readonly header: HeaderComponent;
  readonly footer: FooterComponent;

  constructor(page: Page) {
    this.page = page;
    this.header = new HeaderComponent(page);
    this.footer = new FooterComponent(page);
  }
  
  async scrollToElement(locator: Locator) {
    await locator.scrollIntoViewIfNeeded();
  }
}
