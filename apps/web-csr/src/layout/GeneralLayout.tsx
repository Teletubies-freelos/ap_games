import { Box } from '@mui/material';
import type { PropsWithChildren } from 'react';
import { WhatsappLogo } from '../../../../packages/ui/src';
import { CartFloat } from '../components/cart';

/* import PickupStore from '../components/PickupStore/PickupStore';
import BodyPickup from '../components/PickupStore/BodyPickup';
import MyData from '../components/MyPersonalnfo/MyData';
import Payments from '../components/Payments/Payments'; */



import { Modal } from '../components/modal';

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
      {/* Curar modales y luego pasarlos a la maquina estado */}
      <Modal />
      <CartFloat />
      {/* <PickupStore content={<BodyPickup />} />
      <MyData />
      <Payments /> */}
      {/* <ConfirmedOrder
        stepStatus={
          <StepStatus
            steps={['En tienda', 'Entregado']}
            sx={{ marginY: '2rem' }}
          />
        }
        footer={
          <FooterModal
            onClick={() => setIsConfirmedStore(false)}
            sx={{
              marginTop: '1rem',
              '& button': {
                textTransform: 'capitalize',
              },
            }}
            nameButton='Hacer otro pedido'
            infoMessage='Guarda tu número de pedido y realiza el seguimiento en nuestra página principal'
          />
        }
      />
      <ConfirmedOrder
        stepStatus={
          <StepStatus
            steps={['En tienda', 'En camino', 'Entregado']}
            sx={{ marginY: '2rem' }}
          />
        }
        infoPayment={
          <InfoPayment
            titleInfo='Números de cuenta'
            content={
              <Stack color='#000'>
                <Typography>
                  Banco BBVA Continental - calixto prueba uno
                </Typography>
                <Typography>Número de cuenta: 0238348483939292</Typography>
                <Typography> CCI interbancario: 9483287829229292929</Typography>
              </Stack>
            }
          />
        }
        footer={
          <FooterModal
            onClick={() => setIsConfirmedOrder(false)}
            sx={{
              flexDirection: 'column-reverse',
              marginTop: '1rem',
              '& button': {
                textTransform: 'capitalize',
              },
            }}
            nameButton='Hacer otro pedido'
            infoMessage='Realiza el seguimiento de tu pedido aquí.'
          />
        }
      /> */}
    </Box>
  );
}
