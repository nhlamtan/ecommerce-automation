import { test as base, APIRequestContext, request } from "@playwright/test";

type ApiFixtures = {
  apiContext: APIRequestContext;
  parseResponse: (response: any) => Promise<any>;
};

export const test = base.extend<ApiFixtures>({
  apiContext: async ({}, use) => {
    const context = await request.newContext({
      baseURL: "https://automationexercise.com",
      extraHTTPHeaders: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "application/json, text/plain, */*",
      },
    });

    await use(context);
    await context.dispose();
  },

  parseResponse: async ({}, use) => {
    const parse = async (response: any) => {
      const text = await response.text();
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error(`No JSON found in response:\n${text}`);
      return JSON.parse(jsonMatch[0]);
    };
    await use(parse);
  },
});

export { expect } from "@playwright/test";
