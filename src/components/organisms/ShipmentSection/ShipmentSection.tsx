import ShipmentForm from "@/components/molecules/ShipmentForm/ShipmentForm";
import { SimpleGrid } from "@chakra-ui/react";

export function ShipmentSection() {
  return (
    <SimpleGrid gridTemplateColumns={"auto auto"} gap={20} py={8}>
      <ShipmentForm addressType="pickupAddress" />
      <ShipmentForm addressType="deliveryAddress" />
    </SimpleGrid>
  );
}
