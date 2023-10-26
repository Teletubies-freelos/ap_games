import { createSignal } from '@react-rxjs/utils';
import { bind } from '@react-rxjs/core';
import { BehaviorSubject } from 'rxjs';

export const [isOpenCreateProduct$, setIsOpenCreateProduct] = createSignal<
  boolean | undefined
>();

export const [useIsOpenCreateProduct, isOpenCreateProductDefault$] = bind(
  isOpenCreateProduct$,
  false
);

export const categoryId$ = new BehaviorSubject<number | string | undefined>(
  undefined
);

export const isRefetchCategories$ = new BehaviorSubject(undefined);
export const isRefetchProducts$ = new BehaviorSubject<
  undefined | string | number
>(undefined);

export const [isEditCategory$, setIsEditCategory] = createSignal<boolean>();
export const [useIsEditCategory, isEditCategoryDefault$] = bind(
  isEditCategory$,
  false
);

export const [isEditProduct$, setIsEditProduct] = createSignal<boolean>();
export const [useIsEditProduct, isEditProductDefault$] = bind(
  isEditProduct$,
  false
);
