import { Box, Button, Stack, Typography } from "@mui/material";
import { setIsWishList, setModalState } from "../../observables";
import { Discount, Tag } from "../../../../../packages/ui/src";
import { useCreateOne } from "data_providers";
import { ProviderNames } from "../../types/providers";
import { CardProductProps } from "../../../../../packages/ui/src/molecules/CardProduct";
import { ProductDetailPorps } from ".";
import { useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { serializeGames, useProductsById } from "../ProductList/hooks/useFeaturedProducts";
import { Maybe } from "../../types";
import { IProduct } from "../../services/Products";

export default function ProductDetailBody({ productId }: Readonly<ProductDetailPorps>) {
  const queryClient = useQueryClient()

  const query = queryClient.getQueryData<{pages: IProduct[][]}>(["list_games", null, null, null])
  const { product: productById } = useProductsById(Number(productId));

  const product: Maybe<CardProductProps> = useMemo(
    () => {
      const result = query?.pages.flat().map(serializeGames)?.find(( product: CardProductProps) => product.productId == productId)
      if(!result){
        return productById;
      }
      return result;
    },
    [productId, query?.pages, productById]
  );

  const createCartProduct = useCreateOne(ProviderNames.CART, {
    payload: {
      imageUrl: product?.src,
      name: product?.title,
      description: product?.description,
      productId: productId,
      price: product?.price,
      quantity: 1,
      priceDiscount: 0
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
          marginBottom: "14px",
          '@media (max-width: 600px)': {
            flexDirection: 'column', // Switch to column layout on smaller screens
          },
        }}
      > 
        <Box sx={{ 
          display:'flex', 
          alignItems: 'center',
          '@media (max-width: 600px)': {
            justifyContent: 'center'
          },}}>
          <img width={200} src={product?.src} alt={product?.alt} />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          {!!product?.previousPrice && (
            <Tag icon={<Discount />} label="Oferta" />
          )}
          <Box>
            <Typography
              variant="body1"
              sx={{ paddingBottom: ".5rem", fontSize: '1.2rem', fontWeight: 800 }}
            >
              Nombre
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontSize: "0.9rem", fontWeight: 500 }}
            >
              { product?.title }
            </Typography>
          </Box>
          <Box>
            <Typography
              variant="body1"
              sx={{ paddingBottom: ".5rem", fontSize: '1.2rem', fontWeight: 800 }}
            >
              Descripción
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: "0.9rem",
                fontWeight: 500,
                minHeight: '5rem',
                maxHeight: '35vh',
                overflow: 'scroll',
                '@media (max-width: 600px)': {
                  display: '-webkit-box',
                  WebkitLineClamp: 8,
                  WebkitBoxOrient: 'vertical',
                  textOverflow: 'ellipsis',
                }
              }}
            >
              { product?.description }
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: "2.25rem",
              '@media (max-width: 600px)': {
                justifyContent: 'center'
              },
            }}
          >
            {!!product?.previousPrice && (
              <Typography
                variant="body1"
                sx={{
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  color: "text.subdued",
                  textDecorationLine: "line-through",
                }}
              >
                S/. { product?.previousPrice }
              </Typography>
            )}
            
            <Typography variant="body1" sx={{ 
                fontSize: "1.6rem",
                fontWeight: 800, }}>
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
