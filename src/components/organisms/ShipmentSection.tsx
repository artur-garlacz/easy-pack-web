import ShipmentForm from "@/components/molecules/ShipmentForm";

export default function ShipmentSection() {
  return (
    <div className="flex justify-between gap-12">
      <ShipmentForm addressType="pickupAddress" />
      <ShipmentForm addressType="deliveryAddress" />
    </div>
  );
}
