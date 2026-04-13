import { createContext, ReactNode, useMemo, useState } from 'react';
import { Product } from '../api/customer-api';

type CartLine = {
  product: Product;
  quantity: number;
};

type CustomerCartContextValue = {
  items: CartLine[];
  addToCart: (product: Product, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  subtotal: number;
  totalItems: number;
};

export const CustomerCartContext = createContext<CustomerCartContextValue | null>(null);

const CART_STORAGE_KEY = 'aasapure.customer.cart';

function loadInitialCart(): CartLine[] {
  const value = localStorage.getItem(CART_STORAGE_KEY);
  if (!value) {
    return [];
  }

  try {
    return JSON.parse(value) as CartLine[];
  } catch {
    return [];
  }
}

type CustomerCartProviderProps = {
  children: ReactNode;
};

export function CustomerCartProvider({ children }: CustomerCartProviderProps) {
  const [items, setItems] = useState<CartLine[]>(() => loadInitialCart());

  const persist = (nextItems: CartLine[]) => {
    setItems(nextItems);
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(nextItems));
  };

  const value = useMemo<CustomerCartContextValue>(
    () => ({
      items,
      addToCart: (product, quantity = 1) => {
        const existing = items.find((line) => line.product.id === product.id);
        if (existing) {
          const nextItems = items.map((line) =>
            line.product.id === product.id ? { ...line, quantity: line.quantity + quantity } : line,
          );
          persist(nextItems);
          return;
        }

        persist([...items, { product, quantity }]);
      },
      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          persist(items.filter((line) => line.product.id !== productId));
          return;
        }

        const nextItems = items.map((line) => (line.product.id === productId ? { ...line, quantity } : line));
        persist(nextItems);
      },
      removeFromCart: (productId) => {
        persist(items.filter((line) => line.product.id !== productId));
      },
      clearCart: () => {
        persist([]);
      },
      subtotal: items.reduce((sum, line) => sum + line.product.price * line.quantity, 0),
      totalItems: items.reduce((sum, line) => sum + line.quantity, 0),
    }),
    [items],
  );

  return <CustomerCartContext.Provider value={value}>{children}</CustomerCartContext.Provider>;
}
