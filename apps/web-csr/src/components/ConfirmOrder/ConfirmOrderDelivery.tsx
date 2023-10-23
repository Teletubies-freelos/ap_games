import { Typography } from '@mui/material';
import ConfirmedOrder from '.';
import { StepStatus } from '../../../../../packages/ui/src';
import FooterModal from '../common/FooterModal';
import InfoPayment from '../common/InfoPayment';
import {  useMutation, useQueryClient } from '@tanstack/react-query';
import {  useSyncGetOne } from 'data_providers';
import { UserInfo } from '../../services/SessionStorage';
import { ProviderNames } from '../../types/providers';
import { DeliveryPriceLocal } from '../DeliveryPrice';
import { setModalState } from '../../observables';
import { cartProvider } from '../../modules';
import { useDeleteMany } from 'data_providers';

 interface IDataPayment{
  name: string
  payment_method_id: number
  owner: string
  number: number
  alternative_number: number
  meta?: string
  type: string
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
  const {owner , number, alternative_number ,name , meta, type} = useGetPaymentInfo()
  const deleteAllProductsInCart = useDeleteMany(ProviderNames.CART)

  const { mutate  } = useMutation(
    ['products_in_cart'],
    async () => await deleteAllProductsInCart()
  );


  const handleSubmit = () => {
    setModalState(undefined);
    mutate()
  }

  return (
    <ConfirmedOrder
      stepStatus={
        <StepStatus
          steps={[{label: 'En tienda', isActive: true}, {label:'Entregado'}]}
          sx={{ width: '13rem', marginTop: '1.5rem' }}
        />
      }
      footer={
        <FooterModal
          onClick={handleSubmit}
          infoMessage='Guarda tu número de pedido y realiza el seguimiento en nuestra página principal'
          nameButton='Hacer otro pedido'
          sx={{
            marginTop: '1.5rem',
            display: 'flex',
            flexDirection: 'column-reverse',
          }}
        />
      }
      priceDelivery={<DeliveryPriceLocal />}
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
