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

export const objectToSession = (object: Record<string, string | number>)=>Object
  .keys(object)
  .forEach((key)=> sessionStorage.setItem(key, String(object[key])))
