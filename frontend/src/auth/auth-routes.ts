import { UserRole } from './auth.types';

export function getDefaultRouteForRole(role: UserRole): string {
  switch (role) {
    case 'CUSTOMER':
      return '/customer/dashboard';
    case 'MERCHANT':
      return '/merchant';
    case 'DELIVERY':
      return '/delivery';
    case 'ADMIN':
      return '/admin';
    default:
      return '/auth';
  }
}
