import { RouterProvider } from 'react-router-dom';
import { routes } from './routes';
import { ToastContainer } from 'react-toastify';

import LoadingPage from '../../../packages/ui/src/molecules/Loadingpage';
import { Providers } from './components/providers';
import { Suspense } from 'react';

function App() {
  return (
    <Providers>
      <Suspense fallback={<LoadingPage />}>
      <ToastContainer theme="dark"/>
        <RouterProvider router={routes} fallbackElement={<LoadingPage />} />
      </Suspense>
    </Providers>
  );
}

export default App;
