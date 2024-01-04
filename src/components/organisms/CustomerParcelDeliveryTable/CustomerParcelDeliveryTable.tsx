import { RequestsTable } from "@/components/organisms/RequestsTable/RequestsTable";
import { useAuthenticatedSession } from "@/hooks/useAuthenticatedSession";
import { requestRepository } from "@/repositories/request-repository";

export function CustomerParcelDeliveryTable() {
  const { token } = useAuthenticatedSession();
  const api = requestRepository({ token });

  return <></>;
}
