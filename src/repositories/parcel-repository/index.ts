import { backendFetcher as fetcher } from "@/lib/helpers/fetchers/backendFetcher";
import { ParcelRepository } from "@/repositories/parcel-repository/types";
import { removeEmptyProperties } from "@/lib/object";

export const parcelRepository = ({
  token,
}: {
  token?: string;
}): ParcelRepository => {
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  return {
    getParcelDeliveries({ page, filters, limit = 10 }) {
      return fetcher({
        method: "GET",
        route: `api/parcel-deliveries`,
        queryString: { page, limit, ...removeEmptyProperties(filters) },
        headers,
      });
    },
    getParcelDeliveriesStats() {
      return fetcher({
        method: "GET",
        route: `api/parcel-deliveries/stats`,
      });
    },
    getParcelDeliveryDetails({ trackingNumber }) {
      return fetcher({
        method: "GET",
        route: `api/parcel-deliveries/${trackingNumber}`,
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
    createParcelDelivery(request) {
      return fetcher({
        method: "POST",
        route: `api/parcel-deliveries`,
        headers,
        payload: request,
      });
    },
    // createEstimation({
    //   type,
    //   pickUpAddress,
    //   shipmentUpAddress,
    //   packagesCount,
    // }) {
    //   return fetcher({
    //     method: "GET",
    //     route: `api/parcel-deliveries/estimations`,
    //     queryString: { type, pickUpAddress, shipmentUpAddress, packagesCount },
    //     headers,
    //   });
    // },
  };
};
