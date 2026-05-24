import { test, expect } from "../../../fixtures/ui.fixture";
import { SignupPage } from "../../../pom/page/signup.page";
import { AuthPage } from "../../../pom/page/auth.page";
import { registerData } from "../../../data/ui.data";
import { AccountCreatedPage } from "../../../pom/page/account-created.page";
async function processToAuthPage(authPage: AuthPage) {
  await authPage.header.gotoAuthPage();
  await expect(authPage.loginFormHeading).toBeVisible();
  await expect(authPage.signupFormHeading).toBeVisible();
}

test.describe("Signup UI test", () => {
  let signupPage: SignupPage;
  let authPage: AuthPage;

  const getUser = () => registerData();

  test.beforeEach("Go to Signup Page", async ({ page }) => {
    signupPage = new SignupPage(page);
    authPage = new AuthPage(page);

    await processToAuthPage(authPage);
    const user = getUser();

    await authPage.fillSignupForm(user.account.name, user.account.email);
    await expect(signupPage.signupPageHeading).toBeVisible();
  });

  test("Fill detail account information", async () => {
    const user = getUser();

    await signupPage.fillAccountInformation(user.account);
    await expect(signupPage.nameInput).toHaveValue(user.account.name);
  });

  test("Check Sign up for our newsletter!", async () => {
    await signupPage.checkNewsletter();
    await expect(signupPage.newsletterCheckbox).toBeChecked();
  });

  test("Check Receive special offers from our partners!", async () => {
    await signupPage.checkSpecialOffer();
    await expect(signupPage.specialOffersCheckbox).toBeChecked();
  });

  test("Fill detail address information", async () => {
    const user = getUser();

    await signupPage.fillAddressInfo(user.address);
    await expect(signupPage.addressInput).toHaveValue(user.address.address);
  });

  test("Create Account successfully", async ({ page }) => {
    const user = getUser();
    const accountCreatedPage = new AccountCreatedPage(page);

    await signupPage.fillAccountInformation(user.account);
    await signupPage.fillAddressInfo(user.address);
    await signupPage.createAccount();

    await expect(accountCreatedPage.successHeading).toBeVisible();
  });
});
