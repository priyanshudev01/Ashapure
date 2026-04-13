import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <main className="min-h-screen bg-background p-8 font-body text-on-surface">
      <div className="max-w-2xl mx-auto bg-white rounded-3xl border border-slate-200 p-8">
        <h1 className="text-3xl font-black">Page Not Found</h1>
        <p className="text-slate-500 mt-2">This route is not mapped yet in the current phase.</p>
        <Link to="/customer/dashboard" className="inline-flex mt-6 px-5 py-3 rounded-xl bg-primary text-white font-bold">
          Go to Customer Dashboard
        </Link>
      </div>
    </main>
  );
}
