import { PackageItem } from "@/components/atoms/PackageItem/PackageItem";
import { PackageTooltipContent } from "@/components/molecules/PackageTooltipContent/PackageTooltipContent";
import { Package } from "@/typings/requests";
import {
  Popover,
  PopoverTrigger,
  Flex,
  PopoverContent,
  PopoverArrow,
  Portal,
  Box,
  Button,
} from "@chakra-ui/react";

type PackageItemWithTooltipProps = {
  packages: Package[];
  onClick?: (triggerId: string) => void;
};

export const PackageItemWithTooltip = ({
  packages,
  onClick,
}: PackageItemWithTooltipProps) => {
  return (
    <Popover trigger="hover" placement="bottom" key={packages[0].id}>
      <PopoverTrigger>
        {packages.length > 1 ? (
          <Flex
            gap={2}
            onClick={(e) => {
              e.stopPropagation();
            }}
            cursor={"initial"}
          >
            <PackageItem numberOfMultiples={packages.length} />
          </Flex>
        ) : (
          <Button
            background="none"
            padding={0}
            _hover={{ bg: "none" }}
            _active={{ bg: "none" }}
            onClick={(e) => {
              onClick?.(packages[0].id);
              e.stopPropagation();
            }}
          >
            <PackageItem />
          </Button>
        )}
      </PopoverTrigger>
      <Portal>
        <Box sx={{ "& .chakra-popover__popper": { zIndex: "popover" } }}>
          <PopoverContent color="black" width={"max-content"}>
            {packages.length > 1 ? (
              <Flex overflow="auto" maxW={"800px"}>
                {packages.map((packageItem, index) => (
                  <Flex
                    cursor={"pointer"}
                    key={packageItem.id}
                    pl={index === 0 ? "2.5" : "5"}
                    py={3}
                    pr={"5"}
                    borderRightWidth={packages[index + 1] ? "1px" : "0px"}
                    borderColor="gray.200"
                    _hover={{ cursor: "pointer", backgroundColor: "gray.50" }}
                    onClick={(e) => {
                      onClick?.(packageItem.id);
                      e.stopPropagation();
                    }}
                  >
                    <PackageTooltipContent packageItem={packageItem} />
                  </Flex>
                ))}
              </Flex>
            ) : (
              <Flex pl={2.5} py={3} pr={5}>
                <PackageTooltipContent packageItem={packages[0]} />
              </Flex>
            )}
            <PopoverArrow />
          </PopoverContent>
        </Box>
      </Portal>
    </Popover>
  );
};
