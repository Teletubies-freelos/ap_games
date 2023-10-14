import { GraphQLClient } from 'graphql-request';
import { IDataProvider, IGetListParams } from 'data_providers';
import { GET_PRODUCTS } from '../../../request/src/graphql/queries';

export class Products implements IDataProvider {
  constructor(private client: GraphQLClient) {}

  async getList({ pagination }: IGetListParams) {
    const { limit = 10, page = 0 } = pagination ?? {};
    const { products } = await this.client.request<{ products: unknown[] }>(
      GET_PRODUCTS,
      {
        limit,
        offset: page * limit,
      }
    );

    return products;
  }
}
