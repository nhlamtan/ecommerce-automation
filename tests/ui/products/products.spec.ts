import { test, expect } from "../../../fixtures/ui.fixture";

test.describe.configure({ mode: "serial" });
test.describe("Products Page UI Tests", () => {
  test.beforeEach("Navigate to Products Page", async ({ productsPage }) => {
    await productsPage.header.gotoProductsPage();
    await expect(productsPage.productsHeading).toBeVisible();
  });

  // Layout
  test("Should display products list", async ({ productsPage }) => {
    const count = await productsPage.getProductCount();
    expect(count).toBeGreaterThan(0);
  });

  // Search
  test.describe("Search product", () => {
    test("Should show no products when searching invalid keyword", async ({
      productsPage,
    }) => {
      await productsPage.searchProduct("notfound");
      const count = await productsPage.getProductCount();
      expect(count).toBe(0);
    });

    test("Should show matched products when searching valid keyword", async ({
      productsPage,
    }) => {
      await productsPage.searchProduct("Top");
      const count = await productsPage.getProductCount();
      expect(count).toBeGreaterThan(0);
    });
  });

  // Category
  test.describe("Filter by category", () => {
    test("Should filter by Women > Dress", async ({ page, productsPage }) => {
      await productsPage.scrollToElement(productsPage.womenCategoryLink);
      await productsPage.filterByWomenCategory("Dress");
      await expect(page).toHaveURL(/category_products/);
      const count = await productsPage.getProductCount();
      expect(count).toBeGreaterThan(0);
    });

    test("Should filter by Men > Jeans", async ({ page, productsPage }) => {
      await productsPage.scrollToElement(productsPage.menCategoryLink);
      await productsPage.filterByMenCategory("Jeans");
      await expect(page).toHaveURL(/category_products/);
      const count = await productsPage.getProductCount();
      expect(count).toBeGreaterThan(0);
    });

    test("Should filter by Kids > Dress", async ({ page, productsPage }) => {
      await productsPage.scrollToElement(productsPage.kidsCategoryLink);
      await productsPage.filterByKidsCategory("Dress");
      await expect(page).toHaveURL(/category_products/);
      const count = await productsPage.getProductCount();
      expect(count).toBeGreaterThan(0);
    });
  });

  // Brand
  test.describe("Filter by brand", () => {
    test("Should filter products by Polo brand", async ({
      page,
      productsPage,
    }) => {
      await productsPage.filterByBrand("Polo");
      await expect(page.getByText("Polo Products")).toBeVisible();
      const count = await productsPage.getProductCount();
      expect(count).toBeGreaterThan(0);
    });

    test("Should filter products by Biba brand", async ({
      page,
      productsPage,
    }) => {
      await productsPage.filterByBrand("Biba");
      await expect(page.getByText("Biba Products")).toBeVisible();
      const count = await productsPage.getProductCount();
      expect(count).toBeGreaterThan(0);
    });
  });

  // Add to Cart
  test.describe("Add to cart", () => {
    test("Should show modal after adding product to cart", async ({
      productsPage,
    }) => {
      await productsPage.scrollToElement(productsPage.productCards.first());
      await productsPage.addToCartByIndex(0);
      await expect(productsPage.addedToCartModal).toBeVisible();
    });

    test("Should continue shopping after adding product to cart", async ({
      productsPage,
    }) => {
      await productsPage.scrollToElement(productsPage.productCards.nth(5));
      await productsPage.addToCartByIndex(0);
      await productsPage.continueShopping();
      await expect(productsPage.addedToCartModal).not.toBeVisible();
    });

    test("Should navigate to cart page after clicking View Cart", async ({
      page,
      productsPage,
    }) => {
      await productsPage.scrollToElement(productsPage.productCards.first());
      await productsPage.addToCartByIndex(0);
      await productsPage.goToViewCart();
      await expect(page).toHaveURL(/view_cart/);
    });

    test("Should show modal after adding product to cart via hover", async ({
      productsPage,
    }) => {
      await productsPage.scrollToElement(productsPage.productCards.first());
      await productsPage.addToCartByHover(0);
      await expect(productsPage.addedToCartModal).toBeVisible();
    });
  });

  // View Product Detail
  test("Should navigate to product detail page", async ({
    page,
    productsPage,
  }) => {
    await productsPage.viewProductByIndex(0);
    await expect(page).toHaveURL(/product_details/);
  });
});
