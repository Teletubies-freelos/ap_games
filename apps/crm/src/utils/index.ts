import { ReactNode, useEffect, useState } from 'react';
import type { BehaviorSubject } from 'rxjs';
/* import { OrdersResponse } from '../services/orders'; */

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

/* const deserializeStatePayment = (order: OrdersResponse) => {
  return order.payment_state ? 'Pagado' : 'Pendiente';
}; */

/* export const finalProducts = (data: OrdersResponse[]) => {
  return data?.map((order: OrdersResponse) => {
    return {
      ...order,
      products: deserializeProducts([order])[0].products,
      payment_state: deserializeStatePayment(order),
    };
  });
}; */
export interface ControlState<Data> {
  data?: Data;
  previousState?: ControlState<Data>;
}

export function bindLense<T = unknown>(
  subject: BehaviorSubject<T>
): [(nextValue: T) => void, () => T] {
  return [
    (value) => subject.next(value),
    () => {
      const [value, setValue] = useState<T>(subject.value);

      useEffect(() => {
        const subscription = subject.subscribe(setValue);

        return () => subscription.unsubscribe();
      }, []);

      return value;
    },
  ];
}
export function orderControlsLense<T>(
  subject: BehaviorSubject<ControlState<T> | undefined>
) {
  const [setState, useObserverState] = bindLense(subject);
  return {
    setState,
    useObserverState,
    setPrevState: () => setState(subject.value?.previousState),
    setNextState: (nextStateData: T) =>
      setState({
        data: nextStateData,
        previousState: subject.value,
      }),
  };
}
export const parsedDate = (date: string) => {
  return new Date(date).toLocaleString('es-PE', {
    timeZone: 'UTC',
    hour12: true,
  });
};

export const isEmpty = (render: ReactNode) => {
  return render ?? 'Sin datos';
};

export enum ActionsEnum {
  CREATE,
  DELETE,
  UPDATE,
}