import { Knex } from "knex";
import { Tables } from "../types/tables";
import { categories } from "../data/categories";

export async function seed(knex: Knex): Promise<void> {
  await knex(Tables.CATEGORY).del();

  await knex(Tables.CATEGORY).insert(categories);
};
