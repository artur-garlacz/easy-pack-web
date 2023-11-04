import { WidgetBorderBox } from "@/components/atoms/WidgetBorderBox/WidgetBorderBox";
import ShipmentStatsChart from "@/components/organisms/ShipmentStatsChart/ShipmentStatsChart";
import { ParcelCountChart } from "@/components/organisms/ShipmentStatsWidget/ParcelCountChart";
import { TotalParcelsIncomeChart } from "@/components/organisms/ShipmentStatsWidget/TotalParcelIncomeChart";
import { PARCEL_DELIVERY_COLOR_MAP } from "@/lib/constants";
import { parcelRepository } from "@/repositories/parcel-repository";
import { ParcelDeliveriesStatsResponse } from "@/typings/parcel";
import {
  Badge,
  Box,
  Button,
  Checkbox,
  Flex,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  ThemeTypings,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";

export const ShipmentStatsWidget = ({
  chartData,
}: {
  chartData: ParcelDeliveriesStatsResponse["chartData"];
}) => {
  const data = Array.from(chartData.items).reverse();

  return (
    <Tabs variant="soft-rounded" colorScheme="gray">
      <WidgetBorderBox
        bg="white"
        title="Statistics"
        headerButtons={
          <Flex ml={4}>
            <TabList>
              <Tab>Total parcels</Tab>
              <Tab>Total income</Tab>
            </TabList>
          </Flex>
        }
      >
        <TabPanels>
          <TabPanel>
            <ParcelCountChart isEmpty={!chartData.hasData} data={data} />
          </TabPanel>
          <TabPanel>
            <TotalParcelsIncomeChart isEmpty={!chartData.hasData} data={data} />
          </TabPanel>
        </TabPanels>
      </WidgetBorderBox>
    </Tabs>
  );
};

const LatestEntry = ({
  title,
  color,
  data,
  selectType,
}: {
  title: string;
  color: ThemeTypings["colors"];
  data: {
    date: string;
    diagnosis: string | null;
  } | null;
  selectType: (value: boolean) => void;
}) => {
  return (
    <Flex
      borderTop={"1px solid"}
      alignItems="flex-start"
      borderColor={"gray.100"}
      gap={3}
      pb={2}
    >
      <Checkbox
        pt={2}
        iconColor="white"
        sx={{
          "[data-checked]:hover": {
            borderColor: color,
            backgroundColor: color,
            opacity: 0.8,
          },
          "[data-checked]": {
            borderColor: color,
            backgroundColor: color,
          },
        }}
        defaultChecked
        onChange={(e) => selectType(e.target.checked)}
      />
      <Flex direction={"column"} mt={1}>
        <Text fontWeight={700}>{title}</Text>
        <Flex
          gap={2}
          color={"gray.500"}
          fontSize={12}
          fontWeight={500}
          align={"center"}
        >
          {data ? (
            <>
              <Text>Latest: {data.date}</Text>
              {/* {data.diagnosis && (
                <BadgeWithTooltipOverflow
                  color="gray.500"
                  fontWeight={600}
                  characterLengthThreshold={BADGE_MAX_CHARACTER_LENGTH}
                >
                  {data.diagnosis}
                </BadgeWithTooltipOverflow>
              )} */}
            </>
          ) : (
            <Text>No Recent Visits</Text>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};
