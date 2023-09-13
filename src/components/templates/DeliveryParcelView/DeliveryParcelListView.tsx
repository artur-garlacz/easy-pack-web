import { ParcelDeliveryTable } from "@/components/organisms/ParcelDelivery/ParcelDeliveryTable";
import { DeliveryDashboardLayout } from "@/components/organisms/DeliveryDashboardLayout/DeliveryDashboardLayout";

export default function ParcelDeliveryListView() {
  return (
    <DeliveryDashboardLayout>
      <ParcelDeliveryTable />
    </DeliveryDashboardLayout>
  );
}
