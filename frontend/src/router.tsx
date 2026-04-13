import { Navigate, createBrowserRouter } from 'react-router-dom';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { RootRedirect } from './components/auth/RootRedirect';
import { AdminPage } from './pages/admin/AdminPage';
import { AuthPage } from './pages/auth/AuthPage';
import { CartPage } from './pages/customer/CartPage';
import { CheckoutPage } from './pages/customer/CheckoutPage';
import { CustomerDashboardPage } from './pages/customer/CustomerDashboardPage';
import { OrderTrackingPage } from './pages/customer/OrderTrackingPage';
import { ProductListingPage } from './pages/customer/ProductListingPage';
import { DeliveryPage } from './pages/delivery/DeliveryPage';
import { MerchantPage } from './pages/merchant/MerchantPage';
import { NotFoundPage } from './pages/NotFoundPage';

export const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <RootRedirect />,
  },
  {
    path: '/auth',
    element: <AuthPage />,
  },
  {
    path: '/customer',
    element: (
      <ProtectedRoute allowedRoles={['CUSTOMER']}>
        <Navigate to="/customer/dashboard" replace />
      </ProtectedRoute>
    ),
  },
  {
    path: '/customer/dashboard',
    element: (
      <ProtectedRoute allowedRoles={['CUSTOMER']}>
        <CustomerDashboardPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/customer/products',
    element: (
      <ProtectedRoute allowedRoles={['CUSTOMER']}>
        <ProductListingPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/customer/cart',
    element: (
      <ProtectedRoute allowedRoles={['CUSTOMER']}>
        <CartPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/customer/checkout',
    element: (
      <ProtectedRoute allowedRoles={['CUSTOMER']}>
        <CheckoutPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/customer/orders',
    element: (
      <ProtectedRoute allowedRoles={['CUSTOMER']}>
        <OrderTrackingPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/merchant',
    element: (
      <ProtectedRoute allowedRoles={['MERCHANT']}>
        <MerchantPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/delivery',
    element: (
      <ProtectedRoute allowedRoles={['DELIVERY']}>
        <DeliveryPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute allowedRoles={['ADMIN']}>
        <AdminPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
