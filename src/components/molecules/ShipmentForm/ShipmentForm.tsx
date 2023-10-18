import { Combobox } from "@/components/atoms/Combobox";
import { Input } from "@/components/atoms/Input";
import { countryListAlpha2 } from "@/lib/countries";
import { CreateParcelRequestFormData } from "@/typings/requests";
import { Text } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

type ShipmentFormProps = {
  addressType: "pickupAddress" | "deliveryAddress";
};

export default function ShipmentForm({ addressType }: ShipmentFormProps) {
  const { register } = useFormContext<CreateParcelRequestFormData>();

  const getCoutries = () => {
    return Object.entries(countryListAlpha2).map(([key, value]) => ({
      label: value,
      value: key,
    }));
  };

  const isPickUp = addressType === "pickupAddress";

  return (
    <div className="flex flex-col gap-2">
      <Text fontWeight={600} fontSize={14}>
        {isPickUp ? "Pickup" : "Delivery"} data
      </Text>
      <div className="grid grid-cols-2 gap-3">
        <Input
          label="First name"
          placeholder="Eg. John"
          className="w-full"
          {...register(`${addressType}.firstName`, { required: true })}
        />
        <Input
          label="Last name"
          placeholder="Eg. Doe"
          className="w-full"
          {...register(`${addressType}.lastName`, { required: true })}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        {/* <Combobox label="Country" items={getCoutries()} /> */}
        <Input
          label="Postal code"
          placeholder="xx-xxx"
          {...register(`${addressType}.postalCode`, { required: true })}
        />
        <Input
          label="City"
          placeholder="Eg. Kraków"
          {...register(`${addressType}.city`, { required: true })}
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Input
          label="Phone number"
          placeholder="xx-xxx"
          {...register(`${addressType}.phoneNumber`, { required: true })}
        />
        <Input
          label="E-mail address"
          placeholder="Eg. joe.doe@gmail.com"
          {...register(`${addressType}.email`, { required: true })}
        />
      </div>
      <div className="pt-2">
        <Input
          label={`Estimated ${isPickUp ? "pickup" : "delivery"} date`}
          placeholder="Eg. joe.doe@gmail.com"
          type="datetime-local"
          {...register(
            `${addressType}.${isPickUp ? "pickupAt" : "shipmentAt"}`,
            { required: true }
          )}
        />
      </div>
    </div>
  );
}
