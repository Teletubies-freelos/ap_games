import { IDataProvider, IGetListParams } from 'data_providers';
import { GraphQLClient } from 'graphql-request';
import { GET_PAYMENT_METHODS } from '../../../request/src/graphql/queries';

export interface IPaymentMethod {
  payment_method_id: number;
  name: string;
  owner: string;
  number: string;
  alternative_number: string;
}

export class PaymentMethods implements IDataProvider {
  constructor(private client: GraphQLClient) {}

  async getList({ pagination }: IGetListParams = {}) {
    const { limit = 20, page = 0 } = pagination ?? {};
    const { payment_methods } = await this.client.request<{
      payment_methods: IPaymentMethod[];
    }>(GET_PAYMENT_METHODS, {
      limit,
      offset: limit * page,
    });

    return payment_methods;
  }
}
