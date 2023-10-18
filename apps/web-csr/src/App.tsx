import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { DataProvider } from 'data_providers';
import { routes } from './routes';

import { LoadingPage } from '../../../packages/ui/src';
import {
  cartProvider,
  categoriesProvider,
  featuredProvider,
  ordersProductsProvider,
  ordersProvider,
  productsProvider,
  sessionStorageProvider,
} from './modules';
import { ProviderNames } from './types/providers';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from './providers/theme';

const providers = {
  [ProviderNames.PRODUCTS]: productsProvider,
  [ProviderNames.CART]: cartProvider,
  [ProviderNames.FEATURED]: featuredProvider,
  [ProviderNames.CATEGORIES]: categoriesProvider,
  [ProviderNames.SESSION_STORAGE]: sessionStorageProvider,
  [ProviderNames.ORDERS]: ordersProvider,
  [ProviderNames.ORDERS_PRODUCTS]: ordersProductsProvider,
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      cacheTime: 0.1,
      staleTime: 0,
    },
  },
});

if (import.meta.env.DEV) {
  //@ts-expect-error just in dev mode
  window.providers = providers;
}

function App() {
  return (
    <DataProvider providers={providers}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <Suspense fallback={<LoadingPage />}>
            <RouterProvider router={routes} />
          </Suspense>
        </ThemeProvider>
        {/* <ReactQueryDevtools initialIsOpen /> */}
      </QueryClientProvider>
    </DataProvider>
  );
}

export default App;
