import { z } from "zod";

export enum PACKAGE_TYPE {
  ENVELOPE = "ENVELOPE",
  BOX = "BOX",
  OTHER = "OTHER",
}

const packageItem = z.object({
  type: z.nativeEnum(PACKAGE_TYPE),
  weight: z.coerce.number().nonnegative(),
  length: z.coerce.number().nonnegative(),
  width: z.coerce.number().nonnegative(),
  height: z.coerce.number().nonnegative(),
  description: z.string().optional(),
});

const address = z.object({
  street: z.string().min(1),
  city: z.string().min(1),
  country: z.string().min(1),
  postalCode: z.string().min(1),
  locationNumber: z.string().min(1),
  phoneNumber: z.string().optional(),
  email: z.string().optional(),
});

export const requestFormSchema = z.object({
  packages: z.array(packageItem).min(1),
  pickupAddress: address,
  deliveryAddress: address,
  pickupAt: z.string(),
  shipmentAt: z.string(),
  description: z.string().optional(),
});

export type RequestFormSchema = z.infer<typeof requestFormSchema>;

export type Package = z.infer<typeof packageItem> & { id: string };

export type AddressDetails = z.infer<typeof address>;

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
