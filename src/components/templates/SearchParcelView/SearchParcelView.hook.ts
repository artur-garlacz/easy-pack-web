import { getQueryStringValue, setQueryStringValue } from "@/lib/query-string";
import { ChangeEvent, useEffect, useState } from "react";

export function useSearchParcelView() {
  const queryStringKey = "trackingNumber";
  const trackingNumberValue = getQueryStringValue(queryStringKey);
  const [trackingNumber, setTrackingNumber] = useState<string>(
    trackingNumberValue || ""
  );
  const [submitted, setSubmitted] = useState<boolean>(false);

  useEffect(() => {
    if (trackingNumber) {
      setSubmitted(true);
    }
  }, [trackingNumber]);

  const onChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setSubmitted(false);
    setTrackingNumber(value);
  };

  const onSubmit = () => {
    setSubmitted(true);
    setQueryStringValue(queryStringKey, trackingNumber);
  };

  return {
    trackingNumber,
    submitted,
    onChange,
    onSubmit,
  };
}
