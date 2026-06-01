import { test, expect } from "../../../fixtures/ui.fixture";
import { loginData, registerData } from "../../../data/ui.data";
import { generateRandomEmail } from "../../../utils/random.util";
import { AuthPage } from "../../../pom/page/auth.page";

async function navigateToAuthPage(authPage: AuthPage) {
  await authPage.header.gotoAuthPage();
  await expect(authPage.loginFormHeading).toBeVisible();
  await expect(authPage.signupFormHeading).toBeVisible();
}

test.describe.configure({ mode: "serial" });
test.describe("Auth UI Test", () => {
  test.beforeEach("Goto Auth Page", async ({ authPage }) => {
    await navigateToAuthPage(authPage);
  });

  // Login Form
  test.describe("Login form", () => {
    test("Should login successfully with valid credentials", async ({
      authPage,
    }) => {
      const user = loginData();
      await authPage.fillLoginForm(user.email, user.password);
      await expect(authPage.header.logoutLink).toBeVisible();
    });

    test("Should show error with invalid credentials", async ({
      page,
      authPage,
    }) => {
      await authPage.fillLoginForm("wrong@email.com", "wrongpassword");
      await expect(
        page.getByText("Your email or password is incorrect!"),
      ).toBeVisible();
    });
  });

  // Signup form
  test.describe("Signup form", () => {
    test("Should navigate to Signup page with valid data", async ({
      page,
      authPage,
    }) => {
      const email = generateRandomEmail();
      await authPage.fillSignupForm("check", email);
      await expect(page).toHaveURL(/signup/);
    });

    test("Should show error when email is already registered", async ({
      page,
      authPage,
    }) => {
      const user = loginData();
      await authPage.fillSignupForm("demo", user.email);
      await expect(
        page.getByText("Email Address already exist!"),
      ).toBeVisible();
    });
  });

  // Logout - Delete Account
  test.describe("Authenticated user actions", () => {
    test.beforeEach("Login successfully", async ({ authPage }) => {
      const user = loginData();
      await authPage.fillLoginForm(user.email, user.password);
      await expect(authPage.header.logoutLink).toBeVisible();
    });

    test("Should logout successfully", async ({ authPage }) => {
      await authPage.header.logout();
      await expect(authPage.header.authLink).toBeVisible();
    });

    test("Should delete account successfully", async ({
      page,
      authPage,
      signupPage,
    }) => {
      await authPage.header.logout();

      const user = registerData();
      await authPage.fillSignupForm(user.account.name, user.account.email);
      await signupPage.fillAccountInformation(user.account);
      await signupPage.fillAddressInfo(user.address);
      await signupPage.createAccount();
      await authPage.header.gotoHomePage();

      await authPage.header.deleteAccount();
      await expect(page).toHaveURL("/delete_account");
    });
  });
});
