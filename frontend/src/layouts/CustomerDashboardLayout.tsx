import { ReactNode } from 'react';
import { CustomerHeader } from '../components/customer/CustomerHeader';
import { CustomerMobileNav } from '../components/customer/CustomerMobileNav';
import { CustomerSidebar } from '../components/customer/CustomerSidebar';

type CustomerDashboardLayoutProps = {
  children: ReactNode;
};

export function CustomerDashboardLayout({ children }: CustomerDashboardLayoutProps) {
  return (
    <div className="bg-background font-body text-on-surface antialiased min-h-screen">
      <CustomerSidebar />
      <main className="md:ml-64 min-h-screen">
        <CustomerHeader />
        <div className="p-6 lg:p-10 space-y-8 max-w-7xl mx-auto">{children}</div>
        <CustomerMobileNav />
      </main>
    </div>
  );
}
