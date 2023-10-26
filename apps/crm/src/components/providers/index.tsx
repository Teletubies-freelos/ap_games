import { QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';
import { queryClient } from '../../modules/query';

import { DataProvider as ContextDataProvider } from '../../context/data';
import { categoriesClient, ordersClient, productsClient } from '../../modules';
import { Auth0Provider } from '@auth0/auth0-react';
import { env } from '../../config';
import { AuthProvider } from './auth';
import { ThemeProvider } from '../../../../web-csr/src/providers/theme';
import { DataProvider } from 'data_providers';
import { providerNames } from '../../dataProviders';

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <DataProvider providers={providerNames}>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <Auth0Provider
            clientId={env.AUTH0_ID}
            domain={env.AUTH0_DOMAIN}
            authorizationParams={{
              redirect_uri:
                window.location.origin + (import.meta.env.DEV ? '' : '/cms'),
            }}
          >
            <AuthProvider>
              <ContextDataProvider
                products={productsClient}
                orders={ordersClient}
                categories={categoriesClient}
              >
                {children}
              </ContextDataProvider>
            </AuthProvider>
          </Auth0Provider>
        </QueryClientProvider>
      </ThemeProvider>
    </DataProvider>
  );
};
