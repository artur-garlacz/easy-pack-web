import StatsCard from "@/components/molecules/StatsCard/StatsCard";
import { DeliveryDashboardLayout } from "@/components/organisms/DeliveryDashboardLayout/DeliveryDashboardLayout";
import { LatestParcelDeliveriesWidget } from "@/components/organisms/LatestParcelsWidget/LatestParcelsWidget";
import { PackagesCountByTypeChart } from "@/components/organisms/PackagesCountByTypeChart/PackagesCountByTypeChart";
import { PackagesCountInParcelChart } from "@/components/organisms/PackagesCountInParcelChart/PackageCountInParcelChart";
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
            description="Deliveries"
            value={data?.totalStats.totalParcelsCount}
          />
          <StatsCard
            title="Unresolved deliveries"
            description="Deliveries"
            value={data?.totalStats.unresolvedParcelsCount}
          />
          <StatsCard
            title="Delivered parcels"
            description="Deliveries"
            value={data?.totalStats.deliveredParcelsCount}
          />
          <StatsCard
            title="Total packages"
            description="Packages"
            value={data?.totalStats.packagesCount}
          />
        </div>
        {/* <div className="mt-8"><ShipmentStatsChart /></div> */}
        <SimpleGrid mt={8} gridTemplateColumns={"1fr 2fr"} gap={8}>
          <LatestParcelDeliveriesWidget />
          {data?.parcelsChartData && (
            <ShipmentStatsWidget chartData={data?.parcelsChartData} />
          )}
        </SimpleGrid>

        <SimpleGrid mt={8} gridTemplateColumns={"1fr 1fr 1fr"} gap={8}>
          {data?.groupPackagesByType && (
            <PackagesCountByTypeChart
              data={data.groupPackagesByType}
              isEmpty={data?.groupPackagesByType.hasData}
            />
          )}
          {data?.packagesCountInParcel && (
            <PackagesCountInParcelChart
              data={data?.packagesCountInParcel}
              isEmpty={data?.packagesCountInParcel.hasData}
            />
          )}
        </SimpleGrid>
      </div>
    </DeliveryDashboardLayout>
  );
}
