import TitleNavbar from "@/components/atoms/TitleNavbar";
import { CustomerRequestsTable } from "@/components/organisms/CustomerRequestsTable/CustomerRequestsTable";

export default function MyRequests() {
  return (
    <>
      <TitleNavbar title="My requests" />
      <div className="container mx-auto px-4 pt-16">
        <CustomerRequestsTable />
      </div>
    </>
  );
}
