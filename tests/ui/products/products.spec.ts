import { test, expect } from "../../../fixtures/ui.fixture";
import { ProductsPage } from "../../../pom/page/products.page";

test.describe("Products Page UI Tests", () => {
  let productsPage: ProductsPage;

  test.beforeEach("Navigate to Products Page", async ({ page }) => {
    productsPage = new ProductsPage(page);
    await productsPage.header.gotoProductsPage();
    await expect(productsPage.productsHeading).toBeVisible();
  });

  //  Layout

  test("Should display products list", async () => {
    const count = await productsPage.getProductCount();
    expect(count).toBeGreaterThan(0);
  });

  //  Search 

  test.describe("Search product", () => {
    test("Should show matched products when searching valid keyword", async () => {
      await productsPage.searchProduct("Top");

      const count = await productsPage.getProductCount();
      expect(count).toBeGreaterThan(0);
    });

    test("Should show no products when searching invalid keyword", async () => {
      await productsPage.searchProduct("xyznotfound");

      const count = await productsPage.getProductCount();
      expect(count).toBe(0);
    });
  });

  //  Category 

  test.describe("Filter by category", () => {
    test("Should filter by Women > Dress", async ({ page }) => {
      await productsPage.filterByWomenCategory("Dress");

      await expect(page).toHaveURL(/category_products/);
      const count = await productsPage.getProductCount();
      expect(count).toBeGreaterThan(0);
    });

    test("Should filter by Men > Tshirts", async ({ page }) => {
      await productsPage.filterByMenCategory("Tshirts");

      await expect(page).toHaveURL(/category_products/);
      const count = await productsPage.getProductCount();
      expect(count).toBeGreaterThan(0);
    });

    test("Should filter by Kids > Dress", async ({ page }) => {
      await productsPage.filterByKidsCategory("Dress");

      await expect(page).toHaveURL(/category_products/);
      const count = await productsPage.getProductCount();
      expect(count).toBeGreaterThan(0);
    });
  });

  //  Brand 

  test.describe("Filter by brand", () => {
    test("Should filter products by Polo brand", async ({ page }) => {
      await productsPage.filterByBrand("Polo");

      await expect(page).toHaveURL(/brand_products\/Polo/);
      const count = await productsPage.getProductCount();
      expect(count).toBeGreaterThan(0);
    });

    test("Should filter products by H&M brand", async ({ page }) => {
      await productsPage.filterByBrand("H&M");

      await expect(page).toHaveURL(/brand_products/);
      const count = await productsPage.getProductCount();
      expect(count).toBeGreaterThan(0);
    });
  });

  //  Add to Cart 

  test.describe("Add to cart", () => {
    test("Should show modal after adding product to cart", async () => {
      await productsPage.addToCartByIndex(0);

      await expect(productsPage.addedToCartModal).toBeVisible();
    });

    test("Should continue shopping after adding product to cart", async () => {
      await productsPage.addToCartByIndex(0);
      await productsPage.continueShopping();

      await expect(productsPage.addedToCartModal).not.toBeVisible();
    });

    test("Should navigate to cart page after clicking View Cart", async ({
      page,
    }) => {
      await productsPage.addToCartByIndex(0);
      await productsPage.goToViewCart();

      await expect(page).toHaveURL(/view_cart/);
    });

    test("Should show modal after adding product to cart via hover", async () => {
      await productsPage.addToCartByHover(0);

      await expect(productsPage.addedToCartModal).toBeVisible();
    });
  });

  // View Product Detail 

  test("Should navigate to product detail page", async ({ page }) => {
    const productName = await productsPage.getProductNameByIndex(0);
    await productsPage.viewProductByIndex(0);

    await expect(page).toHaveURL(/product_details/);
    await expect(
      page.getByRole("heading", { name: productName })
    ).toBeVisible();
  });
});