import { Knex } from 'knex';
import { FeaturedDTO, ProductDTO, Tables } from '../types/tables';
import { faker } from '@faker-js/faker';

export async function seed(knex: Knex) {
  try {
    await knex(Tables.FEATURED).del();
  } catch (error) {
    console.log(error);
  }

  const products: ProductDTO[] = await knex(Tables.PRODUCT).select('*').limit(10)

  const featured: FeaturedDTO[] = products.map(({
    banner_img_url, 
    name, 
    description,
    price,
    discount_price,
    product_id,
    is_offer
  }) => {
    return ({
      title: name,
      banner_img_url: banner_img_url ?? faker.image.urlPicsumPhotos(),
      description,
      price,
      is_offer,
      offer_price: discount_price,
      product_id
    })
  });

  await knex(Tables.FEATURED).insert(featured);
}
