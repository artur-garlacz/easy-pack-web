import { DeliveryDashboardLayout } from "@/components/organisms/DeliveryDashboardLayout/DeliveryDashboardLayout";
import { RequestsTable } from "@/components/organisms/RequestsTable/RequestsTable";
import { useAuthenticatedSession } from "@/hooks/useAuthenticatedSession";
import { requestRepository } from "@/repositories/request-repository";

export function DeliveryRequestsTable() {
  const { token } = useAuthenticatedSession();
  const api = requestRepository({ token });
  return (
    <DeliveryDashboardLayout>
      <RequestsTable fetchFn={api.getAllRequests} />
    </DeliveryDashboardLayout>
  );
}
