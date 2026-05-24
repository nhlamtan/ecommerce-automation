import { test, expect } from "../../../fixtures/ui.fixture";
import { ApiTestingPage } from "../../../pom/page/apiTesting.page";

test.describe("API Testing ui test", () => {
  let apiTestingPage: ApiTestingPage;
  test("Go to API Testing page", async ({ page }) => {
    apiTestingPage = new ApiTestingPage(page);
    await apiTestingPage.header.gotoApiTestingPage();
    await expect(apiTestingPage.apiTestTitle).toBeVisible();
  });
});
