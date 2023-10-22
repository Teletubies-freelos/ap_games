import { useContext, useState } from 'react';
import { dataContext } from '../context/data';
import { useQuery } from '@tanstack/react-query';
import { MRT_PaginationState } from 'material-react-table';
import { finalProducts } from '../utils';

export const useOrders = () => {
  const { orders } = useContext(dataContext);
  const [page, setPage] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 20,
  });

  const queryData = useQuery(['orders'], {
    queryFn: () =>
      orders?.getList({
        pagination: { offset: page.pageIndex * page.pageSize },
      }),
  });

  return {
    ...queryData,
    setPage,
    pagination: page,
    data: finalProducts(queryData.data || []),
  };
};
