import { Stack, Typography } from '@mui/material';
import { Authenticated } from '../../components/authenticated';
import { ListProducts } from './ListProducts';
import Layout from '../../layout';

export default function ProductsListPage() {
  return (
    <Authenticated>
      <Layout>
        <Stack gap='1rem'>
          <Typography variant='h1' padding='1rem'>
            Productos
          </Typography>
          <ListProducts />
        </Stack>
      </Layout>
    </Authenticated>
  );
}
