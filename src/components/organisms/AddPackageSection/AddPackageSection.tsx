import AddPackageForm from "@/components/molecules/AddPackageForm/AddPackageForm";
import PackageTypePicker from "@/components/molecules/PackageTypePicker/PackageTypePicker";
import { PACKAGE_TYPE, RequestFormSchema } from "@/typings/requests";
import { PlusIcon } from "@heroicons/react/20/solid";
import { TrashIcon as OutlinedTrashIcon } from "@heroicons/react/24/outline";
import { Trash } from "lucide-react";
import { useFormContext } from "react-hook-form";

export const INITIAL_PACKAGE = {
  type: PACKAGE_TYPE.ENVELOPE,
  weight: 1,
  length: 30,
  width: 10,
  height: 20,
} as const;

export default function AddPackageSection() {
  const { setValue, watch } = useFormContext<RequestFormSchema>();

  const packages = watch("packages");
  const additionalPackages = packages.slice(1);

  const handleAddAdditionalPackage = () => {
    setValue("packages", [...packages, INITIAL_PACKAGE]);
  };

  const handleRemoveAdditionalPackage = (idx: number) => {
    const filteredPackages = packages.filter((_, i) => i !== idx);
    setValue("packages", [...filteredPackages]);
  };

  return (
    <>
      <div className="grid grid-cols-[1fr,1fr,1fr] py-4 pb-6 gap-y-8">
        <AddPackageForm packageIndex={0} />
      </div>
      {!!additionalPackages.length &&
        additionalPackages.map((_, idx) => (
          <div
            className="grid grid-cols-[1fr,1fr,1fr] py-8 border-t border-gray-200"
            key={idx + 1}
          >
            <AddPackageForm packageIndex={idx + 1} />

            <div className="flex justify-center items-center">
              <button
                onClick={() => handleRemoveAdditionalPackage(idx + 1)}
                className="bg-gray-200 h-12 w-12 flex justify-center items-center rounded-full"
              >
                <Trash
                  strokeWidth={1}
                  className="h-6 text-black hover:text-gray-500 cursor-pointer"
                />
              </button>
            </div>
          </div>
        ))}
      <div className="grid grid-cols-[1fr,1fr,1fr] pb-4">
        <span />
        <button
          type="button"
          onClick={handleAddAdditionalPackage}
          className="flex mt-4 items-center hover:text-black"
        >
          <PlusIcon className="h-6 text-black hover:text-black cursor-pointer" />
          Add another package
        </button>
        <span />
      </div>
    </>
  );
}
