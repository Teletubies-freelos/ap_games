import { QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';
import { queryClient } from '../../modules/query';
import { ThemeProvider } from '../../../../web2/src/providers/theme';
import { DataProvider } from '../../context/data';
import { categoriesClient, ordersClient, productsClient } from '../../modules';
import { Auth0Provider } from '@auth0/auth0-react';
import { env } from '../../config';
import { AuthProvider } from './auth';

export const Providers = ({ children }: PropsWithChildren) => {
  return (
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
            <DataProvider
              products={productsClient}
              orders={ordersClient}
              categories={categoriesClient}
            >
              {children}
            </DataProvider>
          </AuthProvider>
        </Auth0Provider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};
