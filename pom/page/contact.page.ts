import { Page, Locator } from "@playwright/test";
import { BasePage } from "./base.page";

export class ContactPage extends BasePage {
  readonly contactTitle: Locator;

  //Form contact
  readonly formTitle: Locator;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly subjectInput: Locator;
  readonly messageTextarea: Locator;
  readonly contactFileUpload: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    super(page);

    this.contactTitle = page.getByRole("heading", { name: "Contact Us" });

    this.formTitle = page.getByRole("heading", { name: "Get In Touch" });

    this.nameInput = page.getByPlaceholder("Name");
    this.emailInput = page.getByPlaceholder("Email").first();
    this.subjectInput = page.getByPlaceholder("Subject");
    this.messageTextarea = page.getByPlaceholder("Your Message Here");
    this.contactFileUpload = page.getByRole("button", { name: "Choose File" });
    this.submitButton = page.getByRole("button", { name: "Submit" });
  }

  async fillContactForm(data: {
    name: string;
    email: string;
    subject: string;
    message: string;
    filePath: string;
  }) {
    await this.nameInput.fill(data.name);
    await this.emailInput.fill(data.email);
    await this.subjectInput.fill(data.subject);
    await this.messageTextarea.fill(data.message);
    await this.contactFileUpload.setInputFiles(data.filePath);
  }

  async clickSubmit() {
    await this.submitButton.click();
  }
}
