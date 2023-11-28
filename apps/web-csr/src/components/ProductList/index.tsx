import {
  Accordion,
  AccordionSummary,
  Box,
  Chip,
  MenuItem,
  Paper,
  Typography,
  type SxProps,
  AccordionDetails,
  Stack,
} from "@mui/material";
import { VirtuosoGrid } from "react-virtuoso";
import { DropDown, Isotype } from "../../../../../packages/ui/src";
import { HookFilters, useProducts } from "./hooks/useFeaturedProducts";
import { Loading } from "./Loading";

import Filters from "./Filters";

import { itemContentRender } from "./Containers/itemContentRender";
import { ItemContainer, ListContainer } from "./Containers/ListContainer";
import { useCallback, useMemo, useState } from "react";
import { ICategorySelected, setCategoryIdSelected, setIsWishList } from "../../observables";
import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";
const sxProductListHeader: SxProps = {
  width: "100%",
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-between",
  marginBottom: 2,
  alignItems: "center",
  gap: 2,
};

export default function ProductsList({ categorySelected, categories }: { categorySelected: ICategorySelected, categories: any }) {
  const [filters, setFilters] = useState<HookFilters>({});

  const { products, fetchNextPage } = useProducts(categorySelected, filters);

  const _handleChangeCategory = (category_id: number, sub_category_id: number) => {

    setCategoryIdSelected({
      category_id,
      sub_category_id
    });
  };
  const loadMore = useCallback(() => {
    fetchNextPage();
  }, [fetchNextPage]);

  const ItemContent = useMemo(() => itemContentRender(() => setIsWishList(true)), []);

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
            value: categorySelected?.category_id ?? "all"
          }}
          defaultValue={categorySelected?.category_id || "all"}
          // onChange={_handleChange}
          sxForm={{
            width: { xs: "100%", md: "30%" },
            order: { xs: "2", md: "3" },
          }}
        >
          <MenuItem value={"all"} onClick={() => {_handleChangeCategory(0, 0)}}>
            Todos
          </MenuItem>
          {categories?.map(({ category_id, name, sub_categories }: { category_id: number, name: string, sub_categories: any[] }) => (
            <Accordion
              sx={{
                background: "transparent",
                boxShadow: "none",
                margin: "0 !important"
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{
                  minHeight: "0 !important",
                  "& .MuiAccordionSummary-expandIconWrapper": {
                    color: "text.secondary"
                  }
                }}
              >
                <Typography>{name}</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ padding: "0 0 1dvh 2dvh" }}>
                <Stack>
                  {sub_categories?.map(({ sub_category_id, name }) => (
                    <MenuItem
                      component="a"
                      key={`category-${category_id}-${sub_category_id}`}
                      onClick={() => _handleChangeCategory(category_id, sub_category_id)}
                      sx={{ textDecoration: "none" }}
                    >
                      <Typography
                        sx={{
                          fontWeight: 400,
                          color: "text.primary"
                        }}
                        onClick={() => {
                          // handleClose()
                          _handleChangeCategory(category_id, sub_category_id)
                        }}
                      >
                        {name}
                      </Typography>
                    </MenuItem>
                  ))}
                </Stack>
              </AccordionDetails>
            </Accordion>
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
