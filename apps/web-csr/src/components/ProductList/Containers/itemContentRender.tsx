import { MouseEventHandler, useEffect, useState } from 'react';
import { CardProduct } from '../../../../../../packages/ui/src';
import { cartProvider } from '../../../modules';

interface CardProductProps {
  readonly alt: string;
  readonly src: string;
  readonly title: string;
  readonly description: string;
  readonly price: number;
  readonly previousPrice?: number;
  readonly onAdd?: MouseEventHandler<HTMLButtonElement>;
  readonly className?: string;
  readonly productId: string | number
}

interface CarProductWrapper extends CardProductProps{
  handleOnClick?: (price: number) => void
}

const CarProductWrapper = (props:CarProductWrapper)=>{
  const [inCart, setInCart] = useState<boolean>()

  const _handleOnClick = async () => {
    await cartProvider.createOne({
      imageUrl: props.src,
      name: props.title,
      price: props.price,
      quantity: 1,
      priceDiscount: 0,
      productId: props.productId,
    });

    setInCart(true)

    if (props.handleOnClick) props.handleOnClick(props.price);
  };

  useEffect(()=>{
    cartProvider.getOne({id: props.productId}).then(data => setInCart(!!data))
  }, [props.productId])

  return <CardProduct inCart={inCart} {...props} onAdd={_handleOnClick}/>
}

export const itemContentRender = (handleOnClick?: (price: number) => void) =>
  function (_index: number, product: CardProductProps) {
    

    return <CarProductWrapper {...product} handleOnClick={handleOnClick}/>
  };
