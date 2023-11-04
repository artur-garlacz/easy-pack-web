import { Input } from "@/components/atoms/Input";
import PackageTypePicker from "@/components/molecules/PackageTypePicker/PackageTypePicker";
import { RequestFormSchema } from "@/typings/requests";
import { useFormContext } from "react-hook-form";

type AddPackageFormProps = {
  packageIndex: number;
};

export default function AddPackageForm({ packageIndex }: AddPackageFormProps) {
  const { register } = useFormContext<RequestFormSchema>();

  return (
    <>
      <div className="pr-4">
        <p className="pb-2 text-md">Package type</p>
        <div style={{ maxWidth: "200px" }}>
          <PackageTypePicker index={packageIndex} />
        </div>
      </div>
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
        <div className="mt-4">
          <Input
            label="Description (Optional)"
            {...register(`packages.${packageIndex}.description`, {
              required: true,
            })}
          />
        </div>
      </div>
    </>
  );
}
