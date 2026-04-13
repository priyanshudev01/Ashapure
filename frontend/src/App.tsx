import { AuthProvider } from './auth/AuthProvider';
import { CustomerCartProvider } from './features/customer/cart/CustomerCartProvider';
import { RouterProvider } from 'react-router-dom';
import { appRouter } from './router';

function App() {
  return (
    <AuthProvider>
      <CustomerCartProvider>
        <RouterProvider router={appRouter} />
      </CustomerCartProvider>
    </AuthProvider>
  );
}

export default App;
