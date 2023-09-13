import { Text, TextProps } from "@chakra-ui/react";

export const TextCaption = ({ children }: TextProps) => {
  return (
    <Text color={"gray.500"} fontSize={12}>
      {children}
    </Text>
  );
};
