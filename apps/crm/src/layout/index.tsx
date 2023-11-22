import { Box, Link as MuiLink, Stack, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import SettingsIcon from '@mui/icons-material/Settings';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { MainLogo } from '../../../../packages/ui/src';
import { PropsWithChildren } from 'react';
import { Modal } from '../components/modals';

const Layout = ({ children }: PropsWithChildren) => {

  return (
    <Box display='flex'>
      <Stack
        sx={{
          width: '13%',
          padding: '1.5rem',
          gap: '.5rem',
          backgroundColor: 'background.paper',
          height: '100vh',
          alignItems: 'center',
        }}
      >
        <MainLogo sx={{ width: '8vw', marginBottom: '3rem' }} />
        <Stack alignItems='start' gap='1rem'>
          <Box display='flex' gap='.5rem' alignItems='center'>
            <LocalMallIcon />
            <Typography fontSize='1.1rem'>
              <MuiLink
                sx={{ textDecoration: 'none' }}
                component={Link}
                to='/orders'
                color={'#/orders' == location.hash ? 'primary' : 'text.primary'}
              >
                Pedidos
              </MuiLink>
            </Typography>
          </Box>

          <Box display='flex' gap='.5rem' alignItems='center'>
            <FormatListBulletedIcon />
            <Typography fontSize='1.1rem'>
              <MuiLink
                sx={{ textDecoration: 'none' }}
                component={Link}
                to='/products'
                color={'#/products' == location.hash ? 'primary' : 'text.primary'}
              >
                Productos
              </MuiLink>
            </Typography>
          </Box>

          <Box display='flex' gap='.5rem' alignItems='center'>
            <FormatListBulletedIcon />
            <Typography fontSize='1.1rem'>
              <MuiLink
                sx={{ textDecoration: 'none' }}
                component={Link}
                to='/categories'
                color={'#/categories' == location.hash ? 'primary' : 'text.primary'}
              >
                Categorias
              </MuiLink>
            </Typography>
          </Box>

          <Box display='flex' gap='.5rem' alignItems='center'>
            <SettingsIcon />
            <Typography fontSize='1.1rem'>
                Ajustes
            </Typography>
          </Box>
          <Box pl='2rem'>
            <Box display='flex' gap='.5rem' alignItems='center'>
              <HomeIcon />
              <Typography fontSize='1.1rem'>
                <MuiLink
                  sx={{ textDecoration: 'none' }}
                  component={Link}
                  to='/settings/home'
                  color={'#/settings/home' === location.hash ? 'primary' : 'text.primary'}
                >
                  Home
                </MuiLink>
              </Typography>
            </Box>
            <Box display='flex' gap='.5rem' alignItems='center'>
              <AttachMoneyIcon />
              <Typography fontSize='1.1rem'>
                <MuiLink
                  sx={{ textDecoration: 'none' }}
                  component={Link}
                  to='/settings/price'
                  color={'#/settings/price' === location.hash ? 'primary' : 'text.primary'}
                >
                  Envío
                </MuiLink>
              </Typography>
            </Box>
          </Box>
        </Stack>
      </Stack>
      <Box sx={{ width: '87%' }}>{children}</Box>
      <Modal />
    </Box>
  );
};

export default Layout;
