import TitleNavbar from "@/components/atoms/TitleNavbar";
import CreateParcelRequest from "@/components/templates/customer/CreateParcelRequest/CreateParcelRequest";

export default function OrderParcel() {
  return (
    <>
      <TitleNavbar title="Create parcel request" />
      <div className="w-full min-h-screen px-4 pt-16">
        <CreateParcelRequest />
      </div>
    </>
  );
}
