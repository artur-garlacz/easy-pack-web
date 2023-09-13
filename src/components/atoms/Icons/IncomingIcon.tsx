import { Icon, IconProps } from "@chakra-ui/react";

export const IncomingIcon = (props: IconProps) => (
  <Icon viewBox="0 0 24 24" fill="none" {...props}>
    <path
      d="M12.9 12.6505L17.7274 7.957L19 9.19425L12 16L5 9.19425L6.27256 7.957L11.1 12.6505V2L12.9 2V12.6505Z"
      fill="#718096"
    />
    <path fillRule="evenodd" clipRule="evenodd" d="M5 16H2V22H22V16H19V19H5V16Z" fill="#718096" />
  </Icon>
);
