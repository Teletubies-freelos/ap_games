import { useState } from "react";
import { Quantity } from "../../../../../../packages/ui/src";

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
  onChangeQty,
  price,
}: CardQtyProps) => {
  const [qty, setQty] = useState(initialQty);

  return (
    <Quantity
      changeQuantity={async () => {
        if (onChangeQty) await onChangeQty();

        setQty((prev) => prev + 1);
      }}
      quantity={qty}
      onDelete={async () => {
        if (onChangeQty) await onChangeQty();

        if (qty <= 1 && onDeleteTotal) return await onDeleteTotal();

        setQty((prev) => prev - 1);
      }}
    />
  );
};
