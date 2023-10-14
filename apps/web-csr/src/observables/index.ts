import { bind } from '@react-rxjs/core';
import { createSignal } from '@react-rxjs/utils';

export const [isCartOpenChange$, setIsCartOpen] = createSignal<boolean>();
export const [isWishList$, setIsWishList] = createSignal<boolean | undefined>();

export const [useIsCartOpen, text$] = bind(isCartOpenChange$, false);
export const [useIsWishListOpen, isWishListOpen$] = bind(isWishList$, false);


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
