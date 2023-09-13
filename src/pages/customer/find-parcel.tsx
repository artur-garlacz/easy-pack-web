import TitleNavbar from "@/components/atoms/TitleNavbar";
import SearchParcelView from "@/components/templates/SearchParcelView/SearchParcelView";

export default function FindParcel() {
  return (
    <>
      <TitleNavbar title="Find parcel" />
      <div className="w-full px-4 pt-16">
        <SearchParcelView />
      </div>
    </>
  );
}
