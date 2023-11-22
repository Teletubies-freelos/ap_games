import { GraphQLClient } from 'graphql-request';
import { IDataProvider, IGetListParams } from 'data_providers';
import { GET_PRODUCTS, GET_PRODUCTS_BY_CATEGORY, GET_PRODUCTS_BY_ID, GET_PRODUCTS_SEARCH, GET_PRODUCT_DATA_IS_OFFER, GET_PRODUCT_DATA_IS_OFFER_BY_CATEGORY_ID, GET_PRODUCT_DATA_LOW_PRICE, GET_PRODUCT_DATA_LOW_PRICE_BY_CATEGORY } from '../../../request/src/graphql/queries';

export interface IProduct{
  product_id: number;
  name: string;
  description: string;
  price: number;
  discount_price?: number;
  is_offer?: boolean;
  img_url: string;
  quantity: number;
  category_id: number;
  sub_category_id: number;
}

export class Products implements IDataProvider {
  constructor(private client: GraphQLClient) {}

  private resolveProductsQuery(isOffer: boolean, isLowerPrice: boolean, withCategoryId: boolean, withProductId: boolean){
    if(withProductId){
      return GET_PRODUCTS_BY_ID
    }

    if(!withCategoryId){
      if(isOffer)
        return GET_PRODUCT_DATA_IS_OFFER
    
      if(isLowerPrice)
        return GET_PRODUCT_DATA_LOW_PRICE
  
      return GET_PRODUCTS
    }

    if(isOffer)
      return GET_PRODUCT_DATA_IS_OFFER_BY_CATEGORY_ID

    if(isLowerPrice)
      return GET_PRODUCT_DATA_LOW_PRICE_BY_CATEGORY

    return GET_PRODUCTS_BY_CATEGORY
  }

  async getList({ pagination, filter, sort }: IGetListParams) {
    const { limit = 10, page = 0 } = pagination ?? {};
    const { isOffer = false, categoryId, productId, name,  isAlike} = filter ?? {}
    const { price } = sort ?? {}

    if(isAlike && name){
      const { products } = await this.client.request<{ products: IProduct[] }>(
        GET_PRODUCTS_SEARCH,
        {
          name: `%${name}%`
        }
      )

      return products

    }

    const withCategoryId = !Number.isNaN(categoryId)
    const withProductId = !Number.isNaN(productId) && productId != null
    const { products } = await this.client.request<{ products: IProduct[] }>(
      this.resolveProductsQuery(isOffer, price === 'asc', withCategoryId, withProductId),
      {
        limit,
        offset: page * limit,
        ...(withCategoryId? { categoryId } : {}),
        ...(productId? { productId } : {})
      }
    );

    return products;
  }
}
