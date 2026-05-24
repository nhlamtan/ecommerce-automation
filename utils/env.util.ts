import { configDotenv } from "dotenv";
configDotenv();

export function getEmail() {
  return process.env.USER_EMAIL!;
}

export function getPassword() {
  return process.env.USER_PASSWORD!;
}
