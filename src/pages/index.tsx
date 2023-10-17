import CreateParcelRequest from "@/components/templates/customer/CreateParcelRequest/CreateParcelRequest";
import { useAuthenticatedSession } from "@/hooks/useAuthenticatedSession";
import { useSession } from "next-auth/react";

export default function Dashboard() {
  return <CreateParcelRequest />;
}

function AuthenticatedView() {
  const w = useAuthenticatedSession();
  return <>authenticated</>;
}
