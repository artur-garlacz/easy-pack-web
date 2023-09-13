import { Icon, useToken, type IconProps, ThemeTypings } from "@chakra-ui/react";

export const TransportationIcon = (
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
        d="M20.49 11.4442H20.0461L19.5705 8.47496C19.4913 7.95716 19.095 7.54923 18.5718 7.47075L16.9233 7.21967C15.9563 7.07847 14.9894 7 14.0065 7C13.0237 7 12.0568 7.07848 11.0898 7.21967L9.45705 7.47075C8.93393 7.54922 8.52181 7.97291 8.45835 8.4906L7.96697 11.4442H7.52311C7.23784 11.4442 7 11.6795 7 11.962V13.484C7 13.7664 7.23773 14.0018 7.52311 14.0018H7.7133V17.9873C7.7133 18.5992 8.17295 19.0856 8.77538 19.1484V20.4822C8.77538 20.7646 9.01311 21 9.29849 21H10.2655C10.5507 21 10.7886 20.7647 10.7886 20.4822V19.1642H17.2086V20.4822C17.2086 20.7646 17.4463 21 17.7317 21H18.6987C18.984 21 19.2218 20.7647 19.2218 20.4822V19.1484C19.8083 19.0857 20.2839 18.5836 20.2839 17.9873V14.0018H20.4741C20.7593 14.0018 20.9972 13.7665 20.9972 13.484V11.962C21.0288 11.6795 20.7912 11.4442 20.49 11.4442ZM10.2972 17.0459C9.80582 17.0459 9.40952 16.6536 9.40952 16.1672C9.40952 15.6808 9.80582 15.2885 10.2972 15.2885C10.7886 15.2885 11.1849 15.6808 11.1849 16.1672C11.1849 16.6379 10.7886 17.0459 10.2972 17.0459ZM17.7159 17.0459C17.2245 17.0459 16.8282 16.6536 16.8282 16.1672C16.8282 15.6808 17.2245 15.2885 17.7159 15.2885C18.2073 15.2885 18.6036 15.6808 18.6036 16.1672C18.6195 16.6379 18.2073 17.0459 17.7159 17.0459ZM9.0449 13.7628L9.6473 8.99276H18.3817L18.9841 13.7628H9.0449Z"
        fill={bgColorHex}
      />
    </Icon>
  );
};
