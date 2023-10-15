import { IDataProvider } from "data_providers";
import { GraphQLClient } from "graphql-request";
import { GET_FEATURED_PRODUCTS } from "../../../request/src/graphql/queries";


interface IFeatured{
  featured_id: number;
  title: string;
  description: string;
  banner_img_url: string;
}

export class Featured implements IDataProvider{
  constructor(private client: GraphQLClient){}

  async getList(){
    const { featureds } = await this.client.request<{featureds: IFeatured[]}>(GET_FEATURED_PRODUCTS)

    return featureds
  }
}
