import { useCallback } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { ModalState, setModalState } from '../../observables';
import { CartIcon } from '../../../../../packages/ui/src';
import { useGetList } from 'data_providers';
import { ProviderNames } from '../../types/providers';

export const CartIconReactive = () => {
  const getCartList = useGetList(ProviderNames.CART);
  const productsCount = useLiveQuery(async () => (await getCartList()).length);

  const handleOnClick = useCallback(() => {
    setModalState({ data: { name: ModalState.CART } });
  }, []);

  return (
    <CartIcon
      onClick={handleOnClick}
      qty={productsCount}
      size='medium'
      data-testid='cartButton'
    />
  );
};
