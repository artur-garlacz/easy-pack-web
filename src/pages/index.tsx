import { useAuthenticatedSession } from "@/hooks/useAuthenticatedSession";
import { useSession } from "next-auth/react";

export default function Dashboard() {
  const { status, data } = useSession();
  if (status === "loading") {
    return null;
  }

  if (status === "unauthenticated") {
    return <>unauthenticated</>;
  }

  if (status === "authenticated") {
    console.log(data);

    return <AuthenticatedView />;
  }
}

function AuthenticatedView() {
  const w = useAuthenticatedSession();
  return <>authenticated</>;
}
