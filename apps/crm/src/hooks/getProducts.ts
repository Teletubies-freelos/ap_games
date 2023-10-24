import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { MRT_PaginationState } from 'material-react-table';
import { AsyncProviderNames } from '../types/providers';
import { useGetList } from 'data_providers';

export const useGetProducts = () => {
  const [page, setPage] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 20,
  });

  const getAllProducts = useGetList(AsyncProviderNames.PRODUCTS);
  const queryData = useQuery(
    ['all_products_table'],
    async () => await getAllProducts()
  );

  return {
    ...queryData,
    setPage,
    pagination: page,
  };
};
