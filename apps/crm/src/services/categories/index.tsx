import { gql, type GraphQLClient } from 'graphql-request';

interface CategoryCreate {
  name: string;
}

interface CategoryResponse {
  category_id: string;
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
