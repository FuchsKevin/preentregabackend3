import { faker } from '@faker-js/faker';

export function generatePet() {
  return {
    name: faker.animal.dog(), // o .cat(), etc.
    specie: faker.animal.type(),
    birthDate: faker.date.past(10),
    adopted: false,
    owner: null,
    description: faker.lorem.sentence(),
   image: faker.image.urlPicsumPhotos(), 

  };
}
