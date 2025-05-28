import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';

export const generateUsers = () => {
  return {
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    email: faker.internet.email(),
    age: faker.number.int({ min: 18, max: 80 }),
    password: bcrypt.hashSync('coder123', 10),
    role: faker.helpers.arrayElement(['user', 'admin']),
    pets: []
  };
};
