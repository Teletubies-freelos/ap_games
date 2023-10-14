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
  }
`;
