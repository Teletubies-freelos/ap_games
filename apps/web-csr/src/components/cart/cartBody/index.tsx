import {
  Box,
  Button,
  CircularProgress,
  List,
  Stack,
  Typography,
} from '@mui/material';
import { ProviderNames } from '../../../types/providers';
import { useDeleteOne, useGetList } from 'data_providers';
import { useQuery } from '@tanstack/react-query';

import {
  CardStateOrder,
  LabelStepStatus,
} from '../../../../../../packages/ui/src';
import { Image } from './image';
import { CardQty } from './quantity';
import { useMemo } from 'react';
import { reduceTotalPrice } from '../../../utils';
import {
  ModalState,
  setNextState,
} from '../../../observables';

import totalMoney from '../../common/total.svg';
import { ICartProduct } from '../../../data/indexedDB';

interface BodyCartProps{
  listPriceCb?: (quantity: number, price: number, taxOrDiscount?: number)=> number;
}

const defaultPriceCb = (quantity: number, price: number)=> quantity*price

export function BodyCart({listPriceCb = defaultPriceCb }: BodyCartProps) {
  const getCartProducts = useGetList<ICartProduct>(ProviderNames.CART);
  const deleteCartProduct = useDeleteOne(ProviderNames.CART);
  const { data, isFetching, refetch } = useQuery(
    ['productsCart'],
    async () => await getCartProducts()
  );

  const total = useMemo(() => reduceTotalPrice(data) ?? 0, [data]);

  return (
    <>
      <Box
        display='flex'
        flexDirection='column'
        gap='1rem'
        height={'60vh'}
        sx={{ overflowY: 'scroll' }}
      >
        <List
          sx={{
            padding: '0',
            width: '100%',
          }}
        >
          {!isFetching && data?.length=== 0 && <Typography textAlign='center' variant='h6'>No hay nada en el carrito </Typography>} 
          {data?.map(({ imageUrl, name, price, quantity, id }) => (
            <CardStateOrder
              key={id}
              img={<Image url={imageUrl} />}
              title={name}
              price={listPriceCb(quantity, price)}
              quantity={
                <CardQty
                  onChangeQty={() => refetch().then(() => {})}
                  price={price}
                  onDeleteTotal={async () => {
                    await deleteCartProduct(id);
                    await refetch();
                  }}
                  initialQty={quantity}
                  indexedId={id!}
                />
              }
            />
          ))}
        </List>
      </Box>
      {isFetching ? (
        <CircularProgress />
      ) : (
        <LabelStepStatus
          property='Total'
          value={`S/. ${total?.toFixed(2)}`}
          icon={<img src={totalMoney} alt='money' />}
          sx={{
            fontSize: '1rem !important',
            marginTop: '1.5rem',
          }}
        />
      )}

      <Stack>
        <Typography
          textAlign='center'
          variant='body2'
          fontSize='.9rem'
          padding='1rem 0 .5rem 0'
          color='text.primary'
        >
          Selecciona el tipo de entrega
        </Typography>
        <Box display='flex' gap='.5rem'>
          <Button
            onClick={() => {
              setNextState({ name: ModalState.IN_STORE_SUMMARY });
            }}
            fullWidth
            variant='outlined'
            sx={{ height: '2.8rem', fontSize: { xs: '.7rem !important' } }}
            data-testid='pickupStore'
          >
            Recojo en tienda
          </Button>
          <Button
            onClick={() =>
              setNextState({ name: ModalState.DELIVERY_CENTRAL_CLIENT_DATA })
            }
            fullWidth
            variant='contained'
            sx={{ height: '2.8rem', fontSize: { xs: '.7rem !important' } }}
            data-testid='deliveryHome'
          >
            Entrega a domicilio
          </Button>
        </Box>
      </Stack>
    </>
  );
}
