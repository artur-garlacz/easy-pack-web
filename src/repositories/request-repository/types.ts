import {
  PARCEL_STATUS,
  ParcelDeliveryDetailsResponse,
  ParcelDeliveryResponse,
} from "@/typings/parcel";

export interface RequestRepository {
  getAllRequests: ({
    page,
    limit,
  }: {
    filters: {};
    page: number;
    limit?: number;
  }) => Promise<any>;
}
