import { Link } from 'react-router-dom';
import { Menu as MenuIcon } from '@mui/icons-material';
import { Box, Button, IconButton, Stack, Typography } from '@mui/material';

import {
  ColorSwitch,
  MainLogo,
  NavBar,
  FacebookLogo,
  InstagramLogo,
  Isotype,
  SearchBar,
} from '../../../../../packages/ui/src';
import { GeneralLayout } from '../../layout/GeneralLayout';

import { useToggleColor } from '../../providers/theme';
import NavLinks from '../../components/NavLinks';
import { setAnchorElMenu, useAnchorElMenu } from '../../observables';
import { CartIconReactive } from '../../components/cart/cartReactiveIcon';
import { reduceQuantity } from '../../utils';

export default function Terminos() {
  const toggleColor = useToggleColor();
  const anchorEl = useAnchorElMenu();

  const _handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElMenu(anchorEl ? null : event.currentTarget);
  };

  return (
    <GeneralLayout
      navBar={
        <NavBar
          actionsComponent={
            <ColorSwitch onChange={toggleColor} overrideCheckBg />
          }
          cartComponent={<CartIconReactive reduceQuantity={reduceQuantity} />}
          navigatorLinks={<NavLinks />}
          mainLogo={
            <Link to='/'>
              <MainLogo sx={{ width: { xs: '60%' } }} />
            </Link>
          }
          searchBar={
            <SearchBar
              onSubmit={() => 4}
              buttonSearch={<Button variant='contained'>Buscar</Button>}
            />
          }
          menu={
            <IconButton onClick={_handleOpenMenu} size='small'>
              <MenuIcon />
            </IconButton>
          }
        />
      }
    >
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          padding: '4rem 2rem',
          backgroundColor: (theme) => theme.palette.background.paper,
        }}
      >
        <Stack sx={{ maxWidth: '60rem' }}>
          <Typography variant='h3' fontSize='1.75rem' fontWeight='400'>
            Términos y condiciones
          </Typography>
          {Array.from({ length: 3 }).map((_, i) => (
            <Typography
              key={`${i.toString()}`}
              fontSize='.9rem'
              fontWeight='400'
              marginTop='2.25rem'
            >
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
              aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
              eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam
              est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci
              velit, sed quia non numquam eius modi tempora incidunt ut labore
              et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima
              veniam, quis nostrum exercitationem ullam corporis suscipit
              laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem
              vel eum iure reprehenderit qui in ea voluptate velit esse quam
              nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo
              voluptas nulla pariatur?
            </Typography>
          ))}
        </Stack>
      </Box>

      <Stack sx={{ padding: '50px 0' }}>
        <Box
          sx={{
            height: '78px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '37px',
          }}
        >
          <Isotype sx={{ height: '100%', width: 'fit-content' }} />
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography
              variant='body1'
              sx={{ fontSize: '1rem', marginRight: '1.5rem' }}
            >
              Síguenos
            </Typography>

            <Link to='https://www.facebook.com' target='_blank'>
              <FacebookLogo />
            </Link>
            <Link to='https://www.instagram.com' target='_blank'>
              <InstagramLogo />
            </Link>
          </Box>
        </Box>
      </Stack>
    </GeneralLayout>
  );
}
