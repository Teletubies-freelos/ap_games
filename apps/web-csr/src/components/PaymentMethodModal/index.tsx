import { IconButton, Typography } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { ModalLayout } from '../../../../../packages/ui/src';
import { ModalState, setModalState } from '../../observables';
import HeadModal from '../common/HeadModal';
import PaymentMethodBody from './PaymentMethodBody';

export default function PaymentMethodModal() {
  const handleBack = () => {
    setModalState({
      prevModal: ModalState.DELIVERY_CENTRAL_PAYMENT_METHOD,
      currentModal: ModalState.DELIVERY_CENTRAL_CLIENT_DATA
    })
  };

  return (
    <ModalLayout
      headerModal={
        <HeadModal
          onClose={()=> setModalState({})}
          title={<Typography variant='h5'>Medio de Pago</Typography>}
          icon={
            <IconButton onClick={handleBack}>
              <ArrowBackIosIcon />
            </IconButton>
          }
        />
      }
    >
      <PaymentMethodBody />
    </ModalLayout>
  );
}
