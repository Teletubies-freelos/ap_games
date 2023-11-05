import { Stack } from '@mui/material';
import { Authenticated } from '../../components/authenticated';
import { ListProducts } from './ListProducts';
import Layout from '../../layout';
import { NavBar } from '../../components/navBar/NavBar';

export default function ProductsListPage() {
  return (
    <Authenticated>
      <Layout>
        <Stack gap='1rem'>
          <NavBar name='Productos' />

          <ListProducts />
        </Stack>
      </Layout>
    </Authenticated>
  );
}
