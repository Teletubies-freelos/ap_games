import { Knex } from 'knex';
import 'dotenv/config'

export const deleteWithCascadeDev = (knex: Knex.ReferencingColumnBuilder) => {
  if(process.env.NODE_ENV === 'development')
    return knex.onDelete('CASCADE')

  return knex
}
