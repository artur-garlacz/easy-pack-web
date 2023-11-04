import { useSession } from "next-auth/react";

export const SessionLoadingGuard = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const { status } = useSession();

  if (status === "loading") {
    return null;
  }

  return children;
};
