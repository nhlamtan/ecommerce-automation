import { faker } from "@faker-js/faker";
import { getEmail, getPassword } from "../utils/env.util";

const email = getEmail();
const password = getPassword();

export function loginData() {
  return {
    email,
    password,
  };
}

export function userData() {
  return {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: "123123",
    title: "Mr",
    birth_date: "1",
    birth_month: "1",
    birth_year: "1990",
    firstname: faker.person.firstName(),
    lastname: faker.person.lastName(),
    company: faker.company.name(),
    address1: faker.location.streetAddress(),
    address2: faker.location.secondaryAddress(),
    country: "United States",
    zipcode: faker.location.zipCode(),
    state: faker.location.state(),
    city: faker.location.city(),
    mobile_number: faker.phone.number(),
  };
}
