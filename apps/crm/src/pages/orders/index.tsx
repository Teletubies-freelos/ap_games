import ListOrders from './ListOrders';
import { Authenticated } from '../../components/authenticated';
import Layout from '../../layout';
import { NavBar } from '../../components/navBar/NavBar';

const Orders = () => {

  return (
    <Authenticated>
      <Layout>
        <NavBar name='Registro de Ordenes'/>
        <ListOrders />
      </Layout>
    </Authenticated>
  );
};

export default Orders;
