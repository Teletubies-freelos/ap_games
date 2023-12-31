import { Stack, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import {
  ColorSwitch,
  MainLogo,
  NavBar,
  NintendoLogo,
  PlayStation4Logo,
  PlayStation5Logo,
  SearchBar,
  XboxLogo,
} from '../../../../../packages/ui/src';
import { GeneralLayout } from '../../layout/GeneralLayout';
import ResponsiveCarousel from '../../components/ResponsiveCarousel';

import ProductsList from '../../components/ProductList';
import NavLinks from '../../components/NavLinks';

import { noMargin, sxInnerStack } from './styles';
import { useToggleColor } from '../../providers/theme';
import { CartIconReactive } from '../../components/cart/cartReactiveIcon';
import { render } from './render';
import { useGetList } from 'data_providers';
import { ProviderNames } from '../../types/providers';
import { useQuery } from '@tanstack/react-query';


export default function Home() {
  const getFeaturedProducts = useGetList(ProviderNames.FEATURED);

  const { data } = useQuery(['home featured'], async () => await getFeaturedProducts())

  const toggleColor = useToggleColor();

  return (
    <GeneralLayout
      navBar={
        <NavBar
          actionsComponent={
            <ColorSwitch onChange={toggleColor} overrideCheckBg />
          }
          cartComponent={<CartIconReactive />}
          navigatorLinks={<NavLinks />}
          mainLogo={
            <Link to='/'>
              <MainLogo sx={{ width: { xs: '70%' } }} />
            </Link>
          }
          searchBar={
            <SearchBar
              onSubmit={() => 4}
              buttonSearch={<Button variant='contained' >Buscar</Button>}
            />
          }
        />
      }
    >
      <ResponsiveCarousel data={data ?? []} itemRender={render} />
      <Stack
        direction='row'
        gap={{ sm: 6 }}
        justifyContent={{ xs: 'space-evenly', sm: 'center' }}
        sx={sxInnerStack}
      >
        <PlayStation4Logo sx={noMargin} />
        <PlayStation5Logo sx={noMargin} />
        <NintendoLogo sx={noMargin} />
        <XboxLogo sx={noMargin} />{' '}
      </Stack>
      <ProductsList />
    </GeneralLayout>
  );
}
