import { APIRequestContext } from "@playwright/test";

export async function apiGet(
  context: APIRequestContext,
  path: string,
  params?: Record<string, string>,
) {
  const response = await context.get(path, { params });
  return response.json();
}

export async function apiPost(
  context: APIRequestContext,
  path: string,
  form?: Record<string, string>,
) {
  const response = await context.post(path, { form });
  return response.json();
}

export async function apiPut(
  context: APIRequestContext,
  path: string,
  form?: Record<string, string>,
) {
  const response = await context.put(path, { form });
  return response.json();
}

export async function apiDelete(
  context: APIRequestContext,
  path: string,
  form?: Record<string, string>,
) {
  const response = await context.delete(path, { form });
  return response.json();
}
