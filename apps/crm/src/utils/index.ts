import { ReactNode } from 'react';
import { OrdersResponse } from '../services/orders';

/* const deserializeProducts = (data) => {
  return data?.map((order) => {
    return {
      ...order,
      products: JSON.parse(order.products)?.map((product) => {
        //product name and quantity
        return `${product.name}   x ${product.quantity}`;
      }),
    };
  });
}; */

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

export const parsedDate = (date: string) => {
  return new Date(date).toLocaleString('es-PE', {
    timeZone: 'UTC',
    hour12: true,
  });
};

export const isEmpty = (render: ReactNode) => {
  return render ?? 'Sin datos';
};
