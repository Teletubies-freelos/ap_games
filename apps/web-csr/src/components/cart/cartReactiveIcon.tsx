import { useCallback } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { ModalState, setModalState } from '../../observables';
import { CartIcon } from '../../../../../packages/ui/src';
import { useGetList } from 'data_providers';
import { ProviderNames } from '../../types/providers';
import { ICartProduct } from '../../data/indexedDB';

interface CartIconReactiveProps {
  reduceQuantity: (products: ICartProduct[] | undefined) => number | undefined;
}

export const CartIconReactive = ({ reduceQuantity }: CartIconReactiveProps) => {
  const getCartList = useGetList(ProviderNames.CART);
  const products = useLiveQuery(async () => await getCartList());
  const totalQuantity = reduceQuantity(products);

  const handleOnClick = useCallback(() => {
    setModalState({ data: { name: ModalState.CART } });
  }, []);

  return (
    <CartIcon
      onClick={handleOnClick}
      qty={totalQuantity}
      size='medium'
      data-testid='cartButton'
    />
  );
};
