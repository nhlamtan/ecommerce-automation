import { contactData } from "../../../data/ui.data";
import { test, expect } from "../../../fixtures/ui.fixture";
import { ContactPage } from "../../../pom/page/contact.page";
import { acceptDialog } from "../../../utils/dialog.util";

async function proceedToContact(contactPage: ContactPage) {
  await contactPage.header.gotoContactUsPage();
  expect(contactPage.contactTitle).toBeVisible();
  expect(contactPage.formTitle).toBeVisible();
}

test.describe.configure({ mode: "serial" });
test.describe("Contact UI test", () => {

  test.beforeEach("Go to Contact Us Page", async ({ contactPage }) => {
    await proceedToContact(contactPage);
  });

  test("Upload file successfully", async ({contactPage}) => {
    const filePath = contactData().filePath;
    await contactPage.contactFileUpload.setInputFiles(filePath);
    expect(await contactPage.contactFileUpload.inputValue()).toContain(
      "ui.data.ts",
    );
  });

  test("Fill contact form and successfully submit", async ({ page, contactPage }) => {
    const contact = contactData();
    await contactPage.fillContactForm(contact);
    acceptDialog(page);
    await contactPage.clickSubmit();
    await expect(page.locator(".status.alert.alert-success")).toContainText(
      "Success",
    );
  });
});
