import { useCreateOne } from 'data_providers';
import { CardHero } from '../../../../../packages/ui/src';
import { ProviderNames } from '../../types/providers';
import { ICartProduct } from '../../data/indexedDB';
import { FeaturedDTO } from '../../../../migrations/src/types/tables';
import { useEffect, useState } from 'react';
import { cartProvider } from '../../modules';

export interface IFeatured {
  title: string;
  description: string;
  featured_id: number;
  banner_img_url: string;
  price: number;
}

export const CardHeroHOC = ({
  banner_img_url = '',
  description = '',
  price = 0,
  title = '',
  offer_price,
  product_id
}: FeaturedDTO) => {
  const [inCart, setInCart] = useState<boolean>()

  useEffect(()=>{
    cartProvider.getOne({id: product_id}).then(data => setInCart(!!data))
  }, [product_id])

  const createCartProduct = useCreateOne<ICartProduct>(ProviderNames.CART, {
    payload: {
      imageUrl: banner_img_url,
      name: title,
      priceDiscount: offer_price,
      price,
      quantity: 1,
      productId: product_id
    },
  });

  const handleClick = async ()=>{
    await createCartProduct()

    setInCart(true)
  }

  return (
    <CardHero
      isAlreadyOnCart={inCart}
      onClick={handleClick}
      alt=''
      description={description}
      image={banner_img_url}
      key={banner_img_url ?? ''}
    />
  );
};
