import { gql } from 'graphql-request';
import { ORDER_DATA, PRODUCT_DATA } from './fragments';

export const GET_PRODUCTS = gql`
  query GET_PRODUCTS($limit: Int, $offset: Int) {
    products(
      where: { is_visible: { _eq: true } }
      limit: $limit
      offset: $offset
      order_by: { updated_at: desc }
    ) {
      ...PRODUCT_DATA
    }
  }

  ${PRODUCT_DATA}
`;

export const GET_PRODUCTS_BY_CATEGORY = gql`
 query GET_PRODUCTS_BY_CATEGORY($limit: Int, $offset: Int, $categoryId: Int) {
    products(
      where: { is_visible: { _eq: true }, category_id: {_eq: $categoryId} }
      limit: $limit
      offset: $offset
      order_by: { updated_at: desc }
    ) {
      ...PRODUCT_DATA
    }
  }

  ${PRODUCT_DATA}
`

export const GET_PRODUCT_DATA_IS_OFFER = gql`
  query GET_PRODUCT_DATA_IS_OFFER($limit: Int, $offset: Int) {
    products(
      where: { is_visible: { _eq: true }, is_offer: {_eq: true} }
      limit: $limit
      offset: $offset
      order_by: { updated_at: desc }
    ) {
      ...PRODUCT_DATA
    }
  }

  ${PRODUCT_DATA}
`

export const GET_PRODUCT_DATA_IS_OFFER_BY_CATEGORY_ID = gql`
  query GET_PRODUCT_DATA_IS_OFFER_BY_CATEGORY_ID($limit: Int, $offset: Int, $categoryId: Int) {
    products(
      where: { is_visible: { _eq: true }, is_offer: {_eq: true}, category_id: {_eq: $categoryId} }
      limit: $limit
      offset: $offset
      order_by: { updated_at: desc }
    ) {
      ...PRODUCT_DATA
    }
  }

  ${PRODUCT_DATA}
`


export const GET_PRODUCT_DATA_LOW_PRICE_BY_CATEGORY = gql`
  query GET_PRODUCT_DATA_LOW_PRICE_BY_CATEGORY($limit: Int, $offset: Int, $categoryId: Int) {
    products(
      where: { is_visible: { _eq: true }, category_id: { _eq : $categoryId} }
      limit: $limit
      offset: $offset
      order_by: { updated_at: desc,  price: asc }
    ) {
      ...PRODUCT_DATA
    }
  }

  ${PRODUCT_DATA}
`

export const GET_PRODUCT_DATA_LOW_PRICE = gql`
  query GET_PRODUCT_DATA_LOW_PRICE($limit: Int, $offset: Int) {
    products(
      where: { is_visible: { _eq: true } }
      limit: $limit
      offset: $offset
      order_by: { updated_at: desc,  price: asc }
    ) {
      ...PRODUCT_DATA
    }
  }

  ${PRODUCT_DATA}
`

export const GET_CATEGORIES = gql`
  query GET_CATEGORIES($limit: Int!, $offset: Int!) {
    categories(
      limit: $limit
      offset: $offset
      order_by: { category_id: desc }
    ) {
      category_id
      name
    }
  }
`;

export const GET_ORDERS = gql`
  query GET_ORDERS($limit: Int!, $offset: Int!) {
    Orders(limit: $limit, offset: $offset, order_by: { create_date: desc }) {
      ...ORDER_DATA
    }
  }

  ${ORDER_DATA}
`;

export const GET_FEATURED_PRODUCTS = gql`
  query GET_FEATURED_PRODUCTS {
    featureds {
      banner_img_url
      description
      title
      featured_id
      price
    }
  }
`;
