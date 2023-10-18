import { useAuthenticatedSession } from "@/hooks/useAuthenticatedSession";
import { dateFormats } from "@/lib/date";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { Box, Flex, Spinner, Text } from "@chakra-ui/react";
import { WidgetBorderBox } from "@/components/atoms/WidgetBorderBox/WidgetBorderBox";
import { StyledTable } from "@/components/organisms/StyledTable/StyledTable";
import { AdvancedPagination } from "@/components/molecules/AdvancedPagination/AdvancedPagination";
import { useState } from "react";
import { RequestRepository } from "@/repositories/request-repository/types";
import { DropdownFilter } from "@/components/molecules/DropdownFilter/DropdownFilter";
import { capitalize } from "@/lib/capitalizeString";

export const REQUEST_STATUS_FILTER = {
  ALL: null,
  ACCEPTED: "ACCEPTED",
  CREATED: "CREATED",
  REJECTED: "REJECTED",
} as const;

const initialFilters = {
  status: null,
};

export function RequestsTable({
  fetchFn,
}: {
  fetchFn: RequestRepository["getAllRequests"];
}) {
  const { token } = useAuthenticatedSession();
  const [page, setPage] = useState<number>(1);
  const [filters, setFilters] = useState(initialFilters);
  const { data, status } = useQuery([fetchFn.name, filters], async () =>
    fetchFn({ page, filters })
  );

  const onChangeFilter = (name: string, value: string | null) => {
    setFilters({ ...filters, [name]: value });
  };

  const columnHelper = createColumnHelper<any>();
  const columns: ColumnDef<any>[] = [
    columnHelper.accessor("id", {
      header: "Id",
    }),
    columnHelper.accessor("trackingNumber", {
      header: "Tracking Number",
      cell: ({ row }) => {
        return (
          <Flex alignItems="center" gap={1}>
            {row.getValue("trackingNumber") || "-"}
          </Flex>
        );
      },
    }),
    columnHelper.accessor("status", {
      header: "Status",
    }),
    columnHelper.accessor("createdAt", {
      header: "Created at",
      cell: ({ row }) => {
        return (
          <Flex alignItems="center" gap={1}>
            {dateFormats.common(row.getValue("createdAt"))}
          </Flex>
        );
      },
    }),
  ];

  return (
    <Flex alignItems="center" w="full" h="full">
      <WidgetBorderBox
        w="full"
        bg="white"
        title="Delivery requests"
        headerButtons={
          <DropdownFilter
            items={Object.entries(REQUEST_STATUS_FILTER).map(
              ([key, value]) => ({ label: capitalize(key), value })
            )}
            value={filters.status}
            onSelect={(val) => onChangeFilter("status", val)}
          />
        }
      >
        {status === "error" && (
          <Text>An error occurred while loading delivery requests.</Text>
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
            />
          </>
        )}
      </WidgetBorderBox>
    </Flex>
  );
}
