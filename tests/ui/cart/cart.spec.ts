import { test, expect } from "../../../fixtures/ui.fixture";
import { loginData } from "../../../data/ui.data";
import { ProductsPage } from "../../../pom/page/products.page";
import { AuthPage } from "../../../pom/page/auth.page";

async function addProduct(productsPage: ProductsPage) {
  await productsPage.header.gotoProductsPage();
  await productsPage.addToCartByHover(0);
  await expect(productsPage.addedToCartModal).toBeVisible();
  await productsPage.goToViewCart();
}

async function login(authPage: AuthPage) {
  const user = loginData();
  await authPage.header.gotoAuthPage();
  await authPage.fillLoginForm(user.email, user.password);
  await expect(authPage.header.logoutLink).toBeVisible();
}

test.describe.configure({ mode: "serial" });
test.describe("Cart UI Tests", () => {
  // Empty Cart
  test.describe("Empty Cart", () => {
    test.beforeEach("Go to Cart Page", async ({ cartPage }) => {
      await cartPage.header.gotoCartPage();
      await expect(cartPage.emptyCartMessage).toBeVisible();
    });

    test("Should click Here to go Products Page", async ({
      page,
      cartPage,
    }) => {
      await cartPage.clickHereLink();
      await expect(page).toHaveURL("/products");
    });
  });

  // Have a product
  test.describe("Have a product Cart", () => {
    test.beforeEach(
      "Add product and go to View Cart",
      async ({ cartPage, productsPage }) => {
        await addProduct(productsPage);
        await expect(cartPage.cartTable).toBeVisible();
      },
    );

    test("Should display product name, price, quantity and total in cart table", async ({
      cartPage,
    }) => {
      const count = await cartPage.getCartItemCount();
      const name = await cartPage.getProductNameByIndex(0);
      const price = await cartPage.getProductPriceByIndex(0);
      const quantity = await cartPage.getProductQuantityByIndex(0);
      const total = await cartPage.getProductTotalByIndex(0);

      expect(name).not.toBe("");
      expect(price).not.toBe("");
      expect(quantity).toBe("1");
      expect(total).not.toBe("");
      expect(count).toBeGreaterThan(0);
    });

    test("Should remove product from cart", async ({ cartPage }) => {
      await cartPage.deleteProductByIndex(0);
      await expect(cartPage.emptyCartMessage).toBeVisible();
    });

    test("Should show checkout modal when not logged in", async ({
      page,
      cartPage,
    }) => {
      await page.waitForTimeout(3000);
      await cartPage.proceedToCheckout();
      await expect(cartPage.checkoutModal).toBeVisible();
    });

    test("Should navigate to login page from checkout modal", async ({
      page,
      cartPage,
    }) => {
      await page.waitForTimeout(3000);
      await cartPage.proceedToCheckoutWithLogin();
      await expect(page).toHaveURL(/login/);
    });
  });

  // Multiple products
  test.describe("Cart with multiple products", () => {
    test.beforeEach("Add two products", async ({ cartPage, productsPage }) => {
      await productsPage.header.gotoProductsPage();
      await productsPage.addToCartByHover(0);
      await productsPage.continueShopping();
      await productsPage.addToCartByHover(1);
      await productsPage.goToViewCart();

      await expect(cartPage.cartTable).toBeVisible();
    });

    test("Should display all added products", async ({ cartPage }) => {
      const count = await cartPage.getCartItemCount();
      expect(count).toBe(2);
    });

    test("Should remove all products from cart", async ({ cartPage }) => {
      await cartPage.deleteAllProducts();
      await expect(cartPage.emptyCartMessage).toBeVisible();
    });
  });

  // Logged in checkout
  test.describe("Checkout when logged in", () => {
    test.beforeEach(
      "Login and add product",
      async ({ cartPage, productsPage, authPage }) => {
        await login(authPage);
        await addProduct(productsPage);
        await expect(cartPage.cartTable).toBeVisible();
      },
    );

    test("Should proceed to checkout without modal", async ({
      page,
      cartPage,
    }) => {
      await cartPage.proceedToCheckout();
      await expect(page).toHaveURL(/checkout/);
    });
  });
});
