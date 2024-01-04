import { dateFormats } from "@/lib/date";
import { parcelStatusMapper } from "@/lib/helpers/parcel-status-mapper";
import { ParcelStatusLog } from "@/typings/parcel";
import { Text } from "@chakra-ui/react";

type Props = {
  data: ParcelStatusLog[];
};

export function ParcelStatusHistory({ data }: Props) {
  return (
    <ul className="list-none flex flex-col gap-2">
      {[...data].reverse().map((item) => {
        const { Icon, info } = parcelStatusMapper[item.status];
        return (
          <li
            className="border rounded-md p-4 flex justify-between border-l-4 border-l-brand-600"
            key={item.createdAt}
          >
            <span className="flex items-center gap-2">
              <Icon className="text-gray-600" />
              <Text color="gray.600" fontWeight={400}>
                {info}
              </Text>
            </span>

            <Text fontWeight={600}>{dateFormats.common(item.createdAt)}</Text>
          </li>
        );
      })}
    </ul>
  );
}
