import { backendFetcher as fetcher } from "@/lib/helpers/fetchers/backendFetcher";
import { ParcelRepository } from "@/repositories/parcel-repository/types";
import { removeEmptyProperties } from "@/lib/object";
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
    getParcelDeliveries({ page, filters, limit = 10 }) {
      return fetcher({
        method: "GET",
        route: `api/parcel-deliveries`,
        queryString: { page, limit, ...removeEmptyProperties(filters) },
      });
    },
    getParcelDeliveriesStats() {
      return fetcher({
        method: "GET",
        route: `api/parcel-deliveries/stats`,
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
    assignUserToParcel({ parcelId, userId }) {
      return fetcher({
        method: "PATCH",
        route: `api/parcel-deliveries/${parcelId}/assigned-users`,
        payload: {
          userId,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
  };
};
