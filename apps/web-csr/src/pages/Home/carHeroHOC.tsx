import { useCreateOne } from "data_providers";
import { CardHero } from "../../../../../packages/ui/src";
import { ProviderNames } from "../../types/providers";

export interface IOffer {
  product_id?: string | number;
  description?: string;
  image_url?: string;
  name?: string;
  price_offer?: number;
  quantity?: number;
  price?: number;
  category_id?: number;
}

export const CardHeroHOC = ({
  image_url = '',
  description = '',
  product_id = '',
  name = '',
  price = 0,
}: IOffer) => {
  const createCartProduct = useCreateOne(ProviderNames.CART, {payload: {
    image_url,
    description,
    product_id,
    name,
    price
  }})

  return (
    <CardHero
      onClick={async ()=> await createCartProduct()}
      alt=''
      description={description}
      image={image_url}
      key={image_url ?? ''}
    />
  );
};
