import { useSession } from "next-auth/react";

export const useAuthenticatedSession = () => {
  const { data, status } = useSession();
  return {
    user: data?.user,
    token: data?.user?.accessToken,
    status: "authenticated",
    isAuthenticated: status === "authenticated",
  } as const;
};
