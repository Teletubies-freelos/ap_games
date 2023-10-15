import { Box, Chip, MenuItem, Paper, type SxProps } from '@mui/material';
import { VirtuosoGrid } from 'react-virtuoso';
import { DropDown, Isotype } from '../../../../../packages/ui/src';
import { HookFilters, useProducts } from './hooks/useFeaturedProducts';
import { Loading } from './Loading';

import Filters from './Filters';

import { itemContentRender } from './Containers/itemContentRender';
import { ItemContainer, ListContainer } from './Containers/ListContainer';
import { useMemo, useState } from 'react';

const sxProductListHeader: SxProps = {
  width: '100%',
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  marginBottom: 2,
  alignItems: 'center',
  gap: 2,
};

export default function ProductsList() {
  const [filters, setFilters] = useState<HookFilters>({})

  const { products, fetchNextPage } = useProducts(filters);

  const loadMore = () => {
    fetchNextPage();
  };

  const ItemContent = useMemo(() => itemContentRender(), []);

  return (
    <Paper
      sx={{
        padding: {
          xs: '2rem 1rem',
          sm: '2rem 3.5rem',
          md: '2rem 5.5rem',
          lg: '2rem 7.5rem',
        },
      }}
    >
      <Box sx={sxProductListHeader}>
        <Isotype
          sx={{
            order: '1',
            width: '3.5rem',
          }}
        />
        <DropDown
          sxForm={{
            width: { xs: '80%', md: '30%' },
            order: { xs: '2', md: '3' },
          }}
        >
          <MenuItem value={1}>Juegos PS4</MenuItem>
          <MenuItem value={2}>Juegos PS5</MenuItem>
          <MenuItem value={3}>Juegos Switch</MenuItem>
          <MenuItem value={4}>Juegos Xbox</MenuItem>
        </DropDown>
        <Filters>
          <Chip onClick={()=> setFilters({isLowerPrice: true})} label="Precio más bajo" sx={{ cursor: "pointer" }} />
          <Chip onClick={()=>setFilters({isOffer: true})} label="Recién añañdidos" sx={{ cursor: "pointer" }} />
        </Filters>
      </Box>
      <VirtuosoGrid
        components={{
          Footer: Loading,
          Item: ItemContainer,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          List: ListContainer as any,
        }}
        data={products ?? []}
        endReached={loadMore}
        itemContent={ItemContent}
        overscan={5}
        style={{ height: 200 }}
        useWindowScroll
      />
    </Paper>
  );
}
