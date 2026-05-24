import { test, expect } from "../../../fixtures/ui.fixture";
import { ProductDetailPage } from "../../../pom/page/product-detail.page";
import { ProductsPage } from "../../../pom/page/products.page";
import { reviewData } from "../../../data/ui.data";

test.describe("Product Detail Page UI Tests", () => {
  let productDetailPage: ProductDetailPage;

  test.beforeEach("Navigate to Product Detail Page", async ({ page }) => {
    productDetailPage = new ProductDetailPage(page);
    await page.goto("/product_details/1");
  });

  // Layout

  test("Should display all product information", async () => {
    await expect(productDetailPage.productName).toBeVisible();
    await expect(productDetailPage.productCategory).toBeVisible();
    await expect(productDetailPage.productPrice).toBeVisible();
    await expect(productDetailPage.productAvailability).toBeVisible();
    await expect(productDetailPage.productCondition).toBeVisible();
    await expect(productDetailPage.productBrand).toBeVisible();
    await expect(productDetailPage.productImage).toBeVisible();
  });

  test("Should display correct product info for Blue Top", async () => {
    await expect(productDetailPage.productName).toHaveText("Blue Top");
    await expect(productDetailPage.productCategory).toContainText("Women > Tops");
    await expect(productDetailPage.productPrice).toContainText("500");
    await expect(productDetailPage.productAvailability).toContainText("In Stock");
    await expect(productDetailPage.productCondition).toContainText("New");
    await expect(productDetailPage.productBrand).toContainText("Polo");
  });

  // Quantity

  test("Should have default quantity of 1", async () => {
    await expect(productDetailPage.quantityInput).toHaveValue("1");
  });

  test("Should update quantity correctly", async () => {
    await productDetailPage.setQuantity(3);
    await expect(productDetailPage.quantityInput).toHaveValue("3");
  });

  // Add to Cart

  test.describe("Add to cart", () => {
    test("Should show modal after adding product to cart", async () => {
      await productDetailPage.addToCart();
      await expect(productDetailPage.addedToCartModal).toBeVisible();
    });

    test("Should continue shopping after adding to cart", async () => {
      await productDetailPage.addToCart();
      await productDetailPage.continueShopping();
      await expect(productDetailPage.addedToCartModal).not.toBeVisible();
    });

    test("Should navigate to cart page after clicking View Cart", async ({
      page,
    }) => {
      await productDetailPage.addToCart();
      await productDetailPage.goToViewCart();
      await expect(page).toHaveURL(/view_cart/);
    });

    test("Should add product with custom quantity to cart", async ({ page }) => {
      await productDetailPage.addToCartWithQuantity(3);
      await productDetailPage.goToViewCart();

      await expect(page).toHaveURL(/view_cart/);
      await expect(page.locator(".cart_quantity button")).toHaveText("3");
    });
  });

  // Review

  test.describe("Write review", () => {
    test("Should submit review successfully", async () => {
      const review = reviewData();

      await productDetailPage.writeReview(
        review.name,
        review.email,
        review.message
      );

      await expect(productDetailPage.reviewSuccessMessage).toBeVisible();
    });
  });

  // Navigate from Products Page

  test("Should navigate to detail page from products list", async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await productsPage.header.gotoProductsPage();

    const productName = await productsPage.getProductNameByIndex(0);
    await productsPage.viewProductByIndex(0);

    await expect(page).toHaveURL(/product_details/);
    await expect(productDetailPage.productName).toHaveText(productName);
  });
});