import { DeliveryDashboardLayout } from "@/components/organisms/DeliveryDashboardLayout/DeliveryDashboardLayout";
import { DeliveryRequestsTable } from "@/components/organisms/DeliveryRequestsTable/DeliveryRequestsTable";

export default function RequestsView() {
  return (
    <DeliveryDashboardLayout>
      <DeliveryRequestsTable />
    </DeliveryDashboardLayout>
  );
}
