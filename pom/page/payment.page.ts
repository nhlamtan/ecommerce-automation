import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./base.page";

export class PaymentPage extends BasePage {
  readonly paymentHeading: Locator;

  // Card Information
  readonly nameOnCard: Locator;
  readonly cardNumber: Locator;
  readonly cardCvc: Locator;
  readonly expiryMonth: Locator;
  readonly expiryYear: Locator;
  readonly submitButton: Locator;

  // Payment done
  readonly orderPlacedHeading: Locator;
  readonly downloadInvoiceButton: Locator;
  readonly continueButton: Locator;
  constructor(page: Page) {
    super(page);

    // Card Information
    this.paymentHeading = page.getByRole("heading", { name: "Payment" });
    this.nameOnCard = page.locator("[name='name_on_card']");
    this.cardNumber = page.locator("[name='card_number']");
    this.cardCvc = page.locator("[name='cvc']");
    this.expiryMonth = page.locator("[name='expiry_month']");
    this.expiryYear = page.locator("[name='expiry_year']");
    this.submitButton = page.locator("#submit");

    // Payment done
    this.orderPlacedHeading = page.getByRole("heading", {
      name: "Order Placed!",
    });
    this.downloadInvoiceButton = page.getByRole("link", {
      name: "Download Invoice",
    });
    this.continueButton = page.getByRole("link", { name: "Continue" });
  }

  async fillCardInfo(data: {
    name: string;
    number: string;
    cvc: string;
    month: string;
    year: string;
  }) {
    await this.nameOnCard.fill(data.name);
    await this.cardNumber.fill(data.number);
    await this.cardCvc.fill(data.cvc);
    await this.expiryMonth.fill(data.month);
    await this.expiryYear.fill(data.year);
  }

  async clickPayAndConfirm() {
    await this.submitButton.click();
  }

  async downloadInvoice() {
    await this.downloadInvoiceButton.click();
  }

  async clickContinueShopping() {
    await this.continueButton.click();
  }
}
