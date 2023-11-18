import { Typography } from '@mui/material';
import ConfirmedOrder from '.';
import { StepStatus } from '../../../../../packages/ui/src';
import FooterModal from '../common/FooterModal';
import InfoPayment from '../common/InfoPayment';
import { useDeleteMany } from 'data_providers';
import { ProviderNames } from '../../types/providers';
import { DeliveryPriceLocal } from '../DeliveryPrice';
import { setModalState } from '../../observables';
import { useGetPaymentInfo } from '../../hooks/useGetPaymentInfo';

 export interface IDataPayment{
  name: string
  payment_method_id: number
  owner: string
  number: number
  alternative_number: number
  meta?: string
  type: string
}

const ConfirmOrderDelivery = () => {
  const {owner , number, alternative_number ,name , meta, type} = useGetPaymentInfo()
  const deleteAllProductsInCart = useDeleteMany(ProviderNames.CART)

  const handleSubmit = async () => {
    setModalState(undefined);
    await deleteAllProductsInCart()
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
      priceDelivery={<DeliveryPriceLocal deliveryPrice={20}/>}
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
