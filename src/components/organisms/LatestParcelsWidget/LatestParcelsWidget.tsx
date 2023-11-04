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
import {
  Box,
  Button,
  Card,
  CardFooter,
  CardHeader,
  Flex,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { AlertTriangle } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export function LatestParcelDeliveriesWidget() {
  const api = parcelRepository({});
  const [filter, setFilter] = useState();
  const { ref, inView } = useInView();
  const {
    status,
    data,
    isSuccess,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    [api.getParcelDeliveries.name],
    async ({ pageParam = 1 }) =>
      api.getParcelDeliveries({
        page: pageParam,
        filters: { status: PARCEL_STATUS.CREATED },
      }),
    {
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.numberOfPages > lastPage.currentPage) {
          return lastPage.currentPage + 1;
        }
        return undefined;
      },
    }
  );

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

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
      {isSuccess && (
        <>
          {data.pages.length > 0 &&
            data.pages.map((page) => (
              <React.Fragment key={page.currentPage}>
                {page.data.map(
                  ({ id, packages, trackingNumber, createdAt }) => {
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
                  }
                )}
              </React.Fragment>
            ))}
          {/* <div>
            <button
              ref={ref}
              onClick={() => fetchNextPage()}
              disabled={!hasNextPage || isFetchingNextPage}
            >
              {isFetchingNextPage
                ? "Loading more..."
                : hasNextPage
                ? "Load Newer"
                : "Nothing more to load"}
            </button>
          </div> */}
          <div>
            {isFetching && !isFetchingNextPage
              ? "Background Updating..."
              : null}
          </div>
        </>
      )}

      <Row circleText={"All"}>
        <Button variant={"link"}>View all parcels</Button>
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
