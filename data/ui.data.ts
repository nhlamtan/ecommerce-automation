import { getPassword, getEmail } from "../utils/env.util";
import { faker } from "@faker-js/faker";

export function loginData() {
  return {
    email: getEmail(),
    password: getPassword(),
  };
}

export function registerData() {
  return {
    account: {
      title: "Mr" as const,
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: getPassword(),
      day: "14",
      month: "November",
      year: "2003",
    },
    address: {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      company: faker.company.name(),
      address: faker.location.streetAddress(),
      address2: faker.location.secondaryAddress(),
      country: "United States",
      zipcode: faker.location.zipCode(),
      state: faker.location.state(),
      city: faker.location.city(),
      mobileNumber: faker.phone.number(),
    },
  };
}

export function contactData() {
  return {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    subject: faker.lorem.sentence(),
    message: faker.lorem.paragraph(),
    filePath: "data/ui.data.ts",
  };
}

export function reviewData() {
  return {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    message: faker.lorem.sentence(),
  };
}

export function paymentData() {
  return {
    name: faker.person.fullName(),
    number: "4111111111111111",
    cvc: "123",
    month: "12",
    year: "2027",
  };
}
