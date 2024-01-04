import { Paginated } from "@/typings/data";

export enum VehicleStatus {
  Active = "Active",
  Inactive = "Inactive",
  Maintenance = "Maintenance",
  Archived = "Archived",
}

export enum VehicleCategory {
  PassengerCar = "PassengerCar",
  Truck = "Truck",
}

export enum VehicleDriveType {
  Electric = "Electric",
  Gasoline = "Gasoline",
  Diesel = "Diesel",
}

export enum VehiclePropertyType {
  Hire = "Hire",
  Leasing = "Leasing",
  Property = "Property",
}

export type VehicleFleetItem = {
  registrationNumber: string;
  name: string;
  brand: string;
  model: string;
  propertyType: VehiclePropertyType;
  category: VehicleCategory;
  driveType: VehicleDriveType;
  status: VehicleStatus;
  lastControlAt: string;
  createdAt: string;
  user?: {};
};
export type VehicleFleetListResponse = Paginated<VehicleFleetItem>;
