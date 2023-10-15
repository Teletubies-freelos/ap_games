import { Knex } from 'knex';
import { FeaturedDTO, Tables } from '../types/tables';
import { faker } from '@faker-js/faker';

export async function seed(knex: Knex) {
  try {
    await knex(Tables.ORDER_PRODUCT).del();
  } catch (error) {
    console.log(error);
  }

  const featured: FeaturedDTO[] = Array.from({ length: 10 }).map(() => ({
    title: faker.commerce.product(),
    banner_img_url: faker.image.urlPicsumPhotos(),
    description: faker.commerce.productDescription(),
  }));

  await knex(Tables.FEATURED).insert(featured);
}
