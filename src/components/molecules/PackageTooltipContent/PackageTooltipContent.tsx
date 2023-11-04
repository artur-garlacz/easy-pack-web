import { PackageItem } from "@/components/atoms/PackageItem/PackageItem";
import { Package } from "@/typings/requests";
import { Box, Flex, Text } from "@chakra-ui/react";

export const PackageTooltipContent = ({
  packageItem: { id, height, length, weight, width, description },
}: {
  packageItem: Package;
}) => {
  return (
    <Flex width={"229px"}>
      <Flex width="full" direction="column" fontSize={12} gap={2}>
        <Flex
          justifyContent="space-between"
          borderBottom="1px"
          borderColor="gray.200"
          pb={1}
          width="full"
        >
          <Text fontWeight="bold" mb={1}>
            Id
          </Text>
          <Text>#{id.substring(0, 5).toUpperCase()}</Text>
        </Flex>
        <Flex
          justifyContent="space-between"
          borderBottom="1px"
          borderColor="gray.200"
          pb={1}
          width="full"
        >
          <Text fontWeight="bold" mb={1}>
            Height
          </Text>
          <Text>{height}</Text>
        </Flex>
        <Flex
          justifyContent="space-between"
          borderBottom="1px"
          borderColor="gray.200"
          pb={1}
          width="full"
        >
          <Text fontWeight="bold" mb={1}>
            Length
          </Text>
          <Text>{length}</Text>
        </Flex>
        <Flex
          justifyContent="space-between"
          borderBottom="1px"
          borderColor="gray.200"
          pb={1}
          width="full"
        >
          <Text fontWeight="bold" mb={1}>
            Weight
          </Text>
          <Text>{weight}</Text>
        </Flex>
        <Flex
          justifyContent="space-between"
          borderBottom="1px"
          borderColor="gray.200"
          pb={1}
          width="full"
        >
          <Text fontWeight="bold" mb={1}>
            Width
          </Text>
          <Text>{width}</Text>
        </Flex>
        {description && (
          <Flex
            justifyContent="space-between"
            borderBottom="1px"
            borderColor="gray.200"
            pb={1}
            width="full"
          >
            <Text fontWeight="bold" mb={1}>
              Description
            </Text>
            <Text>{description}</Text>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};
