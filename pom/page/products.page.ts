import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./base.page";

export class ProductsPage extends BasePage {
  readonly saleImage: Locator;
  readonly productsHeading: Locator;

  // Search Product
  readonly searchInput: Locator;
  readonly searchButton: Locator;

  // Sidebar - Category
  readonly womenCategoryLink: Locator;
  readonly womenDressLink: Locator;
  readonly womenTopsLink: Locator;
  readonly womenSareeLink: Locator;

  readonly menCategoryLink: Locator;
  readonly menTShirtsLink: Locator;
  readonly menJeansLink: Locator;

  readonly kidsCategoryLink: Locator;
  readonly kidsDressLink: Locator;
  readonly kidsTopsAndShirtsLink: Locator;

  // Brand
  readonly brandLinks: Locator;

  // Product list
  readonly productCards: Locator;
  readonly addToCartDefaultButtons: Locator;
  readonly addToCartOverlayButtons: Locator;
  readonly viewProductLinks: Locator;

  // Modal after add to cart
  readonly addedToCartModal: Locator;
  readonly continueShoppingButton: Locator;
  readonly viewCartLink: Locator;

  constructor(page: Page) {
    super(page);
    this.productsHeading = page.getByRole("heading", { name: "All Products" });
    this.saleImage = page.locator("#sale_image").first();

    this.searchInput = page.getByRole("textbox", { name: "Search Product" });
    this.searchButton = page.locator("#submit_search");

    this.womenCategoryLink = page.locator('a[href="#Women"]');
    this.womenDressLink = page
      .locator("#Women")
      .getByRole("link", { name: "Dress" });
    this.womenTopsLink = page
      .locator("#Women")
      .getByRole("link", { name: "Tops" });
    this.womenSareeLink = page
      .locator("#Women")
      .getByRole("link", { name: "Saree" });

    this.menCategoryLink = page.locator('a[href="#Men"]');
    this.menTShirtsLink = page
      .locator("#Men")
      .getByRole("link", { name: "Tshirts" });
    this.menJeansLink = page
      .locator("#Men")
      .getByRole("link", { name: "Jeans" });

    this.kidsCategoryLink = page.locator('a[href="#Kids"]');
    this.kidsDressLink = page
      .locator("#Kids")
      .getByRole("link", { name: "Dress" });
    this.kidsTopsAndShirtsLink = page
      .locator("#Kids")
      .getByRole("link", { name: "Tops & Shirts" });

    this.brandLinks = page.locator(".brands-name a");

    this.productCards = page.locator(".product-image-wrapper");
    this.addToCartDefaultButtons = page.locator(".productinfo .add-to-cart");
    this.addToCartOverlayButtons = page.locator(
      ".product-overlay .add-to-cart",
    );
    this.viewProductLinks = page.locator(".choose a");

    this.addedToCartModal = page.locator("#cartModal");
    this.continueShoppingButton = page.getByRole("button", {
      name: "Continue Shopping",
    });
    this.viewCartLink = this.addedToCartModal.getByRole("link", {
      name: "View Cart",
    });
  }

  //  Search

  async searchProduct(keyword: string) {
    await this.searchInput.fill(keyword);
    await this.page.waitForLoadState("domcontentloaded");
    await this.searchButton.dblclick();
    await this.page.waitForSelector("text=Searched Products", {
      state: "visible",
    });
  }

  // Category

  async filterByWomenCategory(subCategory: "Dress" | "Tops" | "Saree") {
    await this.womenCategoryLink.click();
    await this.page
      .locator("#Women")
      .waitFor({ state: "visible", timeout: 10000 });

    const subCategoryMap = {
      Dress: this.womenDressLink,
      Tops: this.womenTopsLink,
      Saree: this.womenSareeLink,
    };
    await subCategoryMap[subCategory].click();
    await this.page.waitForLoadState("domcontentloaded");
    await this.productCards
      .first()
      .waitFor({ state: "visible", timeout: 15000 });
  }

  async filterByMenCategory(subCategory: "Tshirts" | "Jeans") {
    await this.menCategoryLink.click();
    await this.page
      .locator("#Men")
      .waitFor({ state: "visible", timeout: 10000 });

    const subCategoryMap = {
      Tshirts: this.menTShirtsLink,
      Jeans: this.menJeansLink,
    };
    await subCategoryMap[subCategory].waitFor({
      state: "visible",
      timeout: 10000,
    });
    await subCategoryMap[subCategory].click();
    await this.page.waitForLoadState("domcontentloaded");
    await this.productCards
      .first()
      .waitFor({ state: "visible", timeout: 15000 });
  }

  async filterByKidsCategory(subCategory: "Dress" | "Tops & Shirts") {
    await this.kidsCategoryLink.click();
    await this.page
      .locator("#Kids")
      .waitFor({ state: "visible", timeout: 10000 });

    const subCategoryMap = {
      Dress: this.kidsDressLink,
      "Tops & Shirts": this.kidsTopsAndShirtsLink,
    };
    await subCategoryMap[subCategory].click();
    await this.page.waitForLoadState("domcontentloaded");
    await this.productCards
      .first()
      .waitFor({ state: "visible", timeout: 15000 });
  }

  // Brand

  async filterByBrand(brandName: string) {
    await this.brandLinks.filter({ hasText: brandName }).click();
  }

  // Product

  async addToCartByIndex(index: number) {
    await this.addToCartDefaultButtons.nth(index).click();
  }

  async addToCartByHover(index: number) {
    await this.productCards.nth(index).hover();
    await this.addToCartOverlayButtons.nth(index).waitFor({ state: "visible" });
    await this.addToCartOverlayButtons.nth(index).click();
  }

  async viewProductByIndex(index: number) {
    await this.viewProductLinks.nth(index).click();
  }

  async getProductCount(): Promise<number> {
    return this.productCards.count();
  }

  async getProductNameByIndex(index: number): Promise<string> {
    return (
      (await this.productCards
        .nth(index)
        .locator(".productinfo p")
        .textContent()) ?? ""
    );
  }

  // Modal

  async continueShopping() {
    await expect(this.continueShoppingButton).toBeVisible({ timeout: 15000 });
    await this.continueShoppingButton.click();
  }

  async goToViewCart() {
    await expect(this.viewCartLink).toBeVisible({ timeout: 15000 });
    await this.viewCartLink.click();
  }
}
