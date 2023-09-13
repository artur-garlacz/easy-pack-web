import { Flex, FlexProps } from "@chakra-ui/react";

export const EpCircle = ({
  children,
  width,
  ...rest
}: Omit<FlexProps, "height" | "borderRadius">) => (
  <Flex
    width={width}
    height={width}
    borderRadius="full"
    align="center"
    justify="center"
    {...rest}
  >
    {children}
  </Flex>
);
