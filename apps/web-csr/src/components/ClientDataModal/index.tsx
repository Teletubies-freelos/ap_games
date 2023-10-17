import { IconButton, Typography } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { ModalLayout } from '../../../../../packages/ui/src';
import { ModalState, setModalState, setPrevState } from '../../observables';
import HeadModal from '../common/HeadModal';
import ClientDataBody from './ClientDataBody';

export default function ClientDataModal() {
  const handleBack = () => {
    setPrevState();
  };

  return (
    <ModalLayout
      headerModal={
        <HeadModal
          onClose={() => setModalState(undefined)}
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
