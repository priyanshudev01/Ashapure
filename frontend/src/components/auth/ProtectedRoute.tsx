import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { getDefaultRouteForRole } from '../../auth/auth-routes';
import { UserRole } from '../../auth/auth.types';
import { useAuth } from '../../auth/useAuth';

type ProtectedRouteProps = {
  children: ReactNode;
  allowedRoles: UserRole[];
};

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to={getDefaultRouteForRole(user.role)} replace />;
  }

  return <>{children}</>;
}
