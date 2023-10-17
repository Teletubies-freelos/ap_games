import { Box, Button, Stack, Typography } from "@mui/material";
import { cartProvider } from "../../modules";
import { setIsWishList, setModalState, setProductDetail, useProductDetail } from "../../observables";
import { Discount, Tag } from "../../../../../packages/ui/src";

export default function ProductDetailBody() {
  const product = useProductDetail();

  const _handleCloseDetail = () => {
    setModalState({})
    setProductDetail(null)
  }

  const _handleAddProduct = async () => {
    if(!product) return
  
    await cartProvider.createOne({
      imageUrl: product.src,
      name: product.title,
      price: product.price,
      quantity: 1,
      priceDiscount: 0,
      productId: product.productId,
    });

    _handleCloseDetail();
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
