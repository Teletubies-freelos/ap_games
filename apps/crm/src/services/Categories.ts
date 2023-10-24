import { GraphQLClient } from 'graphql-request';
import { GET_CATEGORIES } from '../../../request/src/graphql/queries';

export interface ICategory {
  category_id: number;
  name: string;
}

export class CategoriesData {
  constructor(private client: GraphQLClient) {}

  async getList() {
    const { categories } = await this.client.request<{
      categories: ICategory[];
    }>(GET_CATEGORIES);

    return categories;
  }
}
