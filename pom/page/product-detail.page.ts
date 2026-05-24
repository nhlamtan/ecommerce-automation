import { Page, Locator } from "@playwright/test";
import { BasePage } from "./base.page";

export class ProductDetailPage extends BasePage {
  // Product info
  readonly productName: Locator;
  readonly productCategory: Locator;
  readonly productPrice: Locator;
  readonly productAvailability: Locator;
  readonly productCondition: Locator;
  readonly productBrand: Locator;
  readonly productImage: Locator;

  // Add to cart
  readonly quantityInput: Locator;
  readonly addToCartButton: Locator;

  // Modal after add to cart
  readonly addedToCartModal: Locator;
  readonly continueShoppingButton: Locator;
  readonly viewCartLink: Locator;

  // Review
  readonly writeReviewLink: Locator;
  readonly reviewNameInput: Locator;
  readonly reviewEmailInput: Locator;
  readonly reviewTextarea: Locator;
  readonly reviewSubmitButton: Locator;
  readonly reviewSuccessMessage: Locator;

  constructor(page: Page) {
    super(page);

    // Product info
    this.productName = page.locator(".product-information h2");
    this.productCategory = page
      .locator(".product-information p")
      .filter({ hasText: "Category" });
    this.productPrice = page.locator(".product-information span span");
    this.productAvailability = page
      .locator(".product-information p")
      .filter({ hasText: "Availability" });
    this.productCondition = page
      .locator(".product-information p")
      .filter({ hasText: "Condition" });
    this.productBrand = page
      .locator(".product-information p")
      .filter({ hasText: "Brand" });
    this.productImage = page.locator(".view-product img");

    // Add to cart
    this.quantityInput = page.locator("input#quantity");
    this.addToCartButton = page.locator("button.cart");

    // Modal after add to cart
    this.addedToCartModal = page.locator("#cartModal");
    this.continueShoppingButton = page.getByRole("button", {
      name: "Continue Shopping",
    });
    this.viewCartLink = this.addedToCartModal.getByRole("link", {
      name: "View Cart",
    });

    // Review
    this.writeReviewLink = page.getByRole("link", {
      name: "Write Your Review",
    });
    this.reviewNameInput = page.locator("input#name");
    this.reviewEmailInput = page.locator("input#email");
    this.reviewTextarea = page.locator("textarea#review");
    this.reviewSubmitButton = page.locator("button#button-review");
    this.reviewSuccessMessage = page.locator("#review-section .alert-success");
  }

  // Add to Cart

  async setQuantity(quantity: number) {
    await this.quantityInput.clear();
    await this.quantityInput.fill(quantity.toString());
  }

  async addToCart() {
    await this.addToCartButton.click();
  }

  async addToCartWithQuantity(quantity: number) {
    await this.setQuantity(quantity);
    await this.addToCart();
  }

  async continueShopping() {
    await this.continueShoppingButton.click();
  }

  async goToViewCart() {
    await this.viewCartLink.click();
  }

  // Review

  async writeReview(name: string, email: string, review: string) {
    await this.reviewNameInput.fill(name);
    await this.reviewEmailInput.fill(email);
    await this.reviewTextarea.fill(review);
    await this.reviewSubmitButton.click();
  }

  // Getters

  async getProductName(): Promise<string> {
    return (await this.productName.textContent()) ?? "";
  }

  async getProductPrice(): Promise<string> {
    return (await this.productPrice.textContent()) ?? "";
  }

  async getQuantityValue(): Promise<string> {
    return (await this.quantityInput.inputValue()) ?? "";
  }
}
