import { Box, TextField, Typography, Button, Stack } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { DropDown } from '../../../../../packages/ui/src';
import { ModalState, setModalState, setPurchaseCode } from '../../observables';
import {
  useCreateOne,
  useGetList,
} from 'data_providers';
import { ProviderNames } from '../../types/providers';
import { useForm } from 'react-hook-form';
import CustomAcordion from '../common/CustomAcordion';
import { ICartProduct } from '../../data/indexedDB';
import { useQuery } from '@tanstack/react-query';
import { useConfirmRequest } from '../../hooks/useConfirmRequest';
import { useEffect } from 'react';

export interface PaymentMethodData {
  paymentMethod: string;
  payment_method_id: number;
  order_status_id: number;
  comment: string;
}

interface PaymentMethodBodyProps {
  reduceQuantity: (products: ICartProduct[] | undefined) => number | undefined;
  reduceTotalPrice: (
    products: ICartProduct[] | undefined
  ) => number | undefined;
}

export default function PaymentMethodBody({
  reduceQuantity,
  reduceTotalPrice,
}: PaymentMethodBodyProps) {
  const { register, handleSubmit } = useForm<PaymentMethodData>();
  const createToSession = useCreateOne(ProviderNames.SESSION_STORAGE);
  const confirmRequest = useConfirmRequest();

  const handleFinish = async (data: PaymentMethodData) => {
    const newDataPayment = {
      ...data,
      order_status_id: 1,
    };
    await createToSession(newDataPayment);
    const requestOrderId =  await confirmRequest(newDataPayment);
    requestOrderId && setPurchaseCode(requestOrderId);

    setModalState({
      data: {
        name: ModalState.DELIVERY_CENTRAL_CONFIRMATION,
      },
    });
  };

  const getCartProducts = useGetList<ICartProduct>(ProviderNames.CART);
  const getPaymentMethods = useGetList(ProviderNames.PAYMENT_METHODS);
  const { data } = useQuery(['cart'], async () => await getCartProducts());
  const { data: paymentMethods } = useQuery(
    ['payment_methods'],
    async () => await getPaymentMethods()
  );

  const totalPrice = reduceTotalPrice(data);

  const parsedPaymentMethods = paymentMethods?.map((method) => ({
    value: method.payment_method_id,
    label: method.name,
  }));

  const totalQunatity = reduceQuantity(data);

  return (
    <Box
      component={'form'}
      onSubmit={handleSubmit(handleFinish)}
      display='flex'
      flexDirection='column'
      gap='.75rem'
      padding='1.4rem'
    >
      <CustomAcordion
        header={
          <Stack>
            <Typography>Tu Pedido</Typography>
            <Typography>{totalQunatity} productos</Typography>
          </Stack>
        }
        content={
          <Box>
            {data?.map((product) => (
              <Box
                display='flex'
                justifyContent='space-between'
                padding='.5rem 0'
                key={product.id}
              >
                <Typography>
                  {product.name} x {product.quantity}
                </Typography>
                <Typography>S/.{product.price}.00</Typography>
              </Box>
            ))}
          </Box>
        }
      />
      <DropDown
        items={[{ value: '1', label: 'Informacion de entrega' }]}
      ></DropDown>
      <DropDown
        textFieldProps={register('payment_method_id')}
        items={parsedPaymentMethods}
      ></DropDown>

      <TextField
        {...register('comment')}
        id='outlined-multiline-flexible'
        sx={{ backgroundColor: 'background.default' }}
        placeholder='Agregar comentario (opcional)'
        multiline
        minRows={4}
        maxRows={5}
      />
      <Box
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        padding='0 1rem'
      >
        <Typography variant='h6'>Costo de delivery</Typography>
        <Typography
          component='p'
          variant='body2'
          sx={{ color: 'text.secondary' }}
        >
          S/ 20.00
        </Typography>
      </Box>
      <Box
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        padding='0 1rem'
      >
        <Typography variant='h6'>Total</Typography>
        <Typography
          component='p'
          variant='body2'
          sx={{ color: 'text.secondary' }}
        >
          S/ {totalPrice?.toFixed(2)}
        </Typography>
      </Box>
      <Box
        display='flex'
        justifyContent='center'
        gap='.5rem'
        alignItems='center'
      >
        <InfoOutlinedIcon sx={{ color: 'primary.main' }} />
        <Typography textAlign='center' sx={{ color: 'primary.main' }}>
          El pago lo realizarás al momento de la entrega en el caso de efectivo
        </Typography>
      </Box>
      <Button
        type='submit'
        variant='contained'
        sx={{ width: '100%', margin: '0 auto' }}
      >
        Confirmar pedido
      </Button>
      <Typography
        sx={{
          color: 'text.secondary',
          textAlign: 'center',
        }}
      >
        Al hacer click en confirmar, acepto los términos de uso y Políticas de
        privacidad
      </Typography>
    </Box>
  );
}
