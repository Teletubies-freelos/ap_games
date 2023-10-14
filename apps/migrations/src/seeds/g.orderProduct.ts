import { Knex } from "knex";
import { OrderDTO, OrderProductDTO, Tables } from "../types/tables";
import { faker } from "@faker-js/faker";

export async function seed(knex: Knex) {
  await knex(Tables.ORDER_PRODUCT).del();

  const orders: {order_id: string}[] = await knex(Tables.ORDER).select('order_id')
  
  const products: {product_id: number}[] = await knex(Tables.PRODUCT).select('product_id')

  const order_products: OrderProductDTO[] = orders.flatMap(({ order_id })=>
    Array
      .from({length: faker.number.int({min: 0, max: 6})})
      .map(()=>({
       order_id,
       product_id: products[faker.number.int({min: 0, max: products.length - 1})]
        .product_id
      }))
      .filter(({product_id}, index, array)=>
        index === array.findIndex(({product_id:pid})=>product_id === pid)
      )
  )
   
  await knex(Tables.ORDER_PRODUCT).insert(order_products);
};
