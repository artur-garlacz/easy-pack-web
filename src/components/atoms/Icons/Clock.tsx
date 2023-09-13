import { Icon, IconProps } from "@chakra-ui/react";

export const Clock = (props: IconProps) => (
  <Icon viewBox="0 0 20 21" {...props}>
    <path
      d="M9.99 0.5C4.47 0.5 0 4.98 0 10.5C0 16.02 4.47 20.5 9.99 20.5C15.52 20.5 20 16.02 20 10.5C20 4.98 15.52 0.5 9.99 0.5ZM10 18.5C5.58 18.5 2 14.92 2 10.5C2 6.08 5.58 2.5 10 2.5C14.42 2.5 18 6.08 18 10.5C18 14.92 14.42 18.5 10 18.5ZM10.5 5.5H9V11.5L14.25 14.65L15 13.42L10.5 10.75V5.5Z"
      fill="white"
    />
  </Icon>
);
