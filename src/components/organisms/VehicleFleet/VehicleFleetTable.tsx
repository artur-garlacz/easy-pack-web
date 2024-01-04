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
import {
  VehicleCategory,
  VehicleDriveType,
  VehicleFleetItem,
  VehicleFleetListResponse,
  VehiclePropertyType,
  VehicleStatus,
} from "@/typings/vehicles";
import { Pencil, Trash } from "lucide-react";

const data: VehicleFleetListResponse = {
  data: [
    {
      registrationNumber: "ABC123",
      name: "Vehicle 1",
      brand: "Toyota",
      model: "Camry",
      category: VehicleCategory.Truck,
      driveType: VehicleDriveType.Gasoline,
      propertyType: VehiclePropertyType.Hire,
      status: VehicleStatus.Active,
      lastControlAt: "2023-12-15T10:30:00Z",
      createdAt: "2023-01-10T08:45:00Z",
      user: {
        username: "driver1",
        fullName: "John Doe",
        contactNumber: "+1234567890",
      },
    },
    {
      registrationNumber: "XYZ789",
      name: "Vehicle 2",
      brand: "Ford",
      model: "Explorer",
      category: VehicleCategory.Truck,
      driveType: VehicleDriveType.Gasoline,
      propertyType: VehiclePropertyType.Leasing,
      status: VehicleStatus.Inactive,
      lastControlAt: "2023-11-20T15:15:00Z",
      createdAt: "2023-02-22T14:20:00Z",
      user: {
        username: "driver2",
        fullName: "Jane Smith",
        contactNumber: "+9876543210",
      },
    },
    {
      registrationNumber: "PQR456",
      name: "Vehicle 3",
      brand: "Chevrolet",
      model: "Silverado",
      category: VehicleCategory.Truck,
      driveType: VehicleDriveType.Gasoline,
      propertyType: VehiclePropertyType.Property,
      status: VehicleStatus.Active,
      lastControlAt: "2023-12-05T09:45:00Z",
      createdAt: "2023-04-18T11:55:00Z",
      user: {
        username: "driver3",
        fullName: "Robert Johnson",
        contactNumber: "+1122334455",
      },
    },
  ],
  currentPage: 1,
  numberOfPages: 1,
  itemsCount: 1,
  limit: 10,
};

export function VehicleFleetTable() {
  const { token } = useAuthenticatedSession();
  const api = parcelRepository({ token });
  //   const { modalState, onModalChange, onModalClose, filters, onChangeFilter } =
  //     useParcelDeliveryTable();
  const status: string = "success";
  const [page, setPage] = useState<number>(1);
  //   const {
  //     status,
  //     data,
  //     refetch: refetchList,
  //   } = useQuery([api.getParcelDeliveries.name, { page, filters }], () =>
  //     api.getParcelDeliveries({
  //       page,
  //       filters,
  //     })
  //   );

  const columns: ColumnDef<VehicleFleetItem>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "brand",
      header: "Brand",
    },
    {
      accessorKey: "model",
      header: "Model",
    },
    {
      accessorKey: "category",
      header: "Category",
    },
    {
      accessorKey: "driveType",
      header: "Drive type",
    },
    {
      accessorKey: "propertyType",
      header: "Property type",
    },
    {
      accessorKey: "status",
      header: "Status",
    },
    {
      accessorKey: "lastControlAt",
      header: "Last control",
      cell: ({ row }) => {
        return dateFormats.common(row.getValue("lastControlAt"));
      },
    },
    {
      accessorKey: "createdAt",
      header: "Created at",
      cell: ({ row }) => {
        return dateFormats.common(row.getValue("createdAt"));
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
              {/* <Button
                onClick={(e) => {
                  e.stopPropagation();
                  onModalChange({
                    data: row.original,
                    type: "ASSIGN_USER_MODAL",
                  });
                }}
              >
                Assign
              </Button> */}
            </>
          );
        }
        return (
          <EpCircle bg="gray.300" width={10}>
            <Text color={"black"}>
              {/* {user.firstName.charAt(0) + user.lastName.charAt(0)} */}
            </Text>
          </EpCircle>
        );
      },
    },
    {
      header: "Actions",
      cell: () => (
        <Flex>
          <Trash
            strokeWidth={1}
            className="h-6 text-black hover:text-gray-500 cursor-pointer"
          />
          <Pencil
            strokeWidth={1}
            className="h-6 text-black hover:text-gray-500 cursor-pointer"
          />
        </Flex>
      ),
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

      <WidgetBorderBox w="full" bg="white" title="Vehicle fleet">
        {status === "error" && (
          <Text>An error occurred while loading vehicle fleet.</Text>
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
              //   setSelectedElement={(data) =>
              //     onModalChange({
              //       data,
              //       type: "DRAWER",
              //     })
              //   }
            />
            {/* <ModalSelector
              modalState={modalState}
              onModalClose={onModalClose}
              refetchList={refetchList}
            /> */}
          </>
        )}
      </WidgetBorderBox>
    </Flex>
  );
}
