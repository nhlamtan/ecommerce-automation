import { test, expect } from "../../../fixtures/ui.fixture";

test.describe.configure({ mode: "serial" });
test.describe("Home Page UI Tests", () => {
  // Layout

  test("Should display hero slider", async ({ homePage }) => {
    await expect(homePage.sliderCarousel).toBeVisible();
  });

  test("Should display featured products section", async ({ homePage }) => {
    await expect(homePage.featuredProductsHeading).toBeVisible();
    const count = await homePage.getProductCount();
    expect(count).toBeGreaterThan(0);
  });

  test("Should display recommended items section", async ({ homePage }) => {
    await homePage.scrollToRecommendedItems();
    await expect(homePage.recommendedItemsHeading).toBeVisible();
  });

  // Hero Slider

  test.describe("Hero slider", () => {
    test("Should navigate to next slide", async ({homePage}) => {
      await homePage.nextButton.click();
      await expect(homePage.sliderCarousel).toBeVisible();
    });

    test("Should navigate to previous slide", async ({ homePage }) => {
      await homePage.prevButton.click();
      await expect(homePage.sliderCarousel).toBeVisible();
    });
  });

  //  Featured Products

  test.describe("Featured products", () => {
    test("Should show modal after adding product to cart", async ({
      homePage,
    }) => {
      await homePage.addToCartByIndex(0);
      await expect(homePage.addedToCartModal).toBeVisible();
    });

    test("Should continue shopping after adding to cart", async ({
      homePage,
    }) => {
      await homePage.addToCartByIndex(0);
      await homePage.continueShopping();
      await expect(homePage.addedToCartModal).not.toBeVisible();
    });

    test("Should navigate to cart after clicking View Cart", async ({
      page,
      homePage,
    }) => {
      await homePage.addToCartByIndex(0);
      await homePage.goToViewCart();
      await expect(page).toHaveURL(/view_cart/);
    });

    test("Should show modal after adding product via hover", async ({
      homePage,
    }) => {
      await homePage.addToCartByHover(0);
      await expect(homePage.addedToCartModal).toBeVisible();
    });

    test("Should navigate to product detail page", async ({
      page,
      homePage,
    }) => {
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
    test.beforeEach("Scroll to recommended items", async ({homePage}) => {
      await homePage.scrollToRecommendedItems();
    });

    test("Should show modal after adding recommended product to cart", async ({homePage}) => {
      await homePage.addRecommendedProductByIndex(0);
      await expect(homePage.addedToCartModal).toBeVisible();
    });

    test("Should navigate to cart after adding recommended product", async ({
      page,
      homePage
    }) => {
      await homePage.addRecommendedProductByIndex(0);
      await homePage.goToViewCart();
      await expect(page).toHaveURL(/view_cart/);
    });
  });

  // Footer subscription
  test.describe("Footer subscription", () => {
    test("Should subscribe successfully from home page", async ({homePage}) => {
      await homePage.footer.subscribeFromPage("test@example.com");

      await expect(homePage.footer.subscribeSuccessMessage).toBeVisible();
      await expect(homePage.footer.subscribeSuccessMessage).toContainText(
        "You have been successfully subscribed!",
      );
    });
  });

  // Scroll Functionality
  test.describe("Scroll functionality", () => {
    test("Should scroll up via arrow button", async ({homePage}) => {
      await homePage.scrollToBottom();
      await expect(homePage.footer.subscribeHeading).toBeVisible();

      await homePage.clickScrollUpButton();
      await expect(homePage.heroText).toBeVisible();
    });

    test("Should scroll up without arrow button", async ({homePage}) => {
      await homePage.scrollToBottom();
      await expect(homePage.footer.subscribeHeading).toBeVisible();

      await homePage.scrollToTop();
      await expect(homePage.heroText).toBeVisible();
    });
  });
});
