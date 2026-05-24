import { test, expect } from "../../../fixtures/ui.fixture";
import { TestCasesPage } from "../../../pom/page/testcases.page";

test.describe("Test Cases ui test", () => {
  let testCasePage: TestCasesPage;
  test("Go to Test Cases page", async ({ page }) => {
    testCasePage = new TestCasesPage(page);
    await testCasePage.header.gotoTestCasesPage();
    await expect(testCasePage.testCasesTitle).toBeVisible();
  });
});
