import { test, expect } from "../../../fixtures/ui.fixture";
import { registerData } from "../../../data/ui.data";
import { AuthPage } from "../../../pom/page/auth.page";

async function processToAuthPage(authPage: AuthPage) {
  await authPage.header.gotoAuthPage();
  await expect(authPage.loginFormHeading).toBeVisible();
  await expect(authPage.signupFormHeading).toBeVisible();
}

test.describe.configure({ mode: "serial" });
test.describe("Signup UI test", () => {
  test.beforeEach("Go to Signup Page", async ({ authPage, signupPage }) => {
    await processToAuthPage(authPage);
    const user = registerData();

    await authPage.fillSignupForm(user.account.name, user.account.email);
    await expect(signupPage.signupPageHeading).toBeVisible();
  });

  test("Fill detail account information", async ({ signupPage }) => {
    const user = registerData();
    await signupPage.fillAccountInformation(user.account);
    await expect(signupPage.nameInput).toHaveValue(user.account.name);
  });

  test("Check Sign up for our newsletter!", async ({ signupPage }) => {
    await signupPage.checkNewsletter();
    await expect(signupPage.newsletterCheckbox).toBeChecked();
  });

  test("Check Receive special offers from our partners!", async ({
    signupPage,
  }) => {
    await signupPage.checkSpecialOffer();
    await expect(signupPage.specialOffersCheckbox).toBeChecked();
  });

  test("Fill detail address information", async ({ signupPage }) => {
    const user = registerData();
    await signupPage.fillAddressInfo(user.address);
    await expect(signupPage.addressInput).toHaveValue(user.address.address);
  });

  test("Create Account successfully", async ({ page, signupPage }) => {
    const user = registerData();

    await signupPage.fillAccountInformation(user.account);
    await signupPage.fillAddressInfo(user.address);
    await signupPage.createAccount();

    await expect(
      page.getByRole("heading", { name: "Account Created!" }),
    ).toBeVisible();
  });
});
