import { EpCircle } from "@/components/atoms/EpCircle/EpCircle";
import { WidgetBorderBox } from "@/components/atoms/WidgetBorderBox/WidgetBorderBox";
import { Box, Flex, Text } from "@chakra-ui/react";
import { CalendarDays, CalendarRange } from "lucide-react";

export function PersonalSection() {
  return (
    <WidgetBorderBox title="Profile" bg="white">
      <Flex gap={4} alignItems="center">
        <EpCircle width={20} bg="gray.400">
          <Text fontSize={28} fontWeight={500} color="white">
            AG
          </Text>
        </EpCircle>
        <Flex flexDirection="column">
          <Text fontSize={28} fontWeight={600}>
            Artur Garlacz
          </Text>
          <Text color="gray.500">Courier</Text>
        </Flex>
      </Flex>
      <Flex mt={4} gap={2} alignItems="center">
        <CalendarRange size={24} className="text-gray-400" />
        <Text color="gray.600" fontWeight={600}>
          Joined Mar 2022
        </Text>
      </Flex>
    </WidgetBorderBox>
  );
}
