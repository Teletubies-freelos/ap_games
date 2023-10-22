import { OrdersResponse } from '../services/orders';

const deserializeProducts = (data: OrdersResponse[]) => {
  return data?.map((order) => {
    return {
      ...order,
      products: JSON.parse(order.products)?.map((product) => {
        //product name and quantity
        return `${product.name}   x ${product.quantity}`;
      }),
    };
  });
};

const deserializeStatePayment = (order: OrdersResponse) => {
  return order.payment_state ? 'Pagado' : 'Pendiente';
};

export const finalProducts = (data: OrdersResponse[]) => {
  return data?.map((order: OrdersResponse) => {
    return {
      ...order,
      products: deserializeProducts([order])[0].products,
      payment_state: deserializeStatePayment(order),
    };
  });
};
