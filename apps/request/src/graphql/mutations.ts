import { gql } from 'graphql-request';

export const CREATE_PRODUCT = gql`
  mutation CREATE_PRODUCT(
    $description: String
    $img_url: String
    $name: String
    $price: Float
    $discount_price: Float
    $quantity: Int
    $category_id: Int
    $banner_img_url: String
    $is_offer: Boolean
    $is_visible: Boolean
    $secondary_img_url: String
  ) {
    insert_products_one(
      object: {
        name: $name
        category_id: $category_id
        description: $description
        img_url: $img_url
        price: $price
        quantity: $quantity
        discount_price: $discount_price
        banner_img_url: $banner_img_url
        is_offer: $is_offer
        is_visible: $is_visible
        secondary_img_url: $secondary_img_url
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
  mutation DELETE_PRODUCT($product_id: Int!) {
    delete_products_by_pk(product_id: $product_id) {
      product_id
    }
  }
`;

export const CREATE_CATEGORY = gql`
  mutation CREATE_CATEGORY($name: String!) {
    insert_categories_one(object: { name: $name }) {
      name
    }
  }
`;

export const DELETE_CATEGORY = gql`
  mutation DELETE_CATEGORY($category_id: Int!) {
    delete_categories_by_pk(category_id: $category_id) {
      category_id
    }
  }
`;

export const UPDATE_CATEGORY = gql`
  mutation UPDATE_CATEGORY($category_id: Int!, $name: String!) {
    update_categories_by_pk(
      pk_columns: { category_id: $category_id }
      _set: { name: $name }
    ) {
      name
      category_id
    }
  }
`;

export const CREATE_ORDER = gql`
  mutation CREATE_ORDER(
    $address: String
    $client_name: String
    $email: String
    $phone: Int
    $district_id: Int
    $payment_method_id: Int
    $order_status_id: Int
    $comment: String
    $reference: String
    $delivery_way_id: Int
    $wsp_value: String
    $wsp_message: String
  ) {
    insert_orderers_one(
      object: {
        address: $address
        client_name: $client_name
        email: $email
        phone: $phone
        district_id: $district_id
        payment_method_id: $payment_method_id
        order_status_id: $order_status_id
        comment: $comment
        reference: $reference
        delivery_way_id: $delivery_way_id
        wsp_value: $wsp_value
        wsp_message: $wsp_message
      }
    ) {
      order_id
    }
  }
`;

export const CREATE_ORDER_PRODUCT_ONE = gql`
  mutation CREATE_ORDER_PRODUCT_ONE($order_id: String!, $product_id: Int!) {
    insert_order_products_one(
      object: { order_id: $order_id, product_id: $product_id }
    ) {
      returning {
        order_id
      }
    }
  }
`;

export const CREATE_ORDER_PRODUCTS = gql`
  mutation CREATE_ORDER_PRODUCT($objects: [order_products_insert_input!]!) {
    insert_order_products(objects: $objects) {
      returning {
        order_id
      }
    }
  }
`;
