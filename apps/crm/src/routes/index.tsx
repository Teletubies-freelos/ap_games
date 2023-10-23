import { lazy } from 'react';
import { Navigate, createHashRouter } from 'react-router-dom';

const LazyHome = lazy(() => import('../pages/home'));
const LazyCategories = lazy(() => import('../pages/categories'));
const LazyOrders = lazy(() => import('../pages/orders'));
const LazyProducts = lazy(() => import('../pages/products'));

export const routes = createHashRouter([
  {
    path: '/home',
    element: <LazyHome />,
  },
  {
    path: '/',
    element: <Navigate to='/categories' />,
  },
  {
    path: '/products',
    element: <LazyProducts />,
  },
  {
    path: '/orders',
    element: <LazyOrders />,
  },
  {
    path: '/categories',
    element: <LazyCategories />,
  },
]);
