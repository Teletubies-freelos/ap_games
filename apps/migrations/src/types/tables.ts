export enum Tables {
  PRODUCT = 'products',
  FEATURED = 'featureds',
  CATEGORY = 'categories',
  ORDER = 'orderers',
  ORDER_PRODUCT = 'order_products',
  ORDER_STATUS = 'order_statuses',
  PAYMENT_METHOD = 'payment_methods',
  DISTRICT = 'district',
  DEPARTMENT = 'department',
  PROVINCE = 'province',
  PAYMENT_ACCOUNT = 'payment_account',
}

export interface ProductDTO {
  id?: string;
  product_id?: number | string;
  name: string;
  description: string;
  price: number;
  discount_price?: number;
  is_offer?: boolean;
  is_visible?: boolean;
  img_url?: string;
  secondary_img_url?: string;
  banner_img_url?: string;
  quantity: number;
  category_id: number | string;
}

export interface OrderDTO {
  order_id?: string;
  address: string;
  client_name: string;
  phone: number;
  email: string;
  order_status_id: number;
  payment_method_id: number;
}

export interface OrderProductDTO {
  order_id: string;
  product_id: number;
}

export interface FeaturedDTO {
  featured_id?: number;
  title: string;
  description: string;
  product_id?: number;
  banner_img_url: string;
  offer_price?: number;
  price: number;
  is_offer?: boolean;
}
