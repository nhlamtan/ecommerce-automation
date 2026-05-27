import { test, expect } from "../../fixtures/api.fixture";
import { apiGet, apiPut, apiPost, apiDelete } from "../../helpers/api.helper";

test.describe("Products API", () => {
  test("GET /productsList - should return all products", async ({
    apiContext,
  }) => {
    const body = await apiGet(apiContext, "/api/productsList");

    expect(body.responseCode).toBe(200);
    expect(body.products.length).toBeGreaterThan(0);
  });

  test("POST /productsList - should return 405", async ({ apiContext }) => {
    const body = await apiPost(apiContext, "/api/productsList");

    expect(body.responseCode).toBe(405);
    expect(body.message).toContain("This request method is not supported.");
  });

  test("POST /searchProduct without search_product parameter - should return 400", async ({
    apiContext,
  }) => {
    const body = await apiPost(apiContext, "/api/searchProduct");

    expect(body.responseCode).toBe(400);
    expect(body.message).toBe(
      "Bad request, search_product parameter is missing in POST request.",
    );
  });

  test("POST /searchProduct include search_product parameter - should return 200", async ({
    apiContext,
  }) => {
    const body = await apiPost(apiContext, "/api/searchProduct", {
      search_product: "tshirt",
    });

    expect(body.responseCode).toBe(200);
    expect(body.products.length).toBeGreaterThan(0);
  });

  test("GET /brandsList should return 200", async ({ apiContext }) => {
    const body = await apiGet(apiContext, "/api/brandsList");

    expect(body.responseCode).toBe(200);
    expect(body.brands.length).toBeGreaterThan(0);
  });

  test("PUT /brandsList should return 405", async ({ apiContext }) => {
    const body = await apiPut(apiContext, "/api/brandsList");

    expect(body.responseCode).toBe(405);
    expect(body.message).toContain("This request method is not supported.");
  });
});
