import { capitalize } from "@/lib/capitalizeString";
import { dateFormats } from "@/lib/date";
import { AddressDetails } from "@/typings/requests";
import { Text } from "@chakra-ui/react";

export function AddressSummaryInfo({
  data: { city, locationNumber, postalCode, street },
  dateAt,
}: {
  data: AddressDetails;
  dateAt?: string;
}) {
  return (
    <>
      <Text color="gray.600" pb={2} fontWeight={400}>
        {capitalize(city)} {postalCode}, {street} {locationNumber}
        {dateAt ? ` | ${dateFormats.common(dateAt)}` : ""}
      </Text>
    </>
  );
}
