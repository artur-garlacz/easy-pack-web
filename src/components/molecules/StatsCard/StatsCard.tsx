import { WidgetBorderBox } from "@/components/atoms/WidgetBorderBox/WidgetBorderBox";
import { Card, Flex, Text } from "@chakra-ui/react";
import { LayoutDashboard } from "lucide-react";

type StatsCardProps = {
  title: string;
  description: string;
  loading?: boolean;
  value?: number;
};

export default function StatsCard({
  title,
  loading = false,
  value = 0,
}: StatsCardProps) {
  return (
    <WidgetBorderBox
      p={4}
      gap={2}
      w="100%"
      bg="white"
      display="flex"
      justifyContent="flex-start"
      alignItems="center"
    >
      <Flex
        p={2}
        w={14}
        h={14}
        justifyContent="center"
        alignItems="center"
        className="rounded-full bg-slate-100"
      >
        <LayoutDashboard className="text-gray-800" />
      </Flex>
      <div className="flex flex-col space-y-1.5">
        <Text fontWeight={600} fontSize={18}>
          {title}
        </Text>
        <Text fontWeight={600} color="gray.800" m={0}>
          {value}
        </Text>
      </div>
    </WidgetBorderBox>
  );
}
