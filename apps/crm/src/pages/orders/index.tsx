import { Stack, Typography } from '@mui/material';
import ListOrders from './ListOrders';
import { Authenticated } from '../../components/authenticated';
import Layout from '../../layout';

const Orders = () => {
  return (
    <Authenticated>
      <Layout>
        <Stack gap='1rem'>
          <Typography variant='h1' padding='1rem'>
            Registro de Ordenes
          </Typography>
          <ListOrders />
        </Stack>
      </Layout>
    </Authenticated>
  );
};

export default Orders;
