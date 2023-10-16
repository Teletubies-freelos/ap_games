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
    insert_products(
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
    update_categories_by_pk(
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
    delete_products_by_pk(product_id: $productId) {
      product_id
    }
  }
`;

export const CREATE_CATEGORY = gql`
  mutation CREATE_CATEGORY($name: String!) {
    insert_categories(object: { name: $name }) {
      name
    }
  }
`;

export const CREATE_ORDER = gql`
  mutation CREATE_ORDER(
    $address: String,
    $client_name: String,
    $email: String,
    $phone: Int
  ) {
    insert_orderers(
      objects: {
        address: $address,
        client_name: $client_name,
        email: $email,
        order_id: $order_id,
        phone: $phone
      }
    ) {
      returning {
        order_id
      }
    }
  }
`
