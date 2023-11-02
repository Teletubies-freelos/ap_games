import { Modal as ModalMUI } from '@mui/material';
import { ModalState, setModalState, useModalState } from '../../observables';
import ProductDetailModal from '../ProductDetailModal';
import { BodyCart, CartModal } from '../cart';
import PickupStoreProductsModal from '../PickupStoreProductsModal';
import PickupStoreProductsBody from '../PickupStoreProductsModal/PickupStoreProductsBody';
import ClientDataModal from '../ClientDataModal';
import PaymentMethodModal from '../PaymentMethodModal';
import ConfirmOrderDelivery from '../ConfirmOrder/ConfirmOrderDelivery';
import ConfirmOrderPickup from '../ConfirmOrder/ConfirmOrderPickup';
import { useDeleteMany } from 'data_providers';
import { ProviderNames } from '../../types/providers';
import PickupStoreInfoModal from '../PickupStoreInfoModal';
import PickupStorePreConfirmation from '../PickupStorePreConfirmation';

const modals = {
  [ModalState.CART]: () => <CartModal content={<BodyCart />} />,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [ModalState.DETAIL]: (props?: any) => (
    <ProductDetailModal productId={props.data.productId} />
  ),
  [ModalState.DELIVERY_CENTRAL_CLIENT_DATA]: () => <ClientDataModal />,
  [ModalState.DELIVERY_CENTRAL_CONFIRMATION]: () => <ConfirmOrderDelivery />,
  [ModalState.DELIVERY_CENTRAL_PAYMENT_METHOD]: () => <PaymentMethodModal />,
  [ModalState.IN_STORE_SUMMARY]: () => (<PickupStoreProductsModal content={<PickupStoreProductsBody />} />),
  [ModalState.IN_STORE_INFO_ORDER]: () => (<PickupStoreInfoModal />),
  [ModalState.IN_STORE_PRE_CONFIRMATION]: () => (<PickupStorePreConfirmation />),
  [ModalState.IN_STORE_CONFIRMATION]: () => (<ConfirmOrderPickup />),
};

export const Modal = () => {
  const modalState = useModalState();
  const cleanCart = useDeleteMany(ProviderNames.CART)

  const handleCloseModal = async ()=>{
    if(modalState?.data && [
      ModalState.DELIVERY_CENTRAL_CONFIRMATION, 
      ModalState.IN_STORE_CONFIRMATION
    ].includes(modalState?.data.name))
      await cleanCart()

    setModalState(undefined)
  }

  return (
    <ModalMUI
      onClose={handleCloseModal}
      open={!!modalState?.data}
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <>
        {!!modalState?.data &&
          modals[modalState?.data?.name]({ data: modalState.data.meta })}
      </>
    </ModalMUI>
  );
};
