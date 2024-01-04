import { DeliveryDashboardLayout } from "@/components/organisms/DeliveryDashboardLayout/DeliveryDashboardLayout";
import { VehicleFleetTable } from "@/components/organisms/VehicleFleet/VehicleFleetTable";

export default function VehicleFleetView() {
  return (
    <DeliveryDashboardLayout>
      <VehicleFleetTable />
    </DeliveryDashboardLayout>
  );
}
