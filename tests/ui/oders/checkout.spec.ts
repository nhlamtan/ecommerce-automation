import { test, expect } from "../../../fixtures/ui.fixture";
import { loginData } from "../../../data/ui.data";
import { AuthPage } from "../../../pom/page/auth.page";
import { ProductsPage } from "../../../pom/page/products.page";
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
  await authPage.page.waitForURL(/checkout/, { timeout: 15000 });
}

test.describe.configure({ mode: "serial" });
test.describe("Checkout Page UI test", () => {
  test.beforeEach(
    "Login and navigate to checkout",
    async ({ checkoutPage, authPage, productsPage, cartPage }) => {
      await loginAndAddProduct(authPage, productsPage, cartPage);
      await expect(checkoutPage.deliveryAddressHeading).toBeVisible();
      await expect(checkoutPage.billingAddressHeading).toBeVisible();
    },
  );

  test("Should display order review table", async ({ checkoutPage }) => {
    await expect(checkoutPage.orderTable).toBeVisible();
    const count = await checkoutPage.getOrderItemCount();
    expect(count).toBeGreaterThan(0);
  });

  test("Should display correct total amount", async ({ checkoutPage }) => {
    const total = await checkoutPage.getOrderTotalAmount();
    expect(total).not.toBe("");
    expect(total).toContain("Rs.");
  });

  // Comment
  test("Should fill comment textarea", async ({ checkoutPage }) => {
    await checkoutPage.scrollToElement(checkoutPage.commentTextarea);
    await checkoutPage.addComment("Please deliver ASAP.");
    await expect(checkoutPage.commentTextarea).toHaveValue(
      "Please deliver ASAP.",
    );
  });

  // Place Order
  test("Should navigate to payment page after placing order", async ({
    page,
    checkoutPage,
  }) => {
    await checkoutPage.clickPlaceOrder();
    await expect(page).toHaveURL("/payment");
  });

  test("Should place order with comment and navigate to payment", async ({
    page,
    checkoutPage,
  }) => {
    await checkoutPage.addComment("Leave at the door.");
    await checkoutPage.clickPlaceOrder();
    await expect(page).toHaveURL("/payment");
  });
});
