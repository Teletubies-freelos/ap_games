import { Knex } from 'knex';
import { OrderDTO, Tables } from '../types/tables';
import { faker } from '@faker-js/faker';

export async function seed(knex: Knex) {
  await knex(Tables.ORDER)
    .del()
    .catch(() => {});
  const paymentMethods = await knex(Tables.PAYMENT_METHOD).select(
    'payment_method_id'
  );

  const paymentMethodsId = paymentMethods.map(
    ({ payment_method_id }) => payment_method_id
  );

  const orderStatuses = await knex(Tables.ORDER_STATUS).select(
    'order_status_id'
  );

  const orderStatusId = orderStatuses.map(
    ({ order_status_id }) => order_status_id
  );

  const orders = Array.from({ length: 100 }).map(
    (): OrderDTO => ({
      order_id: faker.string.uuid(),
      payment_method_id:
        paymentMethodsId[
          faker.number.int({
            min: 0,

            max: paymentMethodsId.length - 1,
          })
        ],
      address: faker.location.streetAddress(),
      client_name: faker.person.fullName(),
      phone: Number(faker.phone.number('#########')),
      email: faker.internet.email(),
      order_status_id:
        orderStatusId[
          faker.number.int({
            min: 0,

            max: orderStatusId.length - 1,
          })
        ],
    })
  );
  await knex(Tables.ORDER).insert(orders);
}
