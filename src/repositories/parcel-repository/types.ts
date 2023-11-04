import {
  PARCEL_STATUS,
  ParcelDeliveriesStatsResponse,
  ParcelDeliveryDetailsResponse,
  ParcelDeliveryResponse,
} from "@/typings/parcel";

export interface ParcelRepository {
  getParcel: ({ parcelNumber }: { parcelNumber: string }) => Promise<any>;
  getParcelDeliveries: ({
    page,
    limit,
    filters,
  }: {
    filters: {};
    page: number;
    limit?: number;
  }) => Promise<ParcelDeliveryResponse>;
  getParcelDeliveriesStats: () => Promise<ParcelDeliveriesStatsResponse>;
  getParcelDeliveryDetails: ({
    parcelId,
  }: {
    parcelId: string;
  }) => Promise<ParcelDeliveryDetailsResponse>;
  updateParcelStatus: ({
    parcelId,
    status,
  }: {
    parcelId: string;
    status: PARCEL_STATUS;
  }) => Promise<void>;
  assignUserToParcel: ({
    parcelId,
    userId,
  }: {
    parcelId: string;
    userId: string;
  }) => Promise<void>;
}
