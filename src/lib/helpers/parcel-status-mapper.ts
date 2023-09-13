import { PARCEL_STATUS } from "@/typings/parcel";
import { LucideIcon, PackageCheck } from "lucide-react";
import {
  // MapPin,
  PackagePlus,
  PackageSearch,
  Truck,
  UserPlus2,
} from "lucide-react";

export const parcelStatusMapper: Record<
  any,
  {
    info: string;
    title: string;
    Icon: LucideIcon;
  }
> = {
  // [PARCEL_STATUS.PARCEL_CREATED]: {
  //   info: "Delivery route registered in system",
  //   title: "Registered in system",
  //   Icon: PackagePlus,
  // },
  [PARCEL_STATUS.CREATED]: {
    info: "Delivery route registered in system",
    title: "Registered in system",
    Icon: PackagePlus,
  },
  // [PARCEL_STATUS.COURIER_ASSIGNED_TO_PARCEL]: {
  //   info: "Courier assigned to delivery",
  //   title: "Courier assigned",
  //   Icon: UserPlus2,
  // },
  [PARCEL_STATUS.PENDING]: {
    info: "Parcel will be picked up from indicated place",
    title: "Pending",
    Icon: PackageSearch,
  },
  [PARCEL_STATUS.IN_TRANSIT]: {
    info: "Parcel has been picked up and is on its way",
    title: "In way",
    Icon: Truck,
  },
  [PARCEL_STATUS.DELIVERED]: {
    info: "Parcel has been picked up and is on its way",
    title: "Delivered",
    Icon: PackageCheck,
  },
  // [ParcelStatus.PARCEL_ARCHIVED]: "Parcel archived",
};

export const allowedParcelStatusUpdates: Record<
  PARCEL_STATUS,
  PARCEL_STATUS[]
> = {
  [PARCEL_STATUS.CREATED]: [PARCEL_STATUS.PENDING],
  [PARCEL_STATUS.PENDING]: [PARCEL_STATUS.CREATED, PARCEL_STATUS.IN_TRANSIT],
  [PARCEL_STATUS.IN_TRANSIT]: [PARCEL_STATUS.DELIVERED],
  [PARCEL_STATUS.DELIVERED]: [PARCEL_STATUS.IN_TRANSIT, PARCEL_STATUS.ARCHIVED],
  [PARCEL_STATUS.ARCHIVED]: [],
  [PARCEL_STATUS.CANCELLED]: [PARCEL_STATUS.PENDING],
};
