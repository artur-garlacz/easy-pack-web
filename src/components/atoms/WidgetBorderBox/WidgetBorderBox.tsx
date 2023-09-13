import { Box, BoxProps, Flex, Text } from "@chakra-ui/react";

export const WidgetBorderBox = (
  props: {
    headerButtons?: React.ReactNode;
    title: string;
    flexMarginBottom?: number;
  } & BoxProps
) => {
  const { children, headerButtons, title, flexMarginBottom, ...boxProps } = props;
  return (
    <Box borderRadius={"md"} border="1px" borderColor="gray.300" p={8} mb={6} {...boxProps}>
      <Flex justifyContent={"space-between"} alignItems={"center"} mb={flexMarginBottom || 6}>
        <Text fontSize={"2xl"} fontWeight={700}>
          {title}
        </Text>
        {headerButtons}
      </Flex>
      {children}
    </Box>
  );
};
