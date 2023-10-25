import { Stack,  IconButton, Autocomplete, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import {
  ColorSwitch,
  MainLogo,
  NavBar,
  NintendoLogo,
  PlayStation4Logo,
  PlayStation5Logo,
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
import { Menu as MenuIcon } from '@mui/icons-material';
import { setAnchorElMenu, useAnchorElMenu } from '../../observables';
import { reduceQuantity } from '../../utils';
import { FeaturedDTO } from '../../../../migrations/src/types/tables'
import { ChangeEventHandler, useState } from 'react';
import { useDebounce } from 'use-debounce';

const SearchBar = ()=>{
  const searchProduct = useGetList<{name: string}>(ProviderNames.PRODUCTS)
  const [value, setValue] = useState<string>()
  const [valueDebounced] = useDebounce(value, 1000);
  const handleChange: ChangeEventHandler<HTMLInputElement>  = (event)=>{
    setValue(event.target.value)
  }

  const { data }= useQuery(['search_products', valueDebounced], {
    queryFn: async ()=> await searchProduct({
      filter:{
        name: valueDebounced,
        isAlike: true
      },
    }),
    enabled: !!valueDebounced
  })

  return(<Autocomplete
    options={data?.map(({name})=>name) ?? []}
    freeSolo
    sx={{ 
      width: "100%",
      backgroundColor: "white",
      borderRadius: ".25rem",
      "& input": { color: "#434343" },
    }}
    renderInput={(params) => (
      <TextField
        {...params}
        onChange={handleChange}
        value={value}
        label="Search input"
        InputProps={{
          ...params.InputProps,
          type: 'search',
        }}
      />
    )}
  />)
}

export default function Home() {
  const getFeaturedProducts = useGetList<FeaturedDTO>(ProviderNames.FEATURED);

  const { data } = useQuery(
    ['home featured'],
    async () => await getFeaturedProducts()
  );

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
              <MainLogo sx={{ width: { xs: '70%', md: '8rem' } }} />
            </Link>
          }
          searchBar={<SearchBar />}
          menu={
            <IconButton onClick={_handleOpenMenu} size='small'>
              <MenuIcon />
            </IconButton>
          }
        />
      }
    >
      {!!data?.length && (
        <ResponsiveCarousel data={data ?? []} itemRender={render} />
      )}
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
