import { Icon, IconProps } from "@chakra-ui/react";

export const OutgoingIcon = (props: IconProps) => (
  <Icon viewBox="0 0 24 24" fill="none" {...props}>
    <path
      d="M11.1 5.3495L6.27256 10.043L5 8.80575L12 2L19 8.80575L17.7274 10.043L12.9 5.3495L12.9 16L11.1 16L11.1 5.3495Z"
      fill="#718096"
    />
    <path fillRule="evenodd" clipRule="evenodd" d="M5 16H2V22H22V16H19V19H5V16Z" fill="#718096" />
  </Icon>
);
