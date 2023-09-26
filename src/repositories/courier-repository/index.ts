import { backendFetcher as fetcher } from "@/lib/helpers/fetchers/backendFetcher";
import { CourierRepository } from "@/repositories/courier-repository/types";

export const courierRepository = ({
  token,
}: {
  token?: string;
}): CourierRepository => {
  const headers = { authorization: `Bearer ${token}` };
  return {
    getCouriers({ page, limit = 10 }) {
      return fetcher({
        method: "GET",
        route: `api/users/couriers`,
        queryString: { page, limit },
      });
    },
  };
};
