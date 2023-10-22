import { Typography } from '@mui/material';
import ConfirmedOrder from '.';
import { LabelStepStatus, StepStatus } from '../../../../../packages/ui/src';
import FooterModal from '../common/FooterModal';
import InfoPayment from '../common/InfoPayment';
import {  useQueryClient } from '@tanstack/react-query';
import {  useGetOne, useSyncGetOne } from 'data_providers';
import { UserInfo } from '../../services/SessionStorage';
import { ProviderNames, SyncProviderNames } from '../../types/providers';

 interface IDataPayment{
  name: string
  payment_method_id: number
  owner: string
  number: number
  alternative_number: number
  meta?: string
  type: string
}

interface IDataConfig{
  config_id: number
  value: number
  name: string
  meta?: string
}

const useGetPaymentInfo = () => {
  const queryClient = useQueryClient();
  const getClientData = useSyncGetOne<UserInfo>(ProviderNames.SESSION_STORAGE);
  const {payment_method_id} =  getClientData()

  const data = queryClient.getQueryData<IDataPayment[] >(['payment_methods']);

  const infoPayment = data?.find((item) => item.payment_method_id === Number(payment_method_id))
  if(!infoPayment) throw new Error ('No hay informacion en la cache')
  return infoPayment ?? {};
}

const ConfirmOrderDelivery = () => {
  
  const syncGetPriceDelivery = useSyncGetOne(SyncProviderNames.LOCAL_CONFIG)
  const {deliveryPrice} = syncGetPriceDelivery()

  const {owner , number, alternative_number ,name , meta, type} = useGetPaymentInfo()

  return (
    <ConfirmedOrder
      stepStatus={
        <StepStatus
          steps={['En tienda', 'Entregado']}
          sx={{ width: '13rem', marginTop: '1.5rem' }}
        />
      }
      footer={
        <FooterModal
          infoMessage='Guarda tu número de pedido y realiza el seguimiento en nuestra página principal'
          nameButton='Hacer otro pedido'
          sx={{
            marginTop: '1.5rem',
            display: 'flex',
            flexDirection: 'column-reverse',
          }}
        />
      }
      priceDelivery={
        <LabelStepStatus
          property='Costo de delivery'
          value={deliveryPrice}
          sx={{
            fontSize: '1rem !important',
            marginTop: '1.5rem',
          }}
        />
      }
      infoPayment={
        <InfoPayment
          titleInfo='Números de cuenta'
          content={
            <>
                <Typography>
                  {meta ?? name} - {owner}
                </Typography>
                <Typography>{type}: {number}</Typography>
              {!!alternative_number && <Typography>CCI interbancario: {alternative_number}</Typography>}
            </>
          }
        />
      }
    />
  );
};

export default ConfirmOrderDelivery;
