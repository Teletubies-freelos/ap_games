import { IDataProvider } from 'data_providers';
import { GraphQLClient } from 'graphql-request';
import {
  CREATE_ORDER_PRODUCTS,
  CREATE_ORDER_PRODUCT_ONE,
} from '../../../request/src/graphql/mutations';

interface OrderProductDTO {
  order_id: string;
  product_id: number | string;
}

export class OrdersProducts implements IDataProvider {
  constructor(private client: GraphQLClient) {}

  async createOne(payload: OrderProductDTO) {
    const { insert_order_products_one } = await this.client.request<{
      insert_order_products_one: OrderProductDTO;
    }>(CREATE_ORDER_PRODUCT_ONE, { ...payload });

    return insert_order_products_one;
  }

  async createMany(payload: OrderProductDTO[]) {
    const { insert_order_products } = await this.client.request<{
      insert_order_products: OrderProductDTO[];
    }>(CREATE_ORDER_PRODUCTS, { objects: payload });

    return insert_order_products;
  }
}
