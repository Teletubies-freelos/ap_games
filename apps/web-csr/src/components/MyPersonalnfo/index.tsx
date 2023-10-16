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

import { setIsPaymentData, setIsYourData } from '../../observables';
import { objectToSession } from '../../utils';

type UserInfo = {
  fullName: string;
  phone: number;
  address: string;
  reference: string;
  email: string;
}

export default function MyPersonalnfo() {
  const {register, handleSubmit} = useForm<UserInfo>()

  const _handleSubmit: SubmitHandler<UserInfo> = (data)=>{
    objectToSession(data)
    setIsYourData(false);
    setIsPaymentData(true);
  }

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
        />
        <CustomTextField
          textfieldProps={register('phone')}
          width='50%' 
          label='Teléfono' />
      </Box>
      <CustomTextField 
        textfieldProps={register('email')}
        width='100%' 
        label='Correo electrónico'
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
      />
      <CustomTextField 
        textfieldProps={register('reference')}
        width='100%'
        label='Referencia' 
      />
      <Button
        type={'submit'}
        variant='contained'
        label='Siguiente'
        sx={{ textTransform: 'capitalize', marginTop: '2.25rem' }}
      />
    </Stack>
  );
}
