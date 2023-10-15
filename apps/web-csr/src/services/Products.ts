import { GraphQLClient } from 'graphql-request';
import { IDataProvider, IGetListParams } from 'data_providers';
import { GET_PRODUCTS } from '../../../request/src/graphql/queries';

export interface IProduct{
  product_id: number;
  name: string;
  description: string;
  price: number;
  discount_price?: number;
  is_offer?: boolean;
  img_url: boolean;
  quantity: number;
}

export class Products implements IDataProvider {
  constructor(private client: GraphQLClient) {}

  async getList({ pagination }: IGetListParams) {
    const { limit = 10, page = 0 } = pagination ?? {};
    const { products } = await this.client.request<{ products: IProduct[] }>(
      GET_PRODUCTS,
      {
        limit,
        offset: page * limit,
      }
    );

    return products;
  }
}
