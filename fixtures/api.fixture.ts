// fixtures/api.fixture.ts
import { test as base, APIRequestContext, request } from "@playwright/test";

type ApiFixtures = {
  apiContext: APIRequestContext;
};

export const test = base.extend<ApiFixtures>({
  apiContext: async ({}, use) => {
    const context = await request.newContext({
      baseURL: "https://automationexercise.com/api",
      extraHTTPHeaders: {
        Accept: "application/json",
      },
    });

    await use(context);
    await context.dispose();
  },
});

export { expect } from "@playwright/test";
