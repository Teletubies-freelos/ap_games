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
