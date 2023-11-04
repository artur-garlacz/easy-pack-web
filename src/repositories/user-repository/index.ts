import { backendFetcher as fetcher } from "@/lib/helpers/fetchers/backendFetcher";
import { SignUpFormData } from "@/typings/auth";

export const userRepository = ({ token }: { token?: string }) => {
  const headers = { authorization: `Bearer ${token}` };
  return {
    async signUpUser(payload: SignUpFormData) {
      return fetcher({
        method: "POST",
        route: `api/users/sign-up`,
        payload,
      });
    },
  };
};
