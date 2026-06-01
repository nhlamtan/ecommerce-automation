import { test, expect } from "../../../fixtures/ui.fixture";

test.describe.configure({ mode: "serial" });
test.describe("Test Cases ui test", () => {
  test("Go to Test Cases page", async ({ testCasesPage }) => {
    await testCasesPage.header.gotoTestCasesPage();
    await expect(testCasesPage.testCasesTitle).toBeVisible();
  });
});
