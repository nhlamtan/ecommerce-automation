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

export function contactData() {
  return {
    name: "demo",
    email,
    subject: "products",
    message: "Please check this product",
    filePath: "data/ui.data.ts",
  };
}

export function reviewData() {
  return {
    name: "demo",
    email,
    message: "Good",
  };
}

export function paymentData() {
  return {
    name: "Test User",
    number: "4111111111111111",
    cvc: "123",
    month: "12",
    year: "2027",
  };
}
