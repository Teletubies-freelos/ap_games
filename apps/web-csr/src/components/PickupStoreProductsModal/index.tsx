import { IconButton, Typography } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useCreateOne } from 'data_providers';
import HeadModal from '../common/HeadModal';
import FooterModal from '../common/FooterModal';

import { ModalLayout } from '../../../../../packages/ui/src';
import { ModalState, setModalState, setNextState, setPrevState, setPurchaseCode } from '../../observables';
import { ProviderNames } from '../../types/providers';
import { useMutation } from '@tanstack/react-query';

interface PickupStoreProps {
  content?: JSX.Element;
}

export default function PickupStoreProductsModal({
  content,
}: Readonly<PickupStoreProps>) {

  const createOrder = useCreateOne(ProviderNames.ORDERS);

  const { mutateAsync } = useMutation(createOrder, {
    onSuccess: (data) => {
      setPurchaseCode(data?.order_id);
    },
  });

  const handleBack = () => {
    setPrevState();
  };

  const handleConfirm = async () => {
    await mutateAsync({})
    
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
