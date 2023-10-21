import { Knex } from "knex";
import { Tables } from "../types/tables";
import departments from '../../../../packages/geolocation/departments.json'

export async function seed(knex: Knex): Promise<void> {
  await knex(Tables.DEPARTMENT).del().catch(()=>{});

  await knex(Tables.DEPARTMENT)
    .insert(
      departments
        .map(({id, name})=>({department_id: id, name}))
    );
};
