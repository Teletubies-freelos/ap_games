import { Knex } from 'knex';
import { Tables } from '../types/tables';
import districts from '../../../../packages/geolocation/districts.json';

export async function seed(knex: Knex): Promise<void> {
  await knex(Tables.DISTRICT)
    .del()
    .catch(() => {});

  const parsedDistricts =  districts
    .map(({ id, name, province_id }) => ({
    district_id: id,
    name,
    province_id,
  }))

  const totalChunks = districts.length/100;

  for (let index = 0; index < totalChunks; index++) {
    const chunk = parsedDistricts.splice(0, 100);

    await knex(Tables.DISTRICT).insert(chunk);
  }
}
