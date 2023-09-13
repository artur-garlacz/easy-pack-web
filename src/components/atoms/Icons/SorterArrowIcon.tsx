import { Icon, IconProps, useToken } from "@chakra-ui/react";

export const SorterArrowIcon = (props: IconProps & { direction?: "up" | "down" }) => {
  const selectedColor = props.color?.toString() || "currentColor";
  const [color] = useToken("colors", [selectedColor.toString()]);
  const rotation = props.direction === "down" ? 180 : 0;

  return (
    <Icon viewBox="0 0 9 12" {...props} transform={`rotate(${rotation}deg)`}>
      <path
        d="M0.58431 4.25004L1.40681 5.07254L4.08431 2.40087L4.08431 11.8334H5.25098L5.25098 2.40087L7.92848 5.07837L8.75098 4.25004L4.66764 0.166708L0.58431 4.25004Z"
        fill={color}
      />
    </Icon>
  );
};
