import { test as base } from "@playwright/test";
import { CartPage } from "../pom/page/cart.page";
import { ProductsPage } from "../pom/page/products.page";
import { AuthPage } from "../pom/page/auth.page";
import { CheckoutPage } from "../pom/page/checkout.page";
import { PaymentPage } from "../pom/page/payment.page";
import { SignupPage } from "../pom/page/signup.page";
import { ProductDetailPage } from "../pom/page/product-detail.page";
import { ContactPage } from "../pom/page/contact.page";
import { HomePage } from "../pom/page/home.page";
import { ApiTestingPage } from "../pom/page/apiTesting.page";
import { TestCasesPage } from "../pom/page/testcases.page";

type UiFixtures = {
  cartPage: CartPage;
  productsPage: ProductsPage;
  authPage: AuthPage;
  checkoutPage: CheckoutPage;
  paymentPage: PaymentPage;
  signupPage: SignupPage;
  productDetailPage: ProductDetailPage;
  contactPage: ContactPage;
  homePage: HomePage;
  apiTestingPage: ApiTestingPage;
  testCasesPage: TestCasesPage;
};

export const test = base.extend<UiFixtures>({
  page: async ({ page }, use) => {
    await page.context().clearCookies();
    await page.context().clearPermissions();
    
    await page.route("**/*", (route) => {
      route.request().url().startsWith("https://googleads.")
        ? route.abort()
        : route.continue();
      return;
    });

    await page.goto("/", { waitUntil: "domcontentloaded" });
    await use(page);
  },

  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },

  productsPage: async ({ page }, use) => {
    await use(new ProductsPage(page));
  },

  authPage: async ({ page }, use) => {
    await use(new AuthPage(page));
  },

  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },

  paymentPage: async ({ page }, use) => {
    await use(new PaymentPage(page));
  },

  signupPage: async ({ page }, use) => {
    await use(new SignupPage(page));
  },

  productDetailPage: async ({ page }, use) => {
    await use(new ProductDetailPage(page));
  },

  contactPage: async ({ page }, use) => {
    await use(new ContactPage(page));
  },

  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },

  apiTestingPage: async ({ page }, use) => {
    await use(new ApiTestingPage(page));
  },

  testCasesPage: async ({ page }, use) => {
    await use(new TestCasesPage(page));
  },
});

export { expect } from "@playwright/test";
