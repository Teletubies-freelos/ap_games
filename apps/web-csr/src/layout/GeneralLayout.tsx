import { Box } from '@mui/material';
import type { PropsWithChildren } from 'react';
import { WhatsappLogo } from '../../../../packages/ui/src';
import { CartFloat } from '../components/cart';

/* import PickupStore from '../components/PickupStore/PickupStore';
import BodyPickup from '../components/PickupStore/BodyPickup';
import MyData from '../components/MyPersonalnfo/MyData';
import Payments from '../components/Payments/Payments'; */



import { Modal } from '../components/modal';
import Menu from '../components/Menu';

interface GeneralLayoutProps {
  navBar: JSX.Element;
}

export function GeneralLayout({
  children,
  navBar,
}: PropsWithChildren<GeneralLayoutProps>) {

  return (
    <Box
      sx={{
        padding: '1rem 0',
        height: '100vh',
      }}
    >
      {navBar}
      {children}
      <Box
        display='flex'
        justifyContent='end'
        sx={{
          width: '100%',
          position: 'fixed',
          bottom: '1.5rem',
          paddingRight: '1rem',
          height: 0,
        }}
      >
        <WhatsappLogo
          sx={{
            cursor: 'pointer',
            height: '50px',
            transform: 'translate(-10px,-40px)',
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              transform: 'translate(-10px,-40px) scale(1.1)',
            },
          }}
        />
      </Box>
      <Modal />
      <CartFloat />
      <Menu />
    </Box>
  );
}
