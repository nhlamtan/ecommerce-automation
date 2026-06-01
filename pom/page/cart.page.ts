import { Page, Locator } from "@playwright/test";
import { BasePage } from "./base.page";

export class CartPage extends BasePage {
  // Empty cart
  readonly emptyCartMessage: Locator;
  readonly emptyCartLink: Locator;

  // Cart table
  readonly cartTable: Locator;
  readonly cartRows: Locator;

  // Cart item
  readonly cartItemNames: Locator;
  readonly cartItemPrices: Locator;
  readonly cartItemQuantities: Locator;
  readonly cartItemTotals: Locator;
  readonly cartItemDeleteButtons: Locator;

  readonly proceedToCheckoutButton: Locator;

  // Modal before Register/Login
  readonly checkoutModal: Locator;
  readonly registerLoginLink: Locator;
  readonly continueOnCartLink: Locator;

  constructor(page: Page) {
    super(page);

    this.emptyCartMessage = page.locator("#empty_cart");
    this.emptyCartLink = page.locator("#empty_cart a");

    this.cartTable = page.locator("#cart_info_table");
    this.cartRows = page.locator("#cart_info_table tbody tr");

    this.cartItemNames = page.locator(".cart_description h4 a");
    this.cartItemPrices = page.locator(".cart_price p");
    this.cartItemQuantities = page.locator(".cart_quantity button");
    this.cartItemTotals = page.locator(".cart_total_price");
    this.cartItemDeleteButtons = page.locator(".cart_quantity_delete");

    this.proceedToCheckoutButton = page.locator(".btn.btn-default.check_out");

    // Modal
    this.checkoutModal = page.locator("#checkoutModal");
    this.registerLoginLink = this.checkoutModal.getByRole("link", {
      name: "Register / Login",
    });
    this.continueOnCartLink = this.checkoutModal.getByRole("button", {
      name: "Continue On Cart",
    });
  }

  async getCartItemCount(): Promise<number> {
    return this.cartRows.count();
  }

  async getProductNameByIndex(index: number): Promise<string> {
    return (await this.cartItemNames.nth(index).textContent()) ?? "";
  }

  async getProductPriceByIndex(index: number): Promise<string> {
    return (await this.cartItemPrices.nth(index).textContent()) ?? "";
  }

  async getProductQuantityByIndex(index: number): Promise<string> {
    return (await this.cartItemQuantities.nth(index).textContent()) ?? "";
  }

  async getProductTotalByIndex(index: number): Promise<string> {
    return (await this.cartItemTotals.nth(index).textContent()) ?? "";
  }

  async deleteProductByIndex(index: number) {
    await this.cartItemDeleteButtons.nth(index).click();
    await this.page.waitForLoadState("domcontentloaded");
  }

  async deleteAllProducts() {
    const count = await this.cartItemDeleteButtons.count();
    for (let i = count - 1; i >= 0; i--) {
      await this.cartItemDeleteButtons.nth(i).click();
      await this.page.waitForLoadState("domcontentloaded");
    }
  }

  async proceedToCheckout() {
    await this.proceedToCheckoutButton.click();
    await this.page.waitForLoadState("domcontentloaded");
  }

  async proceedToCheckoutAsGuest() {
    await this.proceedToCheckout();
    await this.continueOnCartLink.click();
    await this.page.waitForLoadState("domcontentloaded");
  }

  async proceedToCheckoutWithLogin() {
    await this.proceedToCheckout();
    await this.registerLoginLink.click();
  }

  async clickHereLink() {
    await this.emptyCartLink.click();
    await this.page.waitForLoadState("domcontentloaded");
  }
}
