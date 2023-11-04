import { Input } from "@/components/atoms/Input";
import { RequestFormSchema } from "@/typings/requests";
import { Text } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

type ShipmentFormProps = {
  addressType: "pickupAddress" | "deliveryAddress";
};

export default function ShipmentForm({ addressType }: ShipmentFormProps) {
  const { register } = useFormContext<RequestFormSchema>();

  const isPickUp = addressType === "pickupAddress";

  return (
    <div className="flex flex-col gap-2">
      <Text fontWeight={600} fontSize={14}>
        {isPickUp ? "Pickup" : "Delivery"} data
      </Text>

      <div className="grid grid-cols-2 gap-3">
        <Input
          label="City"
          placeholder="Eg. Kraków"
          {...register(`${addressType}.city`, { required: true })}
        />
        <Input
          label="Street"
          placeholder="Eg. Wadowicka"
          {...register(`${addressType}.street`, { required: true })}
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Input
          label="Postal code"
          placeholder="xx-xxx"
          {...register(`${addressType}.postalCode`, { required: true })}
        />
        <Input
          label="Location number"
          placeholder="Eg. Kraków"
          {...register(`${addressType}.locationNumber`, { required: true })}
        />
      </div>
      {addressType === "deliveryAddress" ? (
        <>
          <Text fontWeight={600} fontSize={14} mt={4}>
            {"Recipant's contact"}
          </Text>
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Phone number"
              placeholder="xx-xxx"
              {...register("deliveryAddress.phoneNumber", { required: true })}
            />
            <Input
              label="E-mail address"
              placeholder="Eg. joe.doe@gmail.com"
              {...register("deliveryAddress.email", { required: true })}
            />
          </div>
        </>
      ) : (
        <>
          <Text fontWeight={600} fontSize={14} mt={4}>
            Parcel requested at
          </Text>
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Pickup at"
              type="datetime-local"
              {...register("pickupAt", { required: true })}
            />
            <Input
              label="Shipment at"
              type="datetime-local"
              {...register("shipmentAt", { required: true })}
            />
          </div>
        </>
      )}
    </div>
  );
}
