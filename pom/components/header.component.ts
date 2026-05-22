import { Page, Locator } from "@playwright/test";

export class HeaderComponent {
  readonly page: Page;

  readonly headerImage: Locator;
  readonly homeLink: Locator;
  readonly productsLink: Locator;
  readonly cartLink: Locator;
  readonly authLink: Locator;
  readonly testCasesLink: Locator;
  readonly apiTestingLink: Locator;
  readonly videoLink: Locator;
  readonly contactLink: Locator;

  constructor(page: Page) {
    this.page = page;

    this.headerImage = page.locator(".logo");
    this.homeLink = page.getByRole("link", { name: "Home" });
    this.productsLink = page.getByRole("link", { name: "Products" });
    this.cartLink = page.getByRole("link", { name: "Cart" });
    this.authLink = page.getByRole("link", { name: " Signup / Login" });
    this.testCasesLink = page.getByRole("link", { name: "Test Cases" });
    this.apiTestingLink = page.getByRole("link", { name: "API Testing" });
    this.videoLink = page.getByRole("link", { name: "Video Tutorials" });
    this.contactLink = page.getByRole("link", { name: "Contact us" });
  }

  async openHomePage() {
    await this.homeLink.click();
  }

  async openProductsPage() {
    await this.productsLink.click();
  }

  async openCartPage() {
    await this.cartLink.click();
  }

  async openAuthPage() {
    await this.authLink.click();
  }

  async openTestCasesPage() {
    await this.testCasesLink.click();
  }

  async openApiTestingPage() {
    await this.apiTestingLink.click();
  }

  async openVideoPage() {
    await this.videoLink.click();
  }

  async openContactUsPage() {
    await this.contactLink.click();
  }
}
