import { RequestsTable } from "@/components/organisms/RequestsTable/RequestsTable";
import { useAuthenticatedSession } from "@/hooks/useAuthenticatedSession";
import { requestRepository } from "@/repositories/request-repository";

export function DeliveryRequestsTable() {
  const { token } = useAuthenticatedSession();
  const api = requestRepository({ token });
  return <RequestsTable fetchFn={api.getAllRequests} />;
}
