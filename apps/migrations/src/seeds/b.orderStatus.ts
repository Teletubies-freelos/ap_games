import { Knex } from "knex";
import { Tables } from "../types/tables";
import { orderStatus } from "../data/orderStatus";

export async function seed(knex: Knex): Promise<void> {
  await knex(Tables.ORDER_STATUS).del();

  await knex(Tables.ORDER_STATUS).insert(orderStatus);
};
