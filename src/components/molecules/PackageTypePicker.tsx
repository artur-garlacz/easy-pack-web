import { useState } from "react";
import { GoPackage } from "react-icons/go";
import { FaEnvelope } from "react-icons/fa";
import { CiPalette } from "react-icons/ci";
import cn from "classnames";
import { Radio, RadioGroup } from "@chakra-ui/react";

const parcelTypes = [
  {
    name: "Envelope",
    Icon: FaEnvelope,
  },
  {
    name: "Parcel",
    Icon: FaEnvelope,
  },
  {
    name: "Palette",
    Icon: FaEnvelope,
  },
];

export default function PackageTypePicker() {
  const [selected, setSelected] = useState(parcelTypes[0]);

  return (
    <div className="mx-auto w-full max-w-lg">
      {/* <RadioGroup value={selected} onChange={setSelected}>
        <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
        <div className="space-y-3">
          {parcelTypes.map((type) => (
            <RadioGroup.Option
              key={type.name}
              value={type}
              className={({ active, checked }) =>
                `${
                  active
                    ? "ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-black-200"
                    : ""
                }
                ${
                  checked
                    ? "bg-gray-100 text-gray-600 border-black"
                    : "bg-gray-100 text-gray-600 border-gray-200"
                }
                border relative flex cursor-pointer rounded-lg px-5 py-3 focus:outline-none`
              }
            >
              {({ checked }) => (
                <>
                  <div className="flex w-full items-center justify-start">
                    <type.Icon
                      size={20}
                      className={checked ? "text-black" : "text-gray-400"}
                    />
                    <p
                      className={cn(
                        "ml-3 uppercase font-bold text-gray-600 text-xs",
                        `${checked ? "text-black" : "text-gray-500"}`
                      )}
                    >
                      {type.name}
                    </p>
                  </div>
                </>
              )}
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup> */}
      <RadioGroup name="form-name">
        <Radio>Radio 1</Radio>
        <Radio>Radio 2</Radio>
      </RadioGroup>
    </div>
  );
}
