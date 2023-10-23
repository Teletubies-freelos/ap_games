import { IconButton, Typography } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useCreateOne } from 'data_providers';
import HeadModal from '../common/HeadModal';
import FooterModal from '../common/FooterModal';

import { ModalLayout } from '../../../../../packages/ui/src';
import { ModalState, setModalState, setPurchaseCode } from '../../observables';
import { ProviderNames } from '../../types/providers';
import { useMutation } from '@tanstack/react-query';

interface PickupStoreProps {
  content?: JSX.Element;
}

export default function PickupStoreModal({
  content,
}: Readonly<PickupStoreProps>) {

  const createOrder = useCreateOne(ProviderNames.ORDERS);

  const { mutate } = useMutation(createOrder, {
    onSuccess: (data) => {
      setPurchaseCode(data?.order_id);
    },
  });

  const handleBack = () => {
    setModalState({
      data: {
        name: ModalState.CART,
      },
      previousState: {
        data: {
          name: ModalState.IN_STORE_CONFIRMATION,
        },
      },
    });
  };

  const handleConfirm = () => {
     mutate({})

    setModalState({
      data: {
        name: ModalState.IN_STORE_CONFIRMATION,
      },
      previousState: {
        data: {
          name: ModalState.IN_STORE_SUMMARY,
        },
      },
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
                onClick={handleBack}
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
          nameButton='Confirmar pedido'
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
