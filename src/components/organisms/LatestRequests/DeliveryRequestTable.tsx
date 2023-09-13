import { DataTable } from "@/components/molecules/DataTable/DataTable";
import { DeliveryRequest } from "@/typings/parcel";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "createdAt",
    header: "Created at",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
];

const data = [
  {
    status: "CREATED",
    createdAt: new Date().toDateString(),
    type: "BOX",
  },
  {
    status: "CREATED",
    createdAt: new Date().toDateString(),
    type: "BOX",
  },
  {
    status: "CREATED",
    createdAt: new Date().toDateString(),
    type: "BOX",
  },
  {
    status: "CREATED",
    createdAt: new Date().toDateString(),
    type: "BOX",
  },
  {
    status: "CREATED",
    createdAt: new Date().toDateString(),
    type: "BOX",
  },
  {
    status: "CREATED",
    createdAt: new Date().toDateString(),
    type: "BOX",
  },
  {
    status: "CREATED",
    createdAt: new Date().toDateString(),
    type: "BOX",
  },
];

export default function DeliveryRequestTable() {
  return (
    <div>
      <div>
        <h2 className="font-medium">Delivery requests</h2>
      </div>
      <div>
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}
