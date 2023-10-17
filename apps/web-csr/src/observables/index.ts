import { bind } from '@react-rxjs/core';
import { createSignal } from '@react-rxjs/utils';
import { CardProductProps } from '../../../../packages/ui/src/molecules/CardProduct';
import { Maybe } from '../types';

export const [isCartOpenChange$, setIsCartOpen] = createSignal<boolean>();
export const [isWishList$, setIsWishList] = createSignal<boolean | undefined>();

export const [useIsCartOpen, text$] = bind(isCartOpenChange$, false);
export const [useIsCartFloatOpen, isWishListOpen$] = bind(isWishList$, false);


export const [isYourData$, setIsYourData] = createSignal<boolean | undefined>();
export const [useIsYourDataOpen, isYourDataOpen$] = bind(isYourData$, false);

export const [isPaymentData$, setIsPaymentData] = createSignal<boolean | undefined>();
export const [useIsPaymentDataOpen, isPaymentDataOpen$] = bind(isPaymentData$, false);

export const [isConfirmedOrder$, setIsConfirmedOrder] = createSignal<boolean | undefined>();
export const [useIsConfirmedOrderOpen, isConfirmedOrderOpen$] = bind(isConfirmedOrder$, false);

export const [isConfirmedStore$, setIsConfirmedStore] = createSignal<boolean | undefined>();
export const [useIsConfirmedStoreOpen, isConfirmedStoreOpen$] = bind(isConfirmedStore$, false);

export const [isPickupStore$, setIsPickupStore] = createSignal<boolean | undefined>();
export const [useIsPickupStoreOpen, isPickupStoreOpen$] = bind(isPickupStore$, false);

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

export interface IModalState{
  currentModal?: ModalState;
  prevModal?: ModalState;
}

export const [modalStateChange$, setModalState] = createSignal<IModalState>()
export const [useModalState, modalState$] = bind(modalStateChange$, {})

export const [productDetail$, setProductDetail] = createSignal<Maybe<CardProductProps>>();
export const [useProductDetail, productDetailDefault$] = bind(productDetail$, null);
