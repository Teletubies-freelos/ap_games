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
import { setCategoryIdSelected, setIsWishList } from "../../observables";

const sxProductListHeader: SxProps = {
  width: "100%",
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-between",
  marginBottom: 2,
  alignItems: "center",
  gap: 2,
};


export default function ProductsList({ categoryId, categories }: { categoryId: number, categories: any }) {
  const [filters, setFilters] = useState<HookFilters>({});

  const { products, fetchNextPage } = useProducts(categoryId, filters);

  const _handleChange = (event: SelectChangeEvent) => {
    event.preventDefault();
    const id = Number(event.target.value);

    setCategoryIdSelected(id);
  };

  const loadMore = useCallback(() => {
    fetchNextPage();
  }, [fetchNextPage]);

  const ItemContent = useMemo(() => itemContentRender(()=>setIsWishList(true)), []);

  return (
    <Paper
      id="product-list"
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
            value: categoryId ?? "all"
          }}
          defaultValue={categoryId || "all"}
          onChange={_handleChange}
          sxForm={{
            width: { xs: "100%", md: "30%" },
            order: { xs: "2", md: "3" },
          }}
        >
          <MenuItem value={"all"}>
            Todos
          </MenuItem>
          {categories?.map(({ category_id, name }: { category_id: number, name: string }) => (
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
