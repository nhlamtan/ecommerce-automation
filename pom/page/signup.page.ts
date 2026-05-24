import { Page, Locator } from "@playwright/test";
import { AuthPage } from "./auth.page";

export class SignupPage extends AuthPage {
  readonly signupPageHeading: Locator;

  //Account Information
  readonly mrRadio: Locator;
  readonly mrsRadio: Locator;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly daySelect: Locator;
  readonly monthSelect: Locator;
  readonly yearSelect: Locator;
  readonly newsletterCheckbox: Locator;
  readonly specialOffersCheckbox: Locator;

  //Address Information
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly companyInput: Locator;
  readonly addressInput: Locator;
  readonly address2Input: Locator;
  readonly countrySelect: Locator;
  readonly stateInput: Locator;
  readonly cityInput: Locator;
  readonly zipcodeInput: Locator;
  readonly mobileNumberInput: Locator;

  readonly createAccountButton: Locator;

  constructor(page: Page) {
    super(page);
    this.signupPageHeading = page.getByRole("heading", {
      name: "Enter Account Information",
    });

    //Account Information
    this.mrRadio = page.locator("#id_gender1");
    this.mrsRadio = page.locator("#id_gender2");
    this.nameInput = page.locator("#name");
    this.emailInput = page.locator("#email");
    this.passwordInput = page.locator("#password");
    this.daySelect = page.locator("#days");
    this.monthSelect = page.locator("#months");
    this.yearSelect = page.locator("#years");
    this.newsletterCheckbox = page.locator("#newsletter");
    this.specialOffersCheckbox = page.locator("#optin");

    //Address Information
    this.firstNameInput = page.locator("#first_name");
    this.lastNameInput = page.locator("#last_name");
    this.companyInput = page.locator("#company");
    this.addressInput = page.locator("#address1");
    this.address2Input = page.locator("#address2");
    this.countrySelect = page.locator("#country");
    this.stateInput = page.locator("#state");
    this.cityInput = page.locator("#city");
    this.zipcodeInput = page.locator("#zipcode");
    this.mobileNumberInput = page.locator("#mobile_number");

    this.createAccountButton = page.getByRole("button", {
      name: "Create Account",
    });
  }

  async fillAccountInformation(data: {
    title: "Mr" | "Mrs";
    name: string;
    email: string;
    password: string;
    day: string;
    month: string;
    year: string;
  }) {
    const titleMap = {
      Mr: this.mrRadio,
      Mrs: this.mrsRadio,
    };
    await titleMap[data.title].check();
    await this.nameInput.fill(data.name);
    await this.passwordInput.fill(data.password);
    await this.daySelect.selectOption({ label: data.day });
    await this.monthSelect.selectOption({ label: data.month });
    await this.yearSelect.selectOption({ label: data.year });
  }

  async checkNewsletter() {
    await this.newsletterCheckbox.check();
  }

  async checkSpecialOffer() {
    await this.specialOffersCheckbox.check();
  }

  async fillAddressInfo(data: {
    firstName: string;
    lastName: string;
    company: string;
    address: string;
    address2: string;
    country: string;
    state: string;
    city: string;
    zipcode: string;
    mobileNumber: string;
  }) {
    await this.firstNameInput.fill(data.firstName);
    await this.lastNameInput.fill(data.lastName);
    await this.companyInput.fill(data.company);
    await this.addressInput.fill(data.address);
    await this.address2Input.fill(data.address2);
    await this.countrySelect.selectOption({ label: data.country });
    await this.stateInput.fill(data.state);
    await this.cityInput.fill(data.city);
    await this.zipcodeInput.fill(data.zipcode);
    await this.mobileNumberInput.fill(data.mobileNumber);
  }

  async createAccount() {
    await this.createAccountButton.click();
  }
}
