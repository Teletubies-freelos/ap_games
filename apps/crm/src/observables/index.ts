import { createSignal } from '@react-rxjs/utils';
import { bind } from '@react-rxjs/core';
import { BehaviorSubject } from 'rxjs';

export const [isOpenCategory$, setIsOpenCategory] = createSignal<
  boolean | undefined
>();

export const [useIsOpenCategory, isOpenCategoryModal$] = bind(
  isOpenCategory$,
  false,
);

export const categoryId$ = new BehaviorSubject<number | string | undefined>(
  undefined,
);

export const isRefetchCategories$ = new BehaviorSubject(undefined);
export const isRefetchProducts$ = new BehaviorSubject<
  undefined | string | number
>(undefined);
