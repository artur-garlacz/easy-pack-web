import { backendFetcher as fetcher } from "@/lib/helpers/fetchers/backendFetcher";
import { SignUpFormData } from "@/typings/auth";
import { DeliveryRequest } from "@/typings/requests";

export const customerRepository = ({ token }: { token?: string }) => {
  const headers = { authorization: `Bearer ${token}` };
  return {
    async getCustomer() {
      return fetcher({
        method: "GET",
        route: `api/customers/me`,
        headers,
      });
    },
    async myRequests(): Promise<DeliveryRequest[]> {
      return fetcher({
        method: "GET",
        route: `api/customers/delivery-requests`,
        headers,
      });
    },
    async signUpCustomer(payload: SignUpFormData) {
      return fetcher({
        method: "POST",
        route: `api/customers/sign-up`,
        payload,
      });
    },
  };
};
