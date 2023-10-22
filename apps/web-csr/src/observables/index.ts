import { bind } from '@react-rxjs/core';
import { createSignal } from '@react-rxjs/utils';
import { BehaviorSubject } from 'rxjs';
import { ControlState, orderControlsLense } from '../utils';
import { isObserverDebugOn } from '../config/debug';

export const [isCartOpenChange$, setIsCartOpen] = createSignal<boolean>();
export const [isWishList$, setIsWishList] = createSignal<boolean | undefined>();

export const [useIsCartOpen, text$] = bind(isCartOpenChange$, false);
export const [useIsCartFloatOpen, isWishListOpen$] = bind(isWishList$, false);

export const [isYourData$, setIsYourData] = createSignal<boolean | undefined>();
export const [useIsYourDataOpen, isYourDataOpen$] = bind(isYourData$, false);

export const [isPaymentData$, setIsPaymentData] = createSignal<
  boolean | undefined
>();
export const [useIsPaymentDataOpen, isPaymentDataOpen$] = bind(
  isPaymentData$,
  false
);

export const [isConfirmedOrder$, setIsConfirmedOrder] = createSignal<
  boolean | undefined
>();
export const [useIsConfirmedOrderOpen, isConfirmedOrderOpen$] = bind(
  isConfirmedOrder$,
  false
);

export const [isConfirmedStore$, setIsConfirmedStore] = createSignal<
  boolean | undefined
>();
export const [useIsConfirmedStoreOpen, isConfirmedStoreOpen$] = bind(
  isConfirmedStore$,
  false
);

export const [isPickupStore$, setIsPickupStore] = createSignal<
  boolean | undefined
>();
export const [useIsPickupStoreOpen, isPickupStoreOpen$] = bind(
  isPickupStore$,
  false
);

export const [purchaseCode$, setPurchaseCode] = createSignal<string>();
export const [usePurchaseCode, purchaseCodeDefault$] = bind(purchaseCode$, '');

export enum ModalState {
  CART = 'cart',
  DETAIL = 'detail',
  IN_STORE_SUMMARY = 'inStoreSummary',
  IN_STORE_CONFIRMATION = 'inStoreConfirmation',
  DELIVERY_CENTRAL_CLIENT_DATA = 'deliveryCentralClientData',
  DELIVERY_CENTRAL_PAYMENT_METHOD = 'deliveryCentralPaymentMethod',
  DELIVERY_CENTRAL_CONFIRMATION = 'deliveryCentralConfirmation',
}

export interface ModalData {
  name: ModalState;
  meta?: Record<string, unknown>;
}

export const modalState$ = new BehaviorSubject<
  ControlState<ModalData> | undefined
>(undefined);

export const {
  setState: setModalState,
  useObserverState: useModalState,
  setNextState,
  setPrevState,
} = orderControlsLense<ModalData>(modalState$);

export const [anchorElMenu$, setAnchorElMenu] =
  createSignal<null | HTMLElement>();
export const [useAnchorElMenu, anchorElMenuDefault$] = bind(
  anchorElMenu$,
  null
);

export const [orderId$, setOrderId] = createSignal<string>();
export const [useOrderId, orderIdDefault$] = bind(orderId$, '');

if (import.meta.env.DEV && isObserverDebugOn) {
  modalState$.subscribe((next) => console.log('modalState', next));
}
