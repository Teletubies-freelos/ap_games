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

export const [isEdit$, setIsEdit] = createSignal<boolean>();
export const [useIsEdit, isEditDefault$] = bind(isEdit$, false);
