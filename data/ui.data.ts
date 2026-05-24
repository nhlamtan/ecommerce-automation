import { getPassword, getEmail } from "../utils/env.util";
import { generateRandomEmail } from "../utils/random.util";

const email = getEmail();
const password = getPassword();

export function loginData() {
  return {
    email,
    password,
  };
}

export function registerData() {
  return {
    account: {
      title: "Mr" as const,
      name: "Test Name",
      email,
      password,
      day: "14",
      month: "November",
      year: "2003",
    },
    address: {
      firstName: "First",
      lastName: "Last",
      company: "check",
      address: "Address 1",
      address2: "Address 2",
      country: "Singapore",
      state: "Check",
      city: "Check",
      zipcode: "10101010",
      mobileNumber: "0123456789",
    },
  };
}
