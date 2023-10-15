import { useMemo } from 'react';
import {
  GetNextPageParamFunction,
  useInfiniteQuery,
} from '@tanstack/react-query';


import { useGetList } from 'data_providers';
import { ProviderNames } from '../../../types/providers';
import type { IOffer } from '../../../pages/Home/carHeroHOC';
import { CardProductProps } from '../../../../../../packages/ui/src/molecules/CardProduct';

const serializeGames = ({
  name = '',
  description = '',
  image_url: src = '',
  price = 0,
}: IOffer) => ({
  description,
  price,
  src,
  alt: name,
  title: name,
});

type Maybe<T> = T | undefined | null

const getNextPage: GetNextPageParamFunction<IOffer[]> = (_lastPage, pages) => {
  return pages.length * 10;
};

export const useFeaturedProducts = () => {
  const getFeaturedProducts = useGetList(ProviderNames.PRODUCTS)

  const query = useInfiniteQuery({
    queryKey: ['list_games'],
    queryFn: ({ pageParam = 0 }) =>
    getFeaturedProducts({pagination:{limit: 20, page: pageParam}}),
    getNextPageParam: getNextPage,
  });

  const products: Maybe<CardProductProps[]> = useMemo(
    () => query.data?.pages.flat().map(serializeGames),
    [query.data?.pages],
  );

  return {
    ...query,
    products,
  };
};
