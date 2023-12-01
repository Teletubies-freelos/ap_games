import { useEffect, useState } from 'react';
import type { BehaviorSubject } from 'rxjs';
import { ICartProduct } from '../data/indexedDB';

export const reduceTotalPrice = (products?: ICartProduct[]) =>
  products?.reduce(
    (acm, { quantity, price, priceDiscount }) =>
      acm + (priceDiscount || price) * quantity,
    0
  );

export const reduceQuantity = (products?: ICartProduct[]) =>
  products?.reduce((acm, { quantity }) => acm + quantity, 0);

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

export async function getConfig(){
  //paso 1 : buscar config desde localstorage
  //paso 2 : verificar q la configuracion no se vencio
  // paso 3 : si la configuracion no existe o esta vencida traerla del backend
  //paso 4: con el resultado poblar la cache de react query
}

export function sumNumbers(num1?: number, num2?: number): number | string | undefined {
  // Use the nullish coalescing operator to default to 0 if num1 or num2 is undefined
  // @ts-ignore
  const result : number = parseInt(num1 ?? 0) + parseInt(num2 ?? 0);

  // Check if result is undefined
  if (result === undefined) {
    return undefined;
  }

  // Return the result as a string with two decimal places
  return result.toFixed(2);
}