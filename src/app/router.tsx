import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from '@/shared/layout/AppLayout';
import { ProductDetailPage } from '@/pages/ProductDetailPage/ProductDetailPage';
import { ProductListPage } from '@/pages/ProductListPage/ProductListPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <ProductListPage /> },
      { path: 'product/:id', element: <ProductDetailPage /> },
    ],
  },
]);
