import { Stack } from '@mui/material';
import { Authenticated } from '../../components/authenticated';
import CreateModal from '../../components/modals/CreateModal';
import Layout from '../../layout';
import ListCategories from './ListCategories';
import { NavBar } from '../../components/navBar/NavBar';

export default function Categories() {
  return (
    <Authenticated>
      <Layout>
        <NavBar name='Categorias' />
        <ListCategories />
        <Stack>
          <CreateModal />
        </Stack>
      </Layout>
    </Authenticated>
  );
}
