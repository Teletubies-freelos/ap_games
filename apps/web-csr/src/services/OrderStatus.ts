import { IDataProvider } from "data_providers";
import { GraphQLClient } from "graphql-request";
import { GET_ORDER_STATUS } from "../../../request/src/graphql/queries";


export class OrderStatus implements IDataProvider{
  constructor(private client: GraphQLClient){}

  async getList(){
    const { order_statuses } = await this.client.request<{order_statuses: {
      order_status_id: number;
      name: string
    }[]}>(GET_ORDER_STATUS)

    return order_statuses
  }
}
