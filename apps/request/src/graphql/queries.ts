import { gql } from 'graphql-request';
import { ORDER_DATA, PRODUCT_DATA } from './fragments';

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

export const GET_PRODUCT_BY_CATEGORY = gql`
  query GET_PRODUCT_BY_CATEGORY(
    $limit: Int,
    $offset: Int,
    $categoryId: Int
  ) {
    products(
      limit: $limit
      offset: $offset
      order_by: { category_id: desc }
      where: { category_id: { _eq: $categoryId } }
    ) {
      ...PRODUCT_DATA
    }
  }

  ${PRODUCT_DATA}
`;

export const GET_CATEGORIES = gql`
  query GET_CATEGORIES(
    $limit: Int!
    $offset: Int!
  ) {
    categories(
      limit: $limit,
      offset: $offset,
      order_by: {category_id: desc}
    ) {
      category_id
      name
    }
  }
`;

export const GET_ORDERS = gql`
  query GET_ORDERS($limit: Int!, $offset: Int!) {
    Orders(
      limit: $limit,
      offset: $offset,
      order_by: { create_date: desc }
    ) {
      ...ORDER_DATA
    }
  }

  ${ORDER_DATA}
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
