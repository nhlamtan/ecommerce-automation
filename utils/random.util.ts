export function generateRandomEmail(): string {
  const timestamp = Date.now();

  return `test${timestamp}@gmail.com`;
}
