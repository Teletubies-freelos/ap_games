import { Box, Button, CircularProgress, Modal, Typography } from '@mui/material';

import {
  ModalState,
  setIsWishList,
  setModalState,
  useIsCartFloatOpen,
} from '../../observables';
import { useQuery } from '@tanstack/react-query';
import { useGetList } from 'data_providers';
import { ProviderNames } from '../../types/providers';
import { useCallback } from 'react';
import { ICartProduct } from '../../data/indexedDB';
import { reduceQuantity, reduceTotalPrice } from '../../utils';


export function CartFloat() {
  const isOpen = useIsCartFloatOpen();
  const handleClose = () => setIsWishList(false);

  const getCartProducts = useGetList<ICartProduct>(ProviderNames.CART);
  const { data, isFetching } = useQuery(['cart', isOpen], async () => await getCartProducts());

  const totalPriceProducts = reduceTotalPrice(data) ?? 0

  const quantityProducts = reduceQuantity(data) ?? 0

  const _handleOpenCart = useCallback(()=>{
    setIsWishList(false)
    setModalState({ data: { name: ModalState.CART} })
  }, [])

  return (
    <Modal
      aria-describedby='modal-modal-description'
      aria-labelledby='modal-modal-title'
      onClose={handleClose}
      open={!!isOpen}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        width: '100%',
      }}
    >
      <Box
        sx={{
          backgroundColor: 'background.default',
          width: '100%',
          height: { xs: '5rem', md: '8rem' },
          padding: { xs: '1rem', md: '1rem 6rem' },
          display: 'flex',
          justifyContent: { xs: 'space-between' },
          alignItems: 'center',
        }}
      >
        {
          isFetching ? <CircularProgress /> :
            <>
              <Box>
                <Typography
                  variant='subtitle1'
                  color='text.primary'
                  fontSize={{ xs: '.8rem !important', sm: '1rem !important' }}
                >
                  {quantityProducts} Productos
                </Typography>
                <Typography
                  variant='h6'
                  color='text.primary'
                  fontWeight='bold'
                  fontSize={{ xs: '.8rem !important', sm: '1rem !important' }}
                >
                  S/ {totalPriceProducts.toFixed(2)}
                </Typography>
              </Box>
              <Box
                display='flex'
                flexDirection='column'
                height='100%'
                justifyContent='space-between'
                width={{ xs: '50%', md: '40%' }}
              >
                <Button
                  color='primary'
                  fullWidth
                  onClick={() => setIsWishList(false)}
                  sx={{
                    height: '2.6rem',
                    display: { xs: 'none', md: 'block' },
                    textTransform: 'capitalize',
                  }}
                  variant='contained'
                >
                  Seguir Comprando
                </Button>
                <Button
                  color='primary'
                  fullWidth
                  onClick={_handleOpenCart}
                  sx={{
                    display: { xs: 'block', md: 'none' },
                    height: '2.6rem',
                    textTransform: 'capitalize',
                  }}
                  variant='contained'
                >
                  Ir al carrito
                </Button>
                <Button
                  onClick={_handleOpenCart}
                  color='primary'
                  fullWidth
                  sx={{
                    display: { xs: 'none', md: 'block' },
                    height: { xs: '100%', md: '2.6rem' },
                    textTransform: 'capitalize',
                  }}
                  variant='outlined'
                >
                  Ir al carrito
                </Button>
              </Box>
            </>
        }

      </Box>
    </Modal>
  );
}
