import { Box, Typography } from "@mui/material";
import { Button, LabelStepStatus, SearchBar, StepStatus } from "../../../../packages/ui/src";
import { useGetOne, useSyncGetOne } from "data_providers";
import { ProviderNames, SyncProviderNames } from "../types/providers";
import { useRef, useState } from "react";
import { OrdersByIdResponse } from "../services/Orders";

import totalMoney from './common/total.svg';

const translateStatus: Record<string, string> = {
  canceled: 'En camino',
  delivered: 'Entregado'
}

const stepStatus = ['En tienda', 'En camino', 'Entregado']

export default function OrderStatus() {
  const [orderStatus, setOrderStatus] = useState<string | undefined>()
  const refProducts = useRef<OrdersByIdResponse & {id: string}| undefined>()
  const getOrder = useGetOne(ProviderNames.ORDERS)
  const syncGetPriceDelivery = useSyncGetOne(SyncProviderNames.LOCAL_CONFIG)
  const { deliveryPrice } = syncGetPriceDelivery()

  const total = refProducts
    .current
    ?.order_products
    .reduce(
      (
        acm, 
        {
          quantity,
          product : {price, discount_price}}
      ) => acm + quantity*(discount_price ?? price) , 0
    )

  const _handleSearchOrder = async ({search: id}: {search: string})=> {
    const {order_status, ...rest} = await getOrder({
      id,
      filter: {
        status: true
      }
    })

    refProducts.current = { 
      ...rest,
      id
    }

    setOrderStatus(translateStatus[order_status.name as string] ?? 'En tienda')
  }

  if(orderStatus)
    return  (
    <>
      <StepStatus
        steps={stepStatus.map((label)=>({label, isActive: label === orderStatus}))}
        sx={{ marginY: '2rem' }}
      />
      <Typography>Numero de pedido</Typography>
      <Typography>{refProducts.current?.id}</Typography>
      <Typography>Fecha de entrega estimada</Typography>
      <Typography>Productos</Typography>
      {
        refProducts.current?.order_products.map(({product: {price, discount_price, name}})=>
          <Box key={name}>
            <Typography>
              {name}
            </Typography>
            <Typography>
              {(discount_price ?? price).toFixed(2)}
            </Typography>
          </Box>
        )
      }
      <Box>
        <Typography>Costo del delivery</Typography>
        <Typography>{deliveryPrice}</Typography>
      </Box>

      <LabelStepStatus
            property='TOTAL'
            icon={<img src={totalMoney} alt='money' />}
            value={`S/. ${total?.toFixed()}`}
            sx={{
              fontWeight: 'bold !important',
              fontSize: '1.1rem !important',
            }}
          />

    </>
    )

  return (
    <Box
      alignItems="center"
      display="flex"
      flexDirection="column"
      height="calc(100vh - 13rem)"
      justifyContent={{ xs: "center", sm: "space-between" }}
      padding="0 1rem"
    >
      <Box
        sx={{
          width: { xs: "100%", sm: "25rem" },
          marginTop: { xs: 0, sm: "3rem" },
          marginBottom: { xs: "7rem", sm: 0 },
        }}
      >
        <Typography sx={{ marginBottom: "2rem" }} variant="h3">
          Ingresa tu número de pedido
        </Typography>
        <SearchBar
          direction="column"
          onSubmit={_handleSearchOrder}
          placeHolder="ABC123"
          buttonSearch={<Button type='submit' label="buscar" variant="contained" />}
        />
      </Box>
      <Box
        justifyContent="center"
        sx={{ display: { xs: "none", sm: "flex" }, width: "100%" }}
      >
      </Box>
    </Box>
  );
}
