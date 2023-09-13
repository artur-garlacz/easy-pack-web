"use client";
import AddPackageForm from "@/components/molecules/AddPackageForm";
import PackageTypePicker from "@/components/molecules/PackageTypePicker";
import { PACKAGE_TYPE } from "@/typings/parcel";
import { PlusIcon } from "@heroicons/react/20/solid";
import { TrashIcon as OutlinedTrashIcon } from "@heroicons/react/24/outline";
import { useFormContext } from "react-hook-form";

export const INITIAL_PACKAGE = {
  type: PACKAGE_TYPE.ENVELOPE,
  weight: 1,
  length: 30,
  width: 10,
  height: 20,
} as const;

export default function AddPackageSection() {
  const { setValue, getValues, watch } = useFormContext<any>();

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
        <div className="pr-4">
          <p className="pb-2 text-md">Package type</p>
          <div style={{ maxWidth: "200px" }}>
            <PackageTypePicker />
          </div>
        </div>
        <div className="mx-auto">
          <AddPackageForm packageIndex={0} />
        </div>
        <div></div>
      </div>
      {!!additionalPackages.length &&
        additionalPackages.map((_, idx) => (
          <div
            className="grid grid-cols-[1fr,1fr,1fr] py-6 border-t border-gray-200"
            key={idx}
          >
            <div className=""></div>
            <div className="mx-auto">
              <>
                <div className="flex items-center gap-12">
                  <AddPackageForm packageIndex={idx} key={idx} />
                </div>
              </>
            </div>
            <div className="flex justify-center items-center">
              <button
                onClick={() => handleRemoveAdditionalPackage(idx)}
                className="bg-gray-200 h-10 w-10 flex justify-center items-center rounded-full"
              >
                <OutlinedTrashIcon className="h-6 text-black hover:text-black cursor-pointer" />
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
