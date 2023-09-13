import { getQueryStringValue, setQueryStringValue } from "@/lib/query-string";
import { ChangeEvent, useEffect, useState } from "react";

export function useSearchParcelView() {
  const queryStringKey = "parcelNumber";
  const parcelNumberValue = getQueryStringValue(queryStringKey);
  const [parcelNumber, setParcelNumber] = useState<string>(
    parcelNumberValue || ""
  );
  const [submitted, setSubmitted] = useState<boolean>(false);

  useEffect(() => {
    if (parcelNumber) {
      setSubmitted(true);
    }
  }, []);

  const onChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setSubmitted(false);
    setParcelNumber(value);
  };

  const onSubmit = () => {
    setSubmitted(true);
    setQueryStringValue(queryStringKey, parcelNumber);
  };

  return {
    parcelNumber,
    submitted,
    onChange,
    onSubmit,
  };
}
