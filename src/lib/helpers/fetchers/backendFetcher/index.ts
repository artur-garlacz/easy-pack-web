import { fetchMethod } from "..";

const URL = typeof window === "undefined" ? process.env.BACKEND_URL! : "/";

export const backendFetcher = fetchMethod({
  baseUrl: URL,
});
