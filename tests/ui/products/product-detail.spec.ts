import { test, expect } from "../../../fixtures/ui.fixture";
import { ProductDetailPage } from "../../../pom/page/product-detail.page";
import { reviewData } from "../../../data/ui.data";

async function proceedToDetail(productDetailPage: ProductDetailPage) {
  await productDetailPage.header.gotoProductsPage();
  await expect(productDetailPage.productsHeading).toBeVisible();
  await productDetailPage.viewProductByIndex(0);
}

test.describe.configure({ mode: "serial" });
test.describe("Product Detail Page UI Tests", () => {

  test.beforeEach("Navigate to Product Detail Page", async ({productDetailPage}) => {
    proceedToDetail(productDetailPage);
  });

  // Layout
  test("Should display all product information", async ({productDetailPage}) => {
    await expect(productDetailPage.productName).toBeVisible();
    await expect(productDetailPage.productCategory).toBeVisible();
    await expect(productDetailPage.productPrice).toBeVisible();
    await expect(productDetailPage.productAvailability).toBeVisible();
    await expect(productDetailPage.productCondition).toBeVisible();
    await expect(productDetailPage.productBrand).toBeVisible();
    await expect(productDetailPage.productImage).toBeVisible();
  });

  test("Should display correct product info for Blue Top", async ({productDetailPage}) => {
    await expect(productDetailPage.productName).toHaveText("Blue Top");
    await expect(productDetailPage.productCategory).toContainText(
      "Women > Tops",
    );
    await expect(productDetailPage.productPrice).toContainText("500");
    await expect(productDetailPage.productAvailability).toContainText(
      "In Stock",
    );
    await expect(productDetailPage.productCondition).toContainText("New");
    await expect(productDetailPage.productBrand).toContainText("Polo");
  });

  // Quantity
  test("Should have default quantity of 1", async ({productDetailPage}) => {
    await expect(productDetailPage.quantityInput).toHaveValue("1");
  });

  test("Should update quantity correctly", async ({productDetailPage}) => {
    await productDetailPage.setQuantity(3);
    await expect(productDetailPage.quantityInput).toHaveValue("3");
  });

  // Add to Cart
  test.describe("Add to cart", () => {
    test("Should show modal after adding product to cart", async ({productDetailPage}) => {
      await productDetailPage.addToCart();
      await expect(productDetailPage.addedToCartModal).toBeVisible();
    });

    test("Should continue shopping after adding to cart", async ({productDetailPage}) => {
      await productDetailPage.addToCart();
      await productDetailPage.continueShopping();
      await expect(productDetailPage.addedToCartModal).not.toBeVisible();
    });

    test("Should navigate to cart page after clicking View Cart", async ({
      page,
      productDetailPage,
    }) => {
      await productDetailPage.addToCart();
      await productDetailPage.goToViewCart();
      await expect(page).toHaveURL(/view_cart/);
    });

    test("Should add product with custom quantity to cart", async ({
      page,
      productDetailPage,
    }) => {
      await productDetailPage.addToCartWithQuantity(3);
      await productDetailPage.goToViewCart();

      await expect(page).toHaveURL(/view_cart/);
      await expect(page.locator(".cart_quantity button")).toHaveText("3");
    });
  });

  // Review
  test.describe("Write review", () => {
    test("Should submit review successfully", async ({productDetailPage}) => {
      const review = reviewData();

      await productDetailPage.writeReview(
        review.name,
        review.email,
        review.message,
      );
      await expect(productDetailPage.reviewSuccessMessage).toBeVisible();
    });
  });
});
