import { Page, Locator } from "@playwright/test";
import { BasePage } from "./base.page";

export class CheckoutPage extends BasePage {
  // Address Details
  readonly deliveryAddressHeading: Locator;
  readonly billingAddressHeading: Locator;

  readonly deliveryFirstName: Locator;
  readonly deliveryLastName: Locator;
  readonly deliveryCompany: Locator;
  readonly deliveryAddress1: Locator;
  readonly deliveryAddress2: Locator;
  readonly deliveryCity: Locator;
  readonly deliveryState: Locator;
  readonly deliveryZipCode: Locator;
  readonly deliveryCountry: Locator;
  readonly deliveryPhone: Locator;

  readonly billingFirstName: Locator;
  readonly billingLastName: Locator;
  readonly billingCompany: Locator;
  readonly billingAddress1: Locator;
  readonly billingAddress2: Locator;
  readonly billingCity: Locator;
  readonly billingState: Locator;
  readonly billingZipCode: Locator;
  readonly billingCountry: Locator;
  readonly billingPhone: Locator;

  // Order review
  readonly orderTable: Locator;
  readonly orderItemNames: Locator;
  readonly orderItemPrices: Locator;
  readonly orderItemQuantities: Locator;
  readonly orderItemTotals: Locator;
  readonly orderTotalAmount: Locator;

  // Comment & Place Order
  readonly commentTextarea: Locator;
  readonly placeOrderButton: Locator;

  constructor(page: Page) {
    super(page);

    // Address Details
    this.deliveryAddressHeading = page.getByRole("heading", {
      name: "Your delivery address",
    });
    this.billingAddressHeading = page.getByRole("heading", {
      name: "Your billing address",
    });

    this.deliveryFirstName = page.locator(
      "#address_delivery .address_firstname",
    );
    this.deliveryLastName = page.locator("#address_delivery .address_lastname");
    this.deliveryCompany = page.locator(
      "#address_delivery .address_address1.address_city",
    );
    this.deliveryAddress1 = page
      .locator("#address_delivery .address_address1")
      .nth(1);
    this.deliveryAddress2 = page
      .locator("#address_delivery .address_address1")
      .nth(2);
    this.deliveryCity = page.locator(
      "#address_delivery .address_city.address_state_name.address_postcode",
    );
    this.deliveryState = page.locator("#address_delivery .address_state_name");
    this.deliveryZipCode = page.locator("#address_delivery .address_postcode");
    this.deliveryCountry = page.locator(
      "#address_delivery .address_country_name",
    );
    this.deliveryPhone = page.locator("#address_delivery .address_phone");

    this.billingFirstName = page.locator("#address_invoice .address_firstname");
    this.billingLastName = page.locator("#address_invoice .address_lastname");
    this.billingCompany = page.locator(
      "#address_invoice .address_address1.address_city",
    );
    this.billingAddress1 = page
      .locator("#address_invoice .address_address1")
      .nth(1);
    this.billingAddress2 = page
      .locator("#address_invoice .address_address1")
      .nth(2);
    this.billingCity = page.locator(
      "#address_invoice .address_city.address_state_name.address_postcode",
    );
    this.billingState = page.locator("#address_invoice .address_state_name");
    this.billingZipCode = page.locator("#address_invoice .address_postcode");
    this.billingCountry = page.locator(
      "#address_invoice .address_country_name",
    );
    this.billingPhone = page.locator("#address_invoice .address_phone");

    // Order review
    this.orderTable = page.locator("#cart_info");
    this.orderItemNames = page.locator("#cart_info .cart_description h4 a");
    this.orderItemPrices = page.locator("#cart_info .cart_price p");
    this.orderItemQuantities = page.locator("#cart_info .cart_quantity button");
    this.orderItemTotals = page.locator("#cart_info .cart_total_price");
    this.orderTotalAmount = page.locator(".cart_total_price").last();

    // Comment & Place Order
    this.commentTextarea = page.locator("textarea[name='message']");
    this.placeOrderButton = page.getByRole("link", { name: "Place Order" });
  }

  async getOrderItemCount(): Promise<number> {
    return this.orderItemNames.count();
  }

  async getOrderItemNameByIndex(index: number): Promise<string> {
    return (await this.orderItemNames.nth(index).textContent()) ?? "";
  }

  async getOrderTotalAmount(): Promise<string> {
    return (await this.orderTotalAmount.textContent()) ?? "";
  }

  async addComment(comment: string) {
    await this.commentTextarea.fill(comment);
  }

  async clickPlaceOrder() {
    await this.placeOrderButton.click();
  }
}
