import { IDataProvider } from 'data_providers';
import { GraphQLClient } from 'graphql-request';
import { GET_PRODUCTS } from '../../../request/src/graphql/queries';

export interface IProduct{
  banner_img_url : string
    category_id : number
    description: string
    discount_price: number
    img_url: string
    is_offer: boolean
    is_visible: boolean
    name: string
    price: number
    product_id: number
    quantity: number
    secondary_img_url: string
}

export class ProductsData implements IDataProvider {
  constructor(private client: GraphQLClient) {}

  async getList() {
    const {products} = await this.client.request<{ products: IProduct[] }>(
      GET_PRODUCTS
    );

    return products;
  }

}