import { Stack, Typography } from '@mui/material';
import ListOrders from './ListOrders';
import { Authenticated } from '../../components/authenticated';

const Orders = () => {
  return (
    <Authenticated>
      <Stack gap='1rem'>
        <Typography variant='h1' padding='1rem'>
          Registro de Ordenes
        </Typography>
        <ListOrders />
      </Stack>
    </Authenticated>
  );
};

export default Orders;
