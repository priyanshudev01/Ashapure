import { useContext } from 'react';
import { CustomerCartContext } from './CustomerCartProvider';

export function useCustomerCart() {
  const context = useContext(CustomerCartContext);

  if (!context) {
    throw new Error('useCustomerCart must be used within CustomerCartProvider');
  }

  return context;
}
