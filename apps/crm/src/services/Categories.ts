import { GraphQLClient } from 'graphql-request';
import { GET_CATEGORIES } from '../../../request/src/graphql/queries';
import {
  CREATE_CATEGORY,
  DELETE_CATEGORY,
  UPDATE_CATEGORY,
} from '../../../request/src/graphql/mutations';
import { IDataProvider } from 'data_providers';

export interface ICategory {
  category_id: number;
  name: string;
  sub_categories?: ISubCategory[]
}

export interface ISubCategory {
  sub_category_id: number;
  category_id: number;
  name: string;
}
export class CategoriesData implements IDataProvider {
  constructor(private client: GraphQLClient) { }

  async getList() : Promise<ICategory[]> {
    const { categories_aggregate: categories } = await this.client.request<{
      categories_aggregate: any;
    }>(GET_CATEGORIES);

    return categories?.nodes;
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
