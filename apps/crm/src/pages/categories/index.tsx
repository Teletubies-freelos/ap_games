import { Stack } from '@mui/material';
import { Authenticated } from '../../components/authenticated';
import CreateModal from '../../components/modals/CreateModal';
import Layout from '../../layout';
import ListCategories from './ListCategories';

export default function Categories() {
  return (
    <Authenticated>
      <Layout>
        <ListCategories />
        <Stack>
          <CreateModal />
        </Stack>
      </Layout>
    </Authenticated>
  );
}
