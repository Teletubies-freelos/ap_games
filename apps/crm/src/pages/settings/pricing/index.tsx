import { Stack } from '@mui/material';
import { Authenticated } from '../../../components/authenticated';
import Layout from '../../../layout';
import { NavBar } from '../../../components/navBar/NavBar';
import { PricingModule } from './PricingModule';

export default function SettingsPricingPage() {
  return (
    <Authenticated>
      <Layout>
        <Stack gap='1rem' >
          <NavBar name='Envío' />
          <PricingModule />
        </Stack>
      </Layout>
    </Authenticated>
  );
}
