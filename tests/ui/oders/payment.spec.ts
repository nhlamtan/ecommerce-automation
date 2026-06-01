import { test, expect } from "../../../fixtures/ui.fixture";
import { loginData, paymentData } from "../../../data/ui.data";
import { AuthPage } from "../../../pom/page/auth.page";
import { ProductsPage } from "../../../pom/page/products.page";
import { CartPage } from "../../../pom/page/cart.page";
import { CheckoutPage } from "../../../pom/page/checkout.page";

async function navigateToPaymentPage(
  authPage: AuthPage,
  productsPage: ProductsPage,
  cartPage: CartPage,
  checkoutPage: CheckoutPage,
) {
  const user = loginData();

  await authPage.header.gotoAuthPage();
  await authPage.fillLoginForm(user.email, user.password);
  await expect(authPage.header.logoutLink).toBeVisible();

  await productsPage.header.gotoProductsPage();
  await productsPage.addToCartByHover(1);
  await productsPage.goToViewCart();

  await expect(cartPage.cartTable).toBeVisible();
  await cartPage.proceedToCheckout();

  await expect(checkoutPage.page).toHaveURL(/checkout/);
  await checkoutPage.clickPlaceOrder();
}

test.describe.configure({ mode: "serial" });
test.describe("Payment Page UI Tests", () => {
  test.beforeEach(
    "Navigate to Payment Page",
    async ({ paymentPage, authPage, productsPage, cartPage, checkoutPage }) => {
      await navigateToPaymentPage(
        authPage,
        productsPage,
        cartPage,
        checkoutPage,
      );
      await expect(paymentPage.paymentHeading).toBeVisible();
    },
  );

  test("Should display payment form", async ({ paymentPage }) => {
    await expect(paymentPage.nameOnCard).toBeVisible();
    await expect(paymentPage.cardNumber).toBeVisible();
    await expect(paymentPage.cardCvc).toBeVisible();
    await expect(paymentPage.expiryMonth).toBeVisible();
    await expect(paymentPage.expiryYear).toBeVisible();
    await expect(paymentPage.submitButton).toBeVisible();
  });

  test("Should fill card information correctly", async ({ paymentPage }) => {
    const card = paymentData();
    await paymentPage.fillCardInfo(card);
    await expect(paymentPage.nameOnCard).toHaveValue(card.name);
    await expect(paymentPage.cardNumber).toHaveValue(card.number);
    await expect(paymentPage.cardCvc).toHaveValue(card.cvc);
    await expect(paymentPage.expiryMonth).toHaveValue(card.month);
    await expect(paymentPage.expiryYear).toHaveValue(card.year);
  });

  test("Should complete payment and show success", async ({
    page,
    paymentPage,
  }) => {
    const card = paymentData();
    await paymentPage.fillCardInfo(card);
    await paymentPage.clickPayAndConfirm();
    await expect(page.getByText("Order Placed!")).toBeVisible();
  });

  test("Should download invoice successfully", async ({
    page,
    paymentPage,
  }) => {
    const card = paymentData();
    await paymentPage.fillCardInfo(card);
    await paymentPage.clickPayAndConfirm();
    await expect(paymentPage.orderPlacedHeading).toBeVisible();

    const downloadPromise = page.waitForEvent("download");
    await paymentPage.downloadInvoice();
    const download = await downloadPromise;
    expect(download).toBeTruthy();
  });

  test("Should navigate to home after continue", async ({
    page,
    paymentPage,
  }) => {
    const card = paymentData();
    await paymentPage.fillCardInfo(card);
    await paymentPage.clickPayAndConfirm();
    await expect(paymentPage.orderPlacedHeading).toBeVisible();

    await paymentPage.clickContinueShopping();
    await expect(page).toHaveURL("/");
  });
});
