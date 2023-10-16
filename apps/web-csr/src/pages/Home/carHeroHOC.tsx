import { useCreateOne } from 'data_providers';
import { CardHero } from '../../../../../packages/ui/src';
import { ProviderNames } from '../../types/providers';

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
  featured_id,
  price = 0,
}: IFeatured) => {
  const createCartProduct = useCreateOne(ProviderNames.CART, {
    payload: {
      banner_img_url,
      description,
      featured_id,
      price,
    },
  });

  return (
    <CardHero
      onClick={async () => await createCartProduct()}
      alt=''
      description={description}
      image={banner_img_url}
      key={banner_img_url ?? ''}
    />
  );
};
