import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { label: 'Home', icon: 'dashboard', to: '/customer/dashboard' },
  { label: 'Shop', icon: 'shopping_basket', to: '/customer/products' },
  { label: 'Cart', icon: 'shopping_cart', to: '/customer/cart' },
  { label: 'Track', icon: 'local_shipping', to: '/customer/orders' },
];

export function CustomerMobileNav() {
  const location = useLocation();

  return (
    <nav className="md:hidden fixed bottom-6 left-6 right-6 h-16 bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl flex items-center justify-around px-4 border border-slate-100 z-[100]">
      {navItems.map((item) => {
        const isActive = location.pathname === item.to;

        return (
          <Link
            key={item.label}
            to={item.to}
            className={`flex flex-col items-center justify-center ${
              isActive ? 'text-primary' : 'text-slate-400'
            }`}
          >
            <span
              className="material-symbols-outlined"
              data-icon={item.icon}
              style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
            >
              {item.icon}
            </span>
            <span className="text-[9px] font-bold mt-0.5">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
