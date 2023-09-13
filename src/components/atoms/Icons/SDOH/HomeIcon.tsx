import { Icon, useToken, type IconProps, ThemeTypings } from "@chakra-ui/react";

export const HomeIcon = (
  props: IconProps & { variant: "solid" | "ghost" } & { fillOverride?: ThemeTypings["colors"] }
) => {
  const { fillOverride, variant, ...restProps } = props;
  const colors =
    variant === "solid" ? [fillOverride ?? "gray.500", "white"] : ["gray.100", "gray.300"];

  const [colorHex, bgColorHex] = useToken("colors", colors);

  return (
    <Icon
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...restProps}
    >
      <rect width="28" height="28" rx="14" fill={colorHex} />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.8695 10.4475L19.9103 19.4883L22.6404 22.2184L22.6359 22.223L21.6305 23.2282L19.0772 20.6749H15.9694V17.567L14.3483 15.946H12.8167V20.6749H8.87587V14.3698H6.51142L9.80648 11.4042L5.14038 6.73814L6.14574 5.73291L6.15022 5.7283L10.8695 10.4475ZM22.2745 14.37H19.9102L19.9103 17.4779L11.9279 9.49547L14.3931 7.27672L22.2745 14.37Z"
        fill={bgColorHex}
      />
    </Icon>
  );
};
