import { DeliveryDashboardLayout } from "@/components/organisms/DeliveryDashboardLayout/DeliveryDashboardLayout";
import { CouriersTable } from "@/components/organisms/CouriersTable/CouriersTable";

export default function CouriersView() {
  return (
    <DeliveryDashboardLayout>
      <CouriersTable />
    </DeliveryDashboardLayout>
  );
}
