import { GraphQLClient } from "graphql-request";
import { IDataProvider } from 'data_providers'

import { GET_PRODUCTS } from '../../../request/src/graphql/queries'

export class Products implements IDataProvider{
  constructor(private client: GraphQLClient){}
  
  async getList(){
    const { Products } = await this.client.request<{Products: unknown[]}>(GET_PRODUCTS)

    return Products;
  }
}
