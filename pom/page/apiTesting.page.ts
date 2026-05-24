import { Page, Locator } from "@playwright/test";
import { BasePage } from "./base.page";

export class ApiTestingPage extends BasePage {
  readonly apiTestTitle: Locator;
  readonly scenarioCollapse: Locator;

  constructor(page: Page) {
    super(page);
    this.apiTestTitle = page.getByRole("heading", {
      name: "APIs List for practice",
      exact: true,
    });
    this.scenarioCollapse = page.locator("[class^='panel-group']");
  }
}
