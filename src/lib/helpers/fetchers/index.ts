import { z } from "zod";
import { HttpErrorResponse } from "../errors/HttpErrorResponse";

type FetchMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type Fetch = ({ baseUrl }: { baseUrl: string }) => <T extends z.ZodTypeAny>({
  // zodSchema,
  method,
  payload,
  queryString,
  route,
  headers,
}: {
  // zodSchema: T;
  method: FetchMethod;
  route: string;
  payload?: any;
  queryString?: Record<string, string | number>;
  headers?: Record<string, string>;
}) => Promise<z.infer<T>>;

export const fetchMethod: Fetch = ({ baseUrl }: { baseUrl: string }) => {
  return async ({ queryString, route, ...rest }) => {
    const serializedQueryString = parseUrlParams(queryString);
    const queryURL = `${baseUrl}${route}${serializedQueryString}`;
    // const queryURL = `http://localhost:8000/${route}${serializedQueryString}`;
    const response = await fetchData({ queryURL, ...rest });
    const transformedResponse = await getTransformedResponse({
      response,
    });

    return transformedResponse;
  };
};

function fetchData({
  method,
  queryURL,
  payload,
  headers,
}: {
  method: FetchMethod;
  queryURL: string;
  payload?: any;
  headers?: Record<string, string>;
}) {
  return fetch(queryURL, {
    method,
    body: JSON.stringify(payload),
    headers,
  });
}

async function getTransformedResponse<T>({
  response,
}: {
  response: Response;
}): Promise<T> {
  if (response.status >= 400) {
    throw new HttpErrorResponse(response.status, {
      message: `Invalid response code ${response.status} for request: "${response.url}"`,
    });
  }

  return await response.json();
}

function parseUrlParams(data?: Record<string, string | number>) {
  if (!data) {
    return "";
  }

  return (
    "?" +
    Object.entries(data)
      .map(([key, value]) => {
        return encodeURIComponent(key) + "=" + encodeURIComponent(value!);
      })
      .join("&")
  );
}
