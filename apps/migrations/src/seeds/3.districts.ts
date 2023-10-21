import { Knex } from 'knex';
import { Tables } from '../types/tables';
import districts from '../../../../packages/geolocation/districts.json';

export async function seed(knex: Knex): Promise<void> {
  await knex(Tables.DISTRICT)
    .del()
    .catch(() => {});

  await knex(Tables.DISTRICT).insert(
    districts.map(({ id, name, province_id }) => ({
      district_id: id,
      name,
      province_id,
    }))
  );
}
