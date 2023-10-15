import { GraphQLClient } from 'graphql-request';
import { IDataProvider, IGetListParams } from 'data_providers';
import { GET_PRODUCTS, GET_PRODUCT_DATA_IS_OFFER, GET_PRODUCT_DATA_LOW_PRICE } from '../../../request/src/graphql/queries';

export interface IProduct{
  product_id: number;
  name: string;
  description: string;
  price: number;
  discount_price?: number;
  is_offer?: boolean;
  img_url: boolean;
  quantity: number;
}

export class Products implements IDataProvider {
  constructor(private client: GraphQLClient) {}

  private static productsQueries = {
    isOffer: GET_PRODUCT_DATA_IS_OFFER,
    lowerPrice: GET_PRODUCT_DATA_LOW_PRICE,
    default: GET_PRODUCTS
  }

  private resolveProductsQuery(isOffer: boolean, isLowerPrice: boolean){
    if(isOffer)
      return 'isOffer'
  
    if(isLowerPrice)
      return 'lowerPrice'

    return 'default'
  }

  async getList({ pagination, filter, sort }: IGetListParams) {
    const { limit = 10, page = 0 } = pagination ?? {};
    const { isOffer = false } = filter ?? {}
    const { price } = sort ?? {}

    console.log(pagination, filter, sort)

    const productsQueryState = this.resolveProductsQuery(isOffer, price === 'asc')

    const { products } = await this.client.request<{ products: IProduct[] }>(
      Products.productsQueries[productsQueryState],
      {
        limit,
        offset: page * limit,
      }
    );

    return products;
  }
}
