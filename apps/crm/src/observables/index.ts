import { createSignal } from '@react-rxjs/utils';
import { bind } from '@react-rxjs/core';
import { BehaviorSubject } from 'rxjs';
import { ControlState, orderControlsLense } from '../utils';

export enum ModalState {
  DELIVERY_COSTS = 'deliveryCostsClient',
  DELIVERY_COSTS_DETAIL = 'deliveryCostsDetail',
  DELIVERY_COSTS_DETAIL_UPDATE = 'deliveryCostsDetailUpdate',
  CATEGORY_DETAIL_CREATE = 'category',
  CATEGORY_DETAIL_UPDATE = 'categoryUpdate',
}
export interface ModalData {
  name: ModalState;
  meta?: any;
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

export const [isOpenCreateProduct$, setIsOpenCreateProduct] = createSignal<
  boolean | undefined
>();
export const [useIsOpenCreateProduct, isOpenCreateProductDefault$] = bind(
  isOpenCreateProduct$,
  false
);

export const [isOpenUpdateProduct$, setIsOpenUpdateProduct] = createSignal<boolean | undefined>();
export const [useIsOpenUpdateProduct, isOpenUpdateProductDefault$] = bind(
  isOpenUpdateProduct$,
  false
);

export const [isOpenUpdateOrder$, setIsOpenUpdateOrder] = createSignal<boolean | undefined>();
export const [useIsOpenUpdateOrder, isOpenUpdateOrderDefault$] = bind(
  isOpenUpdateOrder$,
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
