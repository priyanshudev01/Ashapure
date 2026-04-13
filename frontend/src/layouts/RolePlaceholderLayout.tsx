import { Link } from 'react-router-dom';
import { useAuth } from '../auth/useAuth';

type RolePlaceholderLayoutProps = {
  role: 'Merchant' | 'Delivery' | 'Admin';
};

export function RolePlaceholderLayout({ role }: RolePlaceholderLayoutProps) {
  const { logout } = useAuth();

  return (
    <main className="min-h-screen bg-background text-on-surface font-body antialiased p-6">
      <div className="max-w-3xl mx-auto bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
        <p className="text-[10px] uppercase tracking-[0.2em] font-black text-primary">Phase 2</p>
        <h1 className="text-3xl font-black tracking-tight mt-3">{role} Route Ready</h1>
        <p className="text-slate-500 mt-2">
          Router path for {role.toLowerCase()} is configured. Customer Dashboard is the first converted page.
        </p>
        <div className="mt-8">
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/customer/dashboard"
              className="inline-flex items-center gap-2 px-5 py-3 bg-primary text-white text-sm font-bold rounded-xl btn-interact"
            >
              Open Customer Dashboard
            </Link>
            <button
              type="button"
              onClick={logout}
              className="inline-flex items-center gap-2 px-5 py-3 border border-slate-300 text-sm font-bold rounded-xl btn-interact"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
