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
  const { register, handleSubmit } = useForm<UserInfo>();
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

    var deliveryCostsDetail: IDeliveryCostsDetailResponse[] = []

    if (products) {
      for (var product of products) {
        var productFound = (await getProducts({
          pagination: { limit: 1, page: 0 }, filter: {
            productId: product.productId
          }
        })).find(x => x.product_id);
        const deliveryCost = (await getOneDeliveryCost({
          filter: {}
        }, {
          department_id: department_id,
          district_id: data?.district_id,
          category_id: productFound?.category_id ?? 0,
          sub_category_id: productFound?.sub_category_id ?? 0
        })
        );
        deliveryCostsDetail = [...deliveryCostsDetail, ...deliveryCost];
      }
    }
    const orderedDeliveryCostsDetail = deliveryCostsDetail.sort((a, b) => b.delivery_cost.price - a.delivery_cost.price);
    console.log("🚀 ~ file: ClientDataBody.tsx:90 ~ const_handleSubmit:SubmitHandler<UserInfo>=useCallback ~ orderedDeliveryCostsDetail:", orderedDeliveryCostsDetail)

    const newData = {
      ...data,
      delivery_price: orderedDeliveryCostsDetail[0]?.delivery_cost.price
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
        <CustomTextField
          textfieldProps={register('client_name')}
          width='50%'
          label='Nombres y Apellidos'
          data-testid='name'
          type='text'
          inputMode='text'
          required
        />
        <CustomTextField
          textfieldProps={register('phone')}
          width='50%'
          label='Teléfono'
          data-testid='numberPhone'
          type='number'
          inputMode='numeric'
          required
        />
      </Box>
      <CustomTextField
        textfieldProps={register('email')}
        width='100%'
        label='Correo electrónico'
        data-testid='email'
        type='email'
        inputMode='email'
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
