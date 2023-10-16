import { Box, Stack, Typography } from "@mui/material";
import { LabelStepStatus, TotalIcon } from "../../../../../packages/ui/src";
import CustomAcordion from "../common/CustomAcordion";

import { useGetList } from "data_providers";
import { ProviderNames } from "../../types/providers";
import { useQuery } from "@tanstack/react-query";
import { ICartProduct } from "../../data/indexedDB";
import { reduceQuantity, reduceTotalPrice } from "../../utils";

export default function PickupStoreBody() {
  const getCartProducts = useGetList<ICartProduct>(ProviderNames.CART);
  const { data } = useQuery(['cart'], async () => await getCartProducts());

  const totalPriceProducts = reduceTotalPrice(data) ?? 0;
  const quantityProducts = reduceQuantity(data) ?? 0;

  return (
    <Stack>
      <CustomAcordion
        header={
          <Stack>
            <Typography sx={{ color: "text.primary" }}>
              Tu Pedido
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              {quantityProducts} Productos
            </Typography>
          </Stack>
        }
        content={
          <>
            {data?.map(({ name, price, id, quantity }) => (
              <Box
                display="flex"
                justifyContent="space-between"
                padding=".5rem 0"
                key={id}
              >
                <Typography>
                  {name} x {quantity}
                </Typography>
                <Typography>S/ {price}</Typography>
              </Box>
            ))}
          </>
        }
      />
      <LabelStepStatus
        property="Total"
        value={`S/. ${totalPriceProducts?.toFixed(2)}`}
        icon={<TotalIcon />}
        sx={{
          fontSize: "1rem !important",
          marginTop: "1.5rem",
        }}
      />
    </Stack>
  );
}
