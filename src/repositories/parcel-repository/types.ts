import {
  PARCEL_STATUS,
  ParcelDeliveryDetailsResponse,
  ParcelDeliveryResponse,
} from "@/typings/parcel";

export interface ParcelRepository {
  getParcel: ({ parcelNumber }: { parcelNumber: string }) => Promise<any>;
  getParcelDeliveries: ({
    page,
    limit,
  }: {
    filters: {};
    page: number;
    limit?: number;
  }) => Promise<ParcelDeliveryResponse>;
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
  }) => Promise<ParcelDeliveryDetailsResponse>;
}
