import { gql } from 'graphql-request';
import { ORDER_DATA, PRODUCT_DATA } from './fragments';

export const GET_PRODUCTS = gql`
  query GET_PRODUCTS($limit: Int, $offset: Int) {
    products(limit: $limit, offset: $offset, order_by: { updated_at: desc }) {
      ...PRODUCT_DATA
    }
  }

  ${PRODUCT_DATA}
`;

export const GET_PRODUCTS_BY_CATEGORY = gql`
  query GET_PRODUCTS_BY_CATEGORY($limit: Int, $offset: Int, $categoryId: Int) {
    products(
      where: { is_visible: { _eq: true }, category_id: { _eq: $categoryId } }
      limit: $limit
      offset: $offset
      order_by: { updated_at: desc }
    ) {
      ...PRODUCT_DATA
    }
  }

  ${PRODUCT_DATA}
`;

export const GET_PRODUCT_BY_ID = gql`
  query GET_PRODUCT_BY_ID($productId: Int) {
    products(
      where: { product_id: { _eq: $productId } }
    ) {
      ...PRODUCT_DATA
    }
  }

  ${PRODUCT_DATA}
`;

export const GET_PRODUCTS_BY_ID = gql`
  query GET_PRODUCTS_BY_ID($limit: Int, $offset: Int, $productId: Int) {
    products(
      where: { is_visible: { _eq: true }, product_id: { _eq: $productId } }
      limit: $limit
      offset: $offset
      order_by: { updated_at: desc }
    ) {
      ...PRODUCT_DATA
    }
  }

  ${PRODUCT_DATA}
`;


export const GET_PRODUCTS_SEARCH = gql`
  query GET_PRODUCTS_SEARCH($name: String){
    products(where: {name: {_ilike: $name}, is_visible: { _eq: true }}){
      name
      img_url
      price
      product_id
    }
  }
`

export const GET_PRODUCT_DATA_IS_OFFER = gql`
  query GET_PRODUCT_DATA_IS_OFFER($limit: Int, $offset: Int) {
    products(
      where: { is_visible: { _eq: true }, is_offer: { _eq: true } }
      limit: $limit
      offset: $offset
      order_by: { updated_at: desc }
    ) {
      ...PRODUCT_DATA
    }
  }

  ${PRODUCT_DATA}
`;

export const GET_PRODUCT_DATA_IS_OFFER_BY_CATEGORY_ID = gql`
  query GET_PRODUCT_DATA_IS_OFFER_BY_CATEGORY_ID(
    $limit: Int
    $offset: Int
    $categoryId: Int
  ) {
    products(
      where: {
        is_visible: { _eq: true }
        is_offer: { _eq: true }
        category_id: { _eq: $categoryId }
      }
      limit: $limit
      offset: $offset
      order_by: { updated_at: desc }
    ) {
      ...PRODUCT_DATA
    }
  }

  ${PRODUCT_DATA}
`;

export const GET_PRODUCT_DATA_LOW_PRICE_BY_CATEGORY = gql`
  query GET_PRODUCT_DATA_LOW_PRICE_BY_CATEGORY(
    $limit: Int
    $offset: Int
    $categoryId: Int
  ) {
    products(
      where: { is_visible: { _eq: true }, category_id: { _eq: $categoryId } }
      limit: $limit
      offset: $offset
      order_by: { updated_at: desc, price: asc }
    ) {
      ...PRODUCT_DATA
    }
  }

  ${PRODUCT_DATA}
`;

export const GET_PRODUCT_DATA_LOW_PRICE = gql`
  query GET_PRODUCT_DATA_LOW_PRICE($limit: Int, $offset: Int) {
    products(
      where: { is_visible: { _eq: true } }
      limit: $limit
      offset: $offset
      order_by: { updated_at: desc, price: asc }
    ) {
      ...PRODUCT_DATA
    }
  }

  ${PRODUCT_DATA}
`;

export const GET_CATEGORIES = gql`
  query GET_CATEGORIES($limit: Int, $offset: Int) {
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
  query GET_ORDERS($limit: Int, $offset: Int) {
    orderers(limit: $limit, offset: $offset, order_by: { created_at: desc }) {
      ...ORDER_DATA
    }
  }

  ${ORDER_DATA}
`;

export const GET_ORDERS_BY_ID = gql`
  query GET_ORDERS_BY_ID($orderId: uuid) {
    orderers(where: {order_id: {_eq: $orderId}}) {
      order_id
      email
      district_id
      delivery_way_id
      delivery_price
      created_at
      client_name
      comment
      address
      order_status_id
    }
  }
`;

export const GET_ORDER_STATUS_BY_ID = gql`
  query GET_ORDER_STATUS_BY_ID($id: uuid!) {
    orderers_by_pk(order_id: $id) {
      order_status {
        name
      }
      order_products {
        quantity
        product {
          price
          discount_price
          name
        }
      }
      created_at
      delivery_price
      delivery_way {
        token
        name
      }
    }
  }
`;

export const GET_FEATURED_PRODUCTS = gql`
  query GET_FEATURED_PRODUCTS {
    featureds {
      featured_id
      title
      description
      product_id
      banner_img_url
      offer_price
      price
    }
  }
`;

export const GET_PAYMENT_METHODS = gql`
  query GET_PAYMENT_METHODS($limit: Int!, $offset: Int!) {
    payment_methods(limit: $limit, offset: $offset) {
      payment_method_id
      name
      owner
      number
      alternative_number
      meta
      type
    }
  }
`;

export const GET_CONFIG_CMS = gql`
  query GET_CONFIG_CMS {
    configs {
      config_id
      name
      value
      meta
    }
  }
`;


export const GET_ORDER_STATUS = gql`
  query GET_ORDER_STATUS {
    order_statuses {
      name
      order_status_id
    }
}
`

export const GET_DELIVERY_WAYS = gql`
  query GET_DELIVERY_WAYS($limit: Int, $offset: Int) {
    delivery_way(
      limit: $limit
      offset: $offset
    ) {
      delivery_way_id
      name
      token
    }
  }
`;

export const GET_CONFIG = gql`
  query GET_CONFIG {
    configs {
      config_id
      name
      name_es
      value
      meta
      token
    }
  }
`;

export const GET_ORDER_STATUSES = gql`
  query GET_ORDER_STATUSES {
    order_statuses {
      order_status_id
      name
    }
  }`;