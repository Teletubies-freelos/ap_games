import { GraphQLClient } from 'graphql-request';
import { IDataProvider, IGetListParams } from 'data_providers';
import { GET_PRODUCTS_BY_CATEGORY, GET_PRODUCTS_BY_ID, GET_PRODUCTS_BY_SUB_CATEGORY, GET_PRODUCTS_SEARCH, GET_PRODUCTS_VISIBLE, GET_PRODUCT_DATA_IS_OFFER, GET_PRODUCT_DATA_IS_OFFER_BY_CATEGORY_ID, GET_PRODUCT_DATA_LOW_PRICE, GET_PRODUCT_DATA_LOW_PRICE_BY_CATEGORY } from '../../../request/src/graphql/queries';

export interface IProduct {
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
  constructor(private client: GraphQLClient) { }

  private resolveProductsQuery(isOffer: boolean, isLowerPrice: boolean, withCategoryId: boolean, withSubCategoryId: boolean, withProductId: boolean) {
    if (withProductId) {
      return GET_PRODUCTS_BY_ID
    }

    if (!withCategoryId) {
      if (isOffer)
        return GET_PRODUCT_DATA_IS_OFFER

      if (isLowerPrice)
        return GET_PRODUCT_DATA_LOW_PRICE

      return GET_PRODUCTS_VISIBLE
    }

    if (isOffer)
      return GET_PRODUCT_DATA_IS_OFFER_BY_CATEGORY_ID

    if (isLowerPrice)
      return GET_PRODUCT_DATA_LOW_PRICE_BY_CATEGORY

    if (withSubCategoryId)
      return GET_PRODUCTS_BY_SUB_CATEGORY;
  
    return GET_PRODUCTS_BY_CATEGORY
  }

  async getList({ pagination, filter, sort }: IGetListParams) {
    const { limit = 10, page = 0 } = pagination ?? {};
    const { isOffer = false, categorySelected, productId, name, isAlike } = filter ?? {}
    const { price } = sort ?? {}

    if (isAlike && name) {
      const { products } = await this.client.request<{ products: IProduct[] }>(
        GET_PRODUCTS_SEARCH,
        {
          name: `%${name}%`
        }
      )
      return products
    }

    const withCategoryId = categorySelected?.category_id && categorySelected?.category_id != 0 && !Number.isNaN(categorySelected?.category_id)
    const withSubCategoryId = categorySelected?.sub_category_id && categorySelected?.sub_category_id != 0 && !Number.isNaN(categorySelected?.sub_category_id)
    const withProductId = !Number.isNaN(productId) && productId != null
    const { products } = await this.client.request<{ products: IProduct[] }>(
      this.resolveProductsQuery(isOffer, price === 'asc', withCategoryId, withSubCategoryId, withProductId),
      {
        limit,
        offset: page * limit,
        ...(withCategoryId ? { categoryId: categorySelected.category_id } : {}),
        ...(withSubCategoryId ? { categoryId: categorySelected.category_id, subCategoryId: categorySelected.sub_category_id } : {}),
        ...(productId ? { productId } : {})
      }
    );

    return products;
  }
}
