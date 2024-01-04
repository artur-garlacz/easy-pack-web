import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import ShipmentForm from "@/components/molecules/ShipmentForm/ShipmentForm";
import { parcelRepository } from "@/repositories/parcel-repository";
import { RequestFormSchema } from "@/typings/requests";
import { SimpleGrid } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useFormContext } from "react-hook-form";

export function ShipmentSection() {
  const { getValues, watch } = useFormContext<RequestFormSchema>();
  const api = parcelRepository({});

  // const { mutateAsync } = useMutation(
  //   (payload: RequestFormSchema) => api(payload),
  //   {
  //     onSuccess: async () => {
  //       showSuccess({ message: "Request has been sent" });
  //     },
  //     onError: () => {
  //       showError({ message: "Cannot sent request" });
  //     },
  //   }
  // );

  return (
    <SimpleGrid
      gridTemplateColumns={"auto auto"}
      columnGap={20}
      rowGap={10}
      py={8}
    >
      <ShipmentForm addressType="pickupAddress" />
      <ShipmentForm addressType="deliveryAddress" />
      <Input label="Additional description (optional)" />

      <Button className="w-1/2 flex justify-self-end self-end">Estimate</Button>
    </SimpleGrid>
  );
}
