import { Page, Locator } from "@playwright/test";
import { BasePage } from "./base.page";

export class AuthPage extends BasePage {
  //Login form
  readonly loginFormHeading: Locator;
  readonly loginEmailInput: Locator;
  readonly loginPasswordInput: Locator;
  readonly loginButton: Locator;

  //Signup form
  readonly signupFormHeading: Locator;
  readonly signupNameInput: Locator;
  readonly signupEmailInput: Locator;
  readonly signupButton: Locator;

  constructor(page: Page) {
    super(page);

    //Login form
    this.loginFormHeading = page.getByRole("heading", {
      name: "Login to your account",
    });
    this.loginEmailInput = page.locator("input[data-qa='login-email']");
    this.loginPasswordInput = page.locator("input[data-qa='login-password']");
    this.loginButton = page.getByRole("button", { name: "Login" });

    //Signup form
    this.signupFormHeading = page.getByRole("heading", {
      name: "New User Signup!",
    });
    this.signupNameInput = page.locator("input[data-qa='signup-name']");
    this.signupEmailInput = page.locator("input[data-qa='signup-email']");
    this.signupButton = page.getByRole("button", { name: "Signup" });
  }

  async fillLoginForm(email: string, password: string ) {
    await this.loginEmailInput.fill(email);
    await this.loginPasswordInput.fill(password);
    await this.loginButton.click();
  }

  async fillSignupForm(name: string, email: string ) {
    await this.signupNameInput.fill(name);
    await this.signupEmailInput.fill(email);
    await this.signupButton.click();
  }
}
