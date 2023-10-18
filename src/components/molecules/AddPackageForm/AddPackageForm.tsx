import { Input } from "@/components/atoms/Input";
import { CreateParcelRequestFormData } from "@/typings/parcel";
import { useFormContext } from "react-hook-form";

type AddPackageFormProps = {
  packageIndex: number;
};

export default function AddPackageForm({ packageIndex }: AddPackageFormProps) {
  const { register } = useFormContext<CreateParcelRequestFormData>();

  return (
    <div>
      <p className="pb-2">Package params</p>
      <Input
        label="Weight"
        suffix="kg"
        {...register(`packages.${packageIndex}.weight`, { required: true })}
      />
      <div className="flex justify-between gap-4 mt-3">
        <Input
          label="Length"
          suffix="cm"
          {...register(`packages.${packageIndex}.length`, { required: true })}
        />
        <Input
          label="Width"
          suffix="cm"
          {...register(`packages.${packageIndex}.width`, { required: true })}
        />
        <Input
          label="Height"
          suffix="cm"
          {...register(`packages.${packageIndex}.height`, { required: true })}
        />
      </div>
    </div>
  );
}
