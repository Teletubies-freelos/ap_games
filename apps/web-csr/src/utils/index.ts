import { useEffect, useState } from "react";
import type { BehaviorSubject } from "rxjs";
import { ICartProduct } from "../data/indexedDB"

export const reduceTotalPrice = (products?: ICartProduct[]) => products
  ?.reduce(
    (acm, {quantity, price, priceDiscount})=> acm  + (priceDiscount || price)*quantity,
    0
  )

export const reduceQuantity = (products?: ICartProduct[]) => products
    ?.reduce(
      (acm, {quantity})=> acm + quantity, 
      0
    )

export interface ControlState<Data>{
  data?: Data;
  previousState?: ControlState<Data>
}

export function bindLense<T = unknown>(subject: BehaviorSubject<T>):[(nextValue: T )=> void, () => T]{
  return [
    value => subject.next(value),
    ()=>{
      const [ value, setValue ] = useState<T>(subject.value)

      useEffect(()=>{
        const subscription = subject.subscribe(setValue);

        return ()=> subscription.unsubscribe();
      }, [])

      return value
    }
  ]
}

export function orderControlsLense<T>(subject: BehaviorSubject<ControlState<T> | undefined>){
  const [setState, useObserverState] = bindLense(subject)
  return {
    setState,
    useObserverState,
    setPrevState: () => setState(subject.value?.previousState),
    setNextState: (nextStateName: T) => setState({
    data: nextStateName,
    previousState: subject.value
  })}
}
