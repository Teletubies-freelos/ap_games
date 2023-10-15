import { ModalState, setModalState, useModalState } from "../../observables"
import { BodyCart, CartModal } from "../cart"
import { Modal as ModalMUI } from '@mui/material'

const modals = {
  [ModalState.CART]: <CartModal content={<BodyCart />} />,
  [ModalState.DETAIL]: <CartModal content={<BodyCart />} />,
  [ModalState.DELIVERY_CENTRAL_CLIENT_DATA]: <CartModal content={<BodyCart />} />,
  [ModalState.DELIVERY_CENTRAL_CONFIRMATION]: <CartModal content={<BodyCart />} />,
  [ModalState.DELIVERY_CENTRAL_PAYMENT_METHOD]: <CartModal content={<BodyCart />} />,
  [ModalState.IN_STORE_CONFIRMATION]: <CartModal content={<BodyCart />} />,
  [ModalState.IN_STORE_SUMMARY]: <CartModal content={<BodyCart />} />,
  
}

export const Modal = ()=>{
  const modalState = useModalState()

  return (<ModalMUI
      onClose={()=> setModalState({})}
      open={!!modalState.currentModal}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      {modals[modalState.currentModal ?? ModalState.CART]}
    </ModalMUI>
  )
}
