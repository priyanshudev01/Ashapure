import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../auth/useAuth';

const navItems = [
  { label: 'Dashboard', icon: 'dashboard', to: '/customer/dashboard' },
  { label: 'Deliveries', icon: 'local_shipping', to: '/customer/orders' },
  { label: 'Products', icon: 'inventory_2', to: '/customer/products' },
  { label: 'Subscriptions', icon: 'calendar_today', to: '/customer/dashboard' },
];

const footerItems = [
  { label: 'Support', icon: 'help', to: '/customer/dashboard' },
  { label: 'Logout', icon: 'logout', to: '/auth', danger: true },
];

export function CustomerSidebar() {
  const location = useLocation();
  const { logout } = useAuth();

  return (
    <aside className="h-screen w-64 fixed left-0 top-0 flex flex-col border-r border-slate-200 bg-white font-medium hidden md:flex z-[60]">
      <div className="px-6 py-8">
        <h1 className="text-xl font-black text-primary tracking-tight">Aasapure</h1>
        <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">Direct from Farm</p>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.label}
            to={item.to}
            className={
              location.pathname === item.to
                ? 'flex items-center gap-3 px-4 py-3 bg-primary text-white rounded-xl shadow-md'
                : 'flex items-center gap-3 px-4 py-3 text-slate-600 hover:text-primary hover:bg-slate-50 transition-colors'
            }
          >
            <span className="material-symbols-outlined" data-icon={item.icon}>
              {item.icon}
            </span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="p-4 mt-auto border-t border-slate-100">
        <Link
          to="/auth"
          className="w-full py-3 mb-4 text-xs font-bold uppercase tracking-widest text-primary bg-green-50 rounded-xl hover:bg-green-100 transition-all btn-interact block text-center"
        >
          Switch Role
        </Link>

        <div className="space-y-1">
          {footerItems.map((item) => (
            item.danger ? (
              <button
                key={item.label}
                type="button"
                onClick={logout}
                className="w-full flex items-center gap-3 px-4 py-2 transition-colors text-slate-500 hover:text-red-500"
              >
                <span className="material-symbols-outlined" data-icon={item.icon}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </button>
            ) : (
              <Link
                key={item.label}
                to={item.to}
                className="flex items-center gap-3 px-4 py-2 transition-colors text-slate-500 hover:text-slate-900"
              >
                <span className="material-symbols-outlined" data-icon={item.icon}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </Link>
            )
          ))}
        </div>
      </div>
    </aside>
  );
}
