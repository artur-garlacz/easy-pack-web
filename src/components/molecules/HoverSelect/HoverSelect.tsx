import { Flex, Text } from "@chakra-ui/react";
import { ClickableHover } from "@/components/atoms/ClickableHover/ClickableHover";
import { ReactNode, useState } from "react";

type Props<T extends string> = {
  items: Array<any>;
  initialValue: number;
  render: (value: number, isActive: boolean) => React.ReactNode;
  onChange: (value: number) => Promise<void>;
  description: string;
  children: ReactNode;
};

export const HoverSelect = <T extends string>({
  items,
  initialValue,
  render: renderOption,
  onChange,
  description,
  children,
}: Props<T>) => {
  const [selected, setSelected] = useState<number>(initialValue);

  const handlePress = async (selectedValue: number) => {
    setSelected(selectedValue);
    await onChange(selectedValue);
  };

  return (
    <ClickableHover
      body={
        <>
          <Text fontWeight={700} fontSize={"sm"} pb={2}>
            {description}
          </Text>
          <Flex gap={1}>
            {items.map((key, index) => (
              <Flex
                key={index}
                gap={4}
                direction={"column"}
                flexDirection={"row"}
                flexWrap={"nowrap"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <span
                  style={{ cursor: "pointer" }}
                  onClick={handlePress.bind({}, index)}
                >
                  {renderOption(index, selected === index)}
                </span>
              </Flex>
            ))}
          </Flex>
        </>
      }
    >
      {children}
    </ClickableHover>
  );
};
