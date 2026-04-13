import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDefaultRouteForRole } from '../../auth/auth-routes';
import { UserRole } from '../../auth/auth.types';
import { useAuth } from '../../auth/useAuth';

const roles: { label: string; value: UserRole; subtitle: string }[] = [
  { label: 'Customer', value: 'CUSTOMER', subtitle: 'Pure milk, daily' },
  { label: 'Merchant', value: 'MERCHANT', subtitle: 'Farm growth & logistics' },
  { label: 'Delivery', value: 'DELIVERY', subtitle: 'Trust-driven delivery' },
  { label: 'Admin', value: 'ADMIN', subtitle: 'Platform operations' },
];

export function AuthPage() {
  const navigate = useNavigate();
  const { login, register } = useAuth();

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [selectedRole, setSelectedRole] = useState<UserRole>('CUSTOMER');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const submitLabel = mode === 'login' ? 'Sign In' : 'Create Account';
  const title = mode === 'login' ? 'Welcome back' : 'Create your account';
  const subtitle = mode === 'login' ? 'Join the network of fresh dairy enthusiasts.' : 'Start your Aasapure role journey.';

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFeedback(null);
    setIsSubmitting(true);

    try {
      if (mode === 'login') {
        const user = await login({ email, password });
        navigate(getDefaultRouteForRole(user.role), { replace: true });
      } else {
        const response = await register({
          email,
          password,
          fullName,
          role: selectedRole,
        });

        if (response.hasToken) {
          navigate(getDefaultRouteForRole(response.user.role), { replace: true });
          return;
        }

        setFeedback(response.message ?? 'Registration successful. Please wait for admin approval.');
        setMode('login');
      }

      if (!rememberMe) {
        localStorage.removeItem('aasapure.auth.token');
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to continue';
      setFeedback(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col md:flex-row overflow-hidden bg-surface text-on-surface antialiased selection:bg-primary/20">
      <section className="relative hidden md:flex md:w-1/2 lg:w-[60%] bg-primary flex-col justify-between p-12 lg:p-20 overflow-hidden">
        <div className="absolute inset-0 opacity-30 mix-blend-overlay">
          <img
            alt="Fresh morning mist"
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCxc4KT80igUpguV7ELU_kkvFeV75j6TvQnabeyl93GSIymuRcH9L-AjaWCCiFijoFtYJGj2E8SkEWavYg3iSyI6TEoBLBRAsjSzFfAhtZJRu33uMZNiK2m1EhT8pGa_JcynDMMZmI050lu-UuhlAaqHfhaBIN8hBqGiPlBvWxmtxpLpiXoDFqk2EsZi8vPYFJLuOCsyqZMZQs3jaXGmI8wuxtUcDnyF3TP1OTsObYHGvwBNKC6UzOR1RBAXvcgrScsdin-t4RTQQU"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-tr from-primary-dark via-primary to-transparent" />

        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg">
              <span className="material-symbols-outlined text-primary text-2xl" data-icon="water_drop">
                water_drop
              </span>
            </div>
            <span className="text-2xl font-black tracking-tight text-white">Aasapure</span>
          </div>
        </div>

        <div className="relative z-10 max-w-xl">
          <h1 className="text-5xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">
            Verified purity <br />
            at your doorstep. <br />
            <span className="text-white/80">Set once. Delivered daily.</span>
          </h1>
          <p className="text-lg text-white/90 leading-relaxed font-medium">
            Experience the ritual of morning farm-fresh dairy. We bridge the gap between organic farms and your doorstep
            with a pristine, tech-driven supply chain.
          </p>
        </div>
      </section>

      <section className="flex-1 flex flex-col justify-center items-center bg-surface p-6 md:p-12 lg:p-20 relative">
        <div className="md:hidden absolute top-8 left-8 flex items-center gap-2">
          <span className="text-xl font-black tracking-tight text-primary">Aasapure</span>
        </div>

        <div className="w-full max-w-md space-y-10">
          <div className="space-y-2">
            <h2 className="text-3xl font-extrabold tracking-tight text-on-surface">{title}</h2>
            <p className="text-on-surface-variant font-medium">{subtitle}</p>
          </div>

          <div className="space-y-4">
            <label className="text-[10px] uppercase tracking-[0.1em] font-bold text-on-surface-variant">Select Your Role</label>
            <div className="grid grid-cols-1 gap-3">
              {roles.map((role) => {
                const isSelected = selectedRole === role.value;
                const isPrimary = role.value === 'CUSTOMER';

                return (
                  <button
                    key={role.value}
                    type="button"
                    onClick={() => setSelectedRole(role.value)}
                    className={
                      isSelected
                        ? 'flex flex-col items-start px-5 py-4 rounded-xl bg-primary text-on-primary shadow-lg shadow-primary/20 ring-2 ring-primary transition-all'
                        : `flex flex-col items-start px-5 py-4 rounded-xl bg-white border border-surface-container-high text-on-surface-variant hover:border-primary/50 hover:bg-primary/5 transition-all ${
                            isPrimary ? '' : ''
                          }`
                    }
                  >
                    <span className="text-sm font-bold">{role.label}</span>
                    <span className="text-[11px] opacity-80 font-medium">{role.subtitle}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-5">
              {mode === 'register' ? (
                <div className="relative group">
                  <label
                    className="text-[10px] uppercase tracking-[0.1em] font-bold text-on-surface-variant absolute -top-2 left-4 bg-surface px-1 z-10 transition-colors group-focus-within:text-primary"
                    htmlFor="fullName"
                  >
                    Full Name
                  </label>
                  <input
                    id="fullName"
                    value={fullName}
                    onChange={(event) => setFullName(event.target.value)}
                    className="w-full px-5 py-4 rounded-xl bg-white border border-surface-container-high focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-on-surface placeholder:text-outline-variant font-medium outline-none"
                    placeholder="Alex Johnson"
                    type="text"
                    required
                  />
                </div>
              ) : null}

              <div className="relative group">
                <label
                  className="text-[10px] uppercase tracking-[0.1em] font-bold text-on-surface-variant absolute -top-2 left-4 bg-surface px-1 z-10 transition-colors group-focus-within:text-primary"
                  htmlFor="email"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="w-full px-5 py-4 rounded-xl bg-white border border-surface-container-high focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-on-surface placeholder:text-outline-variant font-medium outline-none"
                  placeholder="name@example.com"
                  type="email"
                  required
                />
              </div>

              <div className="relative group">
                <label
                  className="text-[10px] uppercase tracking-[0.1em] font-bold text-on-surface-variant absolute -top-2 left-4 bg-surface px-1 z-10 transition-colors group-focus-within:text-primary"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  id="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="w-full px-5 py-4 rounded-xl bg-white border border-surface-container-high focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-on-surface placeholder:text-outline-variant font-medium outline-none"
                  placeholder="********"
                  type="password"
                  minLength={6}
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer group">
                <div className="w-5 h-5 rounded border border-surface-container-high bg-white flex items-center justify-center group-hover:border-primary/50 transition-colors">
                  <input
                    className="w-3 h-3 rounded-sm border-none text-primary focus:ring-transparent bg-transparent"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(event) => setRememberMe(event.target.checked)}
                  />
                </div>
                <span className="text-on-surface-variant font-medium">Remember me</span>
              </label>
              <a className="text-primary font-semibold hover:text-primary-dark transition-colors" href="#">
                Forgot password?
              </a>
            </div>

            {feedback ? <p className="text-sm font-medium text-primary">{feedback}</p> : null}

            <button
              className="w-full bg-primary hover:bg-primary-dark text-on-primary py-4 rounded-xl font-bold text-lg shadow-lg shadow-primary/20 transition-all transform active:scale-[0.98] disabled:opacity-70"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Please wait...' : submitLabel}
            </button>
          </form>

          <p className="text-center text-on-surface-variant font-medium">
            {mode === 'login' ? 'New to Aasapure?' : 'Already have an account?'}{' '}
            <button
              type="button"
              onClick={() => {
                setMode(mode === 'login' ? 'register' : 'login');
                setFeedback(null);
              }}
              className="text-primary font-bold hover:text-primary-dark transition-colors"
            >
              {mode === 'login' ? 'Create an account' : 'Sign in'}
            </button>
          </p>
        </div>

        <div className="absolute bottom-0 right-0 p-8 opacity-5 pointer-events-none">
          <span className="material-symbols-outlined text-[140px] text-primary" data-icon="energy_savings_leaf">
            energy_savings_leaf
          </span>
        </div>
      </section>
    </main>
  );
}
