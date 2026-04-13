type Product = {
  id: string;
  name: string;
  description: string | null;
  category: string | null;
  price: number;
  unit: string;
  imageUrl: string | null;
  isActive: boolean;
};

type CreateOrderPayload = {
  address: string;
  deliverySlot?: string;
  items: { productId: string; quantity: number }[];
};

type Order = {
  id: string;
  status: string;
  address: string | null;
  deliverySlot: string | null;
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  createdAt: string;
  items: {
    id: string;
    productId: string;
    productName: string;
    quantity: number;
    unitPrice: number;
    lineTotal: number;
  }[];
};

type PaymentRecord = {
  id: string;
  orderId: string;
  amount: number;
  method: string | null;
  status: 'PENDING' | 'SUCCESS' | 'FAILED';
  createdAt: string;
};

const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:5000';

async function apiRequest<T>(token: string, path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...(options?.headers ?? {}),
    },
    ...options,
  });

  if (!response.ok) {
    const errorBody = (await response.json().catch(() => null)) as { message?: string | string[] } | null;
    const message = Array.isArray(errorBody?.message)
      ? errorBody?.message.join(', ')
      : (errorBody?.message ?? 'Request failed');
    throw new Error(message);
  }

  return (await response.json()) as T;
}

export async function fetchCustomerProducts(token: string): Promise<Product[]> {
  return apiRequest<Product[]>(token, '/products');
}

export async function createCustomerOrder(token: string, payload: CreateOrderPayload): Promise<Order> {
  return apiRequest<Order>(token, '/orders', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function fetchCustomerOrders(token: string): Promise<Order[]> {
  return apiRequest<Order[]>(token, '/orders');
}

export async function simulateCustomerPayment(
  token: string,
  payload: { orderId: string; status: 'SUCCESS' | 'FAILED'; method?: string },
): Promise<PaymentRecord> {
  return apiRequest<PaymentRecord>(token, '/payments/simulate', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export type { Product, Order, CreateOrderPayload, PaymentRecord };
