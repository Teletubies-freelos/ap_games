import { Knex } from 'knex';
import { ProductDTO, Tables } from '../types/tables';
import { faker } from '@faker-js/faker';

export async function seed(knex: Knex) {
  try {
    await knex(Tables.PRODUCT).del();
  } catch (error) {
    console.log(error);
  }
  const categories = await knex(Tables.CATEGORY).select('category_id');

  const categoriesId = categories.map(({ category_id }) => category_id);
  const products = Array.from({ length: 100 }).map(
    (): ProductDTO => ({
      category_id:
        categoriesId[
          faker.number.int({
            min: 0,

            max: categoriesId.length - 1,
          })
        ],
      description: faker.commerce.productDescription(),
      name: faker.commerce.productName(),
      price: Number(faker.commerce.price()),
      quantity: 2,
      img_url: faker.image.urlLoremFlickr({ category: 'games' }),
      is_visible: faker.datatype.boolean(),
      is_offer: faker.datatype.boolean(),
    })
  );
  await knex(Tables.PRODUCT).insert(products);
}
