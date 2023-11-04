import { backendFetcher as fetcher } from "@/lib/helpers/fetchers/backendFetcher";
import { removeEmptyProperties } from "@/lib/object";
import { RequestRepository } from "@/repositories/request-repository/types";

export const requestRepository = ({
  token,
}: {
  token?: string;
}): RequestRepository => {
  const headers = { authorization: `Bearer ${token}` };
  return {
    getAllRequests({ page, filters, limit = 10 }) {
      return fetcher({
        method: "GET",
        route: `api/users/delivery-requests`,
        queryString: { page, limit, ...removeEmptyProperties(filters) },
        headers,
      });
    },
    createRequest(request) {
      return fetcher({
        method: "POST",
        route: `api/customers/delivery-requests`,
        headers,
        payload: request,
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
