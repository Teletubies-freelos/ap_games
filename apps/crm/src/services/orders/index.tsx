import { gql, type GraphQLClient } from 'graphql-request';
import { QueryManyOptions } from '../../types/request';

export interface OrdersResponse {
  id: string | number;
  client_name: string;
  address: string;
  phone: number;
  code: string;
  payment_state: string;
  payment_method: string;
  total: number;
  create_date: Date;
}

export class Orders {
  static GET_ORDERS = gql`
    query MyQuery($limit: Int!, $offset: Int!) {
      Orders(limit: $limit, offset: $offset, order_by: { create_date: desc }) {
        address
        client_name
        code
        create_date
        order_id
        payment_method
        payment_state
        phone
        products
        total
      }
    }
  `;

  constructor(private client: GraphQLClient) {}

  async getList({ pagination = {} }: QueryManyOptions<unknown> = {}) {
    const { limit = 10, offset = 0 } = pagination;

    const { Orders: orders } = await this.client.request<{
      Orders: OrdersResponse[];
    }>(Orders.GET_ORDERS, { limit, offset });

    return orders;
  }
}
