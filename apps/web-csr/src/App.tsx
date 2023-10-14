import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import { DataProvider } from 'data_providers';
import { routes } from './routes';

import { LoadingPage } from '../../../packages/ui/src';
import { cartProvider, productsProvider } from './modules';
import { ProviderNames } from './types/providers';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const providers = {
  [ProviderNames.PRODUCTS]: productsProvider,
  [ProviderNames.CART]: cartProvider,
};

const queryClient = new QueryClient();

if (import.meta.env.DEV) {
  //@ts-expect-error
  window.providers = providers;
}

function App() {
  return (
    <DataProvider providers={providers}>
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<LoadingPage />}>
          <RouterProvider router={routes} />
        </Suspense>
      </QueryClientProvider>
    </DataProvider>
  );
}

export default App;
