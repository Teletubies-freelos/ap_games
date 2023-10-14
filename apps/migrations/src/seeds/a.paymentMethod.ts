import { Knex } from "knex";
import { Tables } from "../types/tables";
import { paymentMethods } from "../data/paymentMethods";

export async function seed(knex: Knex): Promise<void> {
  await knex(Tables.PAYMENT_METHOD).del();

  await knex(Tables.PAYMENT_METHOD).insert(paymentMethods);
};
