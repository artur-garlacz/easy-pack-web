import { useState } from "react";
import { Button, Flex, Text } from "@chakra-ui/react";
import { BaggageClaim, Mail, Package } from "lucide-react";

const parcelTypes = [
  {
    name: "Envelope",
    Icon: Mail,
  },
  {
    name: "Parcel",
    Icon: Package,
  },
  {
    name: "Palette",
    Icon: BaggageClaim,
  },
];

export default function PackageTypePicker() {
  const [selected, setSelected] = useState(parcelTypes[0]);

  return (
    <Flex flexDirection="column" gap={3}>
      {parcelTypes.map(({ name, Icon }) => (
        <Button
          bg={selected.name === name ? "gray.300" : "gray.100"}
          key={name}
        >
          <Icon className="mr-4 text-gray-600" />
          <Text
            width="full"
            color="gray.600"
            fontWeight={600}
            textTransform="uppercase"
            textAlign="left"
            lineHeight="initial"
          >
            {name}
          </Text>
        </Button>
      ))}
    </Flex>
  );
}
