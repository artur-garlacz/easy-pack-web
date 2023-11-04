import { Paginated } from "@/typings/data";
import { AddressDetails, Package, PACKAGE_TYPE } from "@/typings/requests";

export type ParcelDetails = {
  id: string;
  createdAt: string;
  trackingNumber: string;
  status: ParcelStatusLog[];
  senderDetails: AddressDetails;
  recipientDetails: AddressDetails;
};

export type ParcelStatusLog = {
  status: PARCEL_STATUS;
  createdAt: string;
};

export enum PARCEL_STATUS {
  CREATED = "CREATED",
  PENDING = "PENDING",
  IN_TRANSIT = "IN_TRANSIT",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
}

// parcel deliveries
export type ParcelDelivery = {
  id: string;
  type: PACKAGE_TYPE;
  status: PARCEL_STATUS;
  trackingNumber: string;
  createdAt: string;
  price: string;
  pickupAt: string;
  shipmentAt: string;
  description: string;
  packages: Package[];
  user?: {
    email: string;
    firstName: string;
    lastName: string;
  };
};

export type ParcelDeliveryDetails = ParcelDelivery & {
  senderAddress: AddressDetails;
  recipientAddress: AddressDetails;
};

export type ParcelDeliveryStatChartItem = {
  deliveredParcelsCount: number;
  period: string;
  rawDate: string;
  totalIncome: number;
};

export type ParcelDeliveryResponse = Paginated<ParcelDelivery>;

export type ParcelDeliveryDetailsResponse = {
  details: ParcelDeliveryDetails;
  history: { createdAt: string; status: PARCEL_STATUS }[];
};

export type ParcelDeliveriesStatsResponse = {
  totalStats: {
    totalParcelsCount: number;
    unresolvedParcelsCount: number;
    deliveredParcelsCount: number;
  };
  chartData: {
    hasData: boolean;
    items: ParcelDeliveryStatChartItem[];
  };
};
