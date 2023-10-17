import { IconButton, Typography } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { ModalLayout } from '../../../../../packages/ui/src';
import { ModalState, setModalState } from '../../observables';
import HeadModal from '../common/HeadModal';
import ClientDataBody from './ClientDataBody';

export default function ClientDataModal() {
  const handleBack = () => {
    setModalState({
      prevModal: ModalState.DELIVERY_CENTRAL_CLIENT_DATA,
      currentModal: ModalState.CART
    })
  };

  return (
    <ModalLayout
      headerModal={
        <HeadModal
          onClose={()=> setModalState({})}
          title={<Typography variant='h5'>Tus datos</Typography>}
          icon={
            <IconButton onClick={handleBack}>
              <ArrowBackIosIcon />
            </IconButton>
          }
        />
      }
    >
      <ClientDataBody />
    </ModalLayout>
  );
}
