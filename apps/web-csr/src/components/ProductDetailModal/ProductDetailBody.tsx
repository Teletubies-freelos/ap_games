import { Box, Button, Stack, Typography } from "@mui/material";
import { setIsWishList, setModalState } from "../../observables";
import { Discount, Tag } from "../../../../../packages/ui/src";
import { useCreateOne } from "data_providers";
import { ProviderNames } from "../../types/providers";
import { CardProductProps } from "../../../../../packages/ui/src/molecules/CardProduct";
import { ProductDetailPorps } from ".";
import { useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { serializeGames } from "../ProductList/hooks/useFeaturedProducts";
import { Maybe } from "../../types";
import { IProduct } from "../../services/Products";

export default function ProductDetailBody({ productId }: Readonly<ProductDetailPorps>) {
  const queryClient = useQueryClient()

  const query = queryClient.getQueryData<{pages: IProduct[][]}>(["list_games", null, null, null])

  const product: Maybe<CardProductProps> = useMemo(
    () => query?.pages.flat().map(serializeGames)?.find(( product: CardProductProps) => product.productId === productId ),
    [productId, query?.pages]
  );

  const createCartProduct = useCreateOne(ProviderNames.CART, {
    payload: {
      imageUrl: product?.src,
      name: product?.title,
      description: product?.description,
      product_id: productId,
      price: product?.price,
      quantity: 1,
      priceDiscount: 0,
    },
  });

  const _handleAddProduct = async () => {
    if(!product) return
  
    await createCartProduct()
    setModalState(undefined);
    setIsWishList(true);
  };

  return (
    <Box>
      <Stack
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 3,
          marginBottom: "14px"
        }}
      > 
        <Box>
          <img width={200} src={product?.src} alt={product?.alt} />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem"
          }}
        >
          {!!product?.previousPrice && (
            <Tag icon={<Discount />} label="Oferta" />
          )}
          <Box>
            <Typography
              variant="body1"
              sx={{ paddingBottom: ".5rem", fontSize: 18, fontWeight: 500 }}
            >
              Nombre
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontSize: "1rem" }}
            >
              { product?.title }
            </Typography>
          </Box>
          <Box>
            <Typography
              variant="body1"
              sx={{ paddingBottom: ".5rem", fontSize: 18, fontWeight: 500 }}
            >
              Descripción
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontSize: "1rem" }}
            >
              { product?.description }
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: "2.25rem"
            }}
          >
            {!!product?.previousPrice && (
              <Typography
                variant="body1"
                sx={{
                  fontSize: "1.5rem",
                  color: "text.subdued",
                  textDecorationLine: "line-through",
                }}
              >
                S/. { product?.previousPrice }
              </Typography>
            )}
            
            <Typography variant="body1" sx={{ fontSize: "1.5rem" }}>
              S/. { product?.price }
            </Typography>
          </Box>
        </Box>
      </Stack>
      <Button
        color="primary"
        variant="contained"
        sx={{
          width: "100%",
          padding: "1rem",
        }}
        onClick={_handleAddProduct}
      >
        Agregar al carrito
      </Button>
    </Box>
  );
}
