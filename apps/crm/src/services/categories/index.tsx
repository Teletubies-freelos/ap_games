import { gql, type GraphQLClient } from 'graphql-request';

interface CategoryCreate {
  name: string;
}

interface ListOptions {
  limit?: number;
  offset?: number;
  orderBy?: string;
}

export class Categories {
  static INSERT_CATEGORIES = gql`
    mutation MyMutation($name: String!) {
      insert_Categories_one(object: { name: $name }) {
        name
      }
    }
  `;

  static GET_CATEGORIES = gql`
    query GET_CATEGORIES(
      $limit: Int!
      $offset: Int!
    ) {
      Categories(limit: $limit, offset: $offset, order_by: {category_id: desc}) {
        category_id
        name
      }
    }
  `;

  static GET_SUB_CATEGORIES_DELIVERY_COSTS = gql`
    query GET_SUB_CATEGORIES_DELIVERY_COSTS {
      sub_categories() {
        category_id
        name
      }
    }
  `;

  static GET_SUB_CATEGORIES_PRODUCTS = gql`
    query GET_SUB_CATEGORIES_PRODUCTS(
      subCategoryId: [Int]
    ) {
      products(where: {sub_category_id: {_in: subCategoryId}}) {
        product_id,
        sub_category_id
      }
    }
  `;

  static DELETE_SUB_CATEGORY_ = gql `
    query DELETE_SUB_CATEGORY_ {
      sub_categories() {
        category_id
        name
      }
    }
  `

  constructor(private client: GraphQLClient) {}

  async createOne(name: string) {
    const { insert_Categories_one } = await this.client.request<{
      insert_Categories_one: CategoryCreate;
    }>(Categories.INSERT_CATEGORIES, {
      name,
    });

    return insert_Categories_one;
  }

  async list({ limit = 20, offset = 0 }: ListOptions) {
    const { Categories: allCategories } = await this.client.request<{
      Categories: any;
    }>(Categories.GET_CATEGORIES, {
      limit,
      offset
    });

    return allCategories?.nodes;
  }
}
