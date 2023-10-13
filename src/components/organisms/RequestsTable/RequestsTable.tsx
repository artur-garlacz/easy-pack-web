import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/atoms/Table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/atoms/Tooltip";
import { useAuthenticatedSession } from "@/hooks/useAuthenticatedSession";
import { calculateDateDifference, dateFormats } from "@/lib/date";
import { parcelStatusMapper } from "@/lib/helpers/parcel-status-mapper";
import { customerRepository } from "@/repositories/customer-repository";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import cx from "classnames";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { Box, Flex, Spinner, Text } from "@chakra-ui/react";
import { CircleWarnIcon } from "@/components/atoms/Icons/CircleWarn";
import { WidgetBorderBox } from "@/components/atoms/WidgetBorderBox/WidgetBorderBox";
import { StyledTable } from "@/components/organisms/StyledTable/StyledTable";
import { AdvancedPagination } from "@/components/molecules/AdvancedPagination/AdvancedPagination";
import { requestRepository } from "@/repositories/request-repository";
import { useState } from "react";
import { RequestRepository } from "@/repositories/request-repository/types";
import { PackageItemWithTooltip } from "@/components/organisms/PackageItemWithTooltip/PackageItemWithTooltip";

export function RequestsTable({
  fetchFn,
}: {
  fetchFn: RequestRepository["getAllRequests"];
}) {
  const { token } = useAuthenticatedSession();
  const [page, setPage] = useState<number>(1);
  const { data, status } = useQuery([fetchFn.name], async () =>
    fetchFn({ page, filters: {} })
  );

  const columnHelper = createColumnHelper<any>();
  const columns: ColumnDef<any>[] = [
    columnHelper.accessor("id", {
      header: "Id",
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
    <div className="bg-white">
      <WidgetBorderBox title="Delivery requests">
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
    </div>
  );
}
