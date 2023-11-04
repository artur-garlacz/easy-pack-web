import { Paginated } from "@/typings/data";

export enum UserType {
  CUSTOMER = "CUSTOMER",
  DELIVERY = "DELIVERY",
}

export type Courier = {
  name: string;
  email: string;
  phoneNumber: string;
  assignedParcels: any;
};

export type CreateCourierPayload = {
  firstName: string;
  lastName: string;
  email: string;
  role: "COURIER";
};

export type CouriersResponse = Paginated<Courier>;
