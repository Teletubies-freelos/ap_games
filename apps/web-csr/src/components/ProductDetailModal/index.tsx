import { Typography } from '@mui/material';
import { ModalLayout } from '../../../../../packages/ui/src';
import { setModalState } from '../../observables';
import HeadModal from '../common/HeadModal';
import { ShoppingBag } from '@mui/icons-material';
import ProductDetailBody from './ProductDetailBody';

export default function ProductDetailModal() {
  return (
    <ModalLayout
      headerModal={
        <HeadModal
          onClose={()=> setModalState({})}
          title={<Typography variant='h5'>Detalle</Typography>}
          icon={
            <ShoppingBag />
          }
        />
      }
    >
      <ProductDetailBody />
    </ModalLayout>
  );
}
