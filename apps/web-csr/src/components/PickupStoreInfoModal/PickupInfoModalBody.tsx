import { Box, TextField, Typography, Button } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { DropDown } from '../../../../../packages/ui/src';
import { ModalState, setModalState } from '../../observables';
import {
  useCreateOne,
  useGetList,
} from 'data_providers';
import { ProviderNames } from '../../types/providers';
import { useForm } from 'react-hook-form';
import { ICartProduct } from '../../data/indexedDB';
import { useQuery } from '@tanstack/react-query';
import { reduceTotalPrice } from '../../utils';
import CustomInputField from '../common/CustomInputField';

export interface PickUpInfo {
  paymentMethod: string;
  payment_method_id: number;
  order_status_id: number;
  comment: string;
  client_name: string;
  phone: string;
  email: string;
}

export default function PickupInfoModalBody() {
  const { register, handleSubmit, formState: { errors }, control } = useForm<PickUpInfo>({ criteriaMode: "all", });

  const createToSession = useCreateOne(ProviderNames.SESSION_STORAGE);


  const handleFinish = async (data: PickUpInfo) => {
    await createToSession(data);

    setModalState({
      data: {
        name: ModalState.IN_STORE_PRE_CONFIRMATION,
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
    label: method.meta,
  }));
  
  return (
    <Box
      component={'form'}
      onSubmit={handleSubmit(handleFinish)}
      display='flex'
      flexDirection='column'
      gap='.75rem'
      padding='1.4rem'
    >
      <Box display='flex' gap='1rem'>
      <CustomInputField
          name="client_name"
          control={control}
          label='Nombres y Apellidos'
          data-testid='fullname'
          type='text'
          inputMode='text'
          error={!!errors.client_name}
          helperText={errors.client_name?.message}
          rules={{ required: 'Ingresar Nombres y Apellidos' }}
          width='50%'
        />
        <CustomInputField
        name="phone"
        control={control}
        label='Teléfono'
        data-testid='numberPhone'
        type='number'
        inputMode='numeric'
        error={!!errors.phone}
        helperText={errors.phone?.message}
        rules={{ required: 'Ingresar Teléfono' }}
        width='50%'
      />
      </Box>
      <CustomInputField
        name="email"
        control={control}
        width='100%'
        label='Correo electrónico'
        data-testid='email'
        type='email'
        inputMode='email'
        error={!!errors.email}
        helperText={errors.email?.message}
        rules={{ required: 'Ingresar Correo' }}
      />
      <DropDown
        textFieldProps={register('payment_method_id')}
        items={parsedPaymentMethods}
        placeHolder={"Indique su medio de pago"}
        required
        sxSelect={{
          height: "4rem"
        }}
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
        Siguiente
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
