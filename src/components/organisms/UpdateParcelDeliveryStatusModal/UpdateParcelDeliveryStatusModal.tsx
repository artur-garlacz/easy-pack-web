import {
  Box,
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  ModalCloseButton,
  useToast,
  Heading,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { PARCEL_STATUS, ParcelDelivery } from "@/typings/parcel";
import { parcelRepository } from "@/repositories/parcel-repository";
import { capitalize } from "@/lib/capitalizeString";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  parcelData: ParcelDelivery;
  newStatus: PARCEL_STATUS;
  onSuccess?: () => void;
};

export const UpdateParcelDeliveryStatusModal = ({
  isOpen,
  onClose,
  onSuccess,
  parcelData,
  newStatus,
}: Props) => {
  const toast = useToast();

  const mutation = useMutation({
    mutationFn: () => {
      return parcelRepository({}).updateParcelStatus({
        parcelId: parcelData.id,
        status: newStatus,
      });
    },
    onSuccess: () => {
      onClose();
      toast({ title: "Parcel status updated", colorScheme: "green" });
      onSuccess?.();
    },
    onError: () => {
      toast({ title: "Unable to update status", colorScheme: "red" });
    },
  });

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="2xl"
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign={"center"}>
          <Heading fontWeight={700} fontSize={18}>
            Update parcel delivery status
          </Heading>
          <ModalCloseButton />
          <Divider mt={3} />
        </ModalHeader>
        <ModalBody>
          <Text>
            Do you want to update status parcel:{" "}
            <strong>{parcelData.trackingNumber}</strong> from{" "}
            <strong>{capitalize(parcelData.status)}</strong> to{" "}
            <strong>{capitalize(newStatus)}</strong>
          </Text>
        </ModalBody>
        <ModalFooter gap="3">
          <Button
            colorScheme="blackAlpha"
            onClick={() => {
              mutation.mutate();
            }}
          >
            Confirm
          </Button>
          <Button variant="outline" onClick={onClose}>
            Discard
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
