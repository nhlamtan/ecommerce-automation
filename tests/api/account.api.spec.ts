import { userData } from "../../data/api.data";
import { test, expect } from "../../fixtures/api.fixture";
import { apiGet, apiPut, apiPost, apiDelete } from "../../helpers/api.helper";

test.describe("Account API", () => {
  const user = userData();

  test("POST /createAccount - should return 201", async ({ apiContext }) => {
    const body = await apiPost(apiContext, "/api/createAccount", { ...user });

    expect(body.responseCode).toBe(201);
    expect(body.message).toContain("User created!");
  });

  test("Delete /deleteAccount - should return 200", async ({ apiContext }) => {
    const body = await apiDelete(apiContext, "/api/deleteAccount", {
      email: user.email,
      password: user.password,
    });

    expect(body.responseCode).toBe(200);
    expect(body.message).toContain("Account deleted!");
  });

  test("PUT /updateAccount - should return 209", async ({ apiContext }) => {
    const body = await apiPut(apiContext, "/api/updateAccount", { ...user });

    expect(body.responseCode).toBe(200);
    expect(body.message).toContain("User updated!");
  });

  test("Get /getUserDetailByEmail - should return 209", async ({
    apiContext,
  }) => {
    const body = await apiGet(apiContext, "/api/getUserDetailByEmail", {
      email: user.email,
    });

    expect(body.responseCode).toBe(200);
    expect(body.user).toBeDefined();
    expect(body.user.email).toBe(user.email);
  });
});
