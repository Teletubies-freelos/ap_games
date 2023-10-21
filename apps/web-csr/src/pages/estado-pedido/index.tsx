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

export default function EstadoPedido() {
  const anchorEl = useAnchorElMenu();

  const _handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElMenu(anchorEl ? null : event.currentTarget);
  };

  return (
    <GeneralLayout
      navBar={
        <NavBar
          cartComponent={<CartIconReactive reduceQuantity={reduceQuantity} />}
          navigatorLinks={<NavLinks />}
          mainLogo={
            <Link to='/'>
              <MainLogo />
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
  );
}
