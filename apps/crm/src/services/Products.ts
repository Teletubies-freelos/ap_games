import { IDataProvider } from 'data_providers';
import { GraphQLClient } from 'graphql-request';
import { GET_PRODUCTS } from '../../../request/src/graphql/queries';
import {
  CREATE_PRODUCT,
  DELETE_PRODUCT,
} from '../../../request/src/graphql/mutations';

export interface IProduct {
  banner_img_url?: string;
  category_id: number;
  description: string;
  discount_price?: number;
  img_url: string;
  is_offer?: boolean;
  is_visible?: boolean;
  name: string;
  price: number;
  product_id: number;
  quantity: number;
  secondary_img_url?: string;
  updated_at?: string;
}

export class ProductsData implements IDataProvider {
  constructor(private client: GraphQLClient) {}

  async getList() {
    const { products } = await this.client.request<{ products: IProduct[] }>(
      GET_PRODUCTS
    );

    return products;
  }

  async createOne(payload: IProduct) {
    const { insert_products_one } = await this.client.request<{
      insert_products_one: IProduct;
    }>(CREATE_PRODUCT, { ...payload });

    return insert_products_one;
  }

  async deleteOne(payload: number) {
    const { delete_products_by_pk } = await this.client.request<{
      delete_products_by_pk: IProduct;
    }>(DELETE_PRODUCT, { product_id: payload });

    return delete_products_by_pk;
  }
}
