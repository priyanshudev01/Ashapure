import { useEffect, useState } from 'react';
import { useAuth } from '../../auth/useAuth';
import { fetchCustomerProducts, Product } from '../../features/customer/api/customer-api';
import { useCustomerCart } from '../../features/customer/cart/useCustomerCart';
import { CustomerCommerceLayout } from '../../layouts/CustomerCommerceLayout';

const categories = ['All Freshness', 'Cow Milk', 'Buffalo Milk', 'A2 Milk', 'Ghee', 'Curd'];

export function ProductListingPage() {
  const { token } = useAuth();
  const { addToCart } = useCustomerCart();

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      setIsLoading(false);
      return;
    }

    fetchCustomerProducts(token)
      .then((response) => {
        setProducts(response);
      })
      .catch((requestError) => {
        const message = requestError instanceof Error ? requestError.message : 'Unable to load products';
        setError(message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [token]);

  const onAddProduct = (product: Product) => {
    addToCart(product, 1);
  };

  return (
    <CustomerCommerceLayout title="Fresh From Farm" showFloatingCartButton>
      <div className="flex items-center gap-3 overflow-x-auto pb-6 mb-8">
        {categories.map((category, index) => (
          <button
            key={category}
            className={
              index === 0
                ? 'bg-primary text-on-primary px-6 py-2.5 rounded-full font-semibold whitespace-nowrap shadow-md active:scale-95 transition-transform'
                : 'bg-secondary-container text-on-secondary-container px-6 py-2.5 rounded-full font-medium whitespace-nowrap hover:bg-surface-container-high transition-colors active:scale-95'
            }
          >
            {category}
          </button>
        ))}
      </div>

      <section className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-16">
        <div className="md:col-span-8 bg-gradient-to-br from-primary to-primary-container rounded-[2rem] p-10 text-on-primary flex flex-col justify-center relative overflow-hidden">
          <div className="relative z-10">
            <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold tracking-widest uppercase mb-4">
              Subscription Exclusive
            </span>
            <h2 className="text-4xl md:text-5xl font-black mb-4 leading-tight tracking-tighter">
              Your Daily Ritual,
              <br />
              Delivered Cold.
            </h2>
            <p className="text-on-primary-container/90 max-w-md mb-8 text-lg">
              Experience the purest A2 milk sourced directly from verified organic farms. No middleman, just freshness.
            </p>
            <button className="bg-white text-primary px-8 py-4 rounded-full font-bold text-lg hover:shadow-xl transition-all active:scale-95">
              Start Subscription
            </button>
          </div>
          <div className="absolute right-0 bottom-0 top-0 w-1/2 opacity-20 pointer-events-none">
            <img
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAqHcaO_iXbHTrhf_ZmK__59ws5-TnGVBS6fNZmKp7Yid_ijXElvbQyN4-eET69_8td2N5zPVLuDQUArYuLtIXEgG_a1zeiaKu31dVOtQiTRyf6_LrJ9Ga9sOTsXKnVd91oPOKTeffAO0NH3CGEMde0lNCgjeDjywleVwcVvZEmMUMJdS4lNBS9LR74LfdBljqbqRapsoS8PkSYpRe38P-RPK2kr4E-ToBLuxu1qkQbSJcan_whTxUiIl0t6nb-ybXNa9JGigbJdv8"
              alt="Milk bottle"
            />
          </div>
        </div>

        <div className="md:col-span-4 bg-surface-container-lowest rounded-[2rem] p-8 flex flex-col justify-between border-none shadow-sm group">
          <div>
            <div className="w-14 h-14 bg-primary-fixed rounded-2xl flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-on-primary-fixed text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                verified
              </span>
            </div>
            <h3 className="text-2xl font-bold mb-2">Verified Farm Network</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Every drop is traced back to a certified pasture. Scan your bottle to meet the farm.
            </p>
          </div>
          <a href="#" className="inline-flex items-center gap-2 text-primary font-bold mt-4 group-hover:gap-3 transition-all">
            Learn more
            <span className="material-symbols-outlined">arrow_forward</span>
          </a>
        </div>
      </section>

      {isLoading ? (
        <div className="rounded-2xl bg-white p-8 border border-slate-200 text-slate-500">Loading products...</div>
      ) : error ? (
        <div className="rounded-2xl bg-red-50 border border-red-200 text-red-600 p-8">{error}</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-surface-container-lowest rounded-[1.5rem] p-4 flex flex-col hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="relative rounded-xl overflow-hidden mb-5 bg-surface-container-low aspect-square">
                <img className="w-full h-full object-cover" src={product.imageUrl ?? ''} alt={product.name} />
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  <span className="bg-primary/90 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider backdrop-blur-sm">
                    Verified Farm
                  </span>
                  <span className="bg-secondary/80 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider backdrop-blur-sm">
                    Purity Assured
                  </span>
                </div>
              </div>

              <div className="px-2 flex-1">
                <p className="text-xs font-bold text-primary mb-1 uppercase tracking-widest">
                  {product.category ?? 'Fresh Selection'}
                </p>
                <h4 className="text-lg font-extrabold text-on-surface mb-1">{product.name}</h4>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-2xl font-black text-on-surface">&#8377;{product.price.toFixed(2)}</span>
                  <span className="text-sm text-slate-500 font-medium">/ {product.unit}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 px-2 pb-2">
                <button
                  type="button"
                  className="py-3 px-1 rounded-full text-xs font-bold text-primary border-2 border-primary hover:bg-primary/5 transition-colors"
                  onClick={() => onAddProduct(product)}
                >
                  One-time
                </button>
                <button
                  type="button"
                  className="py-3 px-1 rounded-full text-xs font-bold bg-primary text-on-primary shadow-lg shadow-primary/20 hover:bg-primary-container transition-colors"
                  onClick={() => onAddProduct(product)}
                >
                  Subscribe
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </CustomerCommerceLayout>
  );
}
