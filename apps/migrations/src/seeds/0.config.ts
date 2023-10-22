import { Knex } from "knex";
import { Tables } from "../types/tables";
import { config } from "../data/config";



export async function seed(knex: Knex): Promise<void> {
  await knex(Tables.CONFIG)
    .del()
    .catch(() => {});

    await knex(Tables.CONFIG).insert(config);
}