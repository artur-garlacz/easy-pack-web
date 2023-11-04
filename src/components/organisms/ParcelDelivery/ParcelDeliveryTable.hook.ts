import { PARCEL_STATUS, ParcelDelivery } from "@/typings/parcel";
import { useState } from "react";

export const PARCEL_STATUS_FILTER = {
  ALL: null,
  ...PARCEL_STATUS,
} as const;

const initialFilters = {
  status: null,
  assignedTo: null,
};

export type ModalState = {
  type: "DRAWER" | "ASSIGN_USER_MODAL" | "UPDATE_STATUS_MODAL";
  data: ParcelDelivery;
  payload?: { newStatus?: PARCEL_STATUS };
} | null;

export function useParcelDeliveryTable() {
  const [modalState, setModalState] = useState<ModalState>(null);
  const [filters, setFilters] = useState(initialFilters);

  const onModalChange = (data: ModalState) => {
    setModalState(data);
  };

  const onChangeFilter = (name: string, value: string | null) => {
    setFilters({ ...filters, [name]: value });
  };

  return {
    modalState,
    onModalChange,
    onModalClose: () => setModalState(null),
    onChangeFilter,
    filters,
  };
}
