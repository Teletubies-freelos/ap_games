import { bind } from '@react-rxjs/core';
import { createSignal } from '@react-rxjs/utils';

export const [isCartOpenChange$, setIsCartOpen] = createSignal<boolean>();
export const [isWishList$, setIsWishList] = createSignal<boolean | undefined>();

export const [useIsCartOpen, text$] = bind(isCartOpenChange$, false);
export const [useIsWishListOpen, isWishListOpen$] = bind(isWishList$, false);
