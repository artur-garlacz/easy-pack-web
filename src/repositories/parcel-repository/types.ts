import {
  PARCEL_STATUS,
  ParcelDeliveriesStatsResponse,
  ParcelDeliveryDetailsResponse,
  ParcelDeliveryResponse,
} from "@/typings/parcel";
import { RequestFormSchema } from "@/typings/requests";

export interface ParcelRepository {
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
    trackingNumber,
  }: {
    trackingNumber: string;
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
  createParcelDelivery: (requst: RequestFormSchema) => Promise<void>;
  // createEstimation: (requst: RequestFormSchema) => Promise<void>;
}
