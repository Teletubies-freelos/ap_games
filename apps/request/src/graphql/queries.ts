import { gql } from 'graphql-request';
import { PRODUCT_DATA } from './fragments';

export const GET_PRODUCTS = gql`
  query GET_PRODUCTS($limit: Int, $offset: Int) {
    products(
      where: { is_visible: { _neq: true } }
      limit: $limit
      offset: $offset
      order_by: { updated_at: desc }
    ) {
      ...PRODUCT_DATA
    }
  }

  ${PRODUCT_DATA}
`;


export const GET_FEATURED_PRODUCTS = gql`
  query GET_FEATURED_PRODUCTS() {
    featureds{
      featured_id
      title
      description
      banner_img_url
    }
  }
`
