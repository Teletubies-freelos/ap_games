import { IDataProvider } from 'data_providers';
import { GraphQLClient } from 'graphql-request';
import { GET_ORDERS } from '../../../request/src/graphql/queries';

export interface IOrders {
  address: string;
  client_name: string;
  comment: string;
  email: string;
  order_id: string;
  phone: number;
  reference: string;
  created_at: string;
  order_status: {
    name: string;
    order_status_id: string;
  };
  order_products: {
    product: {
      name: string;
      price: number;
      quantity: number;
    };
    quantity: number;
  };
  payment_method: {
    name: string;
    meta: string;
    alternative_number: string;
  };
}

export class OrdersData implements IDataProvider {
  constructor(private client: GraphQLClient) {}

  async getList() {
    const { orderers } = await this.client.request<{ orderers: IOrders[] }>(
      GET_ORDERS
    );

    return orderers;
  }
}
