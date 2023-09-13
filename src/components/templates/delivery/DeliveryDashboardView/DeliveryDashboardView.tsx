import StatsCard from "@/components/molecules/StatsCard/StatsCard";
import { DeliveryDashboardLayout } from "@/components/organisms/DeliveryDashboardLayout/DeliveryDashboardLayout";
import LatestRequestsWidget from "@/components/organisms/LatestRequests/LatestRequestsWidget";
import ShipmentStatsChart from "@/components/organisms/ShipmentStatsChart/ShipmentStatsChart";

export default function DeliveryDashboardView() {
  return (
    <DeliveryDashboardLayout>
      <div className="h-full px-4 py-6 lg:px-8">
        <div className="grid lg:grid-cols-4 gap-8">
          <StatsCard title="Total Shipments" description="Packages" />
          <StatsCard title="Pending parcels" description="Packages" />
          <StatsCard title="Pending requests" description="Packages" />
          <StatsCard title="Pending requests" description="Packages" />
        </div>
        <div className="grid grid-cols-3 gap-8 mt-8">
          <div className="col-span-2">
            <ShipmentStatsChart />
          </div>
          <LatestRequestsWidget />
        </div>
      </div>
    </DeliveryDashboardLayout>
  );
}
