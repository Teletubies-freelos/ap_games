import { Box, Button, Stack, Typography } from "@mui/material";
import { setIsWishList, setModalState } from "../../observables";
import { Discount, Tag } from "../../../../../packages/ui/src";
import { useCreateOne } from "data_providers";
import { ProviderNames } from "../../types/providers";
import { CardProductProps } from "../../../../../packages/ui/src/molecules/CardProduct";

export default function ProductDetailBody({ product }: { product: Readonly<CardProductProps | undefined> }) {

  const createCartProduct = useCreateOne(ProviderNames.CART, {
    payload: {
      imageUrl: product?.src,
      name: product?.title,
      description: product?.description,
      productId: product?.productId,
      price: product?.price,
      quantity: 1,
      priceDiscount: 0
    },
  });

  const _handleAddProduct = async () => {
    if (!product) return

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
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          '@media (max-width: 600px)': {
            justifyContent: 'center'
          },
        }}>
          <img width={200} src={product?.src} alt={product?.alt} />
          <Tag
            sx={{
              '@media (max-width: 600px)': {
                justifyContent: 'center',
                visibility: 'visible',
                backgroundColor: 'background.default',
              },
              visibility: 'hidden',
              position: 'absolute',
              right: '2rem',
              top: 0
            }}
            icon={<Discount />}
            label="Oferta" />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          {!!product?.previousPrice && (
            <Tag
              icon={<Discount />}
              sx={{
                '@media (max-width: 600px)': {
                  display: 'none'
                }
              }}
              label="Oferta" />
          )}
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
                fontSize: "0.8rem",
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
              {product?.description}
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
                S/. {product?.previousPrice}
              </Typography>
            )}

            <Typography variant="body1" sx={{
              fontSize: "1.6rem",
              fontWeight: 800,
            }}>
              S/. {product?.price}
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
