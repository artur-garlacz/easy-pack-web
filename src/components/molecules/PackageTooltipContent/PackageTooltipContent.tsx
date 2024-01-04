import { capitalize } from "@/lib/capitalizeString";
import { Package } from "@/typings/requests";
import { Flex, Text } from "@chakra-ui/react";

export const PackageTooltipContent = ({
  packageItem: { id, height, length, weight, width, description, type },
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
          <Text>{height} cm</Text>
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
          <Text>{length} cm</Text>
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
          <Text>{width} cm</Text>
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
          <Text>{weight} kg</Text>
        </Flex>
        <Flex
          justifyContent="space-between"
          borderBottom="1px"
          borderColor="gray.200"
          pb={1}
          width="full"
        >
          <Text fontWeight="bold" mb={1}>
            Type
          </Text>
          <Text>{capitalize(type)}</Text>
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
