import {
  Box,
  Chip,
  MenuItem,
  Paper,
  SelectChangeEvent,
  type SxProps,
} from "@mui/material";
import { VirtuosoGrid } from "react-virtuoso";
import { DropDown, Isotype } from "../../../../../packages/ui/src";
import { HookFilters, useProducts } from "./hooks/useFeaturedProducts";
import { Loading } from "./Loading";

import Filters from "./Filters";

import { itemContentRender } from "./Containers/itemContentRender";
import { ItemContainer, ListContainer } from "./Containers/ListContainer";
import { useCallback, useMemo, useState } from "react";
import { useGetList } from "data_providers";
import { ProviderNames } from "../../types/providers";
import { useQuery } from "@tanstack/react-query";
import { setIsWishList } from "../../observables";

const sxProductListHeader: SxProps = {
  width: "100%",
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-between",
  marginBottom: 2,
  alignItems: "center",
  gap: 2,
};

const useCategories = () => {
  const getCategories = useGetList(ProviderNames.CATEGORIES);

  const queryData = useQuery(["categories"], async () => await getCategories());

  return queryData;
};

export default function ProductsList() {
  const [filters, setFilters] = useState<HookFilters>({});
  const [categoryId, setCategoryId] = useState(Number.NaN);

  const { products, fetchNextPage } = useProducts(categoryId, filters);

  const { data: categories } = useCategories();

  const _handleChange = (event: SelectChangeEvent) => {
    event.preventDefault();
    const id = Number(event.target.value);

    setCategoryId(id);
  };

  const loadMore = useCallback(() => {
    fetchNextPage();
  }, [fetchNextPage]);

  const ItemContent = useMemo(() => itemContentRender(()=>setIsWishList(true)), []);

  return (
    <Paper
      sx={{
        padding: {
          xs: "2rem 1rem",
          sm: "2rem 3.5rem",
          md: "2rem 5.5rem",
          lg: "2rem 7.5rem",
        },
      }}
    >
      <Box sx={sxProductListHeader}>
        <Isotype
          sx={{
            order: "1",
            width: "3.5rem",
          }}
        />
        <DropDown
          selectProps={{
            defaultValue: "all",
          }}
          onChange={_handleChange}
          sxForm={{
            width: { xs: "80%", md: "30%" },
            order: { xs: "2", md: "3" },
          }}
        >
          <MenuItem value={"all"}>
            Todos
          </MenuItem>
          {categories?.map(({ category_id, name }) => (
            <MenuItem value={category_id} key={category_id}>
              Juegos {name}
            </MenuItem>
          ))}
        </DropDown>
        <Filters>
          <Chip
            variant={filters.isOffer ? "filled" : "outlined"}
            onClick={() => setFilters({ isOffer: true })}
            label="Ofertas"
            sx={{ cursor: "pointer" }}
          />
          <Chip
            variant={filters.isLowerPrice ? "filled" : "outlined"}
            onClick={() => setFilters({ isLowerPrice: true })}
            label="Precio más bajo"
            sx={{ cursor: "pointer" }}
          />
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
