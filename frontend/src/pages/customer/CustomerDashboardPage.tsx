import { CustomerHeroSection } from '../../components/customer/CustomerHeroSection';
import { DeliveryTimelineCard } from '../../components/customer/DeliveryTimelineCard';
import { ProductShowcase } from '../../components/customer/ProductShowcase';
import { SubscriptionPanel } from '../../components/customer/SubscriptionPanel';
import { CustomerDashboardLayout } from '../../layouts/CustomerDashboardLayout';

export function CustomerDashboardPage() {
  return (
    <CustomerDashboardLayout>
      <CustomerHeroSection />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <DeliveryTimelineCard />
        <SubscriptionPanel />
      </div>

      <ProductShowcase />
    </CustomerDashboardLayout>
  );
}
