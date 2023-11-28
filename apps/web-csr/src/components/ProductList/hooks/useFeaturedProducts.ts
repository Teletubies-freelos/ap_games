import { useMemo } from 'react';
import {
  GetNextPageParamFunction,
  useInfiniteQuery,
} from '@tanstack/react-query';

import { useGetList } from 'data_providers';
import { ProviderNames } from '../../../types/providers';
import { CardProductProps } from '../../../../../../packages/ui/src/molecules/CardProduct';
import { IProduct } from '../../../services/Products';
import { ICategorySelected } from '../../../observables';

export const serializeGames = ({
  name = '',
  description = '',
  img_url: src = '',
  price = 0,
  product_id: productId = 0,
  discount_price,
  is_offer
}: IProduct) => ({
  description,
  price: (is_offer && discount_price)? discount_price: price,
  src,
  alt: name,
  title: name,
  productId,
  previousPrice: (is_offer && discount_price)? price : undefined
});

type Maybe<T> = T | undefined | null;

const getNextPage: GetNextPageParamFunction<IProduct[]> = (_lastPage, pages) => {
  return pages.length
};

export interface HookFilters{
  isLowerPrice?: boolean;
  isOffer?: boolean;
}

export const useProducts = (categorySelected: ICategorySelected,{isLowerPrice, isOffer}:HookFilters = {}) => {
  const getProducts = useGetList(ProviderNames.PRODUCTS, {payload:{
    filter: {
      isOffer,
      categorySelected
    },
    sort: { 
      ...(isLowerPrice? {price: 'asc'}: {})
    }
  }});

  const query = useInfiniteQuery({
    queryKey: ['list_games', isLowerPrice, isOffer, categorySelected],
    queryFn: async ({ pageParam = 0 }) =>
      await getProducts({ pagination: { limit: 20, page: pageParam } }),
    getNextPageParam: getNextPage,
    cacheTime: 5000*60,
    staleTime: 5000*60,
  });

  const products: Maybe<CardProductProps[]> = useMemo(
    () => query.data?.pages.flat().map(serializeGames),
    [query.data?.pages]
  );

  return {
    ...query,
    products,
  };
};

export const useProductsById = (productId: number) => {
  const getProducts = useGetList(ProviderNames.PRODUCTS, {payload:{
    filter: {
      productId
    }
  }});

  const query = useInfiniteQuery({
    queryKey: ['product_by_id', productId],
    queryFn: async ({ pageParam = 0 }) =>
      await getProducts({ pagination: { limit: 1, page: pageParam } }),
    getNextPageParam: getNextPage,
    cacheTime: 5000*60,
    staleTime: 5000*60,
  });

  const product: Maybe<CardProductProps> = useMemo(
    () => query.data?.pages.flat().map(serializeGames).find(x => x.productId == productId),
    [query.data?.pages]
  );

  return {
    ...query,
    product,
  };
};
