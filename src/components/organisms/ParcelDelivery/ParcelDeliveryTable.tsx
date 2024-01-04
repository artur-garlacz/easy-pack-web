import { parcelRepository } from "@/repositories/parcel-repository";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { WidgetBorderBox } from "@/components/atoms/WidgetBorderBox/WidgetBorderBox";
import { StyledTable } from "@/components/organisms/StyledTable/StyledTable";
import {
  Flex,
  Box,
  Spinner,
  Text,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import { calculateDateDifference, dateFormats } from "@/lib/date";
import { CircleWarnIcon } from "@/components/atoms/Icons/CircleWarn";
import { AdvancedPagination } from "@/components/molecules/AdvancedPagination/AdvancedPagination";
import { ParcelDeliveryDetailsDrawer } from "@/components/organisms/ParcelDelivery/ParcelDeliveryDetails/ParcelDeliveryDetailsDrawer";
import { ColumnDef } from "@tanstack/react-table";
import { PARCEL_STATUS, ParcelDelivery } from "@/typings/parcel";
import { UpdateParcelDeliveryStatusModal } from "@/components/organisms/UpdateParcelDeliveryStatusModal/UpdateParcelDeliveryStatusModal";
import { ParcelStatusBadgeWithTooltip } from "@/components/molecules/ParcelStatusBadgeWithTooltip/ParcelStatusBadgeWithTooltip";
import { PackageItemWithTooltip } from "@/components/organisms/PackageItemWithTooltip/PackageItemWithTooltip";
import { EpCircle } from "@/components/atoms/EpCircle/EpCircle";
import { DropdownFilter } from "@/components/molecules/DropdownFilter/DropdownFilter";
import { capitalize } from "@/lib/capitalizeString";
import {
  ModalState,
  PARCEL_STATUS_FILTER,
  useParcelDeliveryTable,
} from "@/components/organisms/ParcelDelivery/ParcelDeliveryTable.hook";
import { AssignUserToParcelModal } from "@/components/organisms/ParcelDelivery/AssignUserToParcelModal/AssignUserToParcelModal";
import { useAuthenticatedSession } from "@/hooks/useAuthenticatedSession";
import { Input } from "@/components/atoms/Input";

export function ParcelDeliveryTable() {
  const { token } = useAuthenticatedSession();
  const api = parcelRepository({ token });
  const { modalState, onModalChange, onModalClose, filters, onChangeFilter } =
    useParcelDeliveryTable();
  const [page, setPage] = useState<number>(1);
  const {
    status,
    data,
    refetch: refetchList,
  } = useQuery([api.getParcelDeliveries.name, { page, filters }], () =>
    api.getParcelDeliveries({
      page,
      filters,
    })
  );

  const columns: ColumnDef<ParcelDelivery>[] = [
    {
      accessorKey: "trackingNumber",
      header: "Tracking number",
      cell: ({ row }) => <Flex>{row.getValue("trackingNumber")}</Flex>,
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        return (
          <Flex onClick={(e) => e.stopPropagation()}>
            <ParcelStatusBadgeWithTooltip
              status={row.getValue("status")}
              onChange={(newStatus) => {
                onModalChange({
                  data: row.original,
                  type: "UPDATE_STATUS_MODAL",
                  payload: {
                    newStatus,
                  },
                });
              }}
            />
          </Flex>
        );
      },
    },
    {
      id: "packages",
      header: "Packages",
      cell: (props) => {
        const packages = props.row.original["packages"];
        return (
          <Box>
            <PackageItemWithTooltip packages={packages} />
          </Box>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: "Created at",
      cell: ({ row }) => {
        const numberOfDaysFromCreation = calculateDateDifference(
          new Date(row.getValue("createdAt")),
          new Date()
        );
        const isOverdue =
          numberOfDaysFromCreation > 2 &&
          row.original["status"] === PARCEL_STATUS.CREATED;

        return (
          <Flex alignItems="center" gap={1}>
            {dateFormats.common(row.getValue("createdAt"))}
            {isOverdue && <CircleWarnIcon width={18} color="red.500" />}
          </Flex>
        );
      },
    },
    {
      accessorKey: "pickupAt",
      header: "Pickup at",
      cell: ({ row }) => {
        return (
          <Flex alignItems="center" gap={1}>
            {dateFormats.common(row.getValue("pickupAt"))}
          </Flex>
        );
      },
    },
    {
      accessorKey: "shipmentAt",
      header: "Shimpent at",
      cell: ({ row }) => {
        return (
          <Flex alignItems="center" gap={1}>
            {dateFormats.common(row.getValue("shipmentAt"))}
          </Flex>
        );
      },
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => {
        return row.getValue("description") || "-";
      },
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            {Number(row.getValue("price")).toFixed(2)} PLN
          </div>
        );
      },
    },
    {
      accessorKey: "user",
      header: "Assigned to",
      cell: ({ row }) => {
        const { user } = row.original;

        if (!user) {
          return (
            <>
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  onModalChange({
                    data: row.original,
                    type: "ASSIGN_USER_MODAL",
                  });
                }}
              >
                Assign
              </Button>
            </>
          );
        }
        return (
          <EpCircle bg="gray.300" width={10}>
            <Text color={"black"}>
              {user.firstName.charAt(0) + user.lastName.charAt(0)}
            </Text>
          </EpCircle>
        );
      },
    },
  ];

  return (
    <Flex
      flexDirection="column"
      justifyContent="center"
      w="full"
      h="auto"
      gap={8}
    >
      <WidgetBorderBox bg="white" height={100} />

      <WidgetBorderBox
        w="full"
        bg="white"
        title="Parcel deliveries"
        headerButtons={
          <Flex>
            <DropdownFilter
              items={Object.entries(PARCEL_STATUS_FILTER).map(
                ([key, value]) => ({
                  label: capitalize(key),
                  value,
                })
              )}
              value={filters.status}
              onSelect={(val) => onChangeFilter("status", val)}
            />
            <Input placeholder="Tracking number" />
          </Flex>
        }
      >
        {status === "error" && (
          <Text>An error occurred while loading parcel deliveries.</Text>
        )}
        {status === "loading" && (
          <Box textAlign={"center"} p={6}>
            <Spinner />
          </Box>
        )}
        {status === "success" && (
          <>
            <StyledTable
              columns={columns}
              data={data.data}
              paginationElement={
                <AdvancedPagination
                  numberOfPages={data.numberOfPages}
                  currentPage={data.currentPage}
                  onPageChange={setPage}
                  limit={10}
                  totalCount={data.itemsCount}
                />
              }
              headerProps={{
                borderTop: "none",
              }}
              setSelectedElement={(data) =>
                onModalChange({
                  data,
                  type: "DRAWER",
                })
              }
            />
            <ModalSelector
              modalState={modalState}
              onModalClose={onModalClose}
              refetchList={refetchList}
            />
          </>
        )}
      </WidgetBorderBox>
    </Flex>
  );
}

const ModalSelector = ({
  modalState,
  onModalClose,
  refetchList,
}: {
  modalState: ModalState;
  onModalClose: () => void;
  refetchList: () => void;
}) => {
  if (!modalState) return null;

  switch (modalState.type) {
    case "DRAWER":
      return (
        <ParcelDeliveryDetailsDrawer
          isOpen
          onClose={onModalClose}
          status={modalState.data.status}
          trackingNumber={modalState.data.trackingNumber}
          refetchList={refetchList}
        />
      );
    case "UPDATE_STATUS_MODAL":
      return (
        <UpdateParcelDeliveryStatusModal
          isOpen
          newStatus={modalState.payload?.newStatus!}
          parcelData={modalState.data}
          onClose={onModalClose}
          onSuccess={refetchList}
        />
      );
    case "ASSIGN_USER_MODAL":
      return (
        <AssignUserToParcelModal
          isOpen
          parcel={modalState.data}
          onClose={onModalClose}
          onSuccess={refetchList}
        />
      );
    default:
      return null;
  }
};
