import { Typography } from '@mui/material';
import { ModalLayout } from '../../../../../packages/ui/src';
import { setModalState } from '../../observables';
import HeadModal from '../common/HeadModal';
import PaymentMethodBody from './PaymentMethodBody';
import { PrevButton } from '../PrevMainModalButton';

export default function PaymentMethodModal() {
  return (
    <ModalLayout
      headerModal={
        <HeadModal
          onClose={()=> setModalState(undefined)}
          title={<Typography variant='h5'>Medio de Pago</Typography>}
          icon={<PrevButton />}
        />
      }
    >
      <PaymentMethodBody />
    </ModalLayout>
  );
}
