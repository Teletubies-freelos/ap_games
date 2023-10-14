import { Suspense } from 'react'
import { RouterProvider } from 'react-router-dom'
import { DataProvider } from 'data_providers'
import { routes } from './routes'

import { LoadingPage } from '../../../packages/ui/src'
import { cartProvider, productsProvider } from './modules'
import { ProviderNames } from './types/providers'

const providers = {
  [ProviderNames.PRODUCTS]: productsProvider,
  [ProviderNames.CART]: cartProvider
}

function App() {
  return (
    <DataProvider providers={providers}>
      <Suspense fallback={<LoadingPage />} >
        <RouterProvider router={routes} />
      </Suspense>
    </DataProvider>
  )
}

export default App
