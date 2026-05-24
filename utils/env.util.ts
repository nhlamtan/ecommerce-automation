import { configDotenv } from "dotenv";
configDotenv();

export function getPassword() {
  return process.env.USER_PASSWORD!;
}
