import { useState } from "react";
import { Quantity } from "../../../../../../packages/ui/src";
import { useUpdateOne } from "data_providers";
import { ProviderNames } from "../../../types/providers";
import { ICartProduct } from "../../../data/indexedDB";

export interface CardQtyProps {
  initialQty: number;
  indexedId: number;
  price: number;
  onDeleteTotal?: () => Promise<void> | void;
  onChangeQty?: () => Promise<void> | void;
}

export const CardQty = ({
  initialQty,
  indexedId,
  onDeleteTotal,
  onChangeQty
}: CardQtyProps) => {
  const [qty, setQty] = useState(initialQty);
  const updateCartProduct = useUpdateOne<ICartProduct>(ProviderNames.CART)

  return (
    <Quantity
      changeQuantity={async () => {
        updateCartProduct({
          id: indexedId,
          quantity: qty + 1
        })
        
        setQty((prev) => prev + 1);
        if (onChangeQty) await onChangeQty();
      }}
      quantity={qty}
      onDelete={async () => {
        
        if (qty <= 1 && onDeleteTotal) return await onDeleteTotal();
        updateCartProduct({
          id: indexedId,
          quantity: qty - 1
        })
        setQty((prev) => prev - 1);
        if (onChangeQty) await onChangeQty();
      }}
    />
  );
};
