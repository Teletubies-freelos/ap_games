import { IDataProvider } from "data_providers";
import { GraphQLClient } from "graphql-request";
import { GET_CONFIG_CMS } from "../../../request/src/graphql/queries";

export class CmsConfig implements IDataProvider {
  constructor(private client: GraphQLClient) {}

  async getList() {
    const { configs } = await this.client.request<{
      configs: {
        name: string;
        name_es: string;
        value: string;
        meta: string;
      }[];
    }>(GET_CONFIG_CMS);

    return configs;
  }

}