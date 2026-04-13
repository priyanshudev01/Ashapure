import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../auth/useAuth';

type CustomerCommerceLayoutProps = {
  title: string;
  children: ReactNode;
  showFloatingCartButton?: boolean;
};

const sideNavItems = [
  { label: 'Dashboard', icon: 'dashboard', to: '/customer/dashboard' },
  { label: 'Shop', icon: 'shopping_basket', to: '/customer/products' },
  { label: 'Subscriptions', icon: 'calendar_today', to: '/customer/dashboard' },
  { label: 'Order History', icon: 'history', to: '/customer/orders' },
  { label: 'Rewards', icon: 'workspace_premium', to: '/customer/dashboard' },
  { label: 'Settings', icon: 'settings', to: '/customer/dashboard' },
];

const bottomNavItems = [
  { label: 'Dashboard', icon: 'dashboard', to: '/customer/dashboard' },
  { label: 'Shop', icon: 'shopping_basket', to: '/customer/products' },
  { label: 'Cart', icon: 'shopping_cart', to: '/customer/cart' },
  { label: 'Track', icon: 'local_shipping', to: '/customer/orders' },
];

export function CustomerCommerceLayout({ title, children, showFloatingCartButton }: CustomerCommerceLayoutProps) {
  const location = useLocation();
  const { logout } = useAuth();

  return (
    <div className="bg-surface text-on-surface antialiased flex h-screen overflow-hidden">
      <aside className="hidden md:flex flex-col h-full py-8 px-4 bg-slate-50 h-screen w-64 border-r border-slate-200 font-['Inter'] text-sm tracking-wide shrink-0">
        <div className="mb-10 px-4">
          <span className="text-xl font-bold text-green-600">Aasapure</span>
        </div>

        <div className="mb-8 px-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                person
              </span>
            </div>
            <div>
              <p className="font-bold text-on-surface">Welcome back</p>
              <p className="text-xs text-slate-500">Pristine Flow Member</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 space-y-1">
          {sideNavItems.map((item) => {
            const isActive =
              location.pathname === item.to ||
              (item.to === '/customer/cart' && location.pathname === '/customer/checkout');

            return (
              <Link
                key={item.label}
                to={item.to}
                className={
                  isActive
                    ? 'flex items-center gap-3 px-4 py-3 bg-green-50 text-green-700 font-bold border-r-4 border-green-600 transition-all active:translate-x-1 duration-200'
                    : 'flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-green-600 hover:bg-slate-100 transition-all active:translate-x-1 duration-200'
                }
              >
                <span
                  className="material-symbols-outlined"
                  style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
                >
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto px-4">
          <div className="grid grid-cols-1 gap-2">
            <Link
              to="/auth"
              className="w-full py-2 px-4 rounded-xl border border-outline text-on-surface font-medium hover:bg-surface-container-low transition-colors text-center"
            >
              Switch Role
            </Link>
            <button
              type="button"
              onClick={logout}
              className="w-full py-2 px-4 rounded-xl border border-outline text-on-surface font-medium hover:bg-surface-container-low transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </aside>

      <main className="flex-1 h-full overflow-y-auto bg-surface relative">
        <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 flex justify-between items-center w-full px-6 py-3 shadow-sm font-['Inter']">
          <div className="md:hidden">
            <span className="text-2xl font-black tracking-tight text-green-600">Aasapure</span>
          </div>
          <div className="hidden md:block">
            <h1 className="text-xl font-extrabold tracking-tight text-on-surface">{title}</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
              <input
                className="bg-surface-container-low border-none rounded-full px-4 py-2 text-sm w-64 focus:ring-2 focus:ring-primary/40 focus:bg-surface-container-lowest transition-all"
                placeholder="Search dairy..."
                type="text"
              />
              <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-outline text-sm">
                search
              </span>
            </div>
            <button className="p-2 rounded-full hover:bg-slate-50 transition-colors active:scale-95 duration-150 relative">
              <span className="material-symbols-outlined text-slate-600">notifications</span>
              <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full" />
            </button>
            <button className="p-2 rounded-full hover:bg-slate-50 transition-colors active:scale-95 duration-150">
              <span className="material-symbols-outlined text-slate-600">person</span>
            </button>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-6 py-10">{children}</div>

        {showFloatingCartButton ? (
          <Link
            to="/customer/cart"
            className="fixed bottom-8 right-8 w-16 h-16 bg-primary text-on-primary rounded-full shadow-[0px_12px_32px_rgba(25,28,30,0.15)] flex items-center justify-center hover:scale-110 active:scale-90 transition-all z-[60]"
          >
            <span className="material-symbols-outlined text-3xl">shopping_cart</span>
          </Link>
        ) : null}
      </main>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md flex justify-around items-center py-4 px-2 z-[70] shadow-2xl">
        {bottomNavItems.map((item) => {
          const isActive = location.pathname === item.to;

          return (
            <Link
              key={item.label}
              to={item.to}
              className={`flex flex-col items-center gap-1 ${
                isActive ? 'text-green-700 font-semibold' : 'text-slate-600'
              }`}
            >
              <span
                className="material-symbols-outlined"
                style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
              >
                {item.icon}
              </span>
              <span className="text-[10px] font-bold">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
