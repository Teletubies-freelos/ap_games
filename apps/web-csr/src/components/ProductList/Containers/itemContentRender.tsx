import { MouseEventHandler } from "react";
import { CardProduct } from "../../../../../../packages/ui/src";
import { cartProvider } from "../../../modules";

interface CardProductProps {
  readonly alt: string;
  readonly src: string;
  readonly title: string;
  readonly description: string;
  readonly price: number;
  readonly previousPrice?: number;
  readonly onAdd?: MouseEventHandler<HTMLButtonElement>;
  readonly className?: string;
}

export const itemContentRender = (handleOnClick?: (price: number)=>void) =>
  function (_index: number, product: CardProductProps) {
    const _handleOnClick = () => {
      cartProvider.createOne({
        imageUrl: product.src,
        name: product.title,
        price: product.price,
        quantity: 1,
        priceDiscount: 0,
        productId: product.title
      })

      if(handleOnClick)
        handleOnClick(product.price)
    }

    return <CardProduct {...product} onAdd={_handleOnClick} />;
  }
