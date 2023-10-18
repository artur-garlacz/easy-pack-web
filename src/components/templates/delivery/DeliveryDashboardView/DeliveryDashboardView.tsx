import StatsCard from "@/components/molecules/StatsCard/StatsCard";
import { DeliveryDashboardLayout } from "@/components/organisms/DeliveryDashboardLayout/DeliveryDashboardLayout";
import LatestRequestsWidget from "@/components/organisms/LatestRequests/LatestRequestsWidget";
import ShipmentStatsChart from "@/components/organisms/ShipmentStatsChart/ShipmentStatsChart";
import { parcelRepository } from "@/repositories/parcel-repository";
import { useQuery } from "@tanstack/react-query";

export default function DeliveryDashboardView() {
  const api = parcelRepository({});
  const { status, data } = useQuery(
    [api.getParcelDeliveriesStats.name, {}],
    () => api.getParcelDeliveriesStats()
  );

  console.log(data);

  return (
    <DeliveryDashboardLayout>
      <div className="h-full px-4 py-6 lg:px-8">
        <div className="grid lg:grid-cols-4 gap-8">
          <StatsCard
            title="Total deliveries"
            description="Packages"
            value={data?.totalParcelsCount}
          />
          <StatsCard
            title="Unresolved deliveries"
            description="Packages"
            value={data?.unresolvedParcelsCount}
          />
          <StatsCard
            title="Delivered parcels"
            description="Packages"
            value={data?.deliveredParcelsCount}
          />
          {/* <StatsCard title="Pending requests" description="Packages" /> */}
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
