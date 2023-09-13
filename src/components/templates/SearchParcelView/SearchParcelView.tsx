import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import { Label } from "@/components/atoms/Label";
import ParcelStatusHistory from "@/components/molecules/ParcelStatusHistory";
import { useSearchParcelView } from "@/components/templates/SearchParcelView/SearchParcelView.hook";
import { parcelRepository } from "@/repositories/parcel-repository";
import { useQuery } from "@tanstack/react-query";
import cx from "classnames";

export default function SearchParcelView() {
  const { submitted, parcelNumber, onChange, onSubmit } = useSearchParcelView();
  const { data, isFetching, isError } = useQuery(
    ["parcel-delivery"],
    async () => parcelRepository({}).getParcel({ parcelNumber }),
    {
      enabled: submitted,
      onError: (error) => console.log("error", error),
    }
  );

  return (
    <div className="container">
      <div className="w-full flex gap-6">
        <Input
          onChange={onChange}
          value={parcelNumber}
          className="w-full h-12"
          placeholder="Type parcel number"
        />
        <Button onClick={onSubmit} className="flex h-12 gap-2">
          Search
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </Button>
      </div>

      {!!data && !isError ? (
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div>
            <h4 className="text-md font-semibold pb-2">Parcel details</h4>

            <div className="border rounded p-4">
              <p className="text-xs font-semibold text-gray-600">
                Delivery details
              </p>
              <FieldToDisplay
                label="Address"
                value={`${data.recipientDetails.postalCode} ${data.recipientDetails.city} | ${data.recipientDetails.country}`}
                className="border-b"
              />
              <FieldToDisplay
                label="Street"
                value={data.recipientDetails.street}
                className="border-b"
              />
              <FieldToDisplay
                label="Email"
                value={data.recipientDetails.email}
                className="border-b"
              />
              <FieldToDisplay
                label="Phone number"
                value={data.recipientDetails.phoneNumber}
                className="border-b"
              />

              <p className="mt-4 text-xs font-semibold text-gray-600">
                Sender details
              </p>
              <FieldToDisplay
                label="Address"
                value={`${data.senderDetails.postalCode} ${data.senderDetails.city} | ${data.senderDetails.country}`}
                className="border-b"
              />
              <FieldToDisplay
                label="Street"
                value={data.senderDetails.street}
                className="border-b"
              />
              <FieldToDisplay
                label="Email"
                value={data.senderDetails.email}
                className="border-b"
              />
              <FieldToDisplay
                label="Phone number"
                value={data.senderDetails.phoneNumber}
                className="border-b"
              />
            </div>
          </div>
          <div>
            <h4 className="text-md font-semibold pb-2">Parcel status</h4>
            {data.status && <ParcelStatusHistory data={data.status} />}
          </div>
        </div>
      ) : (
        !isError &&
        isFetching && (
          <div className="border p-2 mt-4">
            <h3>Loadisng</h3>
          </div>
        )
      )}

      {/* {!isError && isLoading && (
        <div className="border p-2 mt-4">
          <h3>Loading</h3>
        </div>
      )} */}
    </div>
  );
}

type Props = {
  label: string;
  value: string;
  className?: string;
};

function FieldToDisplay({ label, value, className }: Props) {
  return (
    <div className={cx("flex items-center py-2 justify-between", className)}>
      <Label>{label}</Label>
      <p className="">{value}</p>
    </div>
  );
}
