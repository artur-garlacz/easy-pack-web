import { parcelRepository } from "@/repositories/parcel-repository";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { WidgetBorderBox } from "@/components/atoms/WidgetBorderBox/WidgetBorderBox";
import { StyledTable } from "@/components/organisms/StyledTable/StyledTable";
import { Flex, Box, Spinner, Text, useDisclosure } from "@chakra-ui/react";
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

export function ParcelDeliveryTable() {
  const api = parcelRepository({});
  const [selectedParcelId, setSelectedParcelId] = useState<string | null>(null);
  const [selectedParcel, setSelectedParcel] = useState<{
    parcel: ParcelDelivery;
    newStatus: PARCEL_STATUS;
  } | null>(null);
  const {
    isOpen: isOpenDrawer,
    onOpen: onOpenDrawer,
    onClose: onCloseDrawer,
  } = useDisclosure();
  const [page, setPage] = useState<number>(1);
  const {
    status,
    data,
    refetch: refetchList,
  } = useQuery([api.getParcelDeliveries.name, { page }], () =>
    api.getParcelDeliveries({
      page,
      filters: {},
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
                setSelectedParcel({
                  parcel: row.original,
                  newStatus,
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
          numberOfDaysFromCreation &&
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
      accessorKey: "description",
      header: "Description",
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => {
        return <div className="flex space-x-2">{row.getValue("type")}</div>;
      },
    },
    {
      accessorKey: "user",
      header: "Assigned to",
      cell: ({ row }) => {
        const user = row.original["user"];
        if (!user) {
          return <div className="flex space-x-2">-</div>;
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
    <div className="bg-white">
      <WidgetBorderBox title="Parcel deliveries">
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
              onOpen={onOpenDrawer}
              setSelectedId={setSelectedParcelId}
            />
            {selectedParcelId && (
              <ParcelDeliveryDetailsDrawer
                isOpen={isOpenDrawer}
                onClose={onCloseDrawer}
                parcelId={selectedParcelId}
                status={
                  data.data.find((d) => d.id === selectedParcelId)?.status
                }
                trackingNumber={
                  data.data.find((d) => d.id === selectedParcelId)
                    ?.trackingNumber
                }
                refetchList={refetchList}
              />
            )}
            {selectedParcel && (
              <UpdateParcelDeliveryStatusModal
                parcelData={selectedParcel.parcel}
                newStatus={selectedParcel.newStatus}
                isOpen={!!selectedParcel}
                onClose={() => setSelectedParcel(null)}
              />
            )}
          </>
        )}
      </WidgetBorderBox>
    </div>
  );
}
