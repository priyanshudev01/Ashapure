import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../auth/useAuth';
import { fetchCustomerOrders, Order } from '../../features/customer/api/customer-api';
import { CustomerCommerceLayout } from '../../layouts/CustomerCommerceLayout';

export function OrderTrackingPage() {
  const { token } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      setIsLoading(false);
      return;
    }

    let isMounted = true;

    const loadOrders = () => {
      fetchCustomerOrders(token)
        .then((response) => {
          if (!isMounted) {
            return;
          }
          setOrders(response);
          setError(null);
        })
        .catch((requestError) => {
          if (!isMounted) {
            return;
          }
          const message = requestError instanceof Error ? requestError.message : 'Unable to load orders';
          setError(message);
        })
        .finally(() => {
          if (isMounted) {
            setIsLoading(false);
          }
        });
    };

    loadOrders();
    const intervalId = setInterval(loadOrders, 10000);

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, [token]);

  return (
    <CustomerCommerceLayout title="Order Tracking">
      <header className="mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight text-on-surface mb-2">Track Orders</h1>
        <p className="text-secondary">Live status updates for your recent deliveries.</p>
      </header>

      {isLoading ? (
        <div className="rounded-2xl bg-white border border-slate-200 p-8 text-slate-500">Loading orders...</div>
      ) : error ? (
        <div className="rounded-2xl bg-red-50 border border-red-200 text-red-600 p-8">{error}</div>
      ) : orders.length === 0 ? (
        <div className="rounded-2xl bg-white border border-slate-200 p-8">
          <p className="font-semibold text-slate-700">No orders found.</p>
          <Link to="/customer/products" className="text-primary font-bold mt-3 inline-block">
            Start shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {orders.map((order) => (
            <article key={order.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs uppercase tracking-widest text-slate-400 font-bold">Order ID</p>
                  <p className="font-bold text-slate-900 break-all">{order.id}</p>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-50 text-green-700">{order.status}</span>
              </div>
              <div className="mt-5 space-y-2 text-sm">
                <p className="text-slate-500">
                  <span className="font-semibold text-slate-700">Address:</span> {order.address ?? 'NA'}
                </p>
                <p className="text-slate-500">
                  <span className="font-semibold text-slate-700">Slot:</span> {order.deliverySlot ?? 'NA'}
                </p>
                <p className="text-slate-500">
                  <span className="font-semibold text-slate-700">Total:</span> &#8377;{order.total.toFixed(2)}
                </p>
              </div>
            </article>
          ))}
        </div>
      )}
    </CustomerCommerceLayout>
  );
}
