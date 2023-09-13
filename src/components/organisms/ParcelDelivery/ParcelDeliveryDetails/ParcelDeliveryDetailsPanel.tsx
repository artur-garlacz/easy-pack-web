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

const tabCategories = ["Details", "Status history"];

const categories: string[] = ["details"];

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

  // const capitalize = capitalizeCamelCase([]);

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
          <TabPanel key={categories[0]} px={0} mx={10} mt={4}>
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
              <TextCaption>Sender info</TextCaption>
              <Text>
                {data.details.senderDetails.firstName}{" "}
                {data.details.senderDetails.lastName}
              </Text>
              <GridDivider />
              <TextCaption>Sender address</TextCaption>
              <Text>
                {data.details.senderDetails.locationNumber}{" "}
                {data.details.senderDetails.street}
                <br />
                {data.details.senderDetails.city}{" "}
                {data.details.senderDetails.postalCode}
              </Text>
              <GridDivider />
              <TextCaption>Recipant info</TextCaption>
              <Text>
                {data.details.recipientDetails.firstName}{" "}
                {data.details.recipientDetails.lastName}
              </Text>
              <GridDivider />
              <TextCaption>Recipant address</TextCaption>
              <Text>
                {data.details.recipientDetails.locationNumber}
                {data.details.recipientDetails.street}
                <br />
                {data.details.recipientDetails.city}{" "}
                {data.details.recipientDetails.postalCode}
              </Text>
            </SimpleGrid>
          </TabPanel>
          <TabPanel key={categories[1]} px={0} mx={10} mt={4}>
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
        </TabPanels>
      ) : (
        <Text mt={10} textAlign={"center"}>
          No data
        </Text>
      )}
    </Tabs>
  );
};
