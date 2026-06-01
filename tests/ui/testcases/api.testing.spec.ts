import { test, expect } from "../../../fixtures/ui.fixture";

test.describe.configure({ mode: "serial" });
test.describe("API Testing ui test", () => {
  test("Go to API Testing page", async ({ apiTestingPage }) => {
    await apiTestingPage.header.gotoApiTestingPage();
    await expect(apiTestingPage.apiTestTitle).toBeVisible();
  });
});
