import {
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Heading,
} from "@chakra-ui/react";

type DrawerProp = {
  isOpen: boolean;
  onClose: () => void;
  header: React.ReactNode;
  drawerBody: React.ReactNode;
};

export const EpDrawer = ({
  isOpen,
  onClose,
  drawerBody,
  header,
}: DrawerProp) => {
  return (
    <Drawer isOpen={isOpen} onClose={onClose} size={"md"}>
      <DrawerOverlay />
      <DrawerContent>
        <Heading as="h4" size={"sm"} width={"100%"} mt={4}>
          <Flex alignItems={"center"} gap={3} mx={10}>
            {header}
            <Flex
              marginLeft={"auto"}
              width={12}
              height={10}
              backgroundColor={"blackAlpha.200"}
              alignItems={"center"}
              justifyContent={"center"}
              onClick={onClose}
              cursor={"pointer"}
              borderRadius={"6px"}
            >
              <DrawerCloseButton position={"inherit"} _hover={{ bg: "none" }} />
            </Flex>
          </Flex>
        </Heading>
        <Divider mt={4} />
        <DrawerBody p={0}>{drawerBody}</DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
