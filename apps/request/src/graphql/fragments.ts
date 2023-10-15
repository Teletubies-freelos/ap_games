import { gql } from 'graphql-request';

export const PRODUCT_DATA = gql`
  fragment PRODUCT_DATA on products {
    img_url
    discount_price
    description
    is_offer
    name
    quantity
    price
    product_id
    discount_price
    is_visible
    category_id
  }
`;

export const ORDER_DATA = gql`
  fragment ORDER_DATA on orderers {
    address
    client_name
    order_id
    payment_method {
      name
    }
    phone
  }
`
