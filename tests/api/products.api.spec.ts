import { test, expect } from "../../fixtures/api.fixture";

test.describe("Products API", () => {
  test("GET /productsList - should return all products", async ({
    apiContext,
  }) => {
    const response = await apiContext.get("/api/productsList");
    const responseJSON = await response.json();
    expect(responseJSON.responseCode).toBe(200);
    expect(responseJSON.products.length).toBeGreaterThan(0);
  });

  test("POST /productsList - should return 405", async ({ apiContext }) => {
    const response = await apiContext.post("/api/productsList");
    const responseJSON = await response.json();
    expect(responseJSON.responseCode).toBe(405);
    expect(responseJSON.message).toBe("This request method is not supported.");
  });

  test("POST /searchProduct without search_product parameter - should return 400", async ({
    apiContext,
  }) => {
    const response = await apiContext.post("/api/searchProduct");
    const responseJSON = await response.json();
    expect(responseJSON.responseCode).toBe(400);
    expect(responseJSON.message).toBe(
      "Bad request, search_product parameter is missing in POST request.",
    );
  });
});
