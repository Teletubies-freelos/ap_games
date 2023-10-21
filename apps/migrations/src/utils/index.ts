import { Knex } from 'knex';
import 'dotenv/config'

/**
 * 
 * This method appends the constrain cascade when deleting a column 
 */
export const onDeleteWithCascadeWhenDev = (knex: Knex.ReferencingColumnBuilder) => {
  if(process.env.NODE_ENV === 'development')
    return knex.onDelete('CASCADE')

  return knex
}
