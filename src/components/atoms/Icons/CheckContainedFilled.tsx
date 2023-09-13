import { ThemeTypings, useToken } from "@chakra-ui/react";

export const CheckContainedFilled = ({
  color = "#b2b2b2",
  width = 20,
}: {
  color?: ThemeTypings["colors"];
  width?: number;
}) => {
  const [hexColor] = useToken("colors", [color]);
  return (
    <svg
      width={width}
      height={width}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.400391 10.0004C0.400391 4.69846 4.69846 0.400391 10.0004 0.400391C15.3023 0.400391 19.6004 4.69846 19.6004 10.0004C19.6004 15.3023 15.3023 19.6004 10.0004 19.6004C4.69846 19.6004 0.400391 15.3023 0.400391 10.0004ZM15.0489 8.44892C15.5175 7.98029 15.5175 7.22049 15.0489 6.75186C14.5803 6.28323 13.8205 6.28323 13.3519 6.75186L8.80039 11.3033L7.24892 9.75186C6.78029 9.28323 6.02049 9.28323 5.55186 9.75186C5.08323 10.2205 5.08323 10.9803 5.55186 11.4489L7.95186 13.8489C8.42049 14.3175 9.18029 14.3175 9.64892 13.8489L15.0489 8.44892Z"
        fill={hexColor}
      />
    </svg>
  );
};
