import { useToast } from "@chakra-ui/react";

export const useSuccessToast = () => {
  const toast = useToast();

  return ({ message, title = "Success" }: { message: string; title?: string }) => {
    toast({
      title,
      description: message,
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  };
};
