import { Typography } from '@mui/material';
import { ModalLayout } from '../../../../../packages/ui/src';
import { setModalState } from '../../observables';
import HeadModal from '../common/HeadModal';
import { ShoppingBag } from '@mui/icons-material';
import ProductDetailBody from './ProductDetailBody';

export interface ProductDetailPorps {
  productId: string
}

export default function ProductDetailModal(props: Readonly<ProductDetailPorps>) {
  return (
    <ModalLayout
      sx={{ maxWidth: "60rem", padding: '1rem' }}
      headerModal={
        <HeadModal
          onClose={()=> setModalState(undefined)}
          title={<Typography variant='h5'>Detalle</Typography>}
          icon={
            <ShoppingBag />
          }
        />
      }
    >
      <ProductDetailBody {...props} />
    </ModalLayout>
  );
}
