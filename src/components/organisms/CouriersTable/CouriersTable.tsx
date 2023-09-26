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
import { courierRepository } from "@/repositories/courier-repository";
import { Courier } from "@/typings/user";

export function CouriersTable() {
  const api = courierRepository({});
  const [selectedCourierId, setSelectedCourierId] = useState<string | null>(
    null
  );
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
  } = useQuery([api.getCouriers.name, { page }], () =>
    api.getCouriers({
      page,
      filters: {},
    })
  );

  const columns: ColumnDef<Courier>[] = [
    {
      accessorKey: "name",
      header: "Full name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "assignedParcels",
      header: "Assigned parcels",
      cell: ({ row }) => {
        return (
          <Flex alignItems="center" gap={1}>
            s
          </Flex>
        );
      },
    },
  ];

  return (
    <div className="bg-white">
      <WidgetBorderBox title="Couriers">
        {status === "error" && (
          <Text>An error occurred while loading couriers.</Text>
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
                  limit={6}
                  totalCount={data.itemsCount}
                />
              }
              headerProps={{
                borderTop: "none",
              }}
              onOpen={onOpenDrawer}
              setSelectedId={setSelectedCourierId}
            />
            {/* {selectedCourierId && (
              <ParcelDeliveryDetailsDrawer
                isOpen={isOpenDrawer}
                onClose={onCloseDrawer}
                parcelId={selectedCourierId}
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
            )} */}
          </>
        )}
      </WidgetBorderBox>
    </div>
  );
}
