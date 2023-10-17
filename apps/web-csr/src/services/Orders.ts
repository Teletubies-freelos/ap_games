import { IDataProvider, IGetListParams,  } from "data_providers";
import { GraphQLClient } from "graphql-request";
import { GET_ORDERS } from "../../../request/src/graphql/queries";
import { CREATE_ORDER } from '../../../request/src/graphql/mutations';

export interface IOrders {
  id?: string | number;
  client_name?: string;
  address?: string;
  phone?: number;
  payment_method?: string;
}

export class Orders implements IDataProvider {
  constructor(private client: GraphQLClient){}

  async createOne(payload: IOrders) {
    const { code } = await this.client.request<{
      code: { id: string | number };
    }>(CREATE_ORDER, { ...payload });

    return code;
  }

  async getList({ pagination }: IGetListParams = {}){
    const { limit = 20, page = 0} = pagination ?? {}
    const { orderers } = await this.client.request<{orderers: IOrders[]}>(GET_ORDERS, {
      limit,
      offset: limit*page
    })

    return orderers
  }
}
