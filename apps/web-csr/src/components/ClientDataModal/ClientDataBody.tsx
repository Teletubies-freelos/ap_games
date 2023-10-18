import {
  Stack,
  Box,
  FormControl,
  Radio,
  RadioGroup,
  FormControlLabel,
} from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import CustomTextField from '../common/CustomTextField';
import SelectModals from '../common/SelectModals';
import { Button } from '../../../../../packages/ui/src';

import { ModalState, setNextState } from '../../observables';
import { useCreateOne } from 'data_providers';
import { ProviderNames } from '../../types/providers';

type UserInfo = {
  fullName: string;
  phone: number;
  address: string;
  reference: string;
  email: string;
};

export default function ClientDataBody() {
  const { register, handleSubmit } = useForm<UserInfo>();
  const createToSession = useCreateOne(ProviderNames.SESSION_STORAGE);

  const _handleSubmit: SubmitHandler<UserInfo> = async (data) => {
    await createToSession(data);

    setNextState({
      name: ModalState.DELIVERY_CENTRAL_PAYMENT_METHOD,
    });
  };

  return (
    <Stack
      onSubmit={handleSubmit(_handleSubmit)}
      component={'form'}
      gap='.75rem'
      padding='1.4rem'
    >
      <Box display='flex' gap='1rem'>
        <CustomTextField
          textfieldProps={register('fullName')}
          width='50%'
          label='Nombres y Apellidos'
          data-testid='fullname'
        />
        <CustomTextField
          textfieldProps={register('phone')}
          width='50%'
          label='Teléfono'
          data-testid='numberPhone'
        />
      </Box>
      <CustomTextField
        textfieldProps={register('email')}
        width='100%'
        label='Correo electrónico'
        data-testid='email'
      />
      <FormControl>
        <RadioGroup
          aria-labelledby='demo-radio-buttons-group-label'
          defaultValue='female'
          name='radio-buttons-group'
          sx={{
            display: 'flex',
            flexDirection: 'row',
          }}
          data-testid='selectProvince'
        >
          <FormControlLabel
            value='female'
            control={<Radio />}
            label='Soy de Lima Metropolitana'
          />
          <FormControlLabel
            value='male'
            control={<Radio />}
            label='Soy de Provincia'
          />
        </RadioGroup>
      </FormControl>
      <SelectModals groupOptions={[{ id: 1, name: 'hola' }]} label='Distrito' />
      <CustomTextField
        textfieldProps={register('address')}
        width='100%'
        label='Dirección'
        data-testid='address'
      />
      <CustomTextField
        textfieldProps={register('reference')}
        width='100%'
        label='Referencia'
        data-testid='reference'
      />
      <Button
        type={'submit'}
        variant='contained'
        label='Siguiente'
        sx={{ textTransform: 'capitalize', marginTop: '2.25rem' }}
        data-testid='nextPayment'
      />
    </Stack>
  );
}
