import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { MRT_PaginationState } from 'material-react-table';
import { useGetList } from 'data_providers';
import { AsyncProviderNames } from '../types/providers';

export const useOrders = () => {
  const [page, setPage] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 20,
  });

  const getAllOrders = useGetList(AsyncProviderNames.ORDERS);
  const queryData = useQuery(
    ['all_orders_table'],
    async () => await getAllOrders()
  );

  return {
    ...queryData,
    setPage,
    pagination: page,
    data: queryData.data || [],
  };
};
