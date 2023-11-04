import {
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  ModalCloseButton,
  useToast,
  Heading,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { parcelRepository } from "@/repositories/parcel-repository";
import { useAuthenticatedSession } from "@/hooks/useAuthenticatedSession";
import { ParcelDelivery } from "@/typings/parcel";
import { useErrorToast } from "@/hooks/useToast/useErrorToast";

type Props = {
  parcel: ParcelDelivery;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
};

export const AssignUserToParcelModal = ({
  parcel,
  isOpen,
  onClose,
  onSuccess,
}: Props) => {
  const { user } = useAuthenticatedSession();
  const errorToast = useErrorToast();
  const toast = useToast();

  const mutation = useMutation(
    () =>
      parcelRepository({}).assignUserToParcel({
        parcelId: parcel.id,
        userId: user?.data.userId!,
      }),
    {
      onSuccess: () => {
        toast({ title: "Courier assigned to parcel", colorScheme: "green" });
        onSuccess?.();
        onClose();
      },
      onError: () => {
        errorToast({
          message: "An error has occured when trying assign courier to parcel",
        });
      },
    }
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="2xl"
      closeOnOverlayClick={false}
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign={"center"}>
          <Heading fontWeight={700} fontSize={18}>
            Assign user to parcel
          </Heading>
          <ModalCloseButton />
          <Divider mt={3} />
        </ModalHeader>
        <ModalBody>
          <Text>
            Do you want to assign yourself to parcel{" "}
            <strong>{parcel.trackingNumber}</strong>?
          </Text>
        </ModalBody>
        <ModalFooter gap="3">
          <Button
            bg="gray.600"
            color="white"
            onClick={() => {
              mutation.mutateAsync();
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
