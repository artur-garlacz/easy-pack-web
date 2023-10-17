export type Package = {
  id: string;
  weight: number;
  length: number;
  width: number;
  height: number;
  description?: string;
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

export type DeliveryRequest = {
  id: string;
  createdAt: string;
  shipmentAt: string;
  type: string;
  status: DeliveryRequestStatus;
  description: string;
};

export enum DeliveryRequestStatus {
  CREATED = "CREATED",
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
}
