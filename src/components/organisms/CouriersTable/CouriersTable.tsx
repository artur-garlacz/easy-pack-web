import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { WidgetBorderBox } from "@/components/atoms/WidgetBorderBox/WidgetBorderBox";
import { StyledTable } from "@/components/organisms/StyledTable/StyledTable";
import { Flex, Box, Spinner, Text, useDisclosure } from "@chakra-ui/react";
import { AdvancedPagination } from "@/components/molecules/AdvancedPagination/AdvancedPagination";
import { ColumnDef } from "@tanstack/react-table";
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
    <Flex alignItems="center" w="full" h="full">
      <WidgetBorderBox w="full" bg="white" title="Couriers">
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
              staticRowsCount={10}
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
    </Flex>
  );
}
