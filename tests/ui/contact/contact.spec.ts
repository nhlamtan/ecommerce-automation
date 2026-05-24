import { contactData } from "../../../data/ui.data";
import { test, expect } from "../../../fixtures/ui.fixture";
import { ContactPage } from "../../../pom/page/contact.page";
import { acceptDialog } from "../../../utils/dialog.util";

test.describe("Contact UI test", () => {
  let contactPage: ContactPage;

  test.beforeEach("Go to Contact Us Page", async ({ page }) => {
    contactPage = new ContactPage(page);
    await contactPage.header.gotoContactUsPage();
    expect(contactPage.contactTitle).toBeVisible();
    expect(contactPage.formTitle).toBeVisible();
  });

  test("Upload file successfully", async () => {
    const filePath = contactData().filePath;
    await contactPage.contactFileUpload.setInputFiles(filePath);
    expect(await contactPage.contactFileUpload.inputValue()).toContain(
      "ui.data.ts",
    );
  });

  test("Fill contact form and successfully submit", async ({ page }) => {
    const contact = contactData();
    await contactPage.fillContactForm(contact);
    await contactPage.clickSubmit();
    await acceptDialog(page);
    await expect(page.getByText("Success! Your details have been submitted successfully.")).toBeVisible();
  });
});
