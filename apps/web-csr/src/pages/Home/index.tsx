import { Stack, IconButton, Autocomplete, TextField, Box, InputAdornment } from '@mui/material';
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
import SearchIcon from '@mui/icons-material/Search';
import { noMargin, sxInnerStack } from './styles';
import { useToggleColor } from '../../providers/theme';
import { CartIconReactive } from '../../components/cart/cartReactiveIcon';
import { render } from './render';
import { useGetList } from 'data_providers';
import { ProviderNames } from '../../types/providers';
import { useQuery } from '@tanstack/react-query';
import { Menu as MenuIcon } from '@mui/icons-material';
import { ModalState, setAnchorElMenu, setCategoryIdSelected, setModalState, useAnchorElMenu, useCategoryIdSelected } from '../../observables';
import { reduceQuantity } from '../../utils';
import { FeaturedDTO } from '../../../../migrations/src/types/tables'
import { ChangeEventHandler, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { Helmet } from 'react-helmet-async';

interface ISearchBarQuery {
  name: string;
  img_url: string;
  price: number;
  product_id: number;
}
export const SearchBar = () => {
  const searchProduct = useGetList<ISearchBarQuery>(ProviderNames.PRODUCTS)
  const [value, setValue] = useState<string>()
  const [valueDebounced] = useDebounce(value, 1000);
  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setValue(event.target.value)
  }

  const _hamdleCardClick = (value: any) => {
    if (!value) return;

    setModalState({
      data: {
        name: ModalState.DETAIL,
        meta: {
          productId: value.product_id
        }
      }
    })
  }

  const { data } = useQuery(['search_products', valueDebounced], {
    queryFn: async () => await searchProduct({
      filter: {
        name: valueDebounced,
        isAlike: true
      },
    }),
    enabled: !!valueDebounced
  })

  return (<Autocomplete
    options={data?.map(({ name, img_url, price, product_id }) => ({ name, img_url, price, product_id })) ?? []}
    freeSolo
    sx={{
      width: {
        xs: '90vw',
        md: 'unset'
      },
      backgroundColor: "white",
      borderRadius: ".25rem",
      "& input": { color: "#434343" },
      "& .MuiAutocomplete-endAdornment": {
        display: 'none'
      }
    }}
    renderInput={(params) => (
      <TextField
        {...params}
        onChange={handleChange}
        placeholder="Ingresa tu búsqueda"
        value={value}
        InputProps={{
          ...params.InputProps,
          type: 'search',
          startAdornment: (<InputAdornment position="start" sx={{ paddingLeft: '0.5rem' }} children={<SearchIcon />} />)
        }}
      />
    )}
    onChange={(_, value) => _hamdleCardClick(value)}
    getOptionLabel={(option) => {
      if (typeof option === 'string') {
        return option;
      } else {
        return option.name || '';
      }
    }}
    renderOption={(props, option) => (
      <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
        <img
          loading="lazy"
          width="70"
          src={option.img_url}
          alt={option.name}
        />
        {option.name}
      </Box>
    )}
  />)
}

const useCategories = () => {
  const getCategories = useGetList(ProviderNames.CATEGORIES);

  const queryData = useQuery(["categories"], async () => await getCategories());

  return queryData;
};

enum Categories {
  XBOX = 'Xbox',
  PS4 = 'PlayStation 4',
  PS5 = 'PlayStation 5',
  NINTENDO = 'Nintendo Switch'
}

export default function Home() {
  const getFeaturedProducts = useGetList<FeaturedDTO>(ProviderNames.FEATURED);
  const { data: categories } = useCategories();

  const categorySelected = useCategoryIdSelected();
  const { data } = useQuery(
    ['home featured'],
    async () => await getFeaturedProducts()
  );

  const toggleColor = useToggleColor();

  const anchorEl = useAnchorElMenu();

  const _handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElMenu(anchorEl ? null : event.currentTarget);
  };

  const getCategoryBySection = (category: Categories) => {
    const id = categories?.find(({ name }) => name == category)?.category_id;
    if (id) {
      setCategoryIdSelected({ category_id: id, sub_category_id: 0 });
    }
  }

  return (
    <>
      <Helmet>
        <title>AP Games: Tu Tienda de Videojuegos, Consolas y Accesorios para PS4, PS5, Xbox y Nintendo Switch</title>
        <meta name="description" content="¡Descubre el paraíso del gaming en AP Games! Explora nuestra amplia colección de videojuegos, consolas y accesorios para PS4, PS5, Xbox y Nintendo Switch. Ya seas un gamer experimentado o estés dando tus primeros pasos, encuentra todo lo que necesitas para una experiencia de juego inmersiva. Disfruta de precios competitivos, servicio al cliente de primera y envío rápido. Entra al mundo de AP Games y lleva tu experiencia de juego al siguiente nivel hoy mismo." />
      </Helmet>
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
          <PlayStation4Logo sx={noMargin} onClick={() => getCategoryBySection(Categories.PS4)} />
          <PlayStation5Logo sx={noMargin} onClick={() => getCategoryBySection(Categories.PS5)} />
          <NintendoLogo sx={noMargin} onClick={() => getCategoryBySection(Categories.NINTENDO)} />
          <XboxLogo sx={noMargin} onClick={() => getCategoryBySection(Categories.XBOX)} />{' '}
        </Stack>
        <ProductsList categorySelected={categorySelected} categories={categories} />
      </GeneralLayout>

    </>
  );
}
