import { backendFetcher as fetcher } from "@/lib/helpers/fetchers/backendFetcher";
import { ParcelRepository } from "@/repositories/parcel-repository/types";
import { ParcelDetails } from "@/typings/parcel";

export const parcelRepository = ({
  token,
}: {
  token?: string;
}): ParcelRepository => {
  const headers = { authorization: `Bearer ${token}` };
  return {
    getParcel({
      parcelNumber,
    }: {
      parcelNumber: string;
    }): Promise<ParcelDetails> {
      return fetcher({
        method: "GET",
        route: `api/parcel-delivery`,
        queryString: { parcelNumber },
      });
    },
    getParcelDeliveries({ page, limit = 10 }) {
      return fetcher({
        method: "GET",
        route: `api/parcel-deliveries`,
        queryString: { page, limit },
      });
    },
    getParcelDeliveryDetails({ parcelId }) {
      return fetcher({
        method: "GET",
        route: `api/parcel-deliveries/${parcelId}`,
      });
    },
    updateParcelStatus({ parcelId, status }) {
      return fetcher({
        method: "PATCH",
        route: `api/parcel-deliveries/${parcelId}/status`,
        payload: {
          status,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
  };
};
