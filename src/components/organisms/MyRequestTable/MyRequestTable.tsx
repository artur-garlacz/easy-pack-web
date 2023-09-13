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
import { dateFormats } from "@/lib/date";
import { parcelStatusMapper } from "@/lib/helpers/parcel-status-mapper";
import { customerRepository } from "@/repositories/customer-repository";
import { ParcelStatus } from "@/typings/parcel";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import cx from "classnames";

export default function MyRequestTable() {
  const { token } = useAuthenticatedSession();
  const { data } = useQuery(["my-requests"], async () =>
    customerRepository({ token }).myRequests()
  );
  const router = useRouter();
  if (!data) return <></>;

  return (
    <Table>
      <TableCaption>A list of your delivery requests</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Id</TableHead>
          <TableHead>Request status</TableHead>
          <TableHead>Parcel status</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Created at</TableHead>
          <TableHead>Est. shipment at</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((request) => {
          return (
            <TableRow
              key={request.id}
              onClick={() => {
                request.status === "ACCEPTED" &&
                  router.push(
                    `/customer/find-parcel?parcelNumber=${request.trackingNumber}`
                  );
              }}
              className={request.status === "ACCEPTED" ? "cursor-pointer" : ""}
            >
              <TableCell className="font-medium">
                {request.id.substring(0, 5)}
              </TableCell>
              <TableCell>
                <StatusField>{request.status}</StatusField>
              </TableCell>
              <TableCell>
                {request.parcelStatus ? (
                  <ParcelStatusCell parcelStatus={request.parcelStatus} />
                ) : (
                  "-"
                )}
              </TableCell>
              <TableCell>{request.type}</TableCell>
              <TableCell>{dateFormats.common(request.createdAt)}</TableCell>
              <TableCell>{dateFormats.common(request.shipmentAt)}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

function ParcelStatusCell({ parcelStatus }: { parcelStatus: ParcelStatus }) {
  console.log(parcelStatus);
  const { title, info } = parcelStatusMapper[parcelStatus];
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="flex items-center gap-2">
          <StatusField className="uppercase">
            {title || parcelStatus}
          </StatusField>
        </TooltipTrigger>
        <TooltipContent>{info}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

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
