import { backendFetcher as fetcher } from "@/lib/helpers/fetchers/backendFetcher";
import { RequestRepository } from "@/repositories/request-repository/types";

export const requestRepository = ({
  token,
}: {
  token?: string;
}): RequestRepository => {
  const headers = { authorization: `Bearer ${token}` };
  return {
    getAllRequests({ page, limit = 10 }) {
      return fetcher({
        method: "GET",
        route: `api/users/delivery-requests`,
        queryString: { page, limit },
        headers,
      });
    },
    getEstimation({ type, pickUpAddress, shipmentUpAddress, packagesCount }) {
      return fetcher({
        method: "GET",
        route: `api/customers/delivery-requests/estimations`,
        queryString: { type, pickUpAddress, shipmentUpAddress, packagesCount },
        headers,
      });
    },
  };
};
