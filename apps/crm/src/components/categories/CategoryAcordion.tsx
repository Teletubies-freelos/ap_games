import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useQuery } from '@tanstack/react-query';
import { useContext, useEffect, useState } from 'react';
import { dataContext } from '../../context/data';
import { Product } from '../product';
import {
  categoryId$,
  isRefetchProducts$,
  setIsOpenCategory,
} from '../../observables';

interface CategoryAcordionProps {
  id: string | number;
  name: string;
}

const CategoryAcordion = ({ id, name }: CategoryAcordionProps) => {
  const { products } = useContext(dataContext);
  const [isOpen, setIsOpen] = useState(false);

  const { data, refetch } = useQuery(
    ['products', id],
    async () =>
      await products?.getList({
        filters: {
          categoryId: id,
        },
        pagination: {
          limit: 100,
        },
      }),
    {
      enabled: isOpen,
      cacheTime: Number.MAX_VALUE,
      staleTime: Number.MAX_VALUE,
    },
  );

  /*  const { data } = useInfiniteQuery({
    queryKey: ['products', id],
    queryFn: async ({ pageParam = 0 }) =>
      await products?.getList({
        filters: {
          categoryId: id,
        },
        pagination: {
          offset: pageParam,
        },
      }),
    getNextPageParam: (_lastPage, pages) => pages.length + 1,
  });
 */
  const handleProductModal = () => {
    setIsOpenCategory(true);
    categoryId$.next(id);
  };

  useEffect(() => {
    const sub = isRefetchProducts$.subscribe((refetchId) => {
      if (refetchId === id) {
        refetch();
      }
    });
    return () => sub.unsubscribe();
  }, []);

  return (
    <Accordion expanded={isOpen} onChange={() => setIsOpen((prev) => !prev)}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls='panel1a-content'
        id='panel1a-header'
      >
        <Typography>{name}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Button variant='contained' onClick={handleProductModal}>
          {' '}
          Anadir Productos
        </Button>

        {data?.map(
          ({
            product_id,
            name,
            price,
            description,
            price_offer,
            image_url,
            quantity,
          }) => (
            <Product
              key={product_id}
              product_id={product_id}
              name={name}
              price={price}
              description={description}
              price_offer={price_offer}
              image_url={image_url}
              quantity={quantity}
            />
          ),
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export default CategoryAcordion;
