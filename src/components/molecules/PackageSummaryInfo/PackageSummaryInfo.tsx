import { capitalize } from "@/lib/capitalizeString";
import { Package } from "@/typings/requests";
import { Text } from "@chakra-ui/react";

export function PackageSummaryInfo({
  data: { type, height, length, weight, width },
}: {
  data: Omit<Package, "id">;
}) {
  return (
    <Text color="gray.600" pb={2} fontWeight={400}>
      {capitalize(type)} - {length}x{width}x{height}cm | {weight}kg
    </Text>
  );
}
