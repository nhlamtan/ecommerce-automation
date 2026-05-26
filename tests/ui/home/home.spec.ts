import { test, expect } from "../../../fixtures/ui.fixture";
import { HomePage } from "../../../pom/page/home.page";

test.describe("Home Page UI Tests", () => {
  let homePage: HomePage;

  test.beforeEach("Navigate to Home Page", async ({ page }) => {
    homePage = new HomePage(page);
    await page.goto("/");
  });

  // Layout

  test("Should display hero slider", async () => {
    await expect(homePage.sliderCarousel).toBeVisible();
  });

  test("Should display featured products section", async () => {
    await expect(homePage.featuredProductsHeading).toBeVisible();
    const count = await homePage.getProductCount();
    expect(count).toBeGreaterThan(0);
  });

  test("Should display recommended items section", async () => {
    await homePage.scrollToRecommendedItems();
    await expect(homePage.recommendedItemsHeading).toBeVisible();
  });

  // Hero Slider

  test.describe("Hero slider", () => {
    test("Should navigate to next slide", async () => {
      await homePage.nextButton.click();
      await expect(homePage.sliderCarousel).toBeVisible();
    });

    test("Should navigate to previous slide", async () => {
      await homePage.prevButton.click();
      await expect(homePage.sliderCarousel).toBeVisible();
    });
  });

  //  Featured Products

  test.describe("Featured products", () => {
    test("Should show modal after adding product to cart", async () => {
      await homePage.addToCartByIndex(0);
      await expect(homePage.addedToCartModal).toBeVisible();
    });

    test("Should continue shopping after adding to cart", async () => {
      await homePage.addToCartByIndex(0);
      await homePage.continueShopping();
      await expect(homePage.addedToCartModal).not.toBeVisible();
    });

    test("Should navigate to cart after clicking View Cart", async ({
      page,
    }) => {
      await homePage.addToCartByIndex(0);
      await homePage.goToViewCart();
      await expect(page).toHaveURL(/view_cart/);
    });

    test("Should show modal after adding product via hover", async () => {
      await homePage.addToCartByHover(0);
      await expect(homePage.addedToCartModal).toBeVisible();
    });

    test("Should navigate to product detail page", async ({ page }) => {
      const productName = await homePage.getProductNameByIndex(0);
      await homePage.viewProductByIndex(0);

      await expect(page).toHaveURL(/product_details/);
      await expect(
        page.getByRole("heading", { name: productName }),
      ).toBeVisible();
    });
  });

  // Recommended Items

  test.describe("Recommended items", () => {
    test.beforeEach("Scroll to recommended items", async () => {
      await homePage.scrollToRecommendedItems();
    });

    test("Should show modal after adding recommended product to cart", async () => {
      await homePage.addRecommendedProductByIndex(0);
      await expect(homePage.addedToCartModal).toBeVisible();
    });

    test("Should navigate to cart after adding recommended product", async ({
      page,
    }) => {
      await homePage.addRecommendedProductByIndex(0);
      await homePage.goToViewCart();
      await expect(page).toHaveURL(/view_cart/);
    });
  });

  // Footer subscription
  test.describe("Footer subscription", () => {
    test("Should subscribe successfully from home page", async () => {
      await homePage.footer.subscribeFromPage("test@example.com");

      await expect(homePage.footer.subscribeSuccessMessage).toBeVisible();
      await expect(homePage.footer.subscribeSuccessMessage).toContainText(
        "You have been successfully subscribed!",
      );
    });
  });

  // Scroll Functionality
  test.describe("Scroll functionality", () => {
    test("Should scroll up via arrow button", async () => {
      await homePage.scrollToBottom();
      await expect(homePage.footer.subscribeHeading).toBeVisible();

      await homePage.clickScrollUpButton();
      await expect(homePage.heroText).toBeVisible();
    });

    test("Should scroll up without arrow button", async () => {
      await homePage.scrollToBottom();
      await expect(homePage.footer.subscribeHeading).toBeVisible();

      await homePage.scrollToTop();
      await expect(homePage.heroText).toBeVisible();
    });
  });
});
