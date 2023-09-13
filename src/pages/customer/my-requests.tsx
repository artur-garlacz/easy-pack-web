import TitleNavbar from "@/components/atoms/TitleNavbar";
import MyRequestTable from "@/components/organisms/MyRequestTable/MyRequestTable";
import SearchParcelView from "@/components/templates/SearchParcelView/SearchParcelView";

export default function MyRequests() {
  return (
    <>
      <TitleNavbar title="My requests" />
      <div className="container mx-auto px-4 pt-16">
        <MyRequestTable />
      </div>
    </>
  );
}
