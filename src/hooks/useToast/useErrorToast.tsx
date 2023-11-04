import { useToast } from "@chakra-ui/react";

export const useErrorToast = () => {
  const toast = useToast();

  return ({ message, title = "Error" }: { message: string; title?: string }) => {
    toast({
      title,
      description: message,
      status: "error",
      duration: 9000,
      isClosable: true,
    });
  };
};
