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
import { ColumnDef } from "@tanstack/react-table";
import { Box, Flex, Spinner, Text } from "@chakra-ui/react";
import { CircleWarnIcon } from "@/components/atoms/Icons/CircleWarn";
import { WidgetBorderBox } from "@/components/atoms/WidgetBorderBox/WidgetBorderBox";
import { StyledTable } from "@/components/organisms/StyledTable/StyledTable";
import { AdvancedPagination } from "@/components/molecules/AdvancedPagination/AdvancedPagination";
import { requestRepository } from "@/repositories/request-repository";
import { useState } from "react";
import { RequestRepository } from "@/repositories/request-repository/types";

export function RequestsTable({
  fetchFn,
}: {
  fetchFn: RequestRepository["getAllRequests"];
}) {
  const { token } = useAuthenticatedSession();
  const api = requestRepository({ token });

  const [page, setPage] = useState<number>(1);
  const { data, status } = useQuery([fetchFn.name], async () =>
    fetchFn({ page, filters: {} })
  );
  const router = useRouter();
  // if (!data) return <></>;
  console.log(data);
  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "id",
      header: "Id",
      cell: ({ row }) => row.getValue("id"),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        return (
          <Flex onClick={(e) => e.stopPropagation()}>
            {/* <ParcelStatusBadgeWithTooltip
              status={row.getValue("status")}
              onChange={(newStatus) => {
                setSelectedParcel({
                  parcel: row.original,
                  newStatus,
                });
              }}
            /> */}
          </Flex>
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
        return (
          <Flex alignItems="center" gap={1}>
            {dateFormats.common(row.getValue("createdAt"))}
            {numberOfDaysFromCreation && (
              <CircleWarnIcon width={18} color="red.500" />
            )}
          </Flex>
        );
      },
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => {
        return <div className="flex space-x-2">{row.getValue("type")}</div>;
      },
    },
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
    // <Table>
    //   <TableCaption>A list of your delivery requests</TableCaption>
    //   <TableHeader>
    //     <TableRow>
    //       <TableHead className="w-[100px]">Id</TableHead>
    //       <TableHead>Request status</TableHead>
    //       <TableHead>Parcel status</TableHead>
    //       <TableHead>Type</TableHead>
    //       <TableHead>Created at</TableHead>
    //       <TableHead>Est. shipment at</TableHead>
    //     </TableRow>
    //   </TableHeader>
    //   <TableBody>
    //     {data.map((request) => {
    //       return (
    //         <TableRow
    //           key={request.id}
    //           onClick={() => {
    //             request.status === "ACCEPTED" &&
    //               router.push(
    //                 `/customer/find-parcel?parcelNumber=${request.trackingNumber}`
    //               );
    //           }}
    //           className={request.status === "ACCEPTED" ? "cursor-pointer" : ""}
    //         >
    //           <TableCell className="font-medium">
    //             {request.id.substring(0, 5)}
    //           </TableCell>
    //           <TableCell>
    //             <StatusField>{request.status}</StatusField>
    //           </TableCell>
    //           <TableCell>
    //             {request.parcelStatus ? (
    //               <ParcelStatusCell parcelStatus={request.parcelStatus} />
    //             ) : (
    //               "-"
    //             )}
    //           </TableCell>
    //           <TableCell>{request.type}</TableCell>
    //           <TableCell>{dateFormats.common(request.createdAt)}</TableCell>
    //           <TableCell>{dateFormats.common(request.shipmentAt)}</TableCell>
    //         </TableRow>
    //       );
    //     })}
    //   </TableBody>
    // </Table>
  );
}

// function ParcelStatusCell({ parcelStatus }: { parcelStatus: ParcelStatus }) {
//   console.log(parcelStatus);
//   const { title, info } = parcelStatusMapper[parcelStatus];
//   return (
//     <TooltipProvider>
//       <Tooltip>
//         <TooltipTrigger className="flex items-center gap-2">
//           <StatusField className="uppercase">
//             {title || parcelStatus}
//           </StatusField>
//         </TooltipTrigger>
//         <TooltipContent>{info}</TooltipContent>
//       </Tooltip>
//     </TooltipProvider>
//   );
// }

function StatusField({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  return (
    <p
      className={cx(
        "bg-gray-200 w-fit rounded px-2 py-1 font-medium text-gray-700",
        className
      )}
    >
      {children}
    </p>
  );
}
