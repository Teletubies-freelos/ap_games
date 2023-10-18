import { IDataProvider, IGetListParams } from 'data_providers';
import { GraphQLClient } from 'graphql-request';
import { GET_ORDERS } from '../../../request/src/graphql/queries';
import { CREATE_ORDER } from '../../../request/src/graphql/mutations';

export interface IOrders {
  order_id?: string | number;
  client_name?: string;
  address?: string;
  phone?: number;
  payment_method?: string;
}

export class Orders implements IDataProvider {
  constructor(private client: GraphQLClient) {}

  async createOne(payload: IOrders) {
    const { insert_orderers } = await this.client.request<{
      insert_orderers: { id: string | number };
    }>(CREATE_ORDER, { ...payload });

    return insert_orderers;
  }

  async getList({ pagination }: IGetListParams = {}) {
    const { limit = 20, page = 0 } = pagination ?? {};
    const { orderers } = await this.client.request<{ orderers: IOrders[] }>(
      GET_ORDERS,
      {
        limit,
        offset: limit * page,
      }
    );

    return orderers;
  }
}
