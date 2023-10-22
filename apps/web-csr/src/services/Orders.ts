import { IDataProvider, IGetListParams, IGetOneParams } from 'data_providers';
import { GraphQLClient } from 'graphql-request';
import { GET_ORDERS, GET_ORDER_STATUS_BY_ID } from '../../../request/src/graphql/queries';
import { CREATE_ORDER } from '../../../request/src/graphql/mutations';

export interface IOrders {
  order_id?: string | number;
  client_name?: string;
  address?: string;
  phone?: number;
  payment_method?: string;
}

export interface CreateOrderDTO {
  address: string;
  client_name: string;
  district_id: number;
  email: string;
  phone: number;
  reference: string;
  comment: string;
  payment_method_id: number;
  order_status_id: number;
}

export interface OrdersByIdResponse {
  order_status: {name : string};
  order_products: {
    quantity: number;
    product:{
      price: number;
      discount_price?: number;
      name: string;
    }
  }[];
  created_at: string;
}


export class Orders implements IDataProvider {
  constructor(private client: GraphQLClient) {}

  async createOne(payload: CreateOrderDTO) {
    const { insert_orderers_one } = await this.client.request<{
      insert_orderers_one: { id: string | number };
    }>(CREATE_ORDER, { ...payload });

    return insert_orderers_one;
  }

  async getList({ pagination }: IGetListParams = {}) {
    const { limit = 20, page = 0 } = pagination ?? {};
    const { orderers } = await this.client.request<{ 
      orderers: IOrders[];
    }>(
      GET_ORDERS,
      {
        limit,
        offset: limit * page,
      }
    );

    return orderers;
  }

  async getOne({filter, id}: IGetOneParams){
    if(filter?.status){
      const { orderers_by_pk } = await this.client
        .request<{
          orderers_by_pk: OrdersByIdResponse}
        >(
          GET_ORDER_STATUS_BY_ID, 
          {id}
        )

      return orderers_by_pk

    }

    throw new Error('Not implemented')
  }
}
