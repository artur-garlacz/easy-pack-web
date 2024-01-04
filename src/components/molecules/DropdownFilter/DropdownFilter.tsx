import { Flex } from "@chakra-ui/react";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
} from "@/components/atoms/DropdownMenu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/atoms/Button";

export type DropdownItem<T = string> = {
  label: string;
  value: T;
};

export function DropdownFilter<T>({
  value: currValue,
  onSelect,
  items,
}: {
  value: T;
  onSelect: (value: T) => void;
  items: Array<DropdownItem<T>>;
}) {
  const currItem = items.find((i) => i.value === currValue);

  return (
    <Flex gap={2} px={2}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="ml-auto hidden h-auto lg:flex"
          >
            Status:
            <strong className="ml-1">{currItem?.label}</strong>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-[150px]">
          {items.map(({ label, value }, idx, arr) => {
            return (
              <DropdownMenuCheckboxItem
                className="cursor-pointer"
                key={idx}
                checked={currValue === value}
                onCheckedChange={() => onSelect(value)}
              >
                {label}
              </DropdownMenuCheckboxItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </Flex>
  );
}
