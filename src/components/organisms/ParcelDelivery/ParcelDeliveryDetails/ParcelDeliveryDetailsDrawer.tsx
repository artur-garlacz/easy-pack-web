import { Flex, Spinner, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { EpDrawer } from "@/components/organisms/EpDrawer/EpDrawer";
import { EpCircle } from "@/components/atoms/EpCircle/EpCircle";
import { PARCEL_STATUS } from "@/typings/parcel";
import { parcelRepository } from "@/repositories/parcel-repository";
import { ParcelDeliveryDetailsPanel } from "@/components/organisms/ParcelDelivery/ParcelDeliveryDetails/ParcelDeliveryDetailsPanel";

type ParcelDeliveryDetailsDrawerProp = {
  isOpen: boolean;
  onClose: () => void;
  refetchList: () => void;
  trackingNumber: string;
  status?: PARCEL_STATUS;
};

export const ParcelDeliveryDetailsDrawer = ({
  isOpen,
  onClose,
  status,
  trackingNumber,
  refetchList,
}: ParcelDeliveryDetailsDrawerProp) => {
  return (
    <EpDrawer
      isOpen={isOpen}
      onClose={onClose}
      header={<DrawerHeader trackingNumber={trackingNumber} status={status} />}
      drawerBody={
        <ParcelDeliveryDetailsDrawerBody
          trackingNumber={trackingNumber}
          refetchList={refetchList}
        />
      }
    />
  );
};

const DrawerHeader = ({
  trackingNumber,
  status,
}: {
  trackingNumber?: string;
  status?: PARCEL_STATUS;
}) => {
  return (
    <Flex alignItems={"center"}>
      <EpCircle
        bg={status === PARCEL_STATUS.CREATED ? "blue.500" : "gray.400"}
        width={10}
      >
        <Text color={"white"}>{trackingNumber?.substring(2, 5)}</Text>
      </EpCircle>
      <Flex ml={5} gap={1} direction={"column"} justifyContent={"center"}>
        <Text fontSize={18}>Parcel Details</Text>
        <Text fontSize={14} color={"gray.500"} fontWeight={500}>
          {trackingNumber}
        </Text>
      </Flex>
    </Flex>
  );
};

type MedicationDrawerBodyProps = {
  trackingNumber: string;
  refetchList: () => void;
};

const ParcelDeliveryDetailsDrawerBody = ({
  trackingNumber,
  refetchList,
}: MedicationDrawerBodyProps) => {
  const backend = parcelRepository({});

  const {
    data,
    isError,
    isLoading,
    refetch: refetchDetails,
  } = useQuery(
    [backend.getParcelDeliveryDetails.name, { trackingNumber }],
    () => {
      return backend.getParcelDeliveryDetails({ trackingNumber });
    },
    { retry: 1 }
  );

  if (isError) {
    return (
      <Flex mt={10} alignItems={"center"} justifyContent={"center"}>
        <Text fontSize={"18"}>Cannot fetch parcel details data</Text>
      </Flex>
    );
  }

  if (isLoading) {
    return (
      <Flex mt={10} alignItems={"center"} justifyContent={"center"}>
        <Spinner size={"lg"} />
      </Flex>
    );
  }

  return (
    <ParcelDeliveryDetailsPanel
      data={data}
      refetchDetails={refetchDetails}
      refetchList={refetchList}
    />
  );
};
