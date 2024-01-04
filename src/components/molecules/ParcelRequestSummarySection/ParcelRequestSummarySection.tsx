import { Button } from "@/components/atoms/Button";
import { AddressSummaryInfo } from "@/components/molecules/AddressSummaryInfo/AddressSummaryInfo";
import { PackageSummaryInfo } from "@/components/molecules/PackageSummaryInfo/PackageSummaryInfo";
import { RequestFormSchema } from "@/typings/requests";
import { Box, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

export function ParcelRequestSummarySection() {
  const { getValues, watch, handleSubmit } =
    useFormContext<RequestFormSchema>();
  const packages = getValues("packages");
  const deliveryAddress = watch("deliveryAddress");
  const pickupAddress = watch("pickupAddress");
  const pickupAt = watch("pickupAt");
  const shipmentAt = watch("shipmentAt");

  return (
    <SimpleGrid templateColumns={"1fr 1fr"} gap={8}>
      <Box>
        <SimpleGrid>
          <Text fontWeight={600} fontSize={14} pb={4}>
            Total packages ({packages.length || 0})
          </Text>

          {packages.map((p, idx) => (
            <PackageSummaryInfo key={idx} data={p} />
          ))}
        </SimpleGrid>
        <SimpleGrid pt={4}>
          <Text fontWeight={600} fontSize={14} pb={4}>
            Addresses details
          </Text>

          <AddressSummaryInfo data={pickupAddress} dateAt={pickupAt} />
          <AddressSummaryInfo data={deliveryAddress} dateAt={shipmentAt} />
        </SimpleGrid>
      </Box>
      <SimpleGrid>
        <Flex flexDirection="column" gap="4">
          <Text fontWeight={600} fontSize={14}>
            Estimated price
          </Text>
          <Text color="gray.600" fontWeight={400}>
            20 zł
          </Text>
        </Flex>
        <Button>Proceed payment</Button>
      </SimpleGrid>
    </SimpleGrid>
  );
}
