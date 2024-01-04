import { useState } from "react";
import { Button, Flex, Text } from "@chakra-ui/react";
import { BaggageClaim, Mail, Package } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { PACKAGE_TYPE, RequestFormSchema } from "@/typings/requests";

const parcelTypes = [
  {
    type: PACKAGE_TYPE.ENVELOPE,
    Icon: Mail,
  },
  {
    type: PACKAGE_TYPE.BOX,
    Icon: Package,
  },
  {
    type: PACKAGE_TYPE.OTHER,
    Icon: BaggageClaim,
  },
];

export default function PackageTypePicker({ index }: { index: number }) {
  const { setValue, watch } = useFormContext<RequestFormSchema>();
  const packages = watch("packages");

  const onSelect = (type: PACKAGE_TYPE) => {
    const updatedPackages = packages.map((p, key) =>
      key === index ? { ...p, type } : p
    );

    setValue("packages", updatedPackages);
  };

  const currPackage = packages.find((_, key) => key === index);

  return (
    <Flex flexDirection="column" gap={3}>
      {parcelTypes.map(({ type, Icon }) => (
        <Button
          variant="outline"
          bg={currPackage?.type === type ? "brand.200" : "white"}
          _hover={{
            backgroundColor: "brand.400",
          }}
          key={`${index}.${type}`}
          onClick={() => onSelect(type)}
        >
          <Icon strokeWidth={1} className="mr-4 text-gray-600" />
          <Text
            width="full"
            color="gray.600"
            fontWeight={500}
            textTransform="uppercase"
            textAlign="left"
            lineHeight="initial"
          >
            {type}
          </Text>
        </Button>
      ))}
    </Flex>
  );
}
