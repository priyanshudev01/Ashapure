import { Link } from 'react-router-dom';
import { useCustomerCart } from '../../features/customer/cart/useCustomerCart';
import { CustomerCommerceLayout } from '../../layouts/CustomerCommerceLayout';

export function CartPage() {
  const { items, subtotal, updateQuantity, removeFromCart } = useCustomerCart();

  const deliveryFee = 0;
  const discount = 0;
  const total = subtotal + deliveryFee - discount;

  return (
    <CustomerCommerceLayout title="Cart">
      <header className="mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight text-on-surface mb-2">My Fresh Cart</h1>
        <p className="text-secondary">Review your selected dairy products before checkout.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-8">
          <section className="bg-surface-container-lowest rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Items ({items.length})</h2>
              <span className="text-sm uppercase tracking-widest text-outline">Freshness Guaranteed</span>
            </div>

            {items.length === 0 ? (
              <div className="py-10 text-center text-slate-500">
                <p className="font-semibold">Your cart is empty.</p>
                <Link to="/customer/products" className="text-primary font-bold mt-3 inline-block">
                  Browse products
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {items.map((line) => (
                  <div key={line.product.id} className="flex flex-col sm:flex-row gap-4 pb-6 border-b border-surface-container-high">
                    <div className="w-24 h-24 rounded-lg overflow-hidden bg-surface-container flex-shrink-0">
                      <img className="w-full h-full object-cover" src={line.product.imageUrl ?? ''} alt={line.product.name} />
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="font-bold text-lg">{line.product.name}</h3>
                          <span className="text-lg font-bold text-primary">
                            &#8377;{(line.product.price * line.quantity).toFixed(2)}
                          </span>
                        </div>
                        <p className="text-sm text-secondary mb-3">{line.product.unit}</p>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center bg-surface-container-low rounded-full px-2 py-1">
                          <button
                            className="p-1 text-primary hover:bg-white rounded-full transition-colors"
                            onClick={() => updateQuantity(line.product.id, line.quantity - 1)}
                          >
                            <span className="material-symbols-outlined text-sm">remove</span>
                          </button>
                          <span className="px-4 font-bold text-sm">{line.quantity}</span>
                          <button
                            className="p-1 text-primary hover:bg-white rounded-full transition-colors"
                            onClick={() => updateQuantity(line.product.id, line.quantity + 1)}
                          >
                            <span className="material-symbols-outlined text-sm">add</span>
                          </button>
                        </div>

                        <button className="text-xs font-bold text-red-600" onClick={() => removeFromCart(line.product.id)}>
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        <div className="lg:col-span-5 space-y-8">
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

              <Link
                to="/customer/checkout"
                className="w-full bg-primary text-on-primary py-4 rounded-full font-bold text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
              >
                <span className="material-symbols-outlined">arrow_forward</span>
                Proceed to Checkout
              </Link>
            </div>
          </section>
        </div>
      </div>
    </CustomerCommerceLayout>
  );
}
