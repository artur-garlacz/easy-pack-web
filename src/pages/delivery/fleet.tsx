import VehicleFleetView from "@/components/templates/delivery/VehicleFleetView/VehicleFleetView";
import { getDeliveryProps } from "@/lib/auth-delivery";

export default VehicleFleetView;

export const getServerSideProps = getDeliveryProps;
