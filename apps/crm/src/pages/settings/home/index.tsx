import { Stack } from '@mui/material';
import { Authenticated } from '../../../components/authenticated';
import Layout from '../../../layout';
import { NavBar } from '../../../components/navBar/NavBar';
import { BannerSettings } from './BannersSettings';

export default function SettingsHomePage() {
  return (
    <Authenticated>
      <Layout>
        <Stack gap='1rem' >
          <NavBar name='Ajustes' />
          <BannerSettings />
        </Stack>
      </Layout>
    </Authenticated>
  );
}
