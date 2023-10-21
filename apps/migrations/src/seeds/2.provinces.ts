import { Knex } from "knex";
import { Tables } from "../types/tables";
import provinces from '../../../../packages/geolocation/provincies.json'

export async function seed(knex: Knex): Promise<void> {
  await knex(Tables.PROVINCE).del().catch(()=>{});

  await knex(Tables.PROVINCE)
    .insert(
      provinces
        .map(({id, name, department_id})=>({
          province_id: id, 
          name, 
          department_id
        }))
    );
};
