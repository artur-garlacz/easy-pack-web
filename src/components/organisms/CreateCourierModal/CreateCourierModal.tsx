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
import { useAuthenticatedSession } from "@/hooks/useAuthenticatedSession";
import { useErrorToast } from "@/hooks/useToast/useErrorToast";
import { userRepository } from "@/repositories/user-repository";
import { useForm } from "react-hook-form";
import { Input } from "@/components/atoms/Input";
import { courierRepository } from "@/repositories/courier-repository";
import { CreateCourierPayload } from "@/typings/user";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
};

export const CreateCourierModal = ({ isOpen, onClose, onSuccess }: Props) => {
  const { user } = useAuthenticatedSession();
  const { register, handleSubmit, reset } = useForm<any>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      role: "COURIER",
    },
  });
  const errorToast = useErrorToast();
  const toast = useToast();

  const createCourier = useMutation(
    (data: CreateCourierPayload) => courierRepository({}).createCourier(data),
    {
      onSuccess: () => {
        toast({ title: "Courier created", colorScheme: "green" });
        onSuccess?.();
        onClose();
        reset();
      },
      onError: () => {
        errorToast({
          message: "An error has occured when trying to create courier",
        });
      },
    }
  );

  const onSubmit = handleSubmit(async (values: CreateCourierPayload) => {
    createCourier.mutate({ ...values });
  });

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="xl"
      closeOnOverlayClick={false}
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign={"center"}>
          <Heading fontWeight={700} fontSize={18}>
            Add new courier
          </Heading>
          <ModalCloseButton />
          <Divider mt={3} />
        </ModalHeader>
        <ModalBody>
          <form className="flex flex-col gap-3">
            <Input
              id="email"
              label="E-mail"
              defaultValue="Pedro Duarte"
              {...register("email", { required: true })}
            />
            <Input
              id="firstName"
              label="First Name"
              {...register("firstName", { required: true })}
            />
            <Input
              id="lastName"
              label="Last Name"
              {...register("lastName", { required: true })}
            />
          </form>
        </ModalBody>
        <ModalFooter gap="3">
          <Button bg="gray.600" color="white" onClick={onSubmit}>
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
