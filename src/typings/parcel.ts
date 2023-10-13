import { Paginated } from "@/typings/data";
import { AddressDetails, Package } from "@/typings/requests";

export enum PACKAGE_TYPE {
  "ENVELOPE",
  "BOX",
  "OTHER",
}

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
  ARCHIVED = "ARCHIVED",
  CANCELLED = "CANCELLED",
}

// parcel deliveries

export type ParcelDelivery = {
  id: string;
  type: PACKAGE_TYPE;
  status: PARCEL_STATUS;
  trackingNumber: string;
  createdAt: string;
  description: string;
  senderDetails: {
    country: string;
    city: string;
    street: string;
    postalCode: string;
    locationNumber: string;
    email: string;
    phoneNumber: string;
    firstName: string;
    lastName: string;
    createdAt: string;
    updatedAt: string;
  };
  recipientDetails: {
    id: string;
    country: string;
    city: string;
    street: string;
    postalCode: string;
    locationNumber: string;
    email: string;
    phoneNumber: string;
    firstName: string;
    lastName: string;
    createdAt: string;
    updatedAt: string;
  };
  packages: Package[];
  user?: {
    email: string;
    firstName: string;
    lastName: string;
  };
};

export type ParcelDeliveryResponse = Paginated<ParcelDelivery>;

export type ParcelDeliveryDetailsResponse = {
  details: ParcelDelivery;
  history: { createdAt: string; status: PARCEL_STATUS }[];
};
