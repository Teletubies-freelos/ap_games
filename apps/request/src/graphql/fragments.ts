import { gql } from 'graphql-request';

export const PRODUCT_DATA = gql`
  fragment PRODUCT_DATA on products {
    img_url
    banner_img_url
    discount_price
    description
    is_offer
    name
    quantity
    price
    product_id
    discount_price
    is_visible
    updated_at
    category {
      name
      category_id
    }
  }
`;

export const ORDER_DATA = gql`
  fragment ORDER_DATA on orderers {
    address
    client_name
    comment
    email
    order_id
    phone
    reference
    created_at
    order_status {
      name
      order_status_id
    }
    order_products {
      product {
        name
        price
        quantity
      }
      quantity
    }
    payment_method {
      name
      meta
      alternative_number
    }
  }
`;
