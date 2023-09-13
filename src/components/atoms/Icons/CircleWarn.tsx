import { Icon, ThemeTypings, useToken } from "@chakra-ui/react";

export const CircleWarnIcon = ({
  color,
  width = 5,
}: {
  color: ThemeTypings["colors"];
  width?: number;
}) => {
  const [hexColor] = useToken("colors", [color]);
  return (
    <Icon viewBox="1.66797 1.66663 16.67 16.67" width={width} height={width} fill="none">
      <circle fill="white" cx="10.002970000000001" cy="10.002970000000001" r="7" />
      <path
        d="M9.99996 1.66797C5.39996 1.66797 1.66663 5.4013 1.66663 10.0013C1.66663 14.6013 5.39996 18.3346 9.99996 18.3346C14.6 18.3346 18.3333 14.6013 18.3333 10.0013C18.3333 5.4013 14.6 1.66797 9.99996 1.66797ZM10.8333 14.168H9.16663V12.5013H10.8333V14.168ZM10.8333 10.8346H9.16663V5.83464H10.8333V10.8346Z"
        fill={hexColor}
      />
    </Icon>
  );
};
