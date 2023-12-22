import {
  Stack,
  Box,
  FormControl,
  Radio,
  RadioGroup,
  FormControlLabel,
} from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import SelectModals from '../common/SelectModals';
import { Button, CustomInputField } from '../../../../../packages/ui/src';

import { ModalState, setNextState } from '../../observables';
import { useCreateOne, useGetList, useGetOne, useSyncGetList, useSyncGetOne } from 'data_providers';
import { ProviderNames, SyncProviderNames } from '../../types/providers';
import { useCallback, useState } from 'react';

import {
  ResourceNames,
  type GeolocationProvider,
} from '../../services/Geolocation';
import { IDeliveryCostsDetailResponse } from '../../services/DeliveryCosts';
import { useQuery } from '@tanstack/react-query';
import { ICartProduct } from '../../data/indexedDB';

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
  const getGeolocationOne: typeof GeolocationProvider.prototype.getOne = useSyncGetOne(SyncProviderNames.GEOLOCATION);
  const { register, handleSubmit, formState: { errors }, control } = useForm<UserInfo>({ criteriaMode: "all", });
  const createToSession = useCreateOne(ProviderNames.SESSION_STORAGE);
  const getOneDeliveryCost = useGetOne<IDeliveryCostsDetailResponse[]>(ProviderNames.DELIVERY_COSTS)
  const [destination, setDestination] = useState<Destination>('capital');
  const [department, setDepartment] = useState<string>();
  const [province, setProvince] = useState<string | undefined>('1501');

  const getCartProducts = useGetList<ICartProduct>(ProviderNames.CART);
  const { data: products } = useQuery(['cart'], async () => await getCartProducts());
  const getProducts = useGetList(ProviderNames.PRODUCTS);


  const _handleSubmit: SubmitHandler<UserInfo> = useCallback(async (data) => {
    const department_id = getGeolocationOne({
      filter: {
        district_id: data.district_id
      }
    }, {
      resource: ResourceNames.DEPARTMENT_PRICE
      // @ts-ignore
    })?.id;
    const province_id = getGeolocationOne({
      filter: {
        district_id: data.district_id
      }
    }, {
      resource: ResourceNames.DEPARTMENT_PRICE
      // @ts-ignore
    })?.id;
    
    const categories = []
    const subCategories = []
    if (products) {
      for (const product of products) {
        const productFound = (await getProducts({
          pagination: { limit: 1, page: 0 }, filter: {
            productId: product.productId
          }
        })).find(x => x.product_id);
        categories.push(productFound?.category_id ?? 0);
        subCategories.push(productFound?.sub_category_id ?? 0);

      }
    }

    const deliveryCost = (await getOneDeliveryCost({
      filter: {}
    }, {
      deparments: [department_id],
      districts: [data?.district_id],
      provinces: [province_id],
      categories,
      subCategories,
    }));

    let delivery_price = 30;
    
    if(deliveryCost.length > 0){
      const orderedDeliveryCostsDetail = deliveryCost.sort((a, b) => b.delivery_cost.price - a.delivery_cost.price);
      delivery_price = orderedDeliveryCostsDetail[0]?.delivery_cost.price
    }

    const newData = {
      ...data,
      delivery_price
    }
    await createToSession(newData);

    setNextState({
      name: ModalState.DELIVERY_CENTRAL_PAYMENT_METHOD,
    });
  }, [products]);

  return (
    <Stack
      onSubmit={handleSubmit(_handleSubmit)}
      component={'form'}
      gap='.75rem'
      padding='1.4rem'
    >
      <Box display='flex' gap='1rem'>

        <CustomInputField
          name="client_name"
          control={control}
          label='Nombres y Apellidos'
          data-testid='name'
          type='text'
          inputMode='text'
          error={!!errors.client_name}
          helperText={errors.client_name?.message}
          rules={{ required: 'Ingresar Nombres y Apellidos' }}
          width='50%'
        />
        {/* <CustomTextField
          textfieldProps={register('client_name', { required: "ERROR EN EL CAMPO"})}
          width='50%'
          label='Nombres y Apellidos'
          data-testid='name'
          type='text'
          inputMode='text'
          required
        /> */}
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
        required
      />
      <CustomInputField
        name="address"
        control={control}
        width='100%'
        label='Dirección'
        data-testid='address'
        type='text'
        inputMode='text'
        error={!!errors.address}
        helperText={errors.address?.message}
        rules={{ required: 'Ingresar Dirección' }}
      />
      <CustomInputField
        name="reference"
        control={control}
        width='100%'
        label='Referencia'
        data-testid='reference'
        type='text'
        inputMode='text'
        error={!!errors.reference}
        helperText={errors.reference?.message}
        rules={{ required: 'Ingresar Referencia' }}
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
