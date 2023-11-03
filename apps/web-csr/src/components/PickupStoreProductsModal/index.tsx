import { IconButton, Typography } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import HeadModal from '../common/HeadModal';
import FooterModal from '../common/FooterModal';

import { ModalLayout } from '../../../../../packages/ui/src';
import { ModalState, setModalState, setNextState, setPrevState } from '../../observables';

interface PickupStoreProps {
  content?: JSX.Element;
}

export default function PickupStoreProductsModal({
  content,
}: Readonly<PickupStoreProps>) {

  const handleBack = () => {
    setPrevState();
  };

  const handleConfirm = async () => {
    setNextState({
      name: ModalState.IN_STORE_INFO_ORDER,
    });
  };

  return (
    <ModalLayout
      sx={{ maxWidth: '40rem' }}
      headerModal={
        <HeadModal
          onClose={() => setModalState(undefined)}
          title={<Typography variant='h5'>Recojo en Tienda</Typography>}
          icon={
            <IconButton onClick={handleBack}>
              <ArrowBackIosIcon
                sx={{ cursor: 'pointer' }}
              />
            </IconButton>
          }
        />
      }
    >
      {content}
      <FooterModal
        onClick={handleConfirm}
        nameButton='Siguiente'
        infoMessage='No existe costo de envío por ser recojo en tienda.'
        sx={{
          display: 'flex',
          flexDirection: 'column-reverse',
          marginTop: '2rem',
        }}
      />
    </ModalLayout>
  );
}
