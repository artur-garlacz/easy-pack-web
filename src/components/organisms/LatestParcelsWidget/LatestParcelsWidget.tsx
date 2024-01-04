import {
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/atoms/Card";
import { EpCircle } from "@/components/atoms/EpCircle/EpCircle";
import { CheckContainedFilled } from "@/components/atoms/Icons/CheckContainedFilled";
import { WidgetBorderBox } from "@/components/atoms/WidgetBorderBox/WidgetBorderBox";
import { calculateDateDifference, dateFormats } from "@/lib/date";
import { parcelRepository } from "@/repositories/parcel-repository";
import { PARCEL_STATUS, ParcelDelivery } from "@/typings/parcel";
import { WarningIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Spinner, Text } from "@chakra-ui/react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export function LatestParcelDeliveriesWidget() {
  const api = parcelRepository({});

  const {
    status,
    data,
    isSuccess,
    refetch: refetchList,
  } = useQuery([api.getParcelDeliveries.name, { page: 1 }], () =>
    api.getParcelDeliveries({
      page: 1,
      filters: {},
      limit: 5,
    })
  );

  return (
    <WidgetBorderBox bg="white" title="Latest parcels">
      {status === "error" && (
        <Text>An error occurred while loading medication widget history.</Text>
      )}
      {status === "loading" && (
        <Box textAlign={"center"} p={6}>
          <Spinner />
        </Box>
      )}
      {isSuccess &&
        data.data.map(({ id, packages, trackingNumber, createdAt }) => {
          const numberOfDaysFromCreation = calculateDateDifference(
            new Date(createdAt),
            new Date()
          );
          const isOverdue = numberOfDaysFromCreation > 2;

          return (
            <Row circleText={trackingNumber.substring(2, 5)} key={id}>
              <Flex direction={"column"} gap={0.5}>
                <Flex align={"center"} gap={1}>
                  <Text
                    lineHeight={1.5}
                    fontSize={16}
                    color={"blackAlpha.900"}
                    fontWeight={600}
                  >
                    {trackingNumber}
                  </Text>
                </Flex>
                <Text
                  lineHeight={1}
                  fontSize={14}
                  color={"gray.500"}
                  fontWeight={500}
                >
                  {dateFormats.common(createdAt)}
                </Text>
              </Flex>
              <Flex ml={"auto"} gap={2}>
                {isOverdue && <WarningIcon color="orange.500" />}
              </Flex>
            </Row>
          );
        })}

      <Row circleText={"All"}>
        <Button variant={"link"}>
          <Link href="delivery/parcels">View all parcels</Link>
        </Button>
      </Row>
    </WidgetBorderBox>
  );
}

const Row = ({
  children,
  circleText,
}: {
  children: React.ReactNode;
  circleText: string | number;
}) => {
  return (
    <Flex
      gap={4}
      borderTopWidth={1}
      borderTopColor={"gray.300"}
      py={3}
      align={"center"}
    >
      <EpCircle width={9} bg={"gray.500"}>
        <Text color={"white"} fontSize={14} fontWeight={600}>
          {circleText}
        </Text>
      </EpCircle>
      {children}
    </Flex>
  );
};
