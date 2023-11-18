import { IDataProvider } from 'data_providers';
import { GraphQLClient } from 'graphql-request';
import { GET_ORDERS, GET_ORDERS_BY_ID } from '../../../request/src/graphql/queries';
import { UPDATE_STATUS_ORDER_BY_ID } from '../../../request/src/graphql/mutations';

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
  delivery_way: {
    name: string;
  };
  order_status_id?: number;
}

export class OrdersData implements IDataProvider {
  constructor(private client: GraphQLClient) { }

  async getList() {
    const { orderers } = await this.client.request<{ orderers: IOrders[] }>(
      GET_ORDERS
    );

    return orderers;
  }
  async getOne({ id }: { id: string }) {
    const { orderers } = await this.client.request<{ orderers: IOrders[] }>(
      GET_ORDERS_BY_ID, { orderId: id }
    );

    return orderers.find(x => x.order_id);
  }

  async updateOne(payload: IOrders): Promise<boolean> {
    const { update_order_status_by_pk } = await this.client.request<{
      update_order_status_by_pk: boolean;
    }>(UPDATE_STATUS_ORDER_BY_ID, { ...payload });

    return update_order_status_by_pk;
  }
}
