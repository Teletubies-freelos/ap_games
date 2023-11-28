import { IDataProvider, IGetListParams } from "data_providers";
import { GraphQLClient } from "graphql-request";
import { GET_CATEGORIES } from "../../../request/src/graphql/queries";

export interface ICategory{
  category_id: number;
  name: string;
  sub_categories: {
    name: string
    sub_category_id: number;
    category_id: number;
  }
}

export class Categories implements IDataProvider {
  constructor(private client: GraphQLClient){}

  async getList({ pagination }: IGetListParams ={}){
    const { limit = 20, page = 0} = pagination ?? {}
    const { categories_aggregate } = await this.client.request<{categories_aggregate: any}>(GET_CATEGORIES, {
      limit,
      offset: limit*page
    })

    return categories_aggregate?.nodes
  }

}
