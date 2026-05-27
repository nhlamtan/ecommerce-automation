import { loginData } from "../../data/api.data";
import { test, expect } from "../../fixtures/api.fixture";
import { apiGet, apiPut, apiPost, apiDelete } from "../../helpers/api.helper";

test.describe("Auth API", () => {
  const login = loginData();

  test("POST /verifyLogin with valid details - should return 200", async ({
    apiContext,
  }) => {
    const body = await apiPost(apiContext, "/api/verifyLogin", {
      email: login.email,
      password: login.password,
    });

    expect(body.responseCode).toBe(200);
    expect(body.message).toContain("User exists!");
  });

  test("POST /verifyLogin without email parameter - should return 400", async ({
    apiContext,
  }) => {
    const body = await apiPost(apiContext, "/api/verifyLogin", {
      password: login.password,
    });

    expect(body.responseCode).toBe(400);
    expect(body.message).toContain(
      "Bad request, email or password parameter is missing in POST request.",
    );
  });

  test("POST /verifyLogin with invalid details - should return 404", async ({
    apiContext,
  }) => {
    const body = await apiPost(apiContext, "/api/verifyLogin", {
      email: "demo123@gmail.com",
      password: "blabla",
    });

    expect(body.responseCode).toBe(404);
    expect(body.message).toContain("User not found!");
  });

  test("Delete /verifyLogin - should return 405", async ({ apiContext }) => {
    const body = await apiDelete(apiContext, "/api/verifyLogin");

    expect(body.responseCode).toBe(405);
    expect(body.message).toContain("This request method is not supported.");
  });
});
