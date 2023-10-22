import { Modal as ModalMUI, Typography } from '@mui/material';
import { ModalState, setModalState, useModalState } from '../../observables';
import ProductDetailModal from '../ProductDetailModal';
import { BodyCart, CartModal } from '../cart';
import PickupStoreModal from '../PickupStoreModal';
import PickupStoreBody from '../PickupStoreModal/PickupStoreBody';
import ClientDataModal from '../ClientDataModal';
import PaymentMethodModal from '../PaymentMethodModal';
import ConfirmOrderDelivery from '../ConfirmOrder/ConfirmOrderDelivery';

const modals = {
  [ModalState.CART]: () => <CartModal content={<BodyCart />} />,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [ModalState.DETAIL]: (props?: any) => (
    <ProductDetailModal productId={props.data.productId} />
  ),
  [ModalState.DELIVERY_CENTRAL_CLIENT_DATA]: () => <ClientDataModal />,
  [ModalState.DELIVERY_CENTRAL_CONFIRMATION]: () => <ConfirmOrderDelivery />,
  [ModalState.DELIVERY_CENTRAL_PAYMENT_METHOD]: () => <PaymentMethodModal />,
  [ModalState.IN_STORE_CONFIRMATION]: () => (
    <CartModal content={<BodyCart />} />
  ),
  [ModalState.IN_STORE_SUMMARY]: () => (
    <PickupStoreModal content={<PickupStoreBody />} />
  ),
};

export const Modal = () => {
  const modalState = useModalState();

  return (
    <ModalMUI
      onClose={() => setModalState(undefined)}
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
