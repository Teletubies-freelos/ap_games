import { Box, Button, List, Stack, Typography } from "@mui/material";
import { ProviderNames } from "../../../types/providers";
import { useGetList } from "data_providers";
import { useQuery } from "@tanstack/react-query";
import { Loading } from "./loading";
import { CardStateOrder, LabelStepStatus } from "../../../../../../packages/ui/src";
import { Image } from "./image";
import { CardQty } from "./quantity";
import { useMemo } from "react";
import { reduceTotalPrice } from "../../../utils";
import { setIsCartOpen, setIsPickupStore, setIsYourData } from "../../../observables";

import totalMoney from '../../common/total.svg'

export function BodyCart() {
  const getCartProducts = useGetList(ProviderNames.CART)
  const { data, isFetching, refetch } = useQuery(['productsCart'], async ()=> await getCartProducts() )

  const total = useMemo(()=> reduceTotalPrice(data) ?? 0, [data])
  
  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        gap="1rem"
        height={"60vh"}
        sx={{ overflowY: "scroll" }}
      >
        
      <List
        sx={{
          padding: "0",
          width: "100%",
        }}
      >
        {isFetching ? (
          <Loading />
        ) : (
          data?.map(({ imageUrl, name, price, quantity, id }) => (
            <CardStateOrder
              key={id}
              img={<Image url={imageUrl} />}
              title={name}
              price={price}
              quantity={
                <CardQty
                  onChangeQty={() => refetch().then(() => {})}
                  price={price}
                  onDeleteTotal={() => refetch().then(() => {})
                  }
                  initialQty={quantity}
                  indexedId={id!}
                />
              }
            />
          ))
        )}
      </List>
      </Box>
      <LabelStepStatus
        property="Total"
        value={`S/. ${total?.toFixed(2)}`}
        icon={<img src={totalMoney} alt="money" />}
        sx={{
          fontSize: "1rem !important",
          marginTop: "1.5rem",
        }}
      />
      <Stack>
        <Typography
          textAlign="center"
          variant="body2"
          fontSize=".9rem"
          padding="1rem 0 .5rem 0"
          color="text.primary"
        >
          Selecciona el tipo de entrega
        </Typography>
        <Box display="flex" gap=".5rem">
          <Button
            onClick={() => {
              setIsPickupStore(true);
              setIsCartOpen(false);
            }}
            fullWidth
            variant="outlined"
            sx={{ height: "2.8rem", fontSize: { xs: ".7rem !important" } }}
          >Recojo en tienda</Button>
          <Button
            onClick={() => {
              setIsYourData(true);
              setIsCartOpen(false);
            }}
            fullWidth
            variant="contained"
            sx={{ height: "2.8rem", fontSize: { xs: ".7rem !important" } }}
          >Entrega a domicilio</Button>
        </Box>
      </Stack>
    </>
  );
}
