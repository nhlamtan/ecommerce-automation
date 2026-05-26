import { test, expect } from "../../../fixtures/ui.fixture";
import { CheckoutPage } from "../../../pom/page/checkout.page";
import { ProductsPage } from "../../../pom/page/products.page";
import { AuthPage } from "../../../pom/page/auth.page";
import { loginData } from "../../../data/ui.data";
import { CartPage } from "../../../pom/page/cart.page";

async function loginAndAddProduct(
  authPage: AuthPage,
  productsPage: ProductsPage,
  cartPage: CartPage,
) {
  const user = loginData();
  await authPage.header.gotoAuthPage();
  await authPage.fillLoginForm(user.email, user.password);
  await expect(authPage.header.logoutLink).toBeVisible();

  await productsPage.header.gotoProductsPage();
  await productsPage.addToCartByHover(0);
  await productsPage.goToViewCart();

  await expect(cartPage.cartTable).toBeVisible();
  await cartPage.proceedToCheckout();
}

test.describe("Checkout Page UI test", () => {
  let checkoutPage: CheckoutPage;
  let authPage: AuthPage;
  let productsPage: ProductsPage;
  let cartPage: CartPage;

  test.beforeEach("Login and navigate to checkout", async ({ page }) => {
    checkoutPage = new CheckoutPage(page);
    authPage = new AuthPage(page);
    productsPage = new ProductsPage(page);
    cartPage = new CartPage(page);

    await loginAndAddProduct(authPage, productsPage, cartPage);
    await expect(page).toHaveURL("/checkout");
  });

  // Layout

  test("Should display delivery and billing address", async () => {
    await expect(checkoutPage.deliveryAddressHeading).toBeVisible();
    await expect(checkoutPage.billingAddressHeading).toBeVisible();
  });

  test("Should display order review table", async () => {
    await expect(checkoutPage.orderTable).toBeVisible();
    const count = await checkoutPage.getOrderItemCount();
    expect(count).toBeGreaterThan(0);
  });

  test("Should display correct total amount", async () => {
    const total = await checkoutPage.getOrderTotalAmount();
    expect(total).not.toBe("");
    expect(total).toContain("Rs.");
  });

  // Comment

  test("Should fill comment textarea", async () => {
    await checkoutPage.addComment("Please deliver ASAP.");
    await expect(checkoutPage.commentTextarea).toHaveValue(
      "Please deliver ASAP.",
    );
  });

  // Place Order

  test("Should navigate to payment page after placing order", async ({
    page,
  }) => {
    await checkoutPage.clickPlaceOrder();
    await expect(page).toHaveURL("/payment");
  });

  test("Should place order with comment and navigate to payment", async ({
    page,
  }) => {
    await checkoutPage.addComment("Leave at the door.");
    await checkoutPage.clickPlaceOrder();
    await expect(page).toHaveURL("/payment");
  });
});
