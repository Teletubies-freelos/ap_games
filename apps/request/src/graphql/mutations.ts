import { gql } from "graphql-request";

export const CREATE_PRODUCT = gql`
  mutation CREATE_PRODUCT(
    $description: String
    $img_url: String
    $name: String
    $price: float8
    $discount_price: float8
    $quantity: Int
    $category_id: Int
  ) {
    createProducts(
      object: {
        description: $description
        img_url: $img_url
        name: $name
        discount_price: $discount_price
        quantity: $quantity
        category_id: $category_id
        price: $price
        is_visible: true
      }
    ) {
      product_id
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation UPDATE_PRODUCT(
    $product_id: Int!
    $description: String!
    $img_url: String!
    $isVisible: Boolean!
    $name: String!
    $price: float8!
    $discount_price: float8!
    $quantity: Int
  ) {
    updateProductById(
      pk_columns: { product_id: $product_id }
      _set: {
        description: $description
        img_url: $img_url
        is_visible: $isVisible
        name: $name
        price: $price
        discount_price: $discount_price
        quantity: $quantity
      }
    ) {
      product_id
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation DELETE_PRODUCT($productId: Int!) {
    deleteProductById(product_id: $productId) {
      product_id
    }
  }
`;

export const CREATE_CATEGORY = gql`
  mutation CREATE_CATEGORY($name: String!) {
    createCategory(object: { name: $name }) {
      name
    }
  }
`;