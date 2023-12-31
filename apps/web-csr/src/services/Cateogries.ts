import { IDataProvider, IGetListParams } from "data_providers";
import { GraphQLClient } from "graphql-request";
import { GET_CATEGORIES } from "../../../request/src/graphql/queries";

export interface ICategory{
  category_id: number;
  name: string;
}

export class Categories implements IDataProvider {
  constructor(private client: GraphQLClient){}

  async getList({ pagination }: IGetListParams ={}){
    const { limit = 20, page = 0} = pagination ?? {}
    const { categories } = await this.client.request<{categories: ICategory[]}>(GET_CATEGORIES, {
      limit,
      offset: limit*page
    })

    return categories
  }

}
