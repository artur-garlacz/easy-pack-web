import ParcelDeliveryListView from "@/components/templates/delivery/DeliveryParcelView/DeliveryParcelListView";
import { getDeliveryProps } from "@/lib/auth-delivery";

export default ParcelDeliveryListView;

export const getServerSideProps = getDeliveryProps;
