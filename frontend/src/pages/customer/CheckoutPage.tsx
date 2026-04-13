import { FormEvent, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/useAuth';
import { createCustomerOrder, simulateCustomerPayment } from '../../features/customer/api/customer-api';
import { useCustomerCart } from '../../features/customer/cart/useCustomerCart';
import { CustomerCommerceLayout } from '../../layouts/CustomerCommerceLayout';

export function CheckoutPage() {
  const navigate = useNavigate();
  const { token } = useAuth();
  const { items, subtotal, clearCart } = useCustomerCart();

  const [address, setAddress] = useState('202, Pristine Heights, 5th Avenue, Worli, Mumbai - 400018');
  const [deliverySlot, setDeliverySlot] = useState('Morning 6:00 - 8:00 AM');
  const [paymentMethod, setPaymentMethod] = useState('G-Pay');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const deliveryFee = 0;
  const discount = 0;
  const total = useMemo(() => subtotal + deliveryFee - discount, [subtotal]);

  const handleCreateOrder = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatusMessage(null);

    if (!token) {
      setStatusMessage('You are not authenticated.');
      return;
    }

    if (items.length === 0) {
      setStatusMessage('Cart is empty.');
      return;
    }

    setIsSubmitting(true);

    try {
      const order = await createCustomerOrder(token, {
        address,
        deliverySlot,
        items: items.map((line) => ({
          productId: line.product.id,
          quantity: line.quantity,
        })),
      });

      await simulateCustomerPayment(token, {
        orderId: order.id,
        method: paymentMethod,
        status: 'SUCCESS',
      });

      clearCart();
      setStatusMessage(`Order and payment successful. Tracking ID: ${order.id}`);
      navigate('/customer/orders', { replace: true });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to place order';
      setStatusMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <CustomerCommerceLayout title="Checkout">
      <header className="mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight text-on-surface mb-2">Checkout</h1>
        <p className="text-secondary">Confirm delivery details and complete your order.</p>
      </header>

      {items.length === 0 ? (
        <section className="rounded-2xl bg-white border border-slate-200 p-10 text-center">
          <p className="text-slate-600 font-semibold">Your cart is empty. Add products before checkout.</p>
          <Link to="/customer/products" className="text-primary font-bold mt-4 inline-block">
            Browse products
          </Link>
        </section>
      ) : (
        <form className="grid grid-cols-1 lg:grid-cols-12 gap-8" onSubmit={handleCreateOrder}>
          <div className="lg:col-span-7 space-y-8">
            <section className="bg-surface-container-lowest rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-6">Items ({items.length})</h2>
              <div className="space-y-4">
                {items.map((line) => (
                  <div key={line.product.id} className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <div>
                      <p className="font-bold">{line.product.name}</p>
                      <p className="text-xs text-slate-500">
                        {line.quantity} x &#8377;{line.product.price.toFixed(2)}
                      </p>
                    </div>
                    <p className="font-bold text-primary">&#8377;{(line.product.price * line.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm space-y-4">
                <h2 className="text-lg font-bold">Delivery Address</h2>
                <textarea
                  value={address}
                  onChange={(event) => setAddress(event.target.value)}
                  className="w-full rounded-xl border border-surface-container-high bg-white p-4 text-sm min-h-24"
                  required
                />
              </div>

              <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm space-y-4">
                <h2 className="text-lg font-bold">Delivery Slot</h2>
                <div className="space-y-3">
                  {['Morning 6:00 - 8:00 AM', 'Late Morning 8:00 - 10:00 AM'].map((slot) => (
                    <label
                      key={slot}
                      className={`flex items-center p-3 rounded-xl border cursor-pointer ${
                        deliverySlot === slot ? 'border-primary bg-primary/5' : 'border-surface-container'
                      }`}
                    >
                      <input
                        className="text-primary focus:ring-primary h-4 w-4"
                        type="radio"
                        name="deliverySlot"
                        checked={deliverySlot === slot}
                        onChange={() => setDeliverySlot(slot)}
                      />
                      <span className="ml-3 text-sm font-bold">{slot}</span>
                    </label>
                  ))}
                </div>
              </div>
            </section>
          </div>

          <div className="lg:col-span-5 space-y-8">
            <section className="bg-surface-container-lowest rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-6">Payment Method</h2>
              <div className="grid grid-cols-3 gap-3 mb-6">
                {['G-Pay', 'UPI', 'Card'].map((method) => (
                  <button
                    type="button"
                    key={method}
                    onClick={() => setPaymentMethod(method)}
                    className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all ${
                      paymentMethod === method
                        ? 'border-primary bg-primary/5'
                        : 'border-transparent bg-surface-container-low hover:bg-surface-container-high'
                    }`}
                  >
                    <span className="material-symbols-outlined text-secondary text-2xl">
                      {method === 'Card' ? 'credit_card' : method === 'UPI' ? 'account_balance' : 'google_plus_reshare'}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-widest">{method}</span>
                  </button>
                ))}
              </div>
              <div className="p-4 bg-surface rounded-xl flex items-center gap-4">
                <span className="material-symbols-outlined text-primary">verified_user</span>
                <div className="flex-1">
                  <p className="text-xs font-bold">Secure Transaction</p>
                  <p className="text-[10px] text-secondary">Simulated payment in this phase.</p>
                </div>
              </div>
            </section>

            <section className="bg-surface-container-lowest rounded-xl shadow-lg border border-primary/10 overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-primary-fixed" />
              <div className="p-8">
                <h2 className="text-xl font-bold mb-6">Order Summary</h2>
                <div className="space-y-4 text-sm mb-8">
                  <div className="flex justify-between items-center">
                    <span className="text-secondary">Subtotal</span>
                    <span className="font-medium">&#8377;{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-secondary">Delivery Fee</span>
                    <span className="text-primary font-bold">FREE</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-secondary">Discount</span>
                    <span className="font-medium">&#8377;{discount.toFixed(2)}</span>
                  </div>
                  <div className="pt-4 border-t border-surface-container-high flex justify-between items-center">
                    <span className="text-lg font-bold">Total Amount</span>
                    <span className="text-2xl font-black text-on-surface">&#8377;{total.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-on-primary py-4 rounded-full font-bold text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-70"
                >
                  <span className="material-symbols-outlined">local_shipping</span>
                  {isSubmitting ? 'Placing Order...' : 'Confirm Fresh Delivery'}
                </button>

                {statusMessage ? <p className="text-xs font-bold text-primary mt-4">{statusMessage}</p> : null}
              </div>
            </section>
          </div>
        </form>
      )}
    </CustomerCommerceLayout>
  );
}
