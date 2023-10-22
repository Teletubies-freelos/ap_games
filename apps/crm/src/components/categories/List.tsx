import { Stack } from '@mui/material';
import { useContext, useEffect } from 'react';
import { dataContext } from '../../context/data';
import { useQuery } from '@tanstack/react-query';
import CategoryAcordion from './CategoryAcordion';
import { isRefetchCategories$ } from '../../observables';

const List = () => {
  const { categories } = useContext(dataContext);
  const { data: dataCategories, refetch } = useQuery(
    ['categories'],
    async () =>
      await categories?.list({ limit: 10, offset: 0, orderBy: 'desc' }),
  );

  useEffect(() => {
    const sub = isRefetchCategories$.subscribe(() => {
      refetch();
    });

    return () => {
      sub.unsubscribe();
    };
  }, [refetch]);

  return (
    <Stack>
      {dataCategories?.map(({ category_id, name }) => (
        <CategoryAcordion key={category_id} name={name} id={category_id} />
      ))}
    </Stack>
  );
};

export default List;
