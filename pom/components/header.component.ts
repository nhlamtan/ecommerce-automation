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
  readonly logoutLink: Locator;
  readonly deleteAccountLink: Locator;

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
    this.logoutLink = page.getByRole("link", { name: " Logout" });
    this.deleteAccountLink = page.getByRole("link", {
      name: " Delete Account",
    });
  }

  async gotoHomePage() {
    await this.homeLink.click();
  }

  async gotoProductsPage() {
    await this.productsLink.click();
  }

  async gotoCartPage() {
    await this.cartLink.click();
  }

  async gotoAuthPage() {
    await this.authLink.click();
  }

  async gotoTestCasesPage() {
    await this.testCasesLink.click();
  }

  async gotoApiTestingPage() {
    await this.apiTestingLink.click();
  }

  async gotoVideoPage() {
    await this.videoLink.click();
  }

  async gotoContactUsPage() {
    await this.contactLink.click();
  }

  async logout() {
    await this.logoutLink.waitFor({ state: "visible" });
    await this.logoutLink.click();
  }

  async deleteAccount() {
    await this.deleteAccountLink.waitFor({ state: "visible" });
    await this.deleteAccountLink.click();
  }
}
