import { CheckIcon } from "@chakra-ui/icons";
import { Flex, Text } from "@chakra-ui/react";
import { ArrowDownIcon } from "@/components/atoms/Icons";

export enum BADGE_VARIANT {
  ACTIVE = "ACTIVE",
  COMPLETED = "COMPLETED",
  DROPDOWN_TRIGGER = "DROPDOWN_TRIGGER",
  READ_ONLY = "READ_ONLY",
}

export const Badge = ({
  title,
  color,
  hoverColor,
  variant,
  className,
}: {
  title: string;
  color: string;
  hoverColor?: string;
  variant: BADGE_VARIANT;
  className?: string;
}) => {
  return (
    <Flex
      backgroundColor={color}
      color="white"
      px={2}
      borderRadius={6}
      width={"fit-content"}
      fontWeight={500}
      alignItems={"center"}
      opacity={variant === BADGE_VARIANT.COMPLETED ? 0.3 : 1}
      _hover={{ backgroundColor: hoverColor }}
      className={className}
    >
      <Text>{title}</Text>
      {variant === BADGE_VARIANT.DROPDOWN_TRIGGER ? (
        <ArrowDownIcon boxSize={7} />
      ) : null}
    </Flex>
  );
};
