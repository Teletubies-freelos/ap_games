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
import { useCreateOne, useSyncGetList } from 'data_providers';
import { ProviderNames, SyncProviderNames } from '../../types/providers';
import { useCallback, useState } from 'react';

import {
  ResourceNames,
  type GeolocationProvider,
} from '../../services/Geolocation';

type UserInfo = {
  client_name: string;
  phone: number;
  address: string;
  reference: string;
  email: string;
  district_id: string;
};

type Destination = 'capital' | 'province';

const parseDestination = (destination: Destination) =>
  destination === 'capital' ? '1501' : undefined;

export default function ClientDataBody() {
  const getGeolocation: typeof GeolocationProvider.prototype.getList = useSyncGetList(SyncProviderNames.GEOLOCATION);
  const { register, handleSubmit } = useForm<UserInfo>();
  const createToSession = useCreateOne(ProviderNames.SESSION_STORAGE);

  const [destination, setDestination] = useState<Destination>('capital');
  const [department, setDepartment] = useState<string>();
  const [province, setProvince] = useState<string | undefined>('1501');

  const _handleSubmit: SubmitHandler<UserInfo> = useCallback(async (data) => {
    await createToSession(data);

    setNextState({
      name: ModalState.DELIVERY_CENTRAL_PAYMENT_METHOD,
    });
  }, []);

  return (
    <Stack
      onSubmit={handleSubmit(_handleSubmit)}
      component={'form'}
      gap='.75rem'
      padding='1.4rem'
    >
      <Box display='flex' gap='1rem'>
        <CustomTextField
          textfieldProps={register('client_name')}
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
          aria-labelledby='destination-radio-buttons-group-label'
          value={destination}
          onChange={({ target }) => {
            setDestination(target.value as Destination);
            setProvince(parseDestination(target.value as Destination));
          }}
          name='radio-buttons-group'
          sx={{
            display: 'flex',
            flexDirection: 'row',
          }}
          data-testid='selectProvince'
        >
          <FormControlLabel
            value='capital'
            control={<Radio />}
            label='Soy de Lima Metropolitana'
          />
          <FormControlLabel
            value='province'
            control={<Radio />}
            label='Soy de Provincia'
          />
        </RadioGroup>
      </FormControl>
      {destination === 'province' && (
        <>
          <SelectModals
            groupOptions={getGeolocation(
              {},
              { resource: ResourceNames.DEPARTMENT }
            )}
            label='Departamento'
            onChange={({ target }) => setDepartment(target.value as string)}
          />
          <SelectModals
            groupOptions={getGeolocation(
              {
                filter: {
                  department_id: department,
                },
              },
              {
                resource: ResourceNames.PROVINCE,
              }
            )}
            label='Pronvincia'
            onChange={({ target }) => setProvince(target.value as string)}
          />
        </>
      )}
      <SelectModals
        {...register('district_id')}
        groupOptions={getGeolocation(
          {
            filter: {
              province_id: province,
            },
          },
          {
            resource: ResourceNames.DISTRICT,
          }
        )}
        label='Distrito'
      />
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
