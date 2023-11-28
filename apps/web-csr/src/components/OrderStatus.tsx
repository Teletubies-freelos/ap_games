import { Box, Stack, Typography } from "@mui/material";
import {
  Button,
  LabelStepStatus,
  SearchBar,
  StepStatus,
} from "../../../../packages/ui/src";
import { useGetOne } from "data_providers";
import { ProviderNames } from "../types/providers";
import { useCallback, useEffect, useRef, useState } from "react";
import { OrdersByIdResponse } from "../services/Orders";

import totalMoney from "./common/total.svg";
import { InfoBanner, Title } from "./InfoBanner";
import dayjs from "dayjs";
import { DeliveryPriceLocal } from "./DeliveryPrice";
import { validate } from 'uuid'
import { useNavigate, useParams } from "react-router-dom";
import { DeliveryWayEnum } from "../services/DeliveryWays";

const translateStatus: Record<string, string> = {
  paid: "En camino",
  delivered: "Entregado",
  canceled: 'Cancelado',
  pending: "En tienda"
};

const stepStatus = ["En tienda", "En camino", "Entregado"];
const stepStatusPickupStore = ["En tienda", "Entregado"];

export default function OrderStatus() {
  const { id: paramId } = useParams()
  
  const navigate = useNavigate()

  //const syncGetPriceDelivery = useSyncGetOne(SyncProviderNames.LOCAL_CONFIG)
  // const { deliveryPrice } = syncGetPriceDelivery()

  const coolDownRef = useRef<Date | undefined>()

  const [orderStatus, setOrderStatus] = useState<string | undefined>();
  const refProducts = useRef<
  (OrdersByIdResponse & { id: string }) | undefined
  >();
  const getOrder = useGetOne(ProviderNames.ORDERS);
  console.log("🚀 ~ file: OrderStatus.tsx:43 ~ OrderStatus ~ refProducts:", refProducts)

  const total = refProducts.current?.order_products.reduce(
    (acm, { quantity, product: { price, discount_price } }) =>
      acm + quantity * (discount_price ?? price),
    0
  );

  const _handleSearchOrder = ({ search: id }: { search: string }) => {
    if(coolDownRef.current && dayjs(new Date()).diff(coolDownRef.current, 'second') <= 30)
      throw new Error('Espere un momento')

    if(!validate(id))
      throw new Error('Identificador no valido')

    
    coolDownRef.current = new Date();


    navigate(`./${id}`, {
      relative: "path"
    })

  };

  const loadOrderResume = useCallback(async ()=>{
    if(!validate(String(paramId)))
      throw new Error('Identificador no valido')

    const { order_status, ...rest } = await getOrder({
      id: paramId,
      filter: {
        status: true,
      },
    });
    console.log("🚀 ~ file: OrderStatus.tsx:78 ~ loadOrderResume ~ order_status:", order_status)

    refProducts.current = {
      ...rest,
      id: paramId,
    };

    setOrderStatus(translateStatus[order_status.name as string] ?? "En tienda");
  }, [getOrder, paramId])

  useEffect(()=>{
    if(paramId)
      loadOrderResume();
  }, [paramId, loadOrderResume])

  if (paramId)
    return (
      <Stack maxWidth={"32rem"} margin={"auto"} spacing={2}>
        <StepStatus
          steps={(refProducts.current?.delivery_way.token == DeliveryWayEnum.DELIVERY ? stepStatus : stepStatusPickupStore).map((label) => ({
            label,
            isActive: label === orderStatus,
          }))}
          sx={{ marginY: "2rem" }}
        />
        <Stack spacing={2} marginX={'1rem !important'}>
          <InfoBanner
            title="Numero de pedido"
            content={refProducts.current?.id}
          />
          <InfoBanner
            title="Fecha de entrega estimada"
            content={dayjs(refProducts.current?.created_at)
              .add(4, "day")
              .toDate()
              .toLocaleDateString("es-ES", {
                month: "long",
                day: "numeric",
              })}
          />
          
          <Stack spacing={2} pb={2} sx={{
            backgroundColor: 'background.paper'
          }}>
            <Box p={2}>
              <Title>
                Productos
              </Title>
            </Box>
            {refProducts.current?.order_products.map(
              ({ product: { price, discount_price, name }, quantity }) => (
                <Box key={name} p={2} sx={{backgroundColor: 'background.default'}}>
                  <Box display='flex' gap={1}>
                    <Typography>{name}</Typography>
                    <Typography px={3/4} sx={{
                      display: 'grid',
                      placeItems: 'center',
                      backgroundColor: 'primary.main',
                      borderRadius: 3
                    }}>
                      x{quantity}
                    </Typography>
                  </Box>
                  <Typography 
                    fontSize='1.3em'
                    fontWeight='bolder'
                    display='flex'
                    justifyContent='flex-end'>
                    S/. {(((discount_price != 0 && discount_price != undefined ? discount_price : price)*quantity)).toFixed(2)}
                  </Typography>
                </Box>
              )
            )}
          </Stack>
        </Stack>
        <DeliveryPriceLocal deliveryPrice={refProducts.current?.delivery_price} />
        <LabelStepStatus
          property="TOTAL"
          icon={<img src={totalMoney} alt="money" />}
          value={`S/. ${(total ?? 0 + (refProducts.current?.delivery_price ?? 0))?.toFixed()}`}
          sx={{
            fontWeight: "bold !important",
            fontSize: "1.1rem !important",
          }}
        />
      </Stack>
    );

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
          buttonSearch={
            <Button type="submit" label="buscar" variant="contained" />
          }
        />
      </Box>
      <Box
        justifyContent="center"
        sx={{ display: { xs: "none", sm: "flex" }, width: "100%" }}
      ></Box>
    </Box>
  );
}
