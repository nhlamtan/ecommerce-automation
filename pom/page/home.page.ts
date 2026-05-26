import { Page, Locator } from "@playwright/test";
import { BasePage } from "./base.page";

export class HomePage extends BasePage {
  // Slider
  readonly sliderCarousel: Locator;
  readonly prevButton: Locator;
  readonly nextButton: Locator;
  readonly testCasesPageButton: Locator;
  readonly apiListPageButton: Locator;

  // Category
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

  // Brands
  readonly brandLinks: Locator;

  // Features products
  readonly featuredProductsHeading: Locator;
  readonly productCards: Locator;
  readonly addToCartDefaultButtons: Locator;
  readonly addToCartOverlayButtons: Locator;
  readonly viewProductLinks: Locator;

  // Recommended items
  readonly recommendedItemsHeading: Locator;
  readonly recommendedProductCards: Locator;
  readonly recommendedAddToCartButtons: Locator;
  readonly recommendedPrevButton: Locator;
  readonly recommendedNextButton: Locator;

  // Modal after add to cart
  readonly addedToCartModal: Locator;
  readonly continueShoppingButton: Locator;
  readonly viewCartLink: Locator;

  // Scroll
  readonly scrollUpButton: Locator;
  readonly heroText: Locator;

  constructor(page: Page) {
    super(page);

    this.sliderCarousel = page.locator("#slider-carousel.slide");
    this.prevButton = page.locator(".left.control-carousel");
    this.nextButton = page.locator(".right.control-carousel");
    this.testCasesPageButton = page.getByRole("button", { name: "Test Cases" });
    this.apiListPageButton = page.getByRole("button", {
      name: "APIs list for practice",
    });

    this.womenCategoryLink = page.getByRole("link", { name: "Women" });
    this.womenDressLink = page
      .locator("#Women")
      .getByRole("link", { name: "Dress" });
    this.womenTopsLink = page
      .locator("#Women")
      .getByRole("link", { name: "Tops" });
    this.womenSareeLink = page
      .locator("#Women")
      .getByRole("link", { name: "Saree" });

    this.menCategoryLink = page.getByRole("link", { name: "Men" });
    this.menTShirtsLink = page
      .locator("#Men")
      .getByRole("link", { name: "Tshirts" });
    this.menJeansLink = page
      .locator("#Men")
      .getByRole("link", { name: "Jeans" });

    this.kidsCategoryLink = page.getByRole("link", { name: "Kids" });
    this.kidsDressLink = page
      .locator("#Kids")
      .getByRole("link", { name: "Dress" });
    this.kidsTopsAndShirtsLink = page
      .locator("#Kids")
      .getByRole("link", { name: "Tops & Shirts" });

    this.brandLinks = page.locator(".brands-name a");

    this.featuredProductsHeading = page.getByRole("heading", {
      name: "Features Items",
    });
    this.productCards = page.locator(".product-image-wrapper");
    this.addToCartDefaultButtons = page.locator(".productinfo .add-to-cart");
    this.addToCartOverlayButtons = page.locator(
      ".product-overlay .add-to-cart",
    );
    this.viewProductLinks = page.locator(".choose a");

    // Recommended items
    this.recommendedItemsHeading = page.getByRole("heading", {
      name: "recommended items",
    });
    this.recommendedProductCards = page.locator(
      "#recommended-item-carousel .item",
    );
    this.recommendedAddToCartButtons = page.locator(
      "#recommended-item-carousel .add-to-cart",
    );
    this.recommendedPrevButton = page.locator(
      "a.left[href='#recommended-item-carousel']",
    );
    this.recommendedNextButton = page.locator(
      "a.right[href='#recommended-item-carousel']",
    );

    this.addedToCartModal = page.locator("#cartModal");
    this.continueShoppingButton = page.getByRole("button", {
      name: "Continue Shopping",
    });
    this.viewCartLink = this.addedToCartModal.getByRole("link", {
      name: "View Cart",
    });

    // constructor
    this.scrollUpButton = page.locator("#scrollUp");
    this.heroText = page.getByRole("heading", { name: "AutomationExercise" });
  }

  async clickPrevButton() {
    await this.prevButton.click();
  }

  async clickNextButton() {
    await this.nextButton.click();
  }

  async clickTestCases() {
    await this.testCasesPageButton.click();
  }

  async clickApisList() {
    await this.apiListPageButton.click();
  }

  async filterByWomenCategory(subCategory: "Dress" | "Tops" | "Saree") {
    await this.womenCategoryLink.click();
    const subCategoryMap = {
      Dress: this.womenDressLink,
      Tops: this.womenTopsLink,
      Saree: this.womenSareeLink,
    };
    await subCategoryMap[subCategory].click();
  }

  async filterByMenCategory(subCategory: "Tshirts" | "Jeans") {
    await this.menCategoryLink.click();
    const subCategoryMap = {
      Tshirts: this.menTShirtsLink,
      Jeans: this.menJeansLink,
    };
    await subCategoryMap[subCategory].click();
  }

  async filterByKidsCategory(subCategory: "Dress" | "Tops & Shirts") {
    await this.kidsCategoryLink.click();
    const subCategoryMap = {
      Dress: this.kidsDressLink,
      "Tops & Shirts": this.kidsTopsAndShirtsLink,
    };
    await subCategoryMap[subCategory].click();
  }

  // Brand

  async filterByBrand(brandName: string) {
    await this.page.getByRole("link", { name: brandName }).click();
  }

  // Product

  async addToCartByIndex(index: number) {
    await this.addToCartDefaultButtons.nth(index).click();
  }

  async addToCartByHover(index: number) {
    await this.productCards.nth(index).hover();
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

  async addRecommendedProductByIndex(index: number) {
    await this.recommendedAddToCartButtons.nth(index).click();
  }

  async scrollToRecommendedItems() {
    await this.recommendedItemsHeading.scrollIntoViewIfNeeded();
  }

  async continueShopping() {
    await this.continueShoppingButton.click();
  }

  async goToViewCart() {
    await this.viewCartLink.click();
  }

  async scrollToBottom() {
    await this.page.evaluate(() =>
      window.scrollTo(0, document.body.scrollHeight),
    );
  }

  async scrollToTop() {
    await this.page.evaluate(() => window.scrollTo(0, 0));
  }

  async clickScrollUpButton() {
    await this.scrollUpButton.click();
  }
}
