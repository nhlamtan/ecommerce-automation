import { Page, Locator } from "@playwright/test";
import { BasePage } from "./base.page";

export class TestCasesPage extends BasePage {
  readonly testCasesTitle: Locator;
  readonly scenarioCollapse: Locator;

  constructor(page: Page) {
    super(page);
    this.testCasesTitle = page.getByRole("heading", { name: "Test Cases" , exact: true});
    this.scenarioCollapse = page.locator("[class^='panel-group']");
  }
}
