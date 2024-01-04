import TitleNavbar from "@/components/atoms/TitleNavbar";
import Header from "@/components/molecules/Header/Header";
import { CustomerParcelDeliveryTable } from "@/components/organisms/CustomerParcelDeliveryTable/CustomerParcelDeliveryTable";

export default function MyRequests() {
  return (
    <>
      <Header />
      <TitleNavbar title="My requests" />
      <div className="container mx-auto px-4 pt-16">
        <CustomerParcelDeliveryTable />
      </div>
    </>
  );
}
