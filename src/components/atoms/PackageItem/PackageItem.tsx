import { TriggerIcon } from "@/components/atoms/Icons/TriggerIcon";
import { Flex, Text } from "@chakra-ui/react";
import { Package } from "lucide-react";

type PackageItemProps = {
  numberOfMultiples?: number;
};

export const PackageItem = ({ numberOfMultiples }: PackageItemProps) => {
  return (
    <Flex
      width="10"
      height="10"
      borderRadius="full"
      border="1px solid #FFF"
      justifyContent="center"
      alignItems="center"
      fontSize={26}
      pointerEvents={numberOfMultiples ? "none" : "inherit"}
      bgColor="orange.400"
    >
      {numberOfMultiples && numberOfMultiples > 1 ? (
        <Text
          style={{ fontVariantNumeric: "normal" }}
          fontSize={20}
          color={"white"}
          fontWeight={"500"}
        >
          {`+${numberOfMultiples}`}
        </Text>
      ) : (
        <Package color={"white"} />
      )}
    </Flex>
  );
};
