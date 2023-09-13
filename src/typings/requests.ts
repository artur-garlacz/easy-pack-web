import { PARCEL_STATUS } from "@/typings/parcel";

export type Package = {
  weight: number;
  length: number;
  width: number;
  height: number;
};

export type Parcel = {
  packages: Package[];
};

export type CreateParcelRequestFormData = {
  packages: Array<Package>;
  pickupAddress: {
    firstName: string;
    lastName: string;
    country: string;
    street: string;
    city: string;
    postalCode: string;
    phoneNumber: string;
    email: string;
  };
  deliveryAddress: {
    firstName: string;
    lastName: string;
    country: string;
    street: string;
    city: string;
    postalCode: string;
    phoneNumber: string;
    email: string;
  };
  pickupContact: {};
  deliveryContact: {};
};

export type DeliveryRequest = {
  id: string;
  createdAt: string;
  shipmentAt: string;
  type: string;
  status: string;
  parcelStatus: PARCEL_STATUS;
  trackingNumber: string;
};

export type AddressDetails = {
  city: string;
  country: string;
  street: string;
  postalCode: string;
  locationNumber: string;
  email: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
};
