import StatsCard from "@/components/molecules/StatsCard/StatsCard";
import { DeliveryDashboardLayout } from "@/components/organisms/DeliveryDashboardLayout/DeliveryDashboardLayout";
import { LatestParcelDeliveriesWidget } from "@/components/organisms/LatestParcelsWidget/LatestParcelsWidget";
import { ShipmentStatsWidget } from "@/components/organisms/ShipmentStatsWidget/ShipmentStatsWidget";
import { parcelRepository } from "@/repositories/parcel-repository";
import { SimpleGrid } from "@chakra-ui/react";
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
            value={data?.totalStats.totalParcelsCount}
          />
          <StatsCard
            title="Unresolved deliveries"
            description="Packages"
            value={data?.totalStats.unresolvedParcelsCount}
          />
          <StatsCard
            title="Delivered parcels"
            description="Packages"
            value={data?.totalStats.deliveredParcelsCount}
          />
          {/* <StatsCard title="Pending requests" description="Packages" /> */}
        </div>
        <div className="mt-8">{/* <ShipmentStatsChart /> */}</div>
        <SimpleGrid gridTemplateColumns={"1fr 2fr"} gap={8}>
          <LatestParcelDeliveriesWidget />
          {data?.chartData && (
            <ShipmentStatsWidget chartData={data?.chartData} />
          )}
          {/* <ParcelProfitChart isEmpty={false} /> */}
        </SimpleGrid>
      </div>
    </DeliveryDashboardLayout>
  );
}
