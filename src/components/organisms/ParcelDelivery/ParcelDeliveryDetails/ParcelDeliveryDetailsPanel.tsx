import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Text,
  SimpleGrid,
  Flex,
  Badge,
  Divider,
  Box,
} from "@chakra-ui/react";
import { useState } from "react";
import { GridDivider } from "@/components/atoms/GridDivider/GridDivider";
import { TextCaption } from "@/components/atoms/TextCaption/TextCaption";
import { ParcelDeliveryDetailsResponse } from "@/typings/parcel";
import { dateFormats } from "@/lib/date";
import { ParcelStatusBadgeWithTooltip } from "@/components/molecules/ParcelStatusBadgeWithTooltip/ParcelStatusBadgeWithTooltip";

const tabCategories = ["Details", "Status history", "Packages"];

export const ParcelDeliveryDetailsPanel = ({
  data,
  refetchDetails,
  refetchList,
}: {
  data: ParcelDeliveryDetailsResponse;
  refetchDetails: () => void;
  refetchList: () => void;
}) => {
  const [, setTabIndex] = useState(0);

  return (
    <Tabs onChange={(index) => setTabIndex(index)} colorScheme="black">
      <TabList pl={10}>
        {tabCategories.map((category) => (
          <Tab
            key={category}
            fontWeight={600}
            fontSize={14}
            color={"gray.500"}
            _selected={{
              fontWeight: 700,
              borderColor: "blue.500",
              color: "gray.700",
            }}
          >
            {category}
          </Tab>
        ))}
      </TabList>
      {data ? (
        <TabPanels>
          <TabPanel key={"details"} px={0} mx={10} mt={4}>
            <SimpleGrid
              gridTemplateColumns={"115px auto"}
              columnGap={4}
              alignItems={"center"}
              color={"gray.900"}
              fontWeight={500}
            >
              <TextCaption>Tracking Number</TextCaption>
              <Text>{data.details.trackingNumber}</Text>
              <GridDivider />
              <TextCaption>Created at</TextCaption>
              <Text>{dateFormats.common(data.details.createdAt)}</Text>
              <GridDivider />
              <TextCaption>Assigned to</TextCaption>
              <Text>Artur Garlacz</Text>
              <GridDivider />
              <TextCaption>Status</TextCaption>
              <Flex>
                <ParcelStatusBadgeWithTooltip
                  onChange={() => {}}
                  status={data.details.status}
                />
              </Flex>
              <GridDivider />
              <TextCaption>Description</TextCaption>
              <Text>{data.details.description || "-"}</Text>
              <GridDivider />
              <TextCaption>Price</TextCaption>
              <Text>{data.details.price} PLN</Text>
              <GridDivider />
              <TextCaption>Pickup at</TextCaption>
              <Text>{dateFormats.common(data.details.pickupAt)}</Text>
              <GridDivider />
              <TextCaption>Shipment at</TextCaption>
              <Text>{dateFormats.common(data.details.shipmentAt)}</Text>
              <GridDivider />
              <TextCaption>Sender address</TextCaption>
              <Text>
                {data.details.senderAddress.locationNumber}{" "}
                {data.details.senderAddress.street}
                <br />
                {data.details.senderAddress.city}{" "}
                {data.details.senderAddress.postalCode}
              </Text>
              <GridDivider />
              <TextCaption>Recipant address</TextCaption>
              <Text>
                {data.details.recipientAddress.locationNumber}{" "}
                {data.details.recipientAddress.street}
                <br />
                {data.details.recipientAddress.city}{" "}
                {data.details.recipientAddress.postalCode}
              </Text>
            </SimpleGrid>
          </TabPanel>
          <TabPanel key={"history"} px={0} mx={10} mt={4}>
            {data.history.map((record, index) => {
              return (
                <Box key={index}>
                  <Flex
                    gap={4}
                    mb={1}
                    fontSize={12}
                    alignItems={"center"}
                    justifyContent="space-between"
                    fontWeight={500}
                    color={"gray.500"}
                  >
                    <ParcelStatusBadgeWithTooltip status={record.status} />
                    <Text>{dateFormats.common(record.createdAt)}</Text>
                  </Flex>
                  {data.history.length - 1 > index && (
                    <Divider marginBlock={3} />
                  )}
                </Box>
              );
            })}
          </TabPanel>
          <TabPanel key={"packages"} px={0} mx={10} mt={4}></TabPanel>
        </TabPanels>
      ) : (
        <Text mt={10} textAlign={"center"}>
          No data
        </Text>
      )}
    </Tabs>
  );
};
