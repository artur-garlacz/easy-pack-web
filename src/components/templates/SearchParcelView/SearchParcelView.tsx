import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import { Label } from "@/components/atoms/Label";
import { AddressSummaryInfo } from "@/components/molecules/AddressSummaryInfo/AddressSummaryInfo";
import { PackageSummaryInfo } from "@/components/molecules/PackageSummaryInfo/PackageSummaryInfo";
import { ParcelStatusHistory } from "@/components/molecules/ParcelStatusHistory/ParcelStatusHistory";
import { useSearchParcelView } from "@/components/templates/SearchParcelView/SearchParcelView.hook";
import { dateFormats } from "@/lib/date";
import { parcelRepository } from "@/repositories/parcel-repository";
import { Box, Divider, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import cx from "classnames";
import { SearchIcon } from "lucide-react";

export default function SearchParcelView() {
  const { submitted, trackingNumber, onChange, onSubmit } =
    useSearchParcelView();
  const api = parcelRepository({});
  const { data, isFetching, isError } = useQuery(
    [api.getParcelDeliveryDetails.name],
    async () => api.getParcelDeliveryDetails({ trackingNumber }),
    {
      enabled: submitted,
    }
  );

  return (
    <div className="container">
      <div className="w-full flex gap-6">
        <Input
          onChange={onChange}
          value={trackingNumber}
          className="w-full h-12"
          placeholder="Type parcel number"
        />
        <Button onClick={onSubmit} className="bg-brand-main flex h-12 gap-2">
          Search
          <SearchIcon size={20} />
        </Button>
      </div>

      {!!data && !isError ? (
        <SimpleGrid templateColumns="1fr 1fr" gap="8" pt="8">
          <Flex flexDirection="column" gap="4">
            <Flex flexDirection="column">
              <Text fontWeight={600} fontSize={14} pb="2">
                Address details
              </Text>

              <Box borderWidth={1} rounded="base" p="4">
                <Box>
                  <Text fontWeight={600} fontSize={14}>
                    Delivery address
                  </Text>

                  <AddressSummaryInfo data={data.details.recipientAddress} />

                  <Text fontWeight={600} fontSize={14}>
                    Estimated shipment at
                  </Text>

                  <Text color="gray.600" pb={2} fontWeight={400}>
                    {dateFormats.common(data.details.shipmentAt)}
                  </Text>
                </Box>
                <Divider mb="3" />

                <Box>
                  <Text fontWeight={600} fontSize={14}>
                    Pickup address
                  </Text>
                  <AddressSummaryInfo data={data.details.senderAddress} />
                  <Text fontWeight={600} fontSize={14}>
                    Estimated pickup at
                  </Text>

                  <Text color="gray.600" pb={2} fontWeight={400}>
                    {dateFormats.common(data.details.pickupAt)}
                  </Text>
                </Box>
              </Box>
            </Flex>
            <Flex flexDirection="column">
              <Text fontWeight={600} fontSize={14} pb="2">
                Parcel details
              </Text>

              <Box borderWidth={1} rounded="base" p="4">
                <Box>
                  <Text fontWeight={600} fontSize={14}>
                    Packages ({data.details.packages.length})
                  </Text>

                  {data.details.packages.map((p, idx) => (
                    <PackageSummaryInfo key={idx} data={p} />
                  ))}
                </Box>
                <Divider mb="3" />

                <Box>
                  <Text fontWeight={600} fontSize={14}>
                    Description
                  </Text>

                  <Text color="gray.600" pb={2} fontWeight={400}>
                    {data.details.description || "-"}
                  </Text>
                </Box>
              </Box>
            </Flex>
          </Flex>
          <Flex flexDirection="column">
            <Text fontWeight={600} fontSize={14} pb="2">
              Parcel status history
            </Text>
            <SimpleGrid>
              {data.history.length && (
                <ParcelStatusHistory data={data.history} />
              )}
            </SimpleGrid>
          </Flex>
        </SimpleGrid>
      ) : (
        !isError &&
        isFetching && (
          <div className="border p-2 mt-4">
            <h3>Loading</h3>
          </div>
        )
      )}
    </div>
  );
}

type Props = {
  label: string;
  value: string;
  className?: string;
};

function FieldToDisplay({ label, value, className }: Props) {
  return (
    <div className={cx("flex items-center py-2 justify-between", className)}>
      <Label>{label}</Label>
      <p className="">{value}</p>
    </div>
  );
}
