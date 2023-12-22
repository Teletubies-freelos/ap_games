import { MainLogo } from '../../../../../packages/ui/src';
import { GeneralLayout } from '../../layout/GeneralLayout';
import NavBar from '../../../../../packages/ui/src/molecules/NavBar';
import { Link } from 'react-router-dom';
import NavLinks from '../../components/NavLinks';
import OrderStatus from '../../components/OrderStatus';
import { CartIconReactive } from '../../components/cart/cartReactiveIcon';
import { IconButton } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { setAnchorElMenu, useAnchorElMenu } from '../../observables';
import { reduceQuantity } from '../../utils';
import { Helmet } from 'react-helmet-async';

export default function EstadoPedido() {
  const anchorEl = useAnchorElMenu();

  const _handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElMenu(anchorEl ? null : event.currentTarget);
  };

  return (
    <>
      <Helmet>
        <title>Estado de tu Pedido en AP Games - Seguimiento Rápido y Fácil de tus Compras de Videojuegos y Consolas</title>
        <meta name="description" content="¡Mantente al tanto de tu pedido con AP Games! En nuestra página de Estado de Pedidos, puedes rastrear fácilmente tus compras de videojuegos, consolas y accesorios para PS4, PS5, Xbox y Nintendo Switch. Disfruta de actualizaciones en tiempo real, detalles de envío y estimaciones de llegada. Con AP Games, la espera por tus productos de gaming favoritos es transparente y sin complicaciones. ¡Comprueba el estado de tu pedido hoy y prepárate para una experiencia de juego inolvidable!" />
      </Helmet>
      <GeneralLayout
        navBar={
          <NavBar
            cartComponent={<CartIconReactive reduceQuantity={reduceQuantity} />}
            navigatorLinks={<NavLinks />}
            mainLogo={
              <Link to='/'>
                <MainLogo sx={{ width: { xs: '70%', md: '8rem' } }} />
              </Link>
            }
            menu={
              <IconButton onClick={_handleOpenMenu} size='small'>
                <MenuIcon />
              </IconButton>
            }
          />
        }
      >
        <OrderStatus />
      </GeneralLayout>
    </>
  );
}
