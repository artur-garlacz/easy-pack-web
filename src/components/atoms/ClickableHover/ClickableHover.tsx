import {
  Box,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  PopoverProps,
} from "@chakra-ui/react";

type Props = PopoverProps & {
  children: React.ReactNode;
  body: React.ReactNode;
};

export const ClickableHover = ({
  children,
  body,
  trigger = "hover",
  ...rest
}: Props) => {
  return (
    <Popover trigger={trigger} placement="bottom-start" {...rest}>
      <PopoverTrigger>
        <Box cursor="pointer">{children}</Box>
      </PopoverTrigger>
      <PopoverContent
        color="black"
        p={2}
        whiteSpace="break-spaces"
        width={"fit-content"}
        boxShadow={
          "0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06);"
        }
      >
        <PopoverBody>{body}</PopoverBody>
        <PopoverArrow />
      </PopoverContent>
    </Popover>
  );
};
