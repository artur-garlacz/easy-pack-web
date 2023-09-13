import { dateFormats } from "@/lib/date";
import { parcelStatusMapper } from "@/lib/helpers/parcel-status-mapper";
import { ParcelStatusLog } from "@/typings/parcel";

type Props = {
  data: ParcelStatusLog[];
};

export default function ParcelStatusHistory({ data }: Props) {
  return (
    <ul className="list-none flex flex-col gap-2">
      {[...data].reverse().map((item) => {
        const { Icon, info } = parcelStatusMapper[item.status];
        return (
          <li
            className="border rounded-md p-4 flex justify-between"
            key={item.createdAt}
          >
            <span className="flex items-center gap-2">
              <Icon className="text-gray-600" />
              {info}
            </span>
            <span className="font-medium text-gray-600">
              {dateFormats.common(item.createdAt)}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
