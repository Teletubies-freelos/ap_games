import { Typography } from '@mui/material';
import ConfirmedOrder from '.';
import { StepStatus } from '../../../../../packages/ui/src';
import FooterModal from '../common/FooterModal';
import InfoPayment from '../common/InfoPayment';
import { useDeleteMany, useGetOne,  } from 'data_providers';
import { ProviderNames,  } from '../../types/providers';
import { DeliveryPriceLocal } from '../DeliveryPrice';
import { setModalState } from '../../observables';
import { useGetPaymentInfo } from '../../hooks/useGetPaymentInfo';
import { useQuery } from '@tanstack/react-query';
import { UserInfo } from '../../services/SessionStorage';

export interface IDataPayment {
  name: string
  payment_method_id: number
  owner: string
  number: number
  alternative_number: number
  meta?: string
  type: string
}

const ConfirmOrderDelivery = () => {
  const paymentsInfo = useGetPaymentInfo()
  const deleteAllProductsInCart = useDeleteMany(ProviderNames.CART)

  const getClientData = useGetOne<UserInfo>(ProviderNames.SESSION_STORAGE);
  const { data: orderData } = useQuery(['order'], async () => await getClientData());
  const handleSubmit = async () => {
    setModalState(undefined);
    await deleteAllProductsInCart()
  }

  return (
    <ConfirmedOrder
      deliveryPrice={orderData?.delivery_price}
      stepStatus={
        <StepStatus
          steps={[{ label: 'En tienda', isActive: true }, { label: 'Entregado' }]}
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
      priceDelivery={<DeliveryPriceLocal deliveryPrice={orderData?.delivery_price}/>}
      infoPayment={
        <InfoPayment
          titleInfo='Método de Pago'
          content={
            <>
              {
                paymentsInfo?.map(({ meta, name, owner, type, number, alternative_number }) => (
                  <>
                    <Typography>
                      {meta ?? name} { owner && `- ${owner}`}
                    </Typography>
                    {!!number && <Typography>{type}: {number}</Typography>}
                    {!!alternative_number && <Typography>CCI interbancario: {alternative_number}</Typography>}
                  </>
                ))
              }
            </>
          }
        />
      }
    />
  );
};

export default ConfirmOrderDelivery;
