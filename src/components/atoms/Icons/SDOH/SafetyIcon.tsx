import { Icon, useToken, type IconProps, ThemeTypings } from "@chakra-ui/react";

export const SafetyIcon = (
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
        d="M13.0902 6.46593C13.77 6.01135 14.6424 6.01136 15.3222 6.46593L16.1152 6.99613C17.2268 7.73944 18.4935 7.90535 19.7657 8.072C20.177 8.12589 20.5888 8.17982 20.9961 8.25338C20.9961 8.25338 21.0051 9.03386 20.9957 9.38819L20.9144 12.4322C20.8447 15.0428 19.7835 17.5184 17.9632 19.3171C17.1044 20.1657 16.2163 20.9322 15.1958 21.5691C14.5907 21.9467 13.8421 21.9766 13.211 21.6484C12.0327 21.0356 10.9891 20.2584 10.0365 19.3171C8.21616 17.5184 7.15501 15.0428 7.0853 12.4322L7.00427 9.39789C6.99467 9.03854 7.00427 8.25338 7.00427 8.25338C7.33498 8.21064 7.67206 8.17561 8.0117 8.14032C9.51104 7.98444 11.0601 7.82339 12.3309 6.97366L13.0902 6.46593ZM13.2222 13.2222V10.5H14.7778V13.2222H17.5V14.7778H14.7778V17.5H13.2222V14.7778H10.5V13.2222H13.2222Z"
        fill={bgColorHex}
      />
    </Icon>
  );
};
