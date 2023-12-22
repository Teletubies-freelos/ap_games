import { Typography } from '@mui/material';
import { ModalLayout } from '../../../../../packages/ui/src';
import { setModalState } from '../../observables';
import HeadModal from '../common/HeadModal';
import { ShoppingBag } from '@mui/icons-material';
import ProductDetailBody from './ProductDetailBody';
import { useQueryClient } from '@tanstack/react-query';
import { CardProductProps } from '../../../../../packages/ui/src/molecules/CardProduct';
import { serializeGames, useProductsById } from "../ProductList/hooks/useFeaturedProducts";
import { useMemo } from 'react';
import { Maybe } from '../../types';
import { IProduct } from '../../services/Products';

export interface ProductDetailPorps {
  productId: string
}

export default function ProductDetailModal(props: Readonly<ProductDetailPorps>) {
  const queryClient = useQueryClient()

  const query = queryClient.getQueryData<{ pages: IProduct[][] }>(["list_games", null, null, null])
  const { product: productById } = useProductsById(Number(props?.productId));

  const product: Maybe<CardProductProps> = useMemo(
    () => {
      const result = query?.pages.flat().map(serializeGames)?.find((product: CardProductProps) => product.productId == props?.productId)
      if (!result) {
        return productById;
      }
      return result;
    },
    [props?.productId, query?.pages, productById]
  );

  return (
    <ModalLayout
      sx={{ maxWidth: "60rem", padding: '1rem' }}
      headerModal={
        <HeadModal
          onClose={()=> setModalState(undefined)}
          title={<Typography variant='body1' sx={{ fontSize: '1rem', fontWeight: 700, }}>{product?.title}</Typography>}
          icon={
            <ShoppingBag />
          }
        />
      }
    >
      <ProductDetailBody product={product}/>
    </ModalLayout>
  );
}
