import { GraphQLClient } from 'graphql-request';
import { GET_CATEGORIES } from '../../../request/src/graphql/queries';
import {
  CREATE_CATEGORY,
  DELETE_CATEGORY,
  UPDATE_CATEGORY,
} from '../../../request/src/graphql/mutations';

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

  async deleteOne(payload: number) {
    const { delete_categories_by_pk } = await this.client.request<{
      delete_categories_by_pk: ICategory;
    }>(DELETE_CATEGORY, { category_id: payload });

    return delete_categories_by_pk;
  }

  async createOne(payload: ICategory) {
    const { insert_categories_one } = await this.client.request<{
      insert_categories_one: ICategory;
    }>(CREATE_CATEGORY, { name: payload.name });

    return insert_categories_one;
  }

  async updateOne(payload: ICategory) {
    const { update_categories_by_pk } = await this.client.request<{
      update_categories_by_pk: ICategory;
    }>(UPDATE_CATEGORY, {
      category_id: payload.category_id,
      name: payload.name,
    });

    return update_categories_by_pk;
  }
}
