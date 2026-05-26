import { test, expect } from "../../../fixtures/ui.fixture";
import { PaymentPage } from "../../../pom/page/payment.page";
import { CheckoutPage } from "../../../pom/page/checkout.page";
import { ProductsPage } from "../../../pom/page/products.page";
import { AuthPage } from "../../../pom/page/auth.page";
import { loginData, paymentData } from "../../../data/ui.data";
import { CartPage } from "../../../pom/page/cart.page";

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

  await expect(checkoutPage.page).toHaveURL("/checkout");
  await checkoutPage.clickPlaceOrder();
}

test.describe("Payment Page UI Tests", () => {
  let paymentPage: PaymentPage;
  let checkoutPage: CheckoutPage;
  let productsPage: ProductsPage;
  let cartPge: CartPage;
  let authPage: AuthPage;

  test.beforeEach("Navigate to Payment Page", async ({ page }) => {
    paymentPage = new PaymentPage(page);
    checkoutPage = new CheckoutPage(page);
    productsPage = new ProductsPage(page);
    cartPge = new CartPage(page);
    authPage = new AuthPage(page);

    await navigateToPaymentPage(authPage, productsPage, cartPge, checkoutPage);
    await expect(paymentPage.paymentHeading).toBeVisible();
  });

  // Layout

  test("Should display payment form", async () => {
    await expect(paymentPage.nameOnCard).toBeVisible();
    await expect(paymentPage.cardNumber).toBeVisible();
    await expect(paymentPage.cardCvc).toBeVisible();
    await expect(paymentPage.expiryMonth).toBeVisible();
    await expect(paymentPage.expiryYear).toBeVisible();
    await expect(paymentPage.submitButton).toBeVisible();
  });

  // Fill Card Info

  test("Should fill card information correctly", async () => {
    const card = paymentData();

    await paymentPage.fillCardInfo(card);

    await expect(paymentPage.nameOnCard).toHaveValue(card.name);
    await expect(paymentPage.cardNumber).toHaveValue(card.number);
    await expect(paymentPage.cardCvc).toHaveValue(card.cvc);
    await expect(paymentPage.expiryMonth).toHaveValue(card.month);
    await expect(paymentPage.expiryYear).toHaveValue(card.year);
  });

  // Payment

  test("Should complete payment and show success", async ({ page }) => {
    const card = paymentData();

    await paymentPage.fillCardInfo(card);
    await paymentPage.clickPayAndConfirm();

    await expect(page.getByText("Order Placed!")).toBeVisible();
  });

  test.describe("Payment done", () => {
    test.beforeEach("Complete payment", async () => {
      const card = paymentData();
      await paymentPage.fillCardInfo(card);
      await paymentPage.clickPayAndConfirm();
      await expect(paymentPage.orderPlacedHeading).toBeVisible();
    });

    test("Should download invoice successfully", async ({ page }) => {
      const downloadPromise = page.waitForEvent("download");
      await paymentPage.downloadInvoice();
      const download = await downloadPromise;

      expect(download).toBeTruthy();
    });

    test("Should navigate to home after continue", async ({ page }) => {
      await paymentPage.clickContinueShopping();
      await expect(page).toHaveURL("/");
    });
  });
});
