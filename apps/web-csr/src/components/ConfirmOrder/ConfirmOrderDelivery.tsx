import { Typography } from '@mui/material';
import ConfirmedOrder from '.';
import { LabelStepStatus, StepStatus } from '../../../../../packages/ui/src';
import FooterModal from '../common/FooterModal';
import InfoPayment from '../common/InfoPayment';
import { useQueryClient } from '@tanstack/react-query';
import { useGetOne } from 'data_providers';
import { UserInfo } from '../../services/SessionStorage';
import { ProviderNames } from '../../types/providers';

const ConfirmOrderDelivery = () => {
  const queryClient = useQueryClient();
  const getClientData = useGetOne<UserInfo>(ProviderNames.SESSION_STORAGE);
  const dataPayment = queryClient.getQueryData(['payment_methods']);
  console.log('%c dataPayment :', 'background-color:#048A81', dataPayment);

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
          value='S/ 20.00'
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
                Banco BBVA Continental - calixto prueba uno
              </Typography>
              <Typography>Número de cuenta: 0238348483939292</Typography>
              <Typography>CCI interbancario: 9483287829229292929</Typography>
            </>
          }
        />
      }
    />
  );
};

export default ConfirmOrderDelivery;
