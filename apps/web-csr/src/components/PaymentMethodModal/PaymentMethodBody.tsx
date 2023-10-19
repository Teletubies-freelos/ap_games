import { Box, TextField, Typography, Button, Stack } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { DropDown } from '../../../../../packages/ui/src';
import { ModalState, setModalState } from '../../observables';
import {
  useCreateMany,
  useCreateOne,
  useGetList,
  useGetOne,
} from 'data_providers';
import { ProviderNames } from '../../types/providers';
import { UserInfo } from '../../services/SessionStorage';
import { useForm } from 'react-hook-form';
import CustomAcordion from '../common/CustomAcordion';
import { ICartProduct } from '../../data/indexedDB';
import { useQuery } from '@tanstack/react-query';

interface PaymentMethodData {
  paymentMethod: string;
}

const useConfirmRequest = () => {
  // 1. Traer toda la info necesaria del cliente (puede ser que de los otros
  // modales aun no este implentado un lugar donde guardar la info, sugiero Session Storage)
  // 2. Traer la info del pedido
  // 3. sacar del formulario actual los medios de pago
  // 3. Crear una nueva orden en el back (se tiene q usar uuidv4)
  // 4. Crear nuevas filas en la base de datos de order_products

  const getClientData = useGetOne<UserInfo>(ProviderNames.SESSION_STORAGE);
  const getCartProducts = useGetList(ProviderNames.CART);
  const createOrder = useCreateOne(ProviderNames.ORDERS);
  const createOrderProducts = useCreateMany(ProviderNames.ORDER_PRODUCTS);

  return async (data: PaymentMethodData) => {
    const clientData = await getClientData();
    const products = await getCartProducts();

    const { orderId } =
      (await createOrder({
        ...clientData,
        ...data,
      })) ?? {};

    await createOrderProducts(
      products.map(({ productId }) => ({
        productId,
        orderId,
      }))
    );
  };
};

export default function PaymentMethodBody() {
  const { handleSubmit, register } = useForm<PaymentMethodData>();
  const confirmRequest = useConfirmRequest();

  const handleFinish = async (data: PaymentMethodData) => {
    await confirmRequest(data);
    setModalState({
      data: {
        name: ModalState.DELIVERY_CENTRAL_CONFIRMATION,
      },
    });
  };

  const getCartProducts = useGetList<ICartProduct>(ProviderNames.CART);
  const getPaymentMethods = useGetList(ProviderNames.PAYMENT_METHODS);
  const { data, isFetching } = useQuery(
    ['cart'],
    async () => await getCartProducts()
  );
  const { data: paymentMethods } = useQuery(
    ['payment_methods'],
    async () => await getPaymentMethods()
  );

  const parsedPaymentMethods = paymentMethods?.map((method) => ({
    value: method.payment_method_id,
    label: method.name,
  }));

  return (
    <Box
      component={'form'}
      onClick={handleSubmit(handleFinish)}
      display='flex'
      flexDirection='column'
      gap='.75rem'
      padding='1.4rem'
    >
      <CustomAcordion
        header={
          <Stack>
            <Typography>Tu Pedido</Typography>
            <Typography>3 productos</Typography>
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
                <Typography>{product.name}</Typography>
                <Typography>S/.{product.price}.00</Typography>
              </Box>
            ))}
          </Box>
        }
      />
      <DropDown
        items={[{ value: '1', label: 'Informacion de entrega' }]}
      ></DropDown>
      <DropDown items={parsedPaymentMethods}></DropDown>

      <TextField
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
          S/ 480.00
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
