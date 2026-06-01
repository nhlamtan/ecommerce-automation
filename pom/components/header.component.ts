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
    this.testCasesLink = page.getByRole("link", {
      name: " Test Cases",
    });
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
    await this.page.waitForLoadState("domcontentloaded");
  }

  async gotoProductsPage() {
    await this.productsLink.click();
    await this.page.waitForLoadState("domcontentloaded");
  }

  async gotoCartPage() {
    await this.cartLink.click();
    await this.page.waitForLoadState("domcontentloaded");
  }

  async gotoAuthPage() {
    await this.authLink.click();
    await this.page.waitForLoadState("domcontentloaded");
  }

  async gotoTestCasesPage() {
    await this.testCasesLink.click();
    await this.page.waitForLoadState("domcontentloaded");
  }

  async gotoApiTestingPage() {
    await this.apiTestingLink.click();
    await this.page.waitForLoadState("domcontentloaded");
  }

  async gotoVideoPage() {
    await this.videoLink.click();
    await this.page.waitForLoadState("domcontentloaded");
  }

  async gotoContactUsPage() {
    await this.contactLink.click();
    await this.page.waitForLoadState("domcontentloaded");
  }

  async logout() {
    await this.logoutLink.waitFor({ state: "visible" });
    await this.logoutLink.click();
    await this.page.waitForLoadState("domcontentloaded");
  }

  async deleteAccount() {
    await this.deleteAccountLink.waitFor({ state: "visible" });
    await this.deleteAccountLink.click();
    await this.page.waitForLoadState("domcontentloaded");
  }
}
