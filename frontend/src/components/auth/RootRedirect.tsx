import { Navigate } from 'react-router-dom';
import { getDefaultRouteForRole } from '../../auth/auth-routes';
import { useAuth } from '../../auth/useAuth';

export function RootRedirect() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return <Navigate to={getDefaultRouteForRole(user.role)} replace />;
}
