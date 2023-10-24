import { type GraphQLClient, gql } from 'graphql-request';
import { QueryManyOptions } from '../../types/request';

export interface GamesResponse {
  product_id: string | number;
  name: string;
  description: string;
  price: number;
  price_offer: number;
  quantity: number;
  image_url: string;
}

export interface CreateGamesPayload {
  name: string;
  banner_img_url?: string;
  category_id: number;
  description: string;
  discount_price?: number;
  img_url: string;
  is_offer?: boolean;
  is_visible?: boolean;
  price: number;
  quantity: number;
  secondary_img_url?: string;
}

export interface GetProductFilters {
  categoryId?: number | string;
}

export class Products {
  static GET_LIST = gql`
    query GET_PAGINATED_GAMES($limit: Int!, $offset: Int) {
      games(limit: $limit, offset: $offset) {
        description
        id
        img_url
        price
        name
      }
    }
  `;

  static GET_PRODUCTS = gql`
    query GetProducts($limit: Int, $offset: Int) {
      Products(limit: $limit, offset: $offset, order_by: { updated_at: desc }) {
        banner_img_url
        category_id
        description
        discount_price
        img_url
        is_offer
        is_visible
        name
        price
        product_id
        quantity
        secondary_img_url
      }
    }
  `;

  static CREATE_PRODUCT = gql`
    mutation CREATE_PRODUCT(
      $description: String
      $img_url: String
      $name: String
      $price: float8
      $discount_price: float8
      $quantity: Int
      $category_id: Int
      $banner_img_url: String
      $is_offer: Boolean
      $is_visible: Boolean
      $secondary_img_url: String
    ) {
      insert_products_one(
        object: {
          name :$name
          category_id: $category_id;
          description:$description
          img_url: $img_url;
          price: $price;
          quantity: $quantity;
          discount_price: $discount_price;
          banner_img_url: $banner_img_url;
          is_offer: $is_offer;
          is_visible: $is_visible;
          secondary_img_url: $secondary_img_url;
        }
      ) {
        product_id
      }
    }
  `;

  static GET_PRODUCT = gql`
    query GetProducts($limit: Int, $offset: Int, $categoryId: Int) {
      Products(
        limit: $limit
        offset: $offset
        order_by: { category_id: desc }
        where: { category_id: { _eq: $categoryId } }
      ) {
        quantity
        product_id
        price_offer
        price
        name
        is_visible
        image_url
        description
        category_id
      }
    }
  `;

  static DELETE_PRODUCT = gql`
    mutation MyMutation($productId: Int!) {
      delete_Products_by_pk(product_id: $productId) {
        product_id
      }
    }
  `;

  static UPDATE_PRODUCT = gql`
    mutation MyMutation(
      $product_id: Int!
      $description: String!
      $image_url: String!
      $isVisible: Boolean!
      $name: String!
      $price: float8!
      $price_offer: float8!
      $quantity: Int
    ) {
      update_Products_by_pk(
        pk_columns: { product_id: $product_id }
        _set: {
          description: $description
          image_url: $image_url
          is_visible: $isVisible
          name: $name
          price: $price
          price_offer: $price_offer
          quantity: $quantity
        }
      ) {
        product_id
      }
    }
  `;

  constructor(private client: GraphQLClient) {}

  async getList({
    pagination = {},
    filters = {},
  }: QueryManyOptions<GetProductFilters> = {}) {
    const { limit = 20, offset = 0 } = pagination;
    const { categoryId } = filters;

    const { Products: games } = await this.client.request<{
      Products: GamesResponse[];
    }>(Products.GET_PRODUCT, { limit, offset, categoryId: Number(categoryId) });

    return games;
  }

  async createOne(payload: CreateGamesPayload) {
    const { insert_products_one } = await this.client.request<{
      insert_products_one: { id: string | number };
    }>(Products.CREATE_PRODUCT, { ...payload });

    return insert_products_one;
  }

  async deleteOne(productId: number | string) {
    const { delete_Products_by_pk } = await this.client.request<{
      delete_Products_by_pk: number | string;
    }>(Products.DELETE_PRODUCT, { productId });

    return delete_Products_by_pk;
  }

  async updateOne(
    product_id: number | string,
    payload: CreateGamesPayload
  ): Promise<boolean> {
    const { update_Products_by_pk } = await this.client.request<{
      update_Products_by_pk: boolean;
    }>(Products.UPDATE_PRODUCT, { product_id, ...payload, isVisible: true });

    return update_Products_by_pk;
  }
}
